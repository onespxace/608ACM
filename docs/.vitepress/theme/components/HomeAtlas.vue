<script setup lang="ts">
/**
 * Hero 右侧的「算法知识地图」卡片 —— 地铁线路图风格的知识体系示意图。
 *
 * 设计思路：
 *   用一张「线路图」讲清楚「要学什么、按什么顺序学」——
 *   · 绿色主线 = 核心路线（模拟 → 枚举 → 排序 → … → 图论）
 *   · 蓝色支线 = 数学专项（数论 / 组合计数 / 博弈论）
 *   · 琥珀支线 = 字符串专项（哈希 / KMP / 字典树）
 *   换乘站（搜索、贪心）表示两条线路在知识体系里的衔接点。
 *
 * 约定：
 *   · 不含任何队伍/人员信息，纯知识点示意图；
 *   · 整块是示意图：外层 role="img" + aria-label，内部对读屏隐藏；
 *   · 动效 = 线路描画 + 站点错落浮现 + 一枚亮点沿核心线路循环运行，
 *     全部尊重 prefers-reduced-motion（见 style.css §14）。
 *   · 亮点用 SMIL animateMotion + mpath 引用 #hm-ln-green 的路径，
 *     几何与线路永远一致；若 SMIL 不可用则整组保持隐藏（优雅降级）。
 */

type Side = 'below' | 'above' | 'left' | 'right'
type Line = 'green' | 'blue' | 'amber'

interface Station {
  /** 站名（知识点） */
  name: string
  /** 圆心坐标（viewBox 420 × 500 内） */
  x: number
  y: number
  /** 站名相对圆点的方位 */
  side: Side
  /** 所属线路 */
  line: Line
  /** 换乘站：圆点略大、站名加重 */
  transfer?: boolean
  /** 入场动画延迟（秒） */
  d: number
}

/** 站点按「主线 → 数学 → 字符串」顺序错落入场 */
const stations: Station[] = [
  { name: '模拟', x: 78, y: 452, side: 'below', line: 'green', d: 0.55 },
  { name: '枚举', x: 160, y: 452, side: 'below', line: 'green', d: 0.6 },
  { name: '排序', x: 242, y: 452, side: 'below', line: 'green', d: 0.65 },
  { name: '二分', x: 312, y: 366, side: 'right', line: 'green', d: 0.7 },
  { name: '贪心', x: 312, y: 292, side: 'left', line: 'green', transfer: true, d: 0.75 },
  { name: '搜索', x: 176, y: 200, side: 'above', line: 'green', transfer: true, d: 0.8 },
  { name: 'DP', x: 120, y: 148, side: 'right', line: 'green', d: 0.85 },
  { name: '数据结构', x: 230, y: 48, side: 'below', line: 'green', d: 0.9 },
  { name: '图论', x: 312, y: 48, side: 'below', line: 'green', d: 0.95 },
  { name: '数论', x: 388, y: 238, side: 'left', line: 'blue', d: 0.85 },
  { name: '组合计数', x: 388, y: 172, side: 'left', line: 'blue', d: 0.91 },
  { name: '博弈论', x: 388, y: 106, side: 'left', line: 'blue', d: 0.97 },
  { name: '哈希', x: 176, y: 256, side: 'right', line: 'amber', d: 0.85 },
  { name: 'KMP', x: 176, y: 324, side: 'right', line: 'amber', d: 0.91 },
  { name: '字典树', x: 260, y: 392, side: 'below', line: 'amber', d: 0.97 }
]

/** 站名的相对坐标与对齐方式 */
const labelOf = (s: Station) => {
  const dx = { below: 0, above: 0, left: -13, right: 13 }[s.side]
  const dy = { below: 23, above: -13, left: 4.5, right: 4.5 }[s.side]
  const anchor = s.side === 'left' ? 'end' : s.side === 'right' ? 'start' : 'middle'
  return { x: s.x + dx, y: s.y + dy, anchor }
}
</script>

<template>
  <div
    class="hm-atlas"
    role="img"
    aria-label="示意图：算法知识地图，以线路图的形式展示从基础到进阶的知识点——核心路线 9 站，数学与字符串两条专项路线各 3 站"
  >
    <div class="hm-atlas__glow" aria-hidden="true" />

    <div class="hm-atlas__card" aria-hidden="true">
      <header class="hm-atlas__bar">
        <span class="hm-atlas__title">算法知识地图</span>
        <span class="hm-atlas__sub">ALGORITHM ATLAS</span>
        <span class="hm-atlas__badge">15 TOPICS</span>
      </header>

      <div class="hm-atlas__map">
        <svg viewBox="0 0 420 500">
          <!-- 三条线路 -->
          <path
            id="hm-ln-green"
            class="ln ln--green"
            pathLength="100"
            d="M26 452H272L312 412V280L232 200H120V96L168 48H344"
          />
          <path class="ln ln--blue" pathLength="100" d="M312 292H388V92" />
          <path class="ln ln--amber" pathLength="100" d="M176 200V352L216 392H300" />

          <!-- 终点箭头（绿：右 / 蓝：上 / 琥珀：右） -->
          <path class="mk mk--green" d="M343 41 352 48 343 55" />
          <path class="mk mk--blue" d="M381 92 388 83 395 92" />
          <path class="mk mk--amber" d="M300 385 309 392 300 399" />

          <!-- 起点标记 -->
          <circle class="cap cap--ring" cx="26" cy="452" r="8" />
          <circle class="cap cap--dot" cx="26" cy="452" r="4" />

          <!-- 站点：圆点 + 站名 -->
          <g v-for="s in stations" :key="s.name">
            <circle
              class="st"
              :class="[`st--${s.line}`, { 'is-transfer': s.transfer }]"
              :cx="s.x"
              :cy="s.y"
              :r="s.transfer ? 6.6 : 5.2"
              :style="{ '--d': `${s.d}s` }"
            />
            <text
              :class="{ 'is-transfer': s.transfer }"
              :x="labelOf(s).x"
              :y="labelOf(s).y"
              :text-anchor="labelOf(s).anchor"
              :style="{ '--d': `${s.d + 0.12}s` }"
            >
              {{ s.name }}
            </text>
          </g>

          <!-- 沿核心线路循环运行的亮点 -->
          <g class="hm-atlas__trainWrap">
            <circle class="hm-atlas__train" r="4.2">
              <animateMotion dur="9s" repeatCount="indefinite" begin="1.5s">
                <mpath href="#hm-ln-green" />
              </animateMotion>
            </circle>
          </g>
        </svg>
      </div>

      <footer class="hm-atlas__legend">
        <span class="hm-atlas__lg lg--green">核心路线</span>
        <span class="hm-atlas__lg lg--blue">数学专项</span>
        <span class="hm-atlas__lg lg--amber">字符串专项</span>
        <span class="hm-atlas__count">共 15 站</span>
      </footer>
    </div>
  </div>
</template>
