# 608ACM

软件设计创新工作室 —— 算法小组非官方网

由某科学的不知名人维护，个人项目不能代表工作室

## 技术栈

- [VitePress](https://vitepress.dev/) — 基于 Vite 的静态站点生成器
- TypeScript
- 部署于 Cloudflare Workers / GitHub Pages

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 目录结构

```
608ACM-site/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # 站点配置（栏目定义在顶部 navGroups 常量）
│   │   └── theme/
│   │       ├── index.ts        # 主题入口（注册布局与插件）
│   │       ├── Layout.vue      # 插槽注入：进度条 / 快捷路径 / 判题机 / 快速链接
│   │       ├── components/     # 首页视图组件（HomeJudge / HomeSections）
│   │       ├── composables/    # 可复用行为（判题机状态机 / 鼠标特效 / 阅读进度）
│   │       ├── data/           # 静态数据（快速链接清单）
│   │       ├── styles/         # 样式模块（tokens / hero / judge / sections / doc / …）
│   │       └── style.css       # 样式入口（@import 聚合）
│   ├── public/                 # 静态资源（站点图标、链接图标）
│   ├── guide/                  # 入门指北
│   ├── contests/               # 比赛说明
│   ├── studio/                 # 算法组
│   └── index.md                # 首页 hero 文案
├── src/                        # Cloudflare Worker 源码
├── .editorconfig               # 编辑器约定（UTF-8 / LF / 2 空格）
└── package.json
```

## 工程约定

- **单一数据源**：导航下拉与三处侧边栏共用 `config.mts` 顶部的 `navGroups` 常量，
  调整栏目或顺序只改这一处（此前分散在 4 份重复定义里，容易漏改）。
- **样式分层**：`theme/style.css` 只是入口，规则在 `theme/styles/` 的 8 个模块中，
  `@import` 顺序即层叠顺序
  （tokens → hero → judge → sections → doc → motion → responsive → interactions）。
  新增样式请放进对应模块，不要往入口文件里塞规则。
- **视图 / 行为 / 数据分离**：视图在 `components/`，行为在 `composables/`，
  静态数据在 `data/`；单个组件超过约 200 行或内含大段数据时应拆分。
- **设计令牌**：颜色、间距、缓动一律使用 `--hm-*` 令牌（`styles/tokens.css`），
  业务规则里不写裸色值；类名统一 `.hm-` 前缀。
- **可访问性**：装饰性图标用 CSS 伪元素实现（不进入读屏），
  交互元素保留可见 focus 样式；所有动效可被 `prefers-reduced-motion` 关闭。
- **格式**：UTF-8 / LF / 2 空格缩进（见 `.editorconfig`）。

## 首页主题

首页不写正文 Markdown，而是由 `index.md` 的 hero 文案 + `theme/Layout.vue`
注入的四个插槽拼装：

| 插槽 | 内容 | 组件 |
| --- | --- | --- |
| `home-hero-info-before` | 状态胶囊（608 / Algorithm Training Team） | Layout.vue 内联 |
| `home-hero-actions-after` | 终端风格快捷路径（`./guide` 等） | Layout.vue 内联 |
| `home-hero-image` | 「判题机」面板（代码打字 + 提交 → AC + 终端） | `components/HomeJudge.vue` |
| `home-features-after` | 快速链接（四组 59 条，带本地图标）/ CTA | `components/HomeSections.vue` |

几个维护要点：

- 右侧面板**不通过 frontmatter 的 `hero.image` 配置**：VPHero 会检测
  `home-hero-image` 插槽是否存在，存在即启用双栏（`.has-image`）布局。
- 首页样式在 `theme/styles/`（`hero.css` / `judge.css` / `sections.css`），
  `doc.css` 只负责内容页，两者解耦，改首页不会影响内容页。
- 动效只发生在首屏入场与悬停（不做 scroll-driven reveal），
  全部可被 `prefers-reduced-motion` 关闭。
- 快速链接的数据在 `theme/data/quick-links.ts`：增删条目只改该文件；
  图标是**本地打包**的 favicon（`docs/public/icons/`），新增链接时把图标文件
  放进该目录并在数据里登记文件名。
- 「判题机」面板是脚本驱动的小状态机（`theme/composables/use-judge-demo.ts`）：
  三段经典算法逐字打出（长文自动下滚）→ 鼠标点「提交」→ Accepted，循环演示；
  时间线常数在 `use-judge-demo.ts` 顶部（`CHAR_MS` 等），改一处即可调速。

## 内容页主题

内容页（guide / contests / studio）在**不改动任何正文文本**的前提下做了表现层增强：
阅读进度条（`Layout.vue` 注入 `layout-top`）、标题装饰线、链接悬停渐变下划线、
侧边栏/目录/翻页器状态、自定义块（tip / warning）与引用块的绿调重绘、
资源清单（`guide/computer-intro` 的 `.hm-entry`）等。

- 全站品牌色统一为「Accepted 绿」，定义在 `styles/tokens.css` §2 的 `--vp-c-brand-*`；
  侧边栏激活态与目录滑块等由 VitePress 自身的 `var()` 驱动，改品牌变量即可生效。
- 注意：部分 VitePress 组件的状态色带 scoped 属性（`.text[data-v-xxx]`），
  权重很高，直接覆盖很费劲 —— 优先改上游 CSS 变量，其次才考虑提权。
- 从 GitHub 收录的文档依赖「GitHub 兼容」的标题 slug（`config.mts` 的
  `markdown.anchor.slugify`），保证原文自带目录的锚点有效。
