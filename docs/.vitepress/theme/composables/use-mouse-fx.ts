import { onMounted, onUnmounted, watch } from 'vue'

/**
 * 全局鼠标交互（仅在「精确指针 + 允许动效」时启用）：
 *   ① 点击涟漪：任意位置按下泛起一圈绿环，动画结束自动移除
 *   ② 卡片聚光灯：写 --mx / --my 百分比，rAF 节流
 *   ③ 磁吸按钮：Hero 主按钮 / CTA 按钮向光标轻移（钳制 ±8px，避免“蹦跳”）
 *
 * 生命周期：挂载时绑定并扫描一次；路由切换后重扫聚光灯/磁吸目标；
 * 卸载时统一清理监听与 watch。
 *
 * @param path 当前路由路径的 getter（路由变化时重新装饰 DOM）
 */
export function useMouseFX(path: () => string) {
  const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const calmMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let cleanups: Array<() => void> = []

  const enable = () => {
    if (!canHover() || calmMotion()) return

    /* ① 点击涟漪 */
    const onDown = (e: MouseEvent) => {
      const r = document.createElement('span')
      r.className = 'hm-fx-ripple'
      r.style.left = `${e.clientX}px`
      r.style.top = `${e.clientY}px`
      r.addEventListener('animationend', () => r.remove())
      document.body.appendChild(r)
    }

    /* ② 卡片聚光灯（rAF 节流） */
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

    /* ③ 磁吸按钮（轻量、钳制位移） */
    const bindMagnetic = () => {
      document
        .querySelectorAll<HTMLElement>('.VPHome .VPHero .actions .VPButton, .hm-btn')
        .forEach((el) => {
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
          cleanups.push(() => {
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

    const stopWatch = watch(path, () => setTimeout(decorate, 80))

    cleanups.push(() => {
      document.removeEventListener('mousemove', onSpotMove)
      document.removeEventListener('pointerdown', onDown)
      stopWatch()
    })
  }

  onMounted(enable)
  onUnmounted(() => {
    cleanups.forEach((fn) => fn())
    cleanups = []
  })
}
