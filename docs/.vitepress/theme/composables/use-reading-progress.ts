import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 阅读进度（0–1）：整页滚动比例。
 * 内容页由顶部进度条展示（首页由 CSS 隐藏进度条）。
 *
 * 实现要点：滚动 / resize 事件只置 rAF 标记，真正的计算合并在每帧一次，
 * 避免长文档滚动时的重复布局读取。
 */
export function useReadingProgress() {
  const progress = ref(0)
  let raf = 0

  const update = () => {
    raf = 0
    const doc = document.documentElement
    const max = doc.scrollHeight - doc.clientHeight
    progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  }

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (raf) cancelAnimationFrame(raf)
  })

  return progress
}
