# tianyou-blog

个人博客 —— 基于 **Astro + Keystatic + Pagefind + Giscus**,部署到 **Cloudflare Pages**。
纯静态、免费、零运维;在线后台写作,内容以 Markdown/MDX 存于本仓库。

## 功能

- ✅ 文章(Markdown/MDX)、标签/分类、归档
- ✅ 暗色模式(无首屏闪烁)、响应式
- ✅ 全文搜索(Pagefind,纯静态)
- ✅ 评论(Giscus,基于 GitHub Discussions)
- ✅ RSS、Sitemap
- ✅ 中 / 英多语言(`/` 与 `/en/`)
- ✅ 在线 CMS 后台(Keystatic,`/keystatic`)

## 本地开发

```bash
npm install
npm run dev          # http://localhost:4321  ,后台:/keystatic
npm run build        # 构建 + 生成 Pagefind 搜索索引到 dist/
npm run preview      # 预览构建产物(Cloudflare 适配器,需 wrangler)
```

> 注意:**搜索和评论需 `npm run build` 后才完整**。dev 模式下没有 Pagefind 索引,搜索框会提示先构建。

## 写文章

两种方式,二选一:

1. **在线后台**:访问 `/keystatic`,图形界面里写,保存即写入 `src/content/posts/`。
2. **直接写文件**:在 `src/content/posts/` 新建 `.md` / `.mdx`,frontmatter 字段见下。

```yaml
---
title: 标题
description: 摘要(列表/RSS/SEO 用)
pubDate: 2026-06-15
tags: [标签1, 标签2]
lang: zh          # zh 或 en
draft: false      # true 则生产环境不发布
---
正文…
```

## 部署到 Cloudflare Pages

1. 推送到 GitHub。
2. Cloudflare Dashboard → Workers & Pages → 连接此仓库。
3. 构建命令 `npm run build`,输出目录 `dist`。
4. 把 `astro.config.mjs` 里的 `SITE` 改成你的真实域名。

## 配置评论(Giscus)

1. 在 GitHub 仓库 Settings 开启 **Discussions**。
2. 安装 [giscus app](https://github.com/apps/giscus) 到该仓库。
3. 打开 https://giscus.app ,填入仓库,拿到 `repo-id` / `category-id`。
4. 复制 `.env.example` 为 `.env`,填入 `PUBLIC_GISCUS_*`;Cloudflare Pages 里把这些设为环境变量。

未配置时评论区会显示一条占位提示,不影响其余功能。

## 启用 Keystatic 在线后台(GitHub 模式)

本地默认用 `storage: { kind: 'local' }`(本地读写文件)。要在**线上**编辑:

1. `keystatic.config.ts` 改为:
   ```ts
   storage: { kind: 'github', repo: 'your-name/tianyou-blog' }
   ```
2. 按 [Keystatic GitHub 模式文档](https://keystatic.com/docs/github-mode) 创建 GitHub App,得到 client id / secret。
3. 在 `.env` / Cloudflare 环境变量填入 `KEYSTATIC_GITHUB_CLIENT_ID`、`KEYSTATIC_GITHUB_CLIENT_SECRET`、`KEYSTATIC_SECRET`。
4. 部署后访问 `https://你的域名/keystatic`,用 GitHub 登录即可在线写作,保存自动提交并触发重建。

> `/keystatic` 与其 API 是按需渲染(SSR),由 `@astrojs/cloudflare` 适配器承载;其余所有页面均为静态。

## 技术栈

| 用途 | 选型 |
| --- | --- |
| 框架 | Astro 5(Content Layer) |
| CMS | Keystatic(`/keystatic`) |
| 搜索 | Pagefind |
| 评论 | Giscus |
| 托管 | Cloudflare Pages |
