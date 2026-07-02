/** Resolves hash links so they work from any page (e.g. /#about from /contact). */
export function resolveNavHref(href: string): string {
  if (href.startsWith("#")) {
    return `/${href}`;
  }
  return href;
}

export const routes = {
  home: "/",
  projects: "/projects",
  blog: "/blog",
  certifications: "/certifications",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;
