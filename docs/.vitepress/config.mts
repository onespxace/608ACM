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
          { text: '算法竞赛入门指北', link: '/guide/' },
          { text: '算竞前中期指南 & 训练建议', link: '/guide/satsky-guide' }
        ]
      },
      {
        text: '软件设计创新工作室',
        items: [
          { text: '工作室简介', link: '/studio/' },
          { text: '算法组简介', link: '/studio/algorithm-team' },
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
            { text: '算法竞赛入门指北', link: '/guide/' },
            { text: '算竞前中期指南 & 训练建议', link: '/guide/satsky-guide' }
          ]
        },
        {
          text: '软件设计创新工作室',
          items: [
            { text: '工作室简介', link: '/studio/' },
            { text: '算法组简介', link: '/studio/algorithm-team' },
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
            { text: '算法竞赛入门指北', link: '/guide/' },
            { text: '算竞前中期指南 & 训练建议', link: '/guide/satsky-guide' }
          ]
        },
        {
          text: '软件设计创新工作室',
          items: [
            { text: '工作室简介', link: '/studio/' },
            { text: '算法组简介', link: '/studio/algorithm-team' },
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
            { text: '算法竞赛入门指北', link: '/guide/' },
            { text: '算竞前中期指南 & 训练建议', link: '/guide/satsky-guide' }
          ]
        },
        {
          text: '软件设计创新工作室',
          items: [
            { text: '工作室简介', link: '/studio/' },
            { text: '算法组简介', link: '/studio/algorithm-team' },
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
