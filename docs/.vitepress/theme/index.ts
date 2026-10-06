import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import nprogress from 'vitepress-plugin-nprogress'
import './style.css'
import 'viewerjs/dist/viewer.min.css'
import 'vitepress-plugin-nprogress/lib/css/index.css'

/**
 * `extends: DefaultTheme` 会让 VitePress 自动串联基类的 enhanceApp（见
 * vitepress/dist/client/app/index.js 的 resolveThemeExtends），所以这里不需要
 * 手动调用 DefaultTheme.enhanceApp。
 *
 * 路由切换进度条：vitepress-plugin-nprogress
 * 文档内图片点击放大：在 Layout.vue 里调用（VitePress 的 theme.setup 已废弃，
 * 官方建议改为「包裹 Layout 组件」）。
 */
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    nprogress(ctx)
  }
} satisfies Theme
