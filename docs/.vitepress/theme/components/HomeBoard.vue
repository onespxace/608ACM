<script setup lang="ts">
/**
 * Hero 右侧的「现场榜单」卡片 —— 纸面记分牌风格。
 *
 * 用一张熟悉的 ICPC 记分榜讲「我们在这项运动里的位置」：
 *   排名（前三有奖牌色）+ 队名 + 每题一颗的判题方块
 *   （AC 绿实心 / 没过 琥珀 / 未交 空心）+ 罚时；
 *   608ACM 所在行整行高亮，配一枚浮动徽章显示通过题数。
 *
 * 约定：
 *   · 整块是示意图：外层 role="img" + aria-label，内部对读屏隐藏；
 *   · 数据是纯展示用的示意数据（队伍 01…06），不代表真实赛果；
 *   · 动效只有错落入场 + LIVE 呼吸，尊重 prefers-reduced-motion。
 */

type Cell = 'ac' | 'try' | 'no'

interface TeamRow {
  name: string
  cells: Cell[]
  penalty: number
  ours?: boolean
}

/** 按「解题数降序、罚时升序」排好的示意榜单 */
const teams: TeamRow[] = [
  { name: '队伍 01', cells: ['ac', 'ac', 'ac', 'ac', 'ac', 'ac'], penalty: 620 },
  { name: '队伍 02', cells: ['ac', 'ac', 'ac', 'ac', 'ac', 'try'], penalty: 540 },
  { name: '608ACM', cells: ['ac', 'ac', 'ac', 'ac', 'try', 'no'], penalty: 488, ours: true },
  { name: '队伍 04', cells: ['ac', 'ac', 'ac', 'ac', 'no', 'no'], penalty: 512 },
  { name: '队伍 05', cells: ['ac', 'ac', 'ac', 'no', 'no', 'no'], penalty: 375 },
  { name: '队伍 06', cells: ['ac', 'ac', 'ac', 'no', 'no', 'no'], penalty: 430 }
]

const solved = teams.find((t) => t.ours)!.cells.filter((c) => c === 'ac').length
const total = teams.find((t) => t.ours)!.cells.length
</script>

<template>
  <div
    class="hm-board"
    role="img"
    aria-label="示意图：网络赛现场榜单，608ACM 队伍位列第 3 名"
  >
    <div class="hm-board__glow" aria-hidden="true" />

    <div class="hm-board__card" aria-hidden="true">
      <header class="hm-board__bar">
        <span class="hm-board__title">现场榜单</span>
        <span class="hm-board__sub">网络赛</span>
        <span class="hm-board__live"><i />LIVE</span>
      </header>

      <div class="hm-board__cols">
        <span>#</span>
        <span>队伍</span>
        <span>解题</span>
        <span>罚时</span>
      </div>

      <ol class="hm-board__list">
        <li
          v-for="(t, i) in teams"
          :key="t.name"
          class="hm-board__row"
          :class="{ 'is-ours': t.ours }"
          :style="{ animationDelay: `${0.28 + i * 0.07}s` }"
        >
          <span class="hm-board__rank" :class="`rk-${i + 1}`">{{ i + 1 }}</span>
          <span class="hm-board__name">{{ t.name }}</span>
          <span class="hm-board__cells">
            <i v-for="(c, j) in t.cells" :key="j" :class="`cell-${c}`" />
          </span>
          <span class="hm-board__penalty">{{ t.penalty }}</span>
        </li>
      </ol>

      <footer class="hm-board__foot">
        <span>共 128 支队伍 · {{ total }} 道题</span>
        <span>更新于 12:04</span>
      </footer>
    </div>

    <div class="hm-board__chip" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span>{{ solved }} / {{ total }} 通过</span>
    </div>
  </div>
</template>
