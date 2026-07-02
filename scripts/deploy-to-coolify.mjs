#!/usr/bin/env node
/**
 * Deploy sufyanahmed-tech to Coolify — SAFETY: only touches "sufyan-ahmed-tech" project.
 *
 * Required env:
 *   COOLIFY_URL=http://82.29.164.223:8000
 *   COOLIFY_TOKEN=<api token>
 */

const TARGET_PROJECT_NAME = "sufyan-ahmed-tech";
const FORBIDDEN_PROJECTS = ["my first project"];

const COOLIFY_URL = (process.env.COOLIFY_URL || "http://82.29.164.223:8000").replace(
  /\/$/,
  "",
);
const COOLIFY_TOKEN = process.env.COOLIFY_TOKEN || "";
const APP_UUID = process.env.COOLIFY_APP_UUID || "";
const GIT_REPO = process.env.GIT_REPO || "correspond9/sufyanahmed-tech";
const GIT_BRANCH = process.env.GIT_BRANCH || "main";
const APP_DOMAIN = process.env.APP_DOMAIN || "https://sufyanahmed.tech";
const APP_NAME = "sufyanahmed-tech";

if (!COOLIFY_TOKEN) {
  console.error("Missing COOLIFY_TOKEN.");
  process.exit(1);
}

async function api(path, options = {}) {
  const res = await fetch(`${COOLIFY_URL}/api/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${COOLIFY_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error(
      `API ${options.method || "GET"} ${path} (${res.status}): ${typeof data === "string" ? data : JSON.stringify(data)}`,
    );
  }

  return data;
}

function pickUuid(item) {
  return item?.uuid || item?.id;
}

function normalizeName(name) {
  return String(name || "")
    .trim()
    .toLowerCase();
}

async function getTargetProject() {
  const projects = await api("/projects");
  const list = Array.isArray(projects) ? projects : projects?.data || [];

  const target = list.find(
    (p) => normalizeName(p.name) === normalizeName(TARGET_PROJECT_NAME),
  );

  if (!target) {
    throw new Error(
      `Project "${TARGET_PROJECT_NAME}" not found. Available: ${list.map((p) => p.name).join(", ")}`,
    );
  }

  for (const forbidden of FORBIDDEN_PROJECTS) {
    if (normalizeName(target.name) === normalizeName(forbidden)) {
      throw new Error(`Refusing to deploy to forbidden project: ${target.name}`);
    }
  }

  return target;
}

async function getLocalhostServer() {
  const servers = await api("/servers");
  const list = Array.isArray(servers) ? servers : servers?.data || [];
  const localhost =
    list.find((s) => normalizeName(s.name) === "localhost") || list[0];

  if (!localhost) throw new Error("No server found in Coolify.");
  return localhost;
}

async function findExistingApp(projectUuid) {
  const applications = await api("/applications");
  const list = Array.isArray(applications)
    ? applications
    : applications?.data || [];

  return list.find((app) => {
    const sameProject =
      app.project_uuid === projectUuid ||
      app.project?.uuid === projectUuid ||
      normalizeName(app.project?.name) === normalizeName(TARGET_PROJECT_NAME);
    const sameName =
      normalizeName(app.name) === normalizeName(APP_NAME) ||
      String(app.fqdn || "").includes("sufyanahmed.tech");
    return sameProject && sameName;
  });
}

async function createApplication(projectUuid, serverUuid) {
  console.log(`Creating NEW app "${APP_NAME}" in project "${TARGET_PROJECT_NAME}" only...`);

  return api("/applications/public", {
    method: "POST",
    body: JSON.stringify({
      project_uuid: projectUuid,
      server_uuid: serverUuid,
      environment_name: "production",
      git_repository: GIT_REPO,
      git_branch: GIT_BRANCH,
      build_pack: "dockerfile",
      ports_exposes: "3000",
      name: APP_NAME,
      description: "SufyanAhmed.Tech portfolio site",
      domains: APP_DOMAIN,
      instant_deploy: false,
    }),
  });
}

async function updateApplication(uuid) {
  return api(`/applications/${uuid}`, {
    method: "PATCH",
    body: JSON.stringify({
      git_repository: GIT_REPO,
      git_branch: GIT_BRANCH,
      build_pack: "dockerfile",
      ports_exposes: "3000",
      domains: APP_DOMAIN,
    }),
  });
}

async function setEnv(uuid) {
  const vars = [
    { key: "NODE_ENV", value: "production", is_build: true, is_runtime: true },
    {
      key: "NEXT_PUBLIC_SITE_URL",
      value: APP_DOMAIN,
      is_build: true,
      is_runtime: true,
    },
  ];

  for (const v of vars) {
    try {
      await api(`/applications/${uuid}/envs`, {
        method: "POST",
        body: JSON.stringify(v),
      });
    } catch {
      await api(`/applications/${uuid}/envs/${v.key}`, {
        method: "PATCH",
        body: JSON.stringify(v),
      }).catch(() => {});
    }
  }
}

async function deploy(uuid) {
  return api(`/deploy?uuid=${uuid}&force=true`);
}

async function main() {
  console.log("Coolify URL:", COOLIFY_URL);
  console.log("Target project:", TARGET_PROJECT_NAME);
  console.log("Will NOT modify other projects or existing containers outside this app.");

  const project = await getTargetProject();
  const projectUuid = pickUuid(project);
  console.log("Project UUID:", projectUuid);

  const server = await getLocalhostServer();
  const serverUuid = pickUuid(server);
  console.log("Server:", server.name, serverUuid);

  let uuid = APP_UUID;
  let existing = null;

  if (!uuid) {
    existing = await findExistingApp(projectUuid);
    uuid = existing ? pickUuid(existing) : "";
  }

  if (uuid) {
    console.log("Using existing app in target project:", uuid);
    await updateApplication(uuid).catch((err) =>
      console.warn("Update warning:", err.message),
    );
  } else {
    const created = await createApplication(projectUuid, serverUuid);
    uuid = pickUuid(created) || created?.application?.uuid;
    if (!uuid) {
      console.log("Create response:", created);
      throw new Error("Could not read new application UUID.");
    }
    console.log("Created new container/app:", uuid);
  }

  await setEnv(uuid);

  console.log("Starting deployment (new build)...");
  const result = await deploy(uuid);
  console.log("Deployment queued:", JSON.stringify(result, null, 2));
  console.log(`Domain target: ${APP_DOMAIN}`);
  console.log("Done. Existing production containers in other projects were not touched.");
}

main().catch((err) => {
  console.error("Deploy failed:", err.message || err);
  process.exit(1);
});
