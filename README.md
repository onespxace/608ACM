# 608ACM

郑州工商学院 · 软件设计创新工作室 —— 算法小猪们的官网

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
