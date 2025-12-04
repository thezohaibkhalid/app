---
title: "Building a Portfolio with Next.js"
date: "2025-12-04"
excerpt: "How I migrated my static HTML portfolio to a dynamic Next.js application with sticky scrolling and markdown support."
image: "/images/mbh.png"
tags: ["Next.js", "Web Dev", "Tutorial"]
---

## Why Next.js?

Next.js provides the best developer experience with features like:
- **Server Side Rendering (SSR)** for better SEO.
- **File-based Routing** for easy navigation structure.
- **Image Optimization** out of the box.

## The Sticky Scroll Effect

One of the coolest features of this new site is the sticky scroll on the projects page. It was built using `framer-motion`.

```javascript
const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
});
```

This allows us to create immersive storytelling experiences where the content flows naturally while keeping context.

## Markdown for Blogs

Writing blogs in Markdown is seamless. I just drop a `.md` file in my `posts` folder, and it automatically renders here!
