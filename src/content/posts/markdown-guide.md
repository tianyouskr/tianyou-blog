---
title: Markdown 写作速查
description: 常用 Markdown 语法的一个简短参考,顺便测试一下排版样式。
pubDate: 2026-06-08
tags:
  - 建站
  - 参考
lang: zh
draft: false
---

记录一下常用语法,方便排版自查。

## 文本

**粗体**、*斜体*、`行内代码`、~~删除线~~。

## 列表

- 无序项一
- 无序项二
  - 嵌套项

1. 有序项一
2. 有序项二

## 引用与表格

> 引用一段话,用来测试边框与配色。

| 功能 | 方案 | 成本 |
| --- | --- | --- |
| 托管 | Cloudflare Pages | 免费 |
| 评论 | Giscus | 免费 |
| 搜索 | Pagefind | 免费 |

## 代码块

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

排版正常即说明主题样式生效。
