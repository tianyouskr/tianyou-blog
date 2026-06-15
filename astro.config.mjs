// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';

// 站点地址 —— 部署后改成你的真实域名
export const SITE = 'https://tianyou-blog.n1345983204.workers.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // 默认静态输出;仅 Keystatic 后台 / API 路由按需渲染(prerender = false)
  output: 'static',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [mdx(), react(), keystatic(), sitemap()],
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    routing: {
      prefixDefaultLocale: false, // 中文走根路径 /,英文走 /en/
    },
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
