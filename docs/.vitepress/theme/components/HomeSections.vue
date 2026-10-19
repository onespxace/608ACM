<script setup lang="ts">
import { withBase } from 'vitepress'
import { groups } from '../data/quick-links'

/**
 * 首页主体分区（注入 `home-features-after` 插槽，SSG 阶段即渲染为静态 HTML）：
 *   1. hm-links  快速链接 —— 四组 59 条常用站点，数据见 data/quick-links.ts；
 *      图标为本地打包的 favicon（docs/public/icons/，随仓库分发）；
 *   2. hm-cta    终端式收尾 —— 深色终端窗口 + 主行动点。
 *
 * 约定：
 *   · 外链一律 target="_blank" + rel="noopener noreferrer"；
 *   · 只出结构，颜色 / 间距走 styles/ 的 --hm-* 令牌；
 *   · 移动端（≤640px）：每条渲染为紧凑图标芯片（描述由 CSS 隐藏），
 *     在组内排成两列，避免长列表滚不到头；
 *   · 动效仅限悬停（聚光灯 / 箭头滑出），可被 prefers-reduced-motion 关闭。
 */
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
