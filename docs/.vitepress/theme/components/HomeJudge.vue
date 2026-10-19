<script setup lang="ts">
import { useJudgeDemo } from '../composables/use-judge-demo'

/**
 * Hero 右侧的「判题机」面板 —— 视图层。
 *
 * 演示状态机、三段算法数据与 C++ 分词器都收敛在
 * composables/use-judge-demo.ts；本组件只负责结构、
 * 样式钩子（data-phase / data-algo / data-ci）与无障碍标注。
 *
 * 面板是示意图：role="img" + aria-label，内部对读屏隐藏；
 * prefers-reduced-motion 下由 composable 直接给出第一段代码 + Accepted 终态。
 */
const { ALGOS, algo, ai, ci, phase, round, view, caretLine, scrollStyle, v0On, showCursor, shellDelays } =
  useJudgeDemo()
</script>

<template>
  <div
    class="hm-judge"
    role="img"
    aria-label="示意图：快速排序、最短路与树状数组三段经典算法代码逐段写出、自动滚动，逐一提交评测并判定 Accepted，循环演示"
  >
    <div class="hm-judge__glow" aria-hidden="true" />

    <!-- 编辑器窗口 -->
    <figure class="hm-editor" aria-hidden="true" :data-phase="phase" :data-algo="ai" :data-ci="ci">
      <div class="hm-editor__bar">
        <span class="hm-dots"><i /><i /><i /></span>
        <span class="hm-editor__tab">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>{{ algo.file }}</span>
        <span class="hm-editor__algos"><i v-for="k in ALGOS.length" :key="k" :class="{ 'is-on': k - 1 === ai }" /></span>
        <span class="hm-editor__lang">C++20</span>
      </div>

      <pre class="hm-editor__code"><code><span class="hm-editor__scroll" :style="scrollStyle"><span
        v-for="(line, li) in view"
        :key="li"
        class="hm-editor__line"
      ><span v-for="(g, gi) in line.groups" :key="gi" :class="g.c && `t-${g.c}`">{{ g.t }}</span><i v-if="caretLine === li" class="hm-editor__caret" /></span></span></code></pre>

      <div class="hm-editor__status">
        <span class="hm-editor__v0" :class="{ 'is-on': v0On }">待提交</span>
        <span class="hm-editor__v1" :class="{ 'is-on': phase === 'judging' }"><i class="hm-editor__spin" />评测中…</span>
        <span class="hm-editor__v2" :class="{ 'is-on': phase === 'accepted' }"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg><span>Accepted</span><i class="hm-editor__sep">·</i><span class="hm-editor__stat">0 ms</span><i class="hm-editor__sep">·</i><span class="hm-editor__stat">256 KB</span></span>

        <button
          :key="`b${round}`"
          class="hm-editor__submit"
          type="button"
          tabindex="-1"
          :class="{ 'is-press': phase === 'judging', 'is-done': phase === 'accepted' || phase === 'switch' }"
        >提交</button>
        <i v-if="phase === 'judging'" :key="`r${round}`" class="hm-editor__ripple" />
        <span v-if="showCursor" :key="`c${round}`" class="hm-editor__cursor" :class="{ 'is-bye': phase === 'accepted' }">
          <svg viewBox="0 0 15 21"><path d="M1 1v15.2l4.1-3.6 2.6 7.2 2.7-1.2-2.5-7.2H13.6Z" fill="#ffffff" stroke="#0d1020" stroke-width="1.4" stroke-linejoin="round" /></svg>
        </span>
      </div>
    </figure>

    <!-- 终端窗口 -->
    <div class="hm-shell" aria-hidden="true">
      <p class="hm-shell__line" :style="{ animationDelay: shellDelays[0] }"><span class="hm-shell__prompt">$</span><span class="hm-shell__cmd">g++ main.cpp -O2 -std=c++20</span></p>
      <p class="hm-shell__line" :style="{ animationDelay: shellDelays[1] }"><span class="hm-shell__prompt">$</span><span class="hm-shell__cmd">./a.out &lt; data.in</span><i class="hm-shell__caret" /></p>
    </div>
  </div>
</template>
