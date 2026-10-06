<script setup lang="ts">
/**
 * 自定义 Layout：把首页的四个分区注入 VitePress 默认主题的插槽。
 *
 * 插槽分工（与 docs/index.md、style.css 的三方约定）：
 *   1. home-hero-info-before   状态胶囊（608 / Algorithm Training Team）
 *   2. home-hero-actions-after 终端风格快捷路径（./guide 等）
 *   3. home-hero-image         右侧「评测机」面板，替代默认的 hero 图片。
 *      注意：frontmatter 里刻意不写 hero.image —— VPHero 会检查本插槽是否
 *      存在（provide('hero-image-slot-exists')），存在即启用 has-image 双栏布局。
 *   4. home-features-after     数据带 / 板块地图 / 进阶阶梯 / CTA（HomeSections）
 *
 * 文档内图片点击放大（vitepress-plugin-image-viewer）只作用于 .vp-doc，
 * 与首页自定义区块互不影响；VitePress 的 theme.setup 已废弃，须在包裹的
 * Layout 组件里调用。
 */
import DefaultTheme from 'vitepress/theme'
import { useRoute, withBase } from 'vitepress'
import { onMounted, onUnmounted, ref } from 'vue'
import imageViewer from 'vitepress-plugin-image-viewer'
import HomeJudge from './components/HomeJudge.vue'
import HomeSections from './components/HomeSections.vue'

const { Layout } = DefaultTheme

imageViewer(useRoute())

/**
 * 阅读进度条（0–1）：内容页专用，首页由 CSS（html:has(.VPHome)）隐藏。
 * rAF 节流，滚动/resize 时更新；组件卸载时移除监听。
 */
const progress = ref(0)
let raf = 0

const updateProgress = () => {
  raf = 0
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

const onScroll = () => {
  if (!raf) raf = requestAnimationFrame(updateProgress)
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (raf) cancelAnimationFrame(raf)
})

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

    <!-- 3 · 评测机面板 -->
    <template #home-hero-image>
      <HomeJudge />
    </template>

    <!-- 4 · 首页主体分区 -->
    <template #home-features-after>
      <HomeSections />
    </template>
  </Layout>
</template>
