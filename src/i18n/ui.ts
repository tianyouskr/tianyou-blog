export const languages = {
  zh: '中文',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'zh';

// 界面文案字典
export const ui = {
  zh: {
    'site.title': 'tianyou的blog',
    'site.description': '记录技术、思考与生活',
    'nav.home': '首页',
    'nav.archive': '归档',
    'nav.tags': '标签',
    'nav.search': '搜索',
    'nav.about': '关于',
    'post.publishedOn': '发布于',
    'post.updatedOn': '更新于',
    'post.readMore': '阅读全文',
    'post.tags': '标签',
    'post.comments': '评论',
    'post.backToHome': '← 返回首页',
    'archive.title': '文章归档',
    'tags.title': '全部标签',
    'tags.postsTagged': '篇文章标记为',
    'search.title': '搜索',
    'search.placeholder': '搜索文章…',
    'about.title': '关于',
    'theme.toggle': '切换主题',
    'footer.builtWith': '使用 Astro 构建',
  },
  en: {
    'site.title': "Tianyou's Blog",
    'site.description': 'Notes on tech, thoughts and life',
    'nav.home': 'Home',
    'nav.archive': 'Archive',
    'nav.tags': 'Tags',
    'nav.search': 'Search',
    'nav.about': 'About',
    'post.publishedOn': 'Published on',
    'post.updatedOn': 'Updated on',
    'post.readMore': 'Read more',
    'post.tags': 'Tags',
    'post.comments': 'Comments',
    'post.backToHome': '← Back to home',
    'archive.title': 'Archive',
    'tags.title': 'All tags',
    'tags.postsTagged': 'posts tagged',
    'search.title': 'Search',
    'search.placeholder': 'Search posts…',
    'about.title': 'About',
    'theme.toggle': 'Toggle theme',
    'footer.builtWith': 'Built with Astro',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];
