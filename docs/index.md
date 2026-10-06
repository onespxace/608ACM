---
# 首页：完全自定义。
# 结构 = frontmatter 的 hero 文案 + theme/Layout.vue 注入的四个插槽：
#   home-hero-info-before   → 顶部状态胶囊
#   home-hero-actions-after → 终端风格快捷路径
#   home-hero-image         → 右侧「评测机」面板（不设 image 字段，靠插槽触发 has-image 布局）
#   home-features-after     → 数据带 / 板块地图 / 进阶阶梯 / CTA
layout: home

hero:
  name: '608ACM<span class="hm-caret" aria-hidden="true"></span>'
  text: '软件设计创新工作室 · 算法组'
  tagline: '从第一行 C++ 到 XCPC 领奖台：入门指北、赛事解读、训练资源，还有一路同行的队友。'
  actions:
    - theme: brand
      text: 开始入门
      link: /guide/
    - theme: alt
      text: 下半年比赛
      link: /contests/icpc
---
