#!/usr/bin/env node
/**
 * Deploy sufyanahmed-tech to Coolify via API.
 *
 * Required env vars:
 *   COOLIFY_URL      e.g. https://coolify.your-server.com
 *   COOLIFY_TOKEN    API token (deploy permission, not read-only)
 *
 * Optional:
 *   COOLIFY_APP_UUID     existing application uuid (skip create)
 *   COOLIFY_PROJECT_UUID project uuid (required when creating)
 *   COOLIFY_SERVER_UUID  server uuid (required when creating)
 *   GIT_REPO             default: correspond9/sufyanahmed-tech
 *   GIT_BRANCH           default: main
 *   APP_DOMAIN           default: https://sufyanahmed.tech
 */

const COOLIFY_URL = (process.env.COOLIFY_URL || "").replace(/\/$/, "");
const COOLIFY_TOKEN = process.env.COOLIFY_TOKEN || "";
const APP_UUID = process.env.COOLIFY_APP_UUID || "";
const PROJECT_UUID = process.env.COOLIFY_PROJECT_UUID || "";
const SERVER_UUID = process.env.COOLIFY_SERVER_UUID || "";
const GIT_REPO = process.env.GIT_REPO || "correspond9/sufyanahmed-tech";
const GIT_BRANCH = process.env.GIT_BRANCH || "main";
const APP_DOMAIN = process.env.APP_DOMAIN || "https://sufyanahmed.tech";

if (!COOLIFY_URL || !COOLIFY_TOKEN) {
  console.error(
    "Missing COOLIFY_URL or COOLIFY_TOKEN. Add them to .env or Cursor Cloud secrets.",
  );
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
      `Coolify API ${options.method || "GET"} ${path} failed (${res.status}): ${typeof data === "string" ? data : JSON.stringify(data)}`,
    );
  }

  return data;
}

async function listResources() {
  const [projects, servers, applications] = await Promise.all([
    api("/projects"),
    api("/servers"),
    api("/applications"),
  ]);

  console.log("Projects:", JSON.stringify(projects, null, 2));
  console.log("Servers:", JSON.stringify(servers, null, 2));
  console.log("Applications:", JSON.stringify(applications, null, 2));
}

async function createApplication() {
  if (!PROJECT_UUID || !SERVER_UUID) {
    throw new Error(
      "Set COOLIFY_PROJECT_UUID and COOLIFY_SERVER_UUID to create a new app. Run with LIST=1 first.",
    );
  }

  return api("/applications/public", {
    method: "POST",
    body: JSON.stringify({
      project_uuid: PROJECT_UUID,
      server_uuid: SERVER_UUID,
      environment_name: "production",
      git_repository: GIT_REPO,
      git_branch: GIT_BRANCH,
      build_pack: "dockerfile",
      ports_exposes: "3000",
      name: "sufyanahmed-tech",
      description: "SufyanAhmed.Tech portfolio",
      domains: APP_DOMAIN,
      instant_deploy: true,
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
    await api(`/applications/${uuid}/envs`, {
      method: "POST",
      body: JSON.stringify(v),
    });
  }
}

async function deploy(uuid) {
  return api(`/deploy?uuid=${uuid}&force=true`);
}

async function main() {
  if (process.env.LIST === "1") {
    await listResources();
    return;
  }

  let uuid = APP_UUID;

  if (!uuid) {
    console.log("Creating application...");
    const created = await createApplication();
    uuid = created?.uuid || created?.id || created?.application?.uuid;
    if (!uuid) {
      console.log("Create response:", created);
      throw new Error("Could not determine application UUID from create response.");
    }
    console.log("Created application:", uuid);
  }

  console.log("Setting environment variables...");
  try {
    await setEnv(uuid);
  } catch (err) {
    console.warn("Env setup warning:", err.message);
  }

  console.log("Triggering deployment...");
  const result = await deploy(uuid);
  console.log("Deployment queued:", result);
  console.log(`Target domain: ${APP_DOMAIN}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
