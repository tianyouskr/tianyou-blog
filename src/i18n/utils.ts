import { ui, defaultLang, type Lang, type UIKey } from './ui';

// 从 URL 路径推断当前语言
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'en') return 'en';
  return defaultLang;
}

// 返回某语言下的翻译函数
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

// 给定路径加上语言前缀(中文为默认,不加前缀)
export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return `/${lang}${clean === '/' ? '' : clean}`;
}

// 文章 slug 可能带语言子目录前缀,这里取末段作为路由 slug
export function postSlug(id: string): string {
  const parts = id.split('/');
  return parts[parts.length - 1];
}
