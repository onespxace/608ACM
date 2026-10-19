<script setup lang="ts">
/**
 * 自定义 Layout：把首页的四个分区注入 VitePress 默认主题的插槽。
 *
 * 插槽分工（与 docs/index.md、theme/style.css 的三方约定）：
 *   1. home-hero-info-before   状态胶囊（608 / Algorithm Training Team）
 *   2. home-hero-actions-after 终端风格快捷路径（./guide 等）
 *   3. home-hero-image         右侧「判题机」面板（编辑器打字 + 提交 → AC），替代默认的 hero 图片。
 *      注意：frontmatter 里刻意不写 hero.image —— VPHero 会检查本插槽是否
 *      存在（provide('hero-image-slot-exists')），存在即启用 has-image 双栏布局。
 *   4. home-features-after     快速链接 / CTA（HomeSections）
 *
 * 行为逻辑收敛在 composables/：
 *   · useReadingProgress —— 内容页顶部阅读进度条（首页由 CSS 隐藏）
 *   · useMouseFX         —— 点击涟漪 / 卡片聚光灯 / 磁吸按钮
 *
 * 文档内图片点击放大（vitepress-plugin-image-viewer）只作用于 .vp-doc，
 * 与首页自定义区块互不影响；VitePress 的 theme.setup 已废弃，须在包裹的
 * Layout 组件里调用。
 */
import DefaultTheme from 'vitepress/theme'
import { useRoute, withBase } from 'vitepress'
import imageViewer from 'vitepress-plugin-image-viewer'
import HomeJudge from './components/HomeJudge.vue'
import HomeSections from './components/HomeSections.vue'
import { useReadingProgress } from './composables/use-reading-progress'
import { useMouseFX } from './composables/use-mouse-fx'

const { Layout } = DefaultTheme
const route = useRoute()

imageViewer(route)

const progress = useReadingProgress()

useMouseFX(() => route.path)

/** Hero 按钮下方的快捷路径，刻意保持「终端路径」的形态 */
const quickPaths = [
  { path: './guide', text: '入门指北', link: '/guide/' },
  { path: './contests', text: '比赛说明', link: '/contests/icpc' },
  { path: './studio', text: '工作室', link: '/studio/' },
  { path: 'oi-wiki.org', text: 'OI Wiki', link: 'https://oi-wiki.org/', external: true }
]
</script>

<template>
  <Layout>
    <!-- 0 · 阅读进度条（内容页显示，首页由 CSS 隐藏） -->
    <template #layout-top>
      <div class="hm-progress" aria-hidden="true">
        <span :style="{ transform: `scaleX(${progress})` }" />
      </div>
    </template>

    <!-- 1 · 状态胶囊 -->
    <template #home-hero-info-before>
      <p class="hm-status">
        <span class="hm-status__dot" aria-hidden="true" />
        <span class="hm-status__id">608</span>
        <span class="hm-status__sep" aria-hidden="true">/</span>
        <span class="hm-status__text">Algorithm Training Team</span>
      </p>
    </template>

    <!-- 2 · 快捷路径 -->
    <template #home-hero-actions-after>
      <nav class="hm-paths" aria-label="快捷入口">
        <a
          v-for="item in quickPaths"
          :key="item.link"
          class="hm-paths__item"
          :href="item.external ? item.link : withBase(item.link)"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
        >
          <code class="hm-paths__path">{{ item.path }}</code>
          <span class="hm-paths__label">{{ item.text }}</span>
        </a>
      </nav>
    </template>

    <!-- 3 · 判题机面板 -->
    <template #home-hero-image>
      <HomeJudge />
    </template>

    <!-- 4 · 首页主体分区 -->
    <template #home-features-after>
      <HomeSections />
    </template>
  </Layout>
</template>
