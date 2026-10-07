import { defineConfig } from 'vitepress'

/**
 * 站点部署在子路径下（GitHub Pages / Cloudflare Worker 均按此前缀路由）。
 * 注意：VitePress 不会给 head 里的 href 自动加 base，所以这里手动拼接。
 */
const base = '/608ACM/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  lang: 'zh-CN',
  title: '608ACM',
  description: '608 算法集训队 · 算法竞赛入门指北、赛事说明与训练资源',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${base}icpc-mark.png` }],
    // 首页改为浅色纸张底，主题色跟随浅色模式（深色模式由阅读器自行处理）
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'author', content: '608ACM' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '608ACM · 郑州工商学院软件设计创新工作室算法集训队' }],
    ['meta', { property: 'og:description', content: '从第一行 C++ 到 XCPC 领奖台：入门指北、ICPC/CCPC 赛事说明、训练资源与常用网站导航。' }],
    ['meta', { property: 'og:image', content: `${base}icpc.png` }]
  ],

  /**
   * 标题锚点的 slug 规则改为「GitHub 兼容」。
   * 原因：站点会收录来自 GitHub 的文档（如 guide/smart-questions.md 的《提问的智慧》），
   * 它们自带的目录锚点是按 GitHub 规则生成的（标点被删除、空格转连字符、
   * 如 `#第二步使用项目邮件列表`）；而 VitePress 默认把特殊字符替换成连字符
   * （`第二步，使用…` → `第二步-使用…`），两者对不上会导致目录整篇跳转失效。
   * 该规则与 github-slugger 行为一致：小写 → 空白转 `-` → 删除除
   * 字母/数字/组合符/下划线/连字符以外的一切字符。
   */
  markdown: {
    anchor: {
      slugify: (str: string) =>
        str
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\p{L}\p{N}\p{M}_-]+/gu, '')
          .replace(/-{2,}/g, '-')
          .replace(/^-+|-+$/g, '')
    },
    /**
     * 正文图片懒加载：如「萌新认识与入门算法竞赛」一篇含 96 张截图，
     * 开启后只加载滚动到附近的图片，避免一次性拉取整篇。
     */
    image: {
      lazyLoading: true
    }
  },

  /**
   * 两个插件都会被 SSR 引用，必须 noExternal：
   * 否则 Node 侧会以原生 ESM 加载它们内部的 .css / .vue 而报
   * ERR_UNKNOWN_FILE_EXTENSION。Vite 的 mergeConfig 会把这里的数组与内置值拼接。
   */
  vite: {
    ssr: {
      noExternal: ['vitepress-plugin-nprogress', 'vitepress-plugin-image-viewer']
    }
  },

  themeConfig: {
    siteTitle: '608ACM',
    // 导航用裁掉文字标的紧凑图标；1024px 内的小尺寸下完整锁定版会糊成一团
    logo: '/icpc-mark.png',

    nav: [
      {
        text: '入门指北',
        items: [
          { text: '萌新认识与入门算法竞赛', link: '/guide/xcpc-beginner-guide' },
          { text: '算法竞赛入门指北', link: '/guide/' },
          { text: '提问的智慧', link: '/guide/smart-questions' },
          { text: '算竞前中期指南 & 训练建议', link: '/guide/satsky-guide' }
        ]
      },
      {
        text: '算法组',
        items: [
          { text: '简介', link: '/studio/' },
          { text: '加入我们', link: '/studio/join-us' }
        ]
      },
      {
        text: '下半年比赛',
        items: [
          { text: 'ICPC', link: '/contests/icpc' },
          { text: 'CCPC', link: '/contests/ccpc' },
          { text: '牛客多校', link: '/contests/nowcoder' },
          { text: '常用网站导航', link: '/contests/acm-websites' },
          { text: '常用资源', link: '/contests/resources' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门指北',
          items: [
            { text: '萌新认识与入门算法竞赛', link: '/guide/xcpc-beginner-guide' },
            { text: '算法竞赛入门指北', link: '/guide/' },
            { text: '提问的智慧', link: '/guide/smart-questions' },
            { text: '算竞前中期指南 & 训练建议', link: '/guide/satsky-guide' }
          ]
        },
        {
          text: '算法组',
          items: [
            { text: '简介', link: '/studio/' },
            { text: '加入我们', link: '/studio/join-us' }
          ]
        },
        {
          text: '下半年比赛说明',
          items: [
            { text: 'ICPC', link: '/contests/icpc' },
            { text: 'CCPC', link: '/contests/ccpc' },
            { text: '牛客多校', link: '/contests/nowcoder' },
            { text: '常用网站导航', link: '/contests/acm-websites' },
            { text: '常用资源', link: '/contests/resources' }
          ]
        }
      ],
      '/contests/': [
        {
          text: '入门指北',
          items: [
            { text: '萌新认识与入门算法竞赛', link: '/guide/xcpc-beginner-guide' },
            { text: '算法竞赛入门指北', link: '/guide/' },
            { text: '提问的智慧', link: '/guide/smart-questions' },
            { text: '算竞前中期指南 & 训练建议', link: '/guide/satsky-guide' }
          ]
        },
        {
          text: '算法组',
          items: [
            { text: '简介', link: '/studio/' },
            { text: '加入我们', link: '/studio/join-us' }
          ]
        },
        {
          text: '下半年比赛说明',
          items: [
            { text: 'ICPC', link: '/contests/icpc' },
            { text: 'CCPC', link: '/contests/ccpc' },
            { text: '牛客多校', link: '/contests/nowcoder' },
            { text: '常用网站导航', link: '/contests/acm-websites' },
            { text: '常用资源', link: '/contests/resources' }
          ]
        }
      ],
      '/studio/': [
        {
          text: '入门指北',
          items: [
            { text: '萌新认识与入门算法竞赛', link: '/guide/xcpc-beginner-guide' },
            { text: '算法竞赛入门指北', link: '/guide/' },
            { text: '提问的智慧', link: '/guide/smart-questions' },
            { text: '算竞前中期指南 & 训练建议', link: '/guide/satsky-guide' }
          ]
        },
        {
          text: '算法组',
          items: [
            { text: '简介', link: '/studio/' },
            { text: '加入我们', link: '/studio/join-us' }
          ]
        },
        {
          text: '下半年比赛说明',
          items: [
            { text: 'ICPC', link: '/contests/icpc' },
            { text: 'CCPC', link: '/contests/ccpc' },
            { text: '牛客多校', link: '/contests/nowcoder' },
            { text: '常用网站导航', link: '/contests/acm-websites' },
            { text: '常用资源', link: '/contests/resources' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/onespxace/608ACM' }
    ],

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    search: {
      provider: 'local',
      options: {
        /**
         * 中文友好的分词器（构建端建索引 / 浏览器端查询共用；该函数会被序列化、
         * 在客户端用 `new Function` 还原，**必须自包含**、不引用外部变量）。
         *
         * 背景：VitePress 默认只按「空白 / 标点」切词，一整句无标点中文会变成
         * 一个巨大词条，导致搜「入门」命中不到「算法竞赛入门指北」（前缀匹配
         * 对不上）。策略：
         *   · 连续汉字 → 相邻双字(bigram)，如「算法竞赛」→ 算法 / 法竞 / 竞赛，
         *     搜「入门」「图论」「二分」可精确命中相邻字组合；
         *   · 只保留 unigram 的例外：独立成段的单字（两侧是标点/空白）；
         *     —— 若对所有字都发单字词条，「论」「分」这类高频字会把
         *        「提问的智慧」顶到「图论」「二分」的搜索结果前面（实测过）。
         *   · 英文 / 数字保持整词不变。
         */
        miniSearch: {
          options: {
            tokenize: (text: string) => {
              const tokens: string[] = []
              for (const segment of text.split(/[\n\r\p{Z}\p{P}]+/u)) {
                if (!segment) continue
                for (const part of segment.match(/[\p{Script=Han}]+|[^\p{Script=Han}]+/gu) || []) {
                  if (/^\p{Script=Han}/u.test(part)) {
                    const chars = Array.from(part)
                    if (chars.length === 1) {
                      tokens.push(chars[0])
                    } else {
                      for (let i = 0; i + 1 < chars.length; i++) {
                        tokens.push(chars[i] + chars[i + 1])
                      }
                    }
                  } else {
                    tokens.push(part)
                  }
                }
              }
              return tokens
            }
          }
        },
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present 608ACM'
    }
  }
})
