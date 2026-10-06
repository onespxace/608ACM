<script setup lang="ts">
import { withBase } from 'vitepress'

/**
 * 首页主体分区（注入 `home-features-after` 插槽，SSG 阶段即渲染为静态 HTML）：
 *   1. hm-stats  数据带        —— 四个可核对的数字，像记分板一样横排
 *   2. hm-bento  板块地图      —— 八个入口，6 列网格（两张主卡各占 3 列）
 *   3. hm-ladder 进阶阶梯      —— 四道「题」A→D，带难度分档色（借鉴 CF rating 配色）
 *   4. hm-cta    终端式收尾    —— 深色终端窗口 + 主行动点
 *
 * 约定：
 *   · 图标全部是内联 <path>，不用 v-html；
 *   · 只出结构，颜色/间距走 style.css 的 --hm-* 令牌；
 *   · 动效仅限首屏入场与悬停，可被 prefers-reduced-motion 关闭。
 */

const stats = [
  { tag: 'MODULES', value: '8', unit: '', label: '核心板块' },
  { tag: 'PLATFORMS', value: '14', unit: '+', label: '训练与赛事平台' },
  { tag: 'STAGES', value: '4', unit: '', label: '进阶阶段' },
  { tag: 'PROBLEMS', value: '200', unit: '', label: '牛客精选题单' }
]

interface SiteCard {
  title: string
  desc: string
  link: string
  more: string
  /** 主卡：占 3 列，展示标签行 */
  featured?: boolean
  tags?: string[]
  /** 图标由纯 <path> 组成，避免 v-html */
  paths: string[]
}

const sites: SiteCard[] = [
  {
    title: '算法竞赛入门指北',
    desc: '从认识比赛到写出第一道 AC：刷题平台怎么选、学习资源怎么用、IDE 怎么配、STL 怎么查，一册讲完。',
    link: '/guide/',
    more: '从第一页读起',
    featured: true,
    tags: ['#比赛扫盲', '#刷题网站', '#编程环境', '#STL 速查'],
    paths: [
      'M12 7v14',
      'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'
    ]
  },
  {
    title: 'ICPC 国际大学生程序设计竞赛',
    desc: '含金量最高的大学生算法赛事。网络赛、区域赛到 EC Final 的晋级链路与名额规则，附最新校内数据。',
    link: '/contests/icpc',
    more: '打开赛事说明',
    featured: true,
    tags: ['#网络赛', '#区域赛', '#EC Final'],
    paths: [
      'M6 9H4.5a2.5 2.5 0 0 1 0-5H6',
      'M18 9h1.5a2.5 2.5 0 0 0 0-5H18',
      'M4 22h16',
      'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22',
      'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22',
      'M18 2H6v7a6 6 0 0 0 12 0V2Z'
    ]
  },
  {
    title: 'CCPC 中国大学生程序设计竞赛',
    desc: '国内最高规格的算法赛事之一：名额分配、参赛费用、女队与外卡政策，逐条讲清楚。',
    link: '/contests/ccpc',
    more: '查看 CCPC',
    paths: [
      'M18 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0',
      'M15.477 12.89 17 22l-5-3-5 3 1.523-9.11'
    ]
  },
  {
    title: '牛客暑期多校训练营',
    desc: '200 道精选题单 + 10 场多人联考 + 赛后讲题，暑假合练、备战下半年 XCPC 的首选。',
    link: '/contests/nowcoder',
    more: '查看训练营',
    paths: [
      'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
      'M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
      'M22 21v-2a4 4 0 0 0-3-3.87',
      'M16 3.13a4 4 0 0 1 0 7.75'
    ]
  },
  {
    title: '算竞前中期指南 & 训练建议',
    desc: '资深选手的方法论：思维怎么练、科技怎么点、训练节奏怎么稳，CF 到 XCPC 都适用。',
    link: '/guide/satsky-guide',
    more: '查看指南',
    paths: [
      'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
      'M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0',
      'M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0'
    ]
  },
  {
    title: '常用网站导航',
    desc: '导航站、在线评测、排行榜、赛事官方——所有会用到的 XCPC 站点，一页收齐。',
    link: '/contests/acm-websites',
    more: '浏览导航',
    paths: [
      'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
      'M16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88Z'
    ]
  },
  {
    title: '常用资源',
    desc: '官方规则、费用与名额文件等一手资料，需要核对时随手可查。',
    link: '/contests/resources',
    more: '浏览资源',
    paths: [
      'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
      'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'
    ]
  },
  {
    title: '工具与环境',
    desc: '编辑器、插件与笔记工具推荐，把写题环境调到顺手，训练效率立竿见影。',
    link: '/guide/#编程环境',
    more: '了解详情',
    paths: ['M4 17 10 11 4 5', 'M12 19h8']
  }
]

interface LadderStep {
  /** 以「题号」呈现：A → D */
  key: string
  title: string
  desc: string
  rating: string
  grade: string
  /** 难度分档色档位 g1–g4（灰 / 青 / 蓝 / 红） */
  tone: 'g1' | 'g2' | 'g3' | 'g4'
  link: string
  linkText: string
}

const ladder: LadderStep[] = [
  {
    key: 'A',
    title: '打牢语言基础',
    desc: '掌握 C++ 基础语法与常用 STL，在洛谷 / 蓝桥云课独立写出第一道 AC。',
    rating: 'R800',
    grade: '入门',
    tone: 'g1',
    link: '/guide/',
    linkText: '看入门指北'
  },
  {
    key: 'B',
    title: '系统刷题训练',
    desc: 'Codeforces、AtCoder、牛客周赛轮转上分，把思维速度与代码量一起堆起来。',
    rating: 'R1400',
    grade: '进阶',
    tone: 'g2',
    link: '/guide/satsky-guide',
    linkText: '看训练建议'
  },
  {
    key: 'C',
    title: '拿下入门奖牌',
    desc: '蓝桥杯、团体程序设计天梯赛、河南省赛——用一块奖牌验证阶段成果。',
    rating: 'R1800',
    grade: '夺牌',
    tone: 'g3',
    link: '/contests/acm-websites',
    linkText: '查赛事与榜单'
  },
  {
    key: 'D',
    title: '冲击 XCPC',
    desc: '通过选拔进入工作室，组队征战 ICPC / CCPC 网络赛与区域赛，向更高的奖牌发起挑战。',
    rating: 'R2400',
    grade: '冲刺',
    tone: 'g4',
    link: '/contests/icpc',
    linkText: '看 ICPC 说明'
  }
]
</script>

<template>
  <!-- 1 · 数据带 -->
  <section class="hm-section hm-stats" aria-label="站点概览">
    <ul class="hm-stats__row">
      <li v-for="s in stats" :key="s.tag" class="hm-stats__item">
        <p class="hm-stats__tag">{{ s.tag }}</p>
        <p class="hm-stats__value">{{ s.value }}<span v-if="s.unit">{{ s.unit }}</span></p>
        <p class="hm-stats__label">{{ s.label }}</p>
      </li>
    </ul>
  </section>

  <!-- 2 · 板块地图 -->
  <section class="hm-section">
    <header class="hm-head">
      <p class="hm-head__eyebrow">SITEMAP</p>
      <h2 class="hm-head__title">八个入口，一张地图</h2>
      <p class="hm-head__sub">想找什么，从这里出发——每个入口都直通对应页面，不用在目录里迷路。</p>
    </header>

    <div class="hm-bento">
      <a
        v-for="(m, i) in sites"
        :key="m.title"
        class="hm-card"
        :class="{ 'hm-card--lg': m.featured }"
        :href="withBase(m.link)"
      >
        <span class="hm-card__top">
          <span class="hm-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path v-for="(d, k) in m.paths" :key="k" :d="d" />
            </svg>
          </span>
          <span class="hm-card__no" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        </span>

        <h3 class="hm-card__title">{{ m.title }}</h3>
        <p class="hm-card__desc">{{ m.desc }}</p>

        <span v-if="m.tags" class="hm-card__tags">
          <span v-for="t in m.tags" :key="t" class="hm-card__tag">{{ t }}</span>
        </span>

        <span class="hm-card__more">
          {{ m.more }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </a>
    </div>
  </section>

  <!-- 3 · 进阶阶梯 -->
  <section class="hm-section">
    <header class="hm-head">
      <p class="hm-head__eyebrow">ROADMAP</p>
      <h2 class="hm-head__title">四级阶梯，通向 XCPC</h2>
      <p class="hm-head__sub">把成长拆成四道题：从 A 题的基础语法，到 D 题的赛场奖牌。</p>
    </header>

    <ol class="hm-ladder">
      <li v-for="s in ladder" :key="s.key" class="hm-step" :class="`hm-step--${s.tone}`">
        <a class="hm-step__link" :href="withBase(s.link)">
          <span class="hm-step__key" aria-hidden="true">{{ s.key }}</span>
          <span class="hm-step__main">
            <span class="hm-step__title">{{ s.title }}</span>
            <span class="hm-step__desc">{{ s.desc }}</span>
          </span>
          <span class="hm-step__meta">
            <span class="hm-step__chip">
              <b>{{ s.rating }}</b>
              <em>{{ s.grade }}</em>
            </span>
            <span class="hm-step__hint">{{ s.linkText }}</span>
            <svg class="hm-step__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </a>
      </li>
    </ol>
  </section>

  <!-- 4 · 终端式收尾 -->
  <section class="hm-section">
    <div class="hm-cta">
      <div class="hm-cta__bar">
        <span class="hm-dots"><i /><i /><i /></span>
        <span class="hm-cta__shell">608acm@zbu: ~/guide</span>
        <span class="hm-cta__term">bash</span>
      </div>

      <div class="hm-cta__body">
        <p class="hm-cta__cmd">
          <span aria-hidden="true">$</span>
          <span class="hm-cta__run">./start_journey.sh</span>
          <i class="hm-caret hm-caret--panel" aria-hidden="true" />
        </p>

        <h2 class="hm-cta__title">下一份 AC，写上你的名字</h2>
        <p class="hm-cta__desc">
          你需要的只是一台电脑和一点不服输。路线、题单与队友，我们都备好了——剩下的，只差一次提交。
        </p>

        <div class="hm-cta__actions">
          <a class="hm-btn hm-btn--solid" :href="withBase('/guide/')">
            阅读入门指北
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a class="hm-btn hm-btn--ghost" :href="withBase('/studio/join-us')">加入我们</a>
        </div>

        <p class="hm-cta__hint">
          按 <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> 搜索全站 · 文档基于 MIT 协议开放
        </p>
      </div>
    </div>
  </section>
</template>
