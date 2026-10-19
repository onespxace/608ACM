/**
 * 首页「快速链接」数据（四组 59 条）。
 *
 * 整理自山东理工 ACM 官网（「图标 + 一句话说明」的体例）与 xcpc.link
 * （AWESOME XCPC）的资源清单；图标是本地打包的 favicon
 * （docs/public/icons/，随仓库分发，不依赖外部图床）。
 *
 * 维护：增删条目或调整分组只改本文件；icon 字段对应 icons/ 下的文件名。
 */

export interface QuickLink {
  name: string
  url: string
  /** 一句话说明（参考 SDUT ACM 官网的链接描述体例） */
  desc: string
  /** 本地图标文件名（docs/public/icons/） */
  icon: string
}

export interface LinkGroup {
  /** 组名 */
  title: string
  links: QuickLink[]
}

/** 四组链接：整理自山东理工 ACM 官网与 xcpc.link（AWESOME XCPC）的资源清单 */
export const groups: LinkGroup[] = [
  {
    title: '题库 · 评测平台',
    links: [
      { name: 'Codeforces', url: 'https://codeforces.com', desc: '全球最大算法竞赛平台', icon: 'codeforces.png' },
      { name: 'AtCoder', url: 'https://atcoder.jp', desc: '日本最大竞技编程平台', icon: 'atcoder.png' },
      { name: '洛谷', url: 'https://www.luogu.com.cn', desc: '国内最活跃的中文题库社区', icon: 'luogu.ico' },
      { name: '牛客竞赛', url: 'https://ac.nowcoder.com', desc: '国内赛事与训练营', icon: 'nowcoder.ico' },
      { name: 'QOJ', url: 'https://qoj.ac', desc: 'XCPC 真题复现与练题', icon: 'qoj.svg' },
      { name: 'Universal Cup', url: 'https://ucup.ac', desc: '全球高水平训练赛系列', icon: 'ucup.png' },
      { name: 'VJudge', url: 'https://vjudge.net', desc: '多 OJ 聚合虚拟评测', icon: 'vjudge.ico' },
      { name: 'AcWing', url: 'https://www.acwing.com', desc: '算法学习平台与周赛', icon: 'acwing.ico' },
      { name: 'UOJ', url: 'https://uoj.ac', desc: '开源评测系统社区', icon: 'uoj.ico' },
      { name: 'LibreOJ', url: 'https://loj.ac', desc: '自由开源的评测平台', icon: 'loj.ico' },
      { name: 'CodeChef', url: 'https://www.codechef.com', desc: '印度最大算法竞赛平台', icon: 'codechef.ico' },
      { name: 'Kattis', url: 'https://open.kattis.com', desc: '北欧题库，赛题质量高', icon: 'kattis.ico' },
      { name: 'SPOJ', url: 'https://www.spoj.com', desc: '老牌国际题库', icon: 'spoj.ico' },
      { name: 'PTA', url: 'https://pintia.cn', desc: '天梯赛与教学练习平台', icon: 'pta.ico' },
      { name: 'HDU OJ', url: 'https://acm.hdu.edu.cn', desc: '老牌杭电在线评测', icon: 'hdu.ico' },
      { name: '代码源', url: 'https://oj.daimayuan.top', desc: '新手友好的练习题库', icon: 'daimayuan.ico' },
      { name: '力扣', url: 'https://leetcode.cn', desc: '面试 / 笔试算法题库', icon: 'leetcode.ico' },
      { name: 'Hydro', url: 'https://hydro.ac', desc: '开源在线评测平台', icon: 'hydro.ico' }
    ]
  },
  {
    title: '学习 · 资料宝库',
    links: [
      { name: 'OI Wiki', url: 'https://oi-wiki.org', desc: '中文算法竞赛知识百科', icon: 'oiwiki.ico' },
      { name: 'cp-algorithms', url: 'https://cp-algorithms.com', desc: '英文算法教程经典站点', icon: 'cpalgo.ico' },
      { name: 'USACO Guide', url: 'https://usaco.guide', desc: '体系化竞赛教程，按难度分级', icon: 'usacoguide.png' },
      { name: 'CSES 题集', url: 'https://cses.fi/problemset/', desc: '300 道经典题配套练习', icon: 'cses.png' },
      { name: '算法竞赛手册', url: 'https://cses.fi/book/book.pdf', desc: 'CSES 免费算法书（PDF）', icon: 'cses.png' },
      { name: 'AlgoWiki', url: 'https://www.algowiki.cn', desc: '中文公益竞赛知识库', icon: 'algowiki.svg' },
      { name: 'Algo Bootstrap', url: 'https://ab.algoux.cn', desc: '一键配置竞赛开发环境', icon: 'algobootstrap.ico' },
      { name: 'KACTL', url: 'https://github.com/kth-competitive-programming/kactl', desc: '顶尖队伍的 ICPC 模板库', icon: 'github.svg' },
      { name: 'AtCoder Library', url: 'https://github.com/atcoder/ac-library', desc: '官方算法库与练习题', icon: 'github.svg' },
      { name: 'Library Checker', url: 'https://judge.yosupo.jp', desc: '验证模板正确性的题库', icon: 'librarychecker.ico' },
      { name: 'AtCoder Problems', url: 'https://kenkoooo.com/atcoder/', desc: 'AtCoder 题目与成绩可视化', icon: 'kenkoooo.ico' }
    ]
  },
  {
    title: '工具 · 实用小站',
    links: [
      { name: 'VisuAlgo', url: 'https://visualgo.net/zh', desc: '算法动画可视化', icon: 'visualgo.png' },
      { name: '图论画图', url: 'https://csacademy.com/app/graph_editor/', desc: '画图论题的神器（CS Academy）', icon: 'csacademy.png' },
      { name: 'Another Graph Editor', url: 'https://anacc22.github.io/another_graph_editor/', desc: '更强的图论可视化编辑器', icon: 'anacc22.jpg' },
      { name: 'Desmos', url: 'https://www.desmos.com/calculator?lang=zh-CN', desc: '函数图像计算器', icon: 'desmos.ico' },
      { name: 'GeoGebra', url: 'https://www.geogebra.org/geometry', desc: '2D / 3D 几何画板', icon: 'geogebra.ico' },
      { name: 'OEIS', url: 'https://oeis.org', desc: '整数数列大全', icon: 'oeis.ico' },
      { name: 'WolframAlpha', url: 'https://www.wolframalpha.com', desc: '强大的符号计算引擎', icon: 'wolframalpha.ico' },
      { name: 'FactorDB', url: 'http://factordb.com', desc: '大整数质因子分解', icon: 'factordb.ico' },
      { name: '数字帝国', url: 'https://zh.numberempire.com', desc: '数学工具集合', icon: 'numberempire.png' },
      { name: 'Diffchecker', url: 'https://www.diffchecker.com', desc: '文本差异比对', icon: 'diffchecker.ico' },
      { name: 'Paste then AC', url: 'https://paste.then.ac', desc: '竞赛代码剪贴板', icon: 'pastethenac.ico' },
      { name: 'LaTeX Live', url: 'https://www.latexlive.com', desc: '在线 LaTeX 公式编辑', icon: 'latexlive.png' },
      { name: 'Overleaf', url: 'https://cn.overleaf.com', desc: '在线 LaTeX 协作编辑', icon: 'overleaf.ico' },
      { name: 'DeepL', url: 'https://www.deepl.com/translator', desc: '高质量翻译工具', icon: 'deepl.png' }
    ]
  },
  {
    title: '榜单 · 赛事资讯',
    links: [
      { name: 'XCPCIO 榜单', url: 'https://board.xcpcio.com', desc: 'XCPC 系列赛事榜单汇总', icon: 'xcpcio.svg' },
      { name: 'UCup 榜单', url: 'https://scoreboard.ucup.ac', desc: 'Universal Cup 官方计分板', icon: 'ucupboard.png' },
      { name: 'XCPC Atlas', url: 'https://awdec.github.io/XCPCAtlas/', desc: 'ICPC / CCPC 比赛结果查询', icon: 'xcpcatlas.svg' },
      { name: 'CLIST', url: 'https://clist.by', desc: '全球比赛日历聚合', icon: 'clist.ico' },
      { name: 'xcpc.link', url: 'https://xcpc.link', desc: 'AWESOME XCPC 资源导航', icon: 'xcpclink.svg' },
      { name: 'ICPC', url: 'https://icpc.global', desc: '国际大学生程序设计竞赛', icon: 'icpc.ico' },
      { name: 'ICPC 北京总部', url: 'https://icpc.pku.edu.cn', desc: '区域赛安排与公告', icon: 'icpcpku.svg' },
      { name: 'CCPC', url: 'https://ccpc.io', desc: '中国大学生程序设计竞赛', icon: 'ccpc.png' },
      { name: '蓝桥杯', url: 'https://dasai.lanqiao.cn', desc: '全国软件和信息技术大赛', icon: 'lanqiao.png' },
      { name: '天梯赛', url: 'https://gplt.patest.cn', desc: '团体程序设计天梯赛', icon: 'gplt.ico' },
      { name: 'XCPC Rating', url: 'https://hei-maom.github.io/xcpcrating/', desc: '选手 Rating 查询与可视化', icon: 'xcpcrating.png' },
      { name: 'Algoux', url: 'https://rl.algoux.cn', desc: 'Rating 查询与榜单综合', icon: 'algoux.ico' },
      { name: 'CFTracker', url: 'https://cftracker.netlify.app/contests', desc: 'CF 比赛与题目清单追踪', icon: 'cftracker.ico' },
      { name: 'OIerDb', url: 'https://oier.baoshuo.dev', desc: '选手 OI 经历查询', icon: 'oierdb.ico' },
      { name: 'ACMer.info', url: 'https://acmer.info', desc: '面向竞赛选手的导航站', icon: 'acmer.ico' },
      { name: 'ojhunt', url: 'https://ojhunt.com/statistics', desc: 'OJ 做题统计工具', icon: 'ojhunt.ico' }
    ]
  }
]
