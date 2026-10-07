<script setup lang="ts">
/**
 * 自定义 Layout：把首页的四个分区注入 VitePress 默认主题的插槽。
 *
 * 插槽分工（与 docs/index.md、style.css 的三方约定）：
 *   1. home-hero-info-before   状态胶囊（608 / Algorithm Training Team）
 *   2. home-hero-actions-after 终端风格快捷路径（./guide 等）
 *   3. home-hero-image         右侧「判题机」面板（编辑器打字 + 提交 → AC），替代默认的 hero 图片。
 *      注意：frontmatter 里刻意不写 hero.image —— VPHero 会检查本插槽是否
 *      存在（provide('hero-image-slot-exists')），存在即启用 has-image 双栏布局。
 *   4. home-features-after     快速链接 / CTA（HomeSections）
 *
 * 文档内图片点击放大（vitepress-plugin-image-viewer）只作用于 .vp-doc，
 * 与首页自定义区块互不影响；VitePress 的 theme.setup 已废弃，须在包裹的
 * Layout 组件里调用。
 */
import DefaultTheme from 'vitepress/theme'
import { useRoute, withBase } from 'vitepress'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import imageViewer from 'vitepress-plugin-image-viewer'
import HomeJudge from './components/HomeJudge.vue'
import HomeSections from './components/HomeSections.vue'

const { Layout } = DefaultTheme

const route = useRoute()

imageViewer(route)

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

/* —— 全局鼠标交互（优秀博客常见的细节动效，2026-10-07） ——
   ① 点击涟漪：任意位置点击泛起一圈绿环
   ② 卡片聚光灯：--mx/--my 驱动的径向高光（rAF 节流）
   ③ 磁吸按钮：Hero 主按钮 / CTA 按钮向光标轻移（钳制 ±8px）
   仅对精确指针（hover + pointer:fine）启用，尊重 prefers-reduced-motion；
   聚光灯与磁吸在路由切换后重新扫描绑定。 */
const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
const calmMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let fxCleanups: Array<() => void> = []

function enableMouseFX() {
  if (!canHover() || calmMotion()) return

  /* ① 点击涟漪（元素在指针处生成，动画结束自动移除） */
  const onDown = (e: MouseEvent) => {
    const r = document.createElement('span')
    r.className = 'hm-fx-ripple'
    r.style.left = `${e.clientX}px`
    r.style.top = `${e.clientY}px`
    r.addEventListener('animationend', () => r.remove())
    document.body.appendChild(r)
  }

  /* ② 卡片聚光灯（rAF 节流，写 --mx/--my 百分比） */
  let spotEvent: MouseEvent | null = null
  let spotQueued = false
  const applySpot = () => {
    spotQueued = false
    const e = spotEvent
    if (!e) return
    const el = (e.target as Element | null)?.closest?.('.hm-spot')
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`)
  }
  const onSpotMove = (e: MouseEvent) => {
    spotEvent = e
    if (!spotQueued) {
      spotQueued = true
      requestAnimationFrame(applySpot)
    }
  }

  /* ③ 磁吸按钮（轻量、钳制位移，避免“蹦跳”感） */
  const bindMagnetic = () => {
    document.querySelectorAll<HTMLElement>('.VPHome .VPHero .actions .VPButton, .hm-btn').forEach((el) => {
      if (el.dataset.mag) return
      el.dataset.mag = '1'
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const dx = Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * 0.16))
        const dy = Math.max(-6, Math.min(6, (e.clientY - (r.top + r.height / 2)) * 0.28))
        el.style.transition = 'transform .09s linear'
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
      }
      const leave = () => {
        el.style.transition = ''
        el.style.transform = ''
      }
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      fxCleanups.push(() => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      })
    })
  }

  /* 聚光灯 / 磁吸挂载（路由切换后重扫） */
  const SPOT_SELECTOR = '.hm-links__item, .hm-cta__body, .vp-doc .custom-block, .vp-doc table'
  const decorate = () => {
    document.querySelectorAll(SPOT_SELECTOR).forEach((el) => el.classList.add('hm-spot'))
    bindMagnetic()
  }
  decorate()

  document.addEventListener('mousemove', onSpotMove, { passive: true })
  document.addEventListener('pointerdown', onDown, { passive: true })

  const stopWatch = watch(
    () => route.path,
    () => setTimeout(decorate, 80)
  )

  fxCleanups.push(() => {
    document.removeEventListener('mousemove', onSpotMove)
    document.removeEventListener('pointerdown', onDown)
    stopWatch()
  })
}

onMounted(enableMouseFX)
onUnmounted(() => {
  fxCleanups.forEach((fn) => fn())
  fxCleanups = []
})
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
