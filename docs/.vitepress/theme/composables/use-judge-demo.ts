import { computed, onMounted, onUnmounted, ref } from 'vue'

/**
 * 判题机面板的演示状态机（纯逻辑，无 DOM 依赖）。
 *
 * 每轮讲完一次「写代码 → 提交 → AC」：
 *   ① 逐字打出当前算法的核心代码（打字光标随行），内容长时视图缓缓下滚；
 *   ② 鼠标指针滑入，点击「提交」；
 *   ③ 判定区：待提交 → 评测中… → ✓ Accepted · 0 ms · 256 KB；
 *   ④ 短暂停留后淡出切到下一个算法（快速排序 → 最短路 → 树状数组），循环演示。
 *
 * 实现约定：
 *   · 三段代码用轻量 C++ 分词器着色（关键字 / 函数 / 数字 / 运算符），
 *     token 文本与颜色在 SSR 阶段即可确定；
 *   · 时间线由 TIME 常数统一控制，改一处即可调速；
 *   · prefers-reduced-motion 下不做循环：直接展示第一段代码与 Accepted 终态。
 */

/** 代码 token 分类（与 judge.css 的 .t-* 类对应） */
type TokClass = 'pre' | 'kw' | 'fn' | 'str' | 'num' | 'op'

interface Char {
  ch: string
  c?: TokClass
}

interface AlgoDef {
  file: string
  code: string
}

/* —— 三段经典算法（核心片段，不追求完整可编译） —— */
const RAW_ALGOS: AlgoDef[] = [
  {
    file: 'quicksort.cpp',
    code: `void quick_sort(int a[], int l, int r) {
    if (l >= r) return;
    int x = a[(l + r) >> 1];
    int i = l - 1, j = r + 1;
    while (i < j) {
        while (a[++i] < x);
        while (a[--j] > x);
        if (i < j) swap(a[i], a[j]);
    }
    quick_sort(a, l, j);
    quick_sort(a, j + 1, r);
}`
  },
  {
    file: 'dijkstra.cpp',
    code: `vector<int> dijkstra(int s) {
    using P = pair<int, int>;
    priority_queue<P, vector<P>, greater<>> q;
    vector<int> d(n + 1, INF);
    d[s] = 0;
    q.push({0, s});
    while (!q.empty()) {
        auto [du, u] = q.top();
        q.pop();
        if (du != d[u]) continue;
        for (auto [v, w] : e[u])
            if (d[v] > du + w)
                d[v] = du + w, q.push({d[v], v});
    }
    return d;
}`
  },
  {
    file: 'fenwick.cpp',
    code: `int lowbit(int x) {
    return x & -x;
}

void add(int i, int v) {
    for (; i <= n; i += lowbit(i)) t[i] += v;
}

int query(int i) {
    int s = 0;
    for (; i > 0; i -= lowbit(i)) s += t[i];
    return s;
}`
  }
]

/* —— 轻量 C++ 分词（只服务这三段代码的着色） —— */
const KEYWORDS = new Set([
  'void', 'int', 'long', 'bool', 'char', 'double', 'if', 'else', 'for', 'while',
  'return', 'break', 'continue', 'const', 'auto', 'using', 'namespace',
  'vector', 'priority_queue', 'pair', 'greater', 'queue', 'map', 'set', 'string'
])
const OP_MULTI = new Set(['<<', '>>', '<=', '>=', '==', '!=', '&&', '||', '++', '--', '->'])
const OP_SINGLE = new Set(['+', '-', '*', '/', '%', '=', '!', '&', '|', '^', '~', '?', ':'])

function tokenize(text: string): Char[] {
  const out: Char[] = []
  const n = text.length
  let i = 0
  const push = (s: string, c?: TokClass) => {
    for (const ch of s) out.push({ ch, c })
  }
  while (i < n) {
    const ch = text[i]
    if (ch === "'" || ch === '"') {
      let j = i + 1
      while (j < n) {
        if (text[j] === '\\') j += 2
        else if (text[j] === ch) {
          j += 1
          break
        } else j += 1
      }
      push(text.slice(i, j), 'str')
      i = j
    } else if (ch === '#' && /[A-Za-z_]/.test(text[i + 1] ?? '')) {
      let j = i + 1
      while (j < n && /[A-Za-z0-9_]/.test(text[j])) j += 1
      push(text.slice(i, j), 'pre')
      i = j
    } else if (/[0-9]/.test(ch)) {
      let j = i
      while (j < n && /[0-9]/.test(text[j])) j += 1
      push(text.slice(i, j), 'num')
      i = j
    } else if (/[A-Za-z_]/.test(ch)) {
      let j = i
      while (j < n && /[A-Za-z0-9_]/.test(text[j])) j += 1
      const word = text.slice(i, j)
      let c: TokClass | undefined
      if (KEYWORDS.has(word)) c = 'kw'
      else if (/^\s*\(/.test(text.slice(j))) c = 'fn'
      push(word, c)
      i = j
    } else if (OP_MULTI.has(text.slice(i, i + 2))) {
      push(text.slice(i, i + 2), 'op')
      i += 2
    } else if (OP_SINGLE.has(ch)) {
      push(ch, 'op')
      i += 1
    } else {
      push(ch)
      i += 1
    }
  }
  return out
}

interface AlgoRuntime {
  file: string
  lines: { chars: Char[] }[]
  total: number
  /** 每个「行末字符序号」集合：打字到行末时多停一拍 */
  lineEnds: Set<number>
}

const ALGOS: AlgoRuntime[] = RAW_ALGOS.map(({ file, code }) => {
  const lines = code.split('\n').map((ln) => ({ chars: tokenize(ln) }))
  const lineEnds = new Set<number>()
  let total = 0
  for (const ln of lines) {
    total += ln.chars.length
    lineEnds.add(total)
  }
  return { file, lines, total, lineEnds }
})

/* —— 时间线常数（毫秒） —— */
const CHAR_MS = 12
const LINE_PAUSE = 120
const HOVER_MS = 900
const JUDGE_MS = 900
const HOLD_MS = 2200
const SWITCH_MS = 400
/** 可见区约 8.5 行，当前打字行保持在可见区第 7 行附近 */
const VIEW_KEEP = 6

type Phase = 'typing' | 'hover' | 'judging' | 'accepted' | 'switch'

export function useJudgeDemo() {
  const ai = ref(0)
  const ci = ref(0)
  const phase = ref<Phase>('typing')
  const round = ref(0)
  const calm = ref(false)

  const algo = computed(() => ALGOS[ai.value])

  let timer: number | undefined

  const schedule = (ms: number, fn: () => void) => {
    timer = window.setTimeout(fn, ms)
  }

  /** 打字驱动：逐字符推进，行末多停一拍；打完进入鼠标阶段 */
  function typeStep() {
    const cur = ALGOS[ai.value]
    if (ci.value < cur.total) {
      ci.value += 1
      const atLineEnd = cur.lineEnds.has(ci.value)
      schedule(CHAR_MS + (atLineEnd ? LINE_PAUSE : 0), typeStep)
    } else {
      phase.value = 'hover'
      schedule(HOVER_MS, () => {
        phase.value = 'judging'
        schedule(JUDGE_MS, () => {
          phase.value = 'accepted'
          schedule(HOLD_MS, () => {
            phase.value = 'switch'
            schedule(SWITCH_MS, () => {
              // 仍在 switch 态内静默归位（此时滚动过渡被禁用，瞬间复位）
              ai.value = (ai.value + 1) % ALGOS.length
              ci.value = 0
              schedule(60, () => {
                round.value += 1
                phase.value = 'typing'
                typeStep()
              })
            })
          })
        })
      })
    }
  }

  onMounted(() => {
    calm.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (calm.value) {
      // 不做循环：直接给出第一段代码 + Accepted 终态
      ci.value = ALGOS[0].total
      phase.value = 'accepted'
      return
    }
    typeStep()
  })

  onUnmounted(() => {
    if (timer) window.clearTimeout(timer)
  })

  /** 已打出的内容（同色连续字符合并成 span） */
  const view = computed(() => {
    const cur = ALGOS[ai.value]
    let budget = ci.value
    return cur.lines.map((line) => {
      const take = Math.max(0, Math.min(line.chars.length, budget))
      budget -= line.chars.length
      const groups: { c?: TokClass; t: string }[] = []
      for (let k = 0; k < take; k += 1) {
        const { ch, c } = line.chars[k]
        const last = groups[groups.length - 1]
        if (last && last.c === c) last.t += ch
        else groups.push({ c, t: ch })
      }
      return { groups }
    })
  })

  /** 当前打字所在行（打字光标挂在它行尾） */
  const caretLine = computed(() => {
    if (phase.value !== 'typing') return -1
    let acc = 0
    const lines = algo.value.lines
    for (let li = 0; li < lines.length; li += 1) {
      if (ci.value < acc + lines[li].chars.length) return li
      acc += lines[li].chars.length
    }
    return -1
  })

  /** 缓缓下滚：让打字行始终留在可见区里 */
  const scrollStyle = computed(() => {
    let acc = 0
    let curLine = algo.value.lines.length - 1
    const lines = algo.value.lines
    for (let li = 0; li < lines.length; li += 1) {
      acc += lines[li].chars.length
      if (ci.value <= acc) {
        curLine = li
        break
      }
    }
    const offset = Math.max(0, curLine - VIEW_KEEP)
    return {
      transform: `translateY(calc(${-offset} * 1.75em))`,
      transition: phase.value === 'switch' ? 'none' : undefined
    }
  })

  const v0On = computed(
    () => phase.value === 'typing' || phase.value === 'hover' || phase.value === 'switch'
  )
  const showCursor = computed(
    () => phase.value === 'hover' || phase.value === 'judging' || (phase.value === 'accepted' && !calm.value)
  )

  /** 终端两行命令的出现时间（首轮出现一次即可） */
  const shellDelays = ['3.75s', '4.25s']

  return {
    ALGOS,
    algo,
    ai,
    ci,
    phase,
    round,
    view,
    caretLine,
    scrollStyle,
    v0On,
    showCursor,
    shellDelays
  }
}
