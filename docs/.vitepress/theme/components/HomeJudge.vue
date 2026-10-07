<script setup lang="ts">
/**
 * Hero 右侧的「判题机」面板 —— 一次提交的完整叙事。
 *
 * 时间线（全部由脚本统一计算，SSR 输出确定，改常数即可整体调快 / 调慢）：
 *   ① 编辑器逐行浮现（样板行 + 行号）
 *   ② 核心三行从行首逐字打出（steps 走字），写完后代码光标常亮
 *   ③ 终端窗口依次出现编译 / 运行命令
 *   ④ 一枚鼠标指针滑入，点击「提交」
 *   ⑤ 判定区：待提交 → 评测中… → ✓ Accepted · 0 ms · 256 KB
 *
 * 约定：
 *   · 代码是结构化数据（Token 数组），不用 v-html；
 *   · 面板是示意图：外层 role="img" + aria-label，内部对读屏隐藏；
 *   · 动效全部尊重 prefers-reduced-motion（直接呈现最终态，见 style.css §14）；
 *   · 已按要求去掉原代码首行的注释（`// 608ACM · …`）。
 */

type TokClass = 'pre' | 'kw' | 'fn' | 'str' | 'num' | 'op'

interface Tok {
  c?: TokClass
  t: string
}

interface Line {
  toks: Tok[]
  /** 是否逐字打出（核心逻辑行） */
  typed?: boolean
}

/** A + B —— 每个竞赛选手写下的第一段代码（不含注释行） */
const rawLines: Line[] = [
  { toks: [{ c: 'pre', t: '#include ' }, { c: 'str', t: '<bits/stdc++.h>' }] },
  { toks: [{ c: 'kw', t: 'using namespace ' }, { t: 'std;' }] },
  { toks: [] },
  { toks: [{ c: 'kw', t: 'int' }, { c: 'fn', t: ' main' }, { t: '() {' }] },
  { toks: [{ t: '    ' }, { c: 'fn', t: 'ios::sync_with_stdio' }, { t: '(' }, { c: 'num', t: 'false' }, { t: ');' }] },
  { toks: [{ t: '    ' }, { c: 'fn', t: 'cin.tie' }, { t: '(' }, { c: 'num', t: 'nullptr' }, { t: ');' }] },
  { toks: [{ t: '    ' }, { c: 'kw', t: 'int' }, { t: ' a, b;' }], typed: true },
  { toks: [{ t: '    ' }, { c: 'fn', t: 'cin' }, { c: 'op', t: ' >> ' }, { t: 'a' }, { c: 'op', t: ' >> ' }, { t: 'b;' }], typed: true },
  { toks: [{ t: '    ' }, { c: 'fn', t: 'cout' }, { c: 'op', t: ' << ' }, { t: 'a' }, { c: 'op', t: ' + ' }, { t: 'b' }, { c: 'op', t: ' << ' }, { c: 'str', t: "'\\n'" }, { t: ';' }], typed: true },
  { toks: [{ t: '    ' }, { c: 'kw', t: 'return' }, { c: 'num', t: ' 0;' }] },
  { toks: [{ t: '}' }] }
]

/* —— 时间线常数（毫秒） —— */
const CHAR_MS = 42
const GAP_MS = 140
const TYPING_START = 950

const clock = { t: TYPING_START }
let lastTyped = -1

const lines = rawLines.map((line, i) => {
  if (!line.typed) {
    return { ...line, typed: false as const, chars: 0, typeAnim: '', isLastTyped: false }
  }
  const chars = line.toks.reduce((n, tk) => n + tk.t.length, 0)
  const dur = chars * CHAR_MS
  const delay = clock.t
  clock.t += dur + GAP_MS
  lastTyped = i
  return { ...line, typed: true as const, chars, typeAnim: `hm-type ${dur}ms steps(${chars}) ${delay}ms both`, isLastTyped: false }
})

const TYPE_END = clock.t - GAP_MS
if (lastTyped >= 0) lines[lastTyped].isLastTyped = true

/** 鼠标指针入场 → 悬停 → 点击 → 结算后离场（百分比节奏见 hm-cursor-ride） */
const CURSOR_IN = TYPE_END + 380
const CLICK_AT = CURSOR_IN + 1070
const JUDGE_END = CLICK_AT + 900

/** 编辑器光标：打完后在行尾现身并常亮闪烁 */
const caretAnim = `hm-caret-in 220ms ease ${TYPE_END + 120}ms both, hm-blink 1.05s step-end ${TYPE_END + 120}ms infinite`
/** 鼠标指针滑入 / 点击 / 离场 */
const cursorAnim = `hm-cursor-ride 2820ms linear ${CURSOR_IN}ms both`
/** 点击处的涟漪 */
const rippleAnim = `hm-ripple-out 650ms cubic-bezier(0.4, 0, 0.2, 1) ${CLICK_AT}ms both`
/** 提交按钮：按压回弹 + 判定完成后转「已提交」形态 */
const submitAnim = `hm-press 340ms var(--hm-ease) ${CLICK_AT}ms both, hm-btn-done 420ms ease ${JUDGE_END}ms both`
/** 判定区三段文案的交替 */
const v0Anim = `hm-verdict-out 300ms ease ${CLICK_AT}ms both`
const v1Anim = `hm-verdict-judging 1000ms linear ${CLICK_AT}ms both`
const v2Anim = `hm-accepted-in 500ms var(--hm-ease) ${JUDGE_END}ms both`

/** 终端两行命令的出现时间 */
const shellDelays = ['3.75s', '4.25s']
</script>

<template>
  <div
    class="hm-judge"
    role="img"
    aria-label="示意图：一段求两数之和的 C++ 代码从核心逻辑逐字写出，编译运行后提交评测，判定为 Accepted"
  >
    <div class="hm-judge__glow" aria-hidden="true" />

    <!-- 编辑器窗口 -->
    <figure class="hm-editor" aria-hidden="true">
      <div class="hm-editor__bar">
        <span class="hm-dots"><i /><i /><i /></span>
        <span class="hm-editor__tab">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>main.cpp</span>
        <span class="hm-editor__lang">C++20</span>
      </div>

      <pre class="hm-editor__code"><code><span
        v-for="(line, i) in lines"
        :key="i"
        class="hm-editor__line"
        :style="{ animationDelay: `${(0.35 + i * 0.05).toFixed(2)}s` }"
      ><span v-if="line.typed" class="hm-type" :style="{ '--chars': line.chars, animation: line.typeAnim }"><span
          v-for="(tk, j) in line.toks"
          :key="j"
          :class="tk.c && `t-${tk.c}`"
        >{{ tk.t }}</span></span><span v-else class="hm-editor__text"><span
          v-for="(tk, j) in line.toks"
          :key="j"
          :class="tk.c && `t-${tk.c}`"
        >{{ tk.t }}</span></span><i v-if="line.isLastTyped" class="hm-type__caret" :style="{ animation: caretAnim }" /></span></code></pre>

      <div class="hm-editor__status">
        <span class="hm-editor__v0" :style="{ animation: v0Anim }">待提交</span>
        <span class="hm-editor__v1" :style="{ animation: v1Anim }"><i class="hm-editor__spin" />评测中…</span>
        <span class="hm-editor__v2" :style="{ animation: v2Anim }"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg><span>Accepted</span><i class="hm-editor__sep">·</i><span class="hm-editor__stat">0 ms</span><i class="hm-editor__sep">·</i><span class="hm-editor__stat">256 KB</span></span>

        <button class="hm-editor__submit" type="button" tabindex="-1" :style="{ animation: submitAnim }">提交</button>
        <i class="hm-editor__ripple" :style="{ animation: rippleAnim }" />
        <span class="hm-editor__cursor" :style="{ animation: cursorAnim }">
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
