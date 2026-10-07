<script setup lang="ts">
import { withBase } from 'vitepress'

/**
 * 首页主体分区（注入 `home-features-after` 插槽，SSG 阶段即渲染为静态 HTML）：
 *   1. hm-links  快速链接 —— 参考山东理工 ACM 官网「带图标 + 一句话说明」的体例，
 *      结合 xcpc.link（AWESOME XCPC）的资源分类，整理出三组常用站点：
 *      题库训练 / 工具资料 / 榜单赛事资讯，共 30 条；图标为本地打包的 favicon
 *      （docs/public/icons/，随仓库分发，不依赖外部图床）；
 *   2. hm-cta    终端式收尾 —— 深色终端窗口 + 主行动点。
 *
 * 约定：
 *   · 外链一律 target="_blank" + rel="noopener noreferrer"；
 *   · 只出结构，颜色 / 间距走 style.css 的 --hm-* 令牌；
 *   · 动效仅限悬停（聚光灯 / 箭头滑出），可被 prefers-reduced-motion 关闭。
 */

interface QuickLink {
  name: string
  url: string
  /** 一句话说明（参考 SDUT ACM 官网的链接描述体例） */
  desc: string
  /** 本地图标文件名（docs/public/icons/） */
  icon: string
}

interface LinkGroup {
  /** 组名 */
  title: string
  links: QuickLink[]
}

/** 三组链接：整理自山东理工 ACM 官网与 xcpc.link 的资源清单 */
const groups: LinkGroup[] = [
  {
    title: '题库 · 训练平台',
    links: [
      { name: 'Codeforces', url: 'https://codeforces.com', desc: '全球最大算法竞赛平台，周赛与 Rating 体系', icon: 'codeforces.png' },
      { name: 'AtCoder', url: 'https://atcoder.jp', desc: '日本最大的算法竞技网站，ABC / ARC 系列', icon: 'atcoder.png' },
      { name: '洛谷', url: 'https://www.luogu.com.cn', desc: '国内活跃的中文题库与社区', icon: 'luogu.ico' },
      { name: '牛客竞赛', url: 'https://ac.nowcoder.com', desc: '国内赛事、训练营与题解讨论', icon: 'nowcoder.ico' },
      { name: 'QOJ', url: 'https://qoj.ac', desc: 'XCPC 近年真题复现与练题', icon: 'qoj.svg' },
      { name: 'VJudge', url: 'https://vjudge.net', desc: '多 OJ 题目聚合与虚拟评测（含国内镜像）', icon: 'vjudge.ico' },
      { name: 'AcWing', url: 'https://www.acwing.com', desc: '算法竞赛学习平台与周赛', icon: 'acwing.ico' },
      { name: 'UOJ', url: 'https://uoj.ac', desc: '国内开源评测系统社区', icon: 'uoj.ico' },
      { name: 'HDU OJ', url: 'https://acm.hdu.edu.cn', desc: '老牌杭电在线评测系统', icon: 'hdu.ico' },
      { name: '代码源', url: 'https://oj.daimayuan.top', desc: '新手友好的练习题库', icon: 'daimayuan.ico' }
    ]
  },
  {
    title: '工具 · 学习资料',
    links: [
      { name: 'OI Wiki', url: 'https://oi-wiki.org', desc: '中文算法竞赛知识百科', icon: 'oiwiki.ico' },
      { name: 'cp-algorithms', url: 'https://cp-algorithms.com', desc: '英文算法教程经典站点', icon: 'cpalgo.ico' },
      { name: 'KACTL', url: 'https://github.com/kth-competitive-programming/kactl', desc: '顶尖队伍的 ICPC 模板库', icon: 'github.svg' },
      { name: 'AtCoder Library', url: 'https://github.com/atcoder/ac-library', desc: '官方算法库，带文档与练习题', icon: 'github.svg' },
      { name: 'VisuAlgo', url: 'https://visualgo.net/zh', desc: '用动画把数据结构与算法可视化', icon: 'visualgo.png' },
      { name: '图论画图', url: 'https://csacademy.com/app/graph_editor/', desc: 'CS Academy Graph Editor，画图论题的神器', icon: 'csacademy.png' },
      { name: 'Desmos', url: 'https://www.desmos.com/calculator?lang=zh-CN', desc: '函数图像计算器', icon: 'desmos.ico' },
      { name: 'OEIS', url: 'https://oeis.org', desc: '整数数列大全，数论 / 组合常备', icon: 'oeis.ico' },
      { name: 'Diffchecker', url: 'https://www.diffchecker.com', desc: '代码 / 文本差异比对，对拍好帮手', icon: 'diffchecker.ico' },
      { name: 'Paste then AC', url: 'https://paste.then.ac', desc: '适合算法竞赛的自由剪贴板', icon: 'pastethenac.ico' }
    ]
  },
  {
    title: '榜单 · 赛事资讯',
    links: [
      { name: 'XCPCIO', url: 'https://board.xcpcio.com', desc: 'XCPC 系列赛事榜单汇总', icon: 'xcpcio.svg' },
      { name: 'Clist', url: 'https://clist.by', desc: '全球比赛日历聚合与提醒', icon: 'clist.ico' },
      { name: 'xcpc.link', url: 'https://xcpc.link', desc: 'AWESOME XCPC：分类资源导航', icon: 'xcpclink.svg' },
      { name: 'ICPC', url: 'https://icpc.global', desc: '国际大学生程序设计竞赛官网', icon: 'icpc.ico' },
      { name: 'ICPC 北京总部', url: 'https://icpc.pku.edu.cn', desc: '区域赛安排与教练论坛', icon: 'icpcpku.svg' },
      { name: 'CCPC', url: 'https://ccpc.io', desc: '中国大学生程序设计竞赛官网', icon: 'ccpc.png' },
      { name: 'ACMer.info', url: 'https://acmer.info', desc: '面向算法竞赛选手的导航站', icon: 'acmer.ico' },
      { name: 'Algoux', url: 'https://rl.algoux.cn', desc: 'Rating 查询与榜单综合站', icon: 'algoux.ico' },
      { name: 'CFTracker', url: 'https://cftracker.netlify.app/contests', desc: 'Codeforces 比赛 / 题目清单追踪', icon: 'cftracker.ico' },
      { name: 'OIerDb', url: 'https://oier.baoshuo.dev', desc: '查询选手 OI 经历', icon: 'oierdb.ico' }
    ]
  }
]
</script>

<template>
  <!-- 1 · 快速链接 -->
  <section class="hm-section hm-links" aria-label="快速链接">
    <header class="hm-head">
      <p class="hm-head__eyebrow">QUICK LINKS</p>
      <h2 class="hm-head__title">快速链接</h2>
      <p class="hm-head__sub">备赛常用的平台与工具，按场景分好组——从这里一步直达。</p>
    </header>

    <div class="hm-links__grid">
      <div v-for="(g, gi) in groups" :key="g.title" class="hm-links__group">
        <p class="hm-links__tag">
          <span class="hm-links__no" aria-hidden="true">{{ String(gi + 1).padStart(2, '0') }}</span>
          {{ g.title }}
        </p>

        <ul class="hm-links__list">
          <li v-for="l in g.links" :key="l.url">
            <a class="hm-links__item" :href="l.url" target="_blank" rel="noopener noreferrer">
              <span class="hm-links__logo" aria-hidden="true">
                <img :src="withBase(`/icons/${l.icon}`)" alt="" loading="lazy" decoding="async" />
              </span>
              <span class="hm-links__body">
                <span class="hm-links__name">
                  {{ l.name }}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
                <span class="hm-links__desc">{{ l.desc }}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- 2 · 终端式收尾 -->
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
