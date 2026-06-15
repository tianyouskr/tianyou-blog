import type { Lang } from '../i18n/ui';

export interface TimelineEntry {
  /** 起始年份,如 "2023" */
  start: string;
  /** 结束年份,如 "2024";留空表示"至今" */
  end?: string;
  /**
   * 左侧 logo,可选。两种写法:
   *  - 图片:把图片放进 public/logos/ ,这里写 "/logos/xxx.svg"
   *  - emoji:直接写 "🏢"
   */
  logo?: string;
  /** logo 的替代文字(图片无障碍用) */
  logoAlt?: string;
  /**
   * 正文。支持内联 HTML,所以可以写链接:
   *   '我在 <a href="https://example.com">某公司</a> 做了……'
   */
  bodyHtml: string;
}

// 经历(从新到旧排列)。增删条目直接改这个数组即可。
export const timeline: Record<Lang, TimelineEntry[]> = {
  zh: [
    {
      start: '2026.5',
      logo: '/logos/bytedance.svg',
      logoAlt: '字节跳动',
      bodyHtml:
        '在 <a href="https://www.bytedance.com" target="_blank" rel="noopener">字节跳动</a> 实习,从事 AI Agent 相关方向的研发。',
    },
    {
      start: '2025',
      end: '2027',
      logo: '/logos/whu.png',
      logoAlt: '武汉大学',
      bodyHtml:
        '在 <a href="https://www.whu.edu.cn" target="_blank" rel="noopener">武汉大学</a> 计算机学院攻读计算机技术专业硕士。',
    },
    {
      start: '2021',
      end: '2025',
      logo: '/logos/whu.png',
      logoAlt: '武汉大学',
      bodyHtml:
        '在 <a href="https://www.whu.edu.cn" target="_blank" rel="noopener">武汉大学</a> 计算机学院人工智能学院攻读本科。',
    },
  ],
  en: [
    {
      start: '2026.5',
      logo: '/logos/bytedance.svg',
      logoAlt: 'ByteDance',
      bodyHtml:
        'Intern at <a href="https://www.bytedance.com" target="_blank" rel="noopener">ByteDance</a>, working on AI agents.',
    },
    {
      start: '2025',
      end: '2027',
      logo: '/logos/whu.png',
      logoAlt: 'Wuhan University',
      bodyHtml:
        "M.E. in Computer Technology at the School of Computer Science, <a href=\"https://www.whu.edu.cn/en\" target=\"_blank\" rel=\"noopener\">Wuhan University</a>.",
    },
    {
      start: '2021',
      end: '2025',
      logo: '/logos/whu.png',
      logoAlt: 'Wuhan University',
      bodyHtml:
        'B.Eng at the School of Artificial Intelligence (School of Computer Science), <a href="https://www.whu.edu.cn/en" target="_blank" rel="noopener">Wuhan University</a>.',
    },
  ],
};
