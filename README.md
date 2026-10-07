# 608ACM

软件设计创新工作室 —— 算法小组非官方网

由某科学的不知名人维护，个人项目不能代表工作室

## 技术栈

- [VitePress](https://vitepress.dev/) — 基于 Vite 的静态站点生成器
- TypeScript
- 部署于 Cloudflare Workers

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
├── docs/                   # 文档源文件
│   ├── .vitepress/         # VitePress 配置与主题
│   │   ├── config.mts      # 站点配置（导航、侧边栏等）
│   │   └── theme/          # 自定义主题
│   ├── guide/              # 入门指北
│   ├── contests/           # 比赛说明
│   ├── studio/             # 软件设计创新工作室
│   └── index.md            # 首页
├── src/                    # Cloudflare Worker 源码
├── study/                  # 学习资料
└── package.json
```

## 首页主题（v2 ·「判题机」）

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
- 所有首页样式集中在 `theme/style.css` 的 `--hm-*` 令牌与 `.hm-*` 类名下，
  `§11 内容页` 与首页解耦，改首页不会影响内容页。
- 动效只发生在首屏入场与悬停（不做 scroll-driven reveal），
  全部可被 `prefers-reduced-motion` 关闭。
- 快速链接的站点图标是**本地打包**的 favicon（`docs/public/icons/`），
  新增链接时把图标文件放进该目录，并在 `HomeSections.vue` 的 `groups` 登记文件名。
- 「判题机」面板（`HomeJudge.vue`）是脚本驱动的小状态机：三段经典算法
  逐字打出（长文自动下滚）→ 鼠标点「提交」→ Accepted，循环演示；
  时间线常数在组件脚本顶部（`CHAR_MS` 等），改一处即可调速。

## 内容页主题（v2 增补）

内容页（guide / contests / studio）在**不改动任何正文文本**的前提下做了表现层增强：
阅读进度条（`Layout.vue` 注入 `layout-top`）、标题装饰线、链接悬停渐变下划线、
侧边栏/目录/翻页器状态、自定义块（tip / warning）与引用块的绿调重绘等。

- 全站品牌色统一为「Accepted 绿」，定义在 `style.css` §2 的 `--vp-c-brand-*`；
  侧边栏激活态与目录滑块等由 VitePress 自身的 `var()` 驱动，改品牌变量即可生效。
- 注意：部分 VitePress 组件的状态色带 scoped 属性（`.text[data-v-xxx]`），
  权重很高，直接覆盖很费劲 —— 优先改上游 CSS 变量，其次才考虑提权。


