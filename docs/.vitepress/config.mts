import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/608ACM/',
  lang: 'zh-CN',
  title: '608ACM',
  description: '608 算法集训队 · 算法竞赛入门指北与下半年比赛说明',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/icpc.png' }]
  ],

  themeConfig: {
    siteTitle: '608ACM',
    logo: '/icpc.png',

    nav: [
      {
        text: '入门指北',
        items: [
          { text: '算法竞赛入门指北', link: '/guide/' },
          { text: '算竞前中期指南 & 训练建议', link: '/guide/satsky-guide' }
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
      copyright: 'Copyright © 2024-present 608ACM'
    }
  }
})
