# Content CMS

Edit site content here without touching React code. Changes deploy when you push to GitHub.

## Folders

| Folder              | What it controls                                |
| ------------------- | ----------------------------------------------- |
| `content/projects/` | Project cards, case studies, architecture pages |
| `content/blog/`     | Blog posts (`.mdx` files)                       |

## Projects

Each project is a `.json` file in `content/projects/`. Required fields:

- `id`, `name`, `description`, `status`, `tags`, `href`, `linkLabel`, `theme`
- `longDescription`, `highlights` — shown on `/projects`
- `caseStudy` — challenge / solution / outcome on `/projects/[slug]`
- `architecture` — summary, layers, diagram notes on `/projects/[slug]`

## Blog posts

Create `content/blog/your-slug.mdx` with frontmatter:

```yaml
---
title: "Post title"
description: "Short summary for SEO"
date: "2026-07-01"
tags: ["engineering", "product"]
---
```

## After editing

Commit and push to `main`. Coolify redeploys automatically.
