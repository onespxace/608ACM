<script setup lang="ts">
/**
 * Hero 右侧的「评测机」面板 —— 整页的视觉锚点。
 *
 * 用两扇窗口讲完一次提交的一生：
 *   1. 编辑器窗口：main.cpp 里的 A+B 代码，行号 + 语法着色 + 底部判定栏（Accepted）
 *   2. 终端窗口：编译与运行命令，末行光标常亮
 *
 * 实现约定：
 *   · 代码是结构化数据（Token 数组），不用 v-html，SSG 直接产出静态 HTML；
 *   · 整块面板是示意图，外层 role="img" + aria-label，内部对读屏隐藏；
 *   · 动效只有「逐行浮现 + 判定弹出 + 光标闪烁」，全部尊重 prefers-reduced-motion。
 */

interface Token {
  /** 着色类：c 注释 / k 关键字 / s 字符串 / n 常规 */
  c: 'c' | 'k' | 's' | 'n'
  t: string
}

const codeLines: Token[][] = [
  [{ c: 'c', t: '// 608ACM · 从这道 A+B 开始' }],
  [{ c: 'k', t: '#include ' }, { c: 's', t: '<bits/stdc++.h>' }],
  [{ c: 'k', t: 'using namespace ' }, { c: 'n', t: 'std;' }],
  [],
  [{ c: 'k', t: 'int' }, { c: 'n', t: ' main() {' }],
  [{ c: 'n', t: '    ios::sync_with_stdio(' }, { c: 'k', t: 'false' }, { c: 'n', t: ');' }],
  [{ c: 'n', t: '    cin.tie(' }, { c: 'k', t: 'nullptr' }, { c: 'n', t: ');' }],
  [{ c: 'n', t: '    ' }, { c: 'k', t: 'int' }, { c: 'n', t: ' a, b;' }],
  [{ c: 'n', t: '    cin >> a >> b;' }],
  [{ c: 'n', t: '    cout << a + b << ' }, { c: 's', t: "'\\n'" }, { c: 'n', t: ';' }],
  [{ c: 'n', t: '    ' }, { c: 'k', t: 'return' }, { c: 'n', t: ' 0;' }],
  [{ c: 'n', t: '}' }]
]

const shellLines = [
  { cmd: 'g++ main.cpp -O2 -std=c++20' },
  { cmd: './a.out < data.in' }
]
</script>

<template>
  <div
    class="hm-judge"
    role="img"
    aria-label="示意图：一段快速读入的 C++ 代码编译运行后通过评测，判定为 Accepted"
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
          </svg>
          main.cpp
        </span>
        <span class="hm-editor__lang">C++20</span>
      </div>

      <pre class="hm-editor__code"><code><span
        v-for="(line, i) in codeLines"
        :key="i"
        class="hm-editor__line"
        :style="{ animationDelay: `${0.3 + i * 0.055}s` }"
      ><span v-for="(tk, j) in line" :key="j" :class="`t-${tk.c}`">{{ tk.t }}</span></span></code></pre>

      <div class="hm-editor__status">
        <span class="hm-editor__verdict">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Accepted
        </span>
        <span class="hm-editor__stat">0 ms</span>
        <span class="hm-editor__stat">256 KB</span>
      </div>
    </figure>

    <!-- 终端窗口 -->
    <div class="hm-shell" aria-hidden="true">
      <p v-for="(l, i) in shellLines" :key="i" class="hm-shell__line">
        <span class="hm-shell__prompt">$</span>
        <span class="hm-shell__cmd">{{ l.cmd }}</span>
        <i v-if="i === shellLines.length - 1" class="hm-shell__caret" />
      </p>
    </div>
  </div>
</template>
