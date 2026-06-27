# 算法竞赛入门指北

::: tip 说明
原文来自于 [cczuacm.cn](https://cczuacm.cn/)，做了本土化适应（就改了一点点）。
:::

## 前言

首先明确你学算法的需求，从易到难大致分为以下三种：

1. **应付小厂面试就行**，考研数据结构无所谓的。
2. **手撕中大厂算法**，在蓝桥杯、天梯赛等算法比赛获得国奖，考研希望数据结构获得不错的分数。
3. **打 ICPC、CCPC 等算竞比赛**，公费旅游，进入大厂，考研复试加分，成为 608 荣光。

> 其实没有 ACM 这个比赛，只是因为 ICPC 以前是 ACM 赞助的，很多人就直接叫 ACM，但赞助商已经换成 JB 了（就是出 IntelliJ IDEA、CLion 的公司）。
>
> **ICPC、CCPC 是含金量最高的算法比赛。**

如果你的需求是 1，那就没必要向下看了，因为小厂有的连算法都不会考的，把大二的数据结构课学学就可以。

::: warning 注意
参加需求 3 类型比赛的前提是**进入工作室**。
:::

## 基本概念

主要的算竞比赛有以下几种：

### OI

**OI**（Olympiad in Informatics，信息学奥林匹克竞赛）在中国起源于 1984 年，是五大高中学科竞赛之一。

> CSP、NOIP 和 NOI 这类中学生打的就不多提了。

### ICPC

**ICPC**（International Collegiate Programming Contest，国际大学生程序设计竞赛）由 ICPC 基金会举办，是最具影响力的大学生计算机竞赛。由于以前 ACM 赞助这个竞赛，也有很多人习惯叫它 ACM 竞赛。每年有两次网络赛，多场区域赛，一场亚洲区域赛（EC Final），一场世界决赛（World Finals）。

### CCPC

**CCPC**（China Collegiate Programming Contest，中国大学生程序设计竞赛）是由教育部高等学校计算机类专业教学指导委员会主办的面向全国高校大学生的年度学科竞赛。每年会有一次网络赛，多场分站赛，一场总决赛。同时还有多场邀请赛、女生专场和高职专场赛。

> CCPC 和 ICPC 类似，就一起介绍。每年的网络赛在 8、9 月，打得好就会给你去区域赛（分站赛）的名额。如果学校没打出名额，分站赛有时候主办方也会施舍一点名额，比如南京站给省内大学都发了一个名额。
>
> 然后你来到了区域赛，每年会有很多个站，比如去年 ICPC 就有杭州站、南京站、西安站等。只要在某一站打得比较好，就有去打亚洲区域赛的资格（EC Final）。如果你能拿到金牌区，那就可能直接保送世界决赛（World Final）。CCPC 的分站赛、决赛和这个差不多。

### 其他 CPC

其他 CPC（如 JSCPC、ZJCPC）是各个省份自己举办的省赛。

- **oier** 指的是信息学奥林匹克竞赛选手。
- **acmer** 指的是参加 XCPC 系列比赛的选手。

### 常见赛事一览

- [蓝桥杯大赛](https://dasai.lanqiao.cn/)（圈钱杯大赛，300 的报名费毁了我的算法梦）。题目不算简单，但由于分了 abc 组，加上参加的人非常多，给奖的比例也很高，所以比较容易得奖。学校也愿意爆米。比较推荐新生打这个。
- [团体程序设计天梯赛](https://gplt.patest.cn/regulation)：基本模拟、暴力、阅读理解。国三不难，爆的米也还行。参加需要先通过选拔。是 1 级竞赛。
- [百度之星](https://astar2019.baidu.com/design.html)：今年打了一场，4 题省二中游。手速 4 题可以省一，难度大概介于蓝桥杯和 XCPC 之间。题目质量还可以，但对算法基础要求比较高。是 1 级竞赛。
- **河南省大学生程序设计竞赛**：省级竞赛，XCPC 的入门级难度，每年 5/6 月举办。自费的话名额是充足的，最多 6 队 + 1 女队。
- **CCPC、ICPC 邀请赛**：不属于 1 级竞赛，但也是国赛级别，难度略小于区域赛，每年春季举行，需要抢名额，基本完全自费。
- **CCPC、ICPC 区域赛**：不多提，进工作室再说。

## 付出与回报

### 付出

如果你想 all in 四年算竞，我很不推荐。如果你是为了功利性的目的，其实打其他比赛的性价比也许更高。**ACM 是极高风险高回报的事。**

如果你想 all in，你可以看看以下条件（分先后）：

1. 有两个好队友。
2. 极佳的天赋。
3. 中学有过 OI 经历。
4. 坚持每天高强度训练，打各种平台的周赛（凌晨爬起来打 CF 都是很常见的事）。

现在 ACM 都是 oier 的天下，零基础想拿金，几乎是不可能的事情。哪怕强如 HDU 的学校，在最近几年也再也没出过零基础的 WF 队。

不过如果你的目标是拿铜拿银，努力 1、2 年还是可以做到的。

### 回报

🤣 先说个最幻想的：如果你能打进 WF（**World Finals**，即 **ICPC 全球总决赛**），608ACM 荣光崛起，暴打通大、苏科大、江科大等。各种大厂求着你去，哪怕你去个算竞教培卖课，都是顶级的存在。

不过幻想总归是幻想，回到现实，主要能获得以下几点：

- 💪 强大的码力，手搓红黑树不是梦。
- 🧠 更敏捷灵活的思维。
- 💼 过大厂面试。
- 📚 考研复试加分。
- 🤩 轻松暴打数据结构、C 语言等课程。
- 🥳 打各种比赛拿奖，爆学校的金币。
- 😢 不好的代码习惯，比如开全局变量，变量名 aaa、bbb。
- 😭 四级不过，课程挂科。

### 杂谈

虽然 ACM 能帮助你通过各种算法应试，成为大厂敲门砖、考研复试加分项。但不可否认的是，这是一项耗费**极大精力**的比赛，零基础的情况下，至少需要**经过一年**的**高强度**训练，才有铜牌的可能性。

当然大学计算机类的比赛还有很多，数学建模、网络安全、机甲大师等。每个人的天赋、志趣不同，你也可以尝试其他方向。想要了解可以参考[此表](https://docs.qq.com/sheet/DRmRuYkxmZHdzeHJI?tab=BB08J2)。

如果你对未来总体还是迷茫，也不妨试试 ACM —— 只需要一台电脑、一点语言基础，就可以体验算法的乐趣。

## 刷题网站

### 求职 & 普通竞赛向

| 平台 | 简介 |
| --- | --- |
| 🥳 [力扣 LeetCode](https://leetcode.cn/) | 求职必备，刷刷 Hot100 就够应付大部分面试。有周赛和双周赛，竞赛积分打到 1800 以上拿 Knight 牌，面试基本没问题。 |
| [蓝桥云课](https://www.lanqiao.cn/cup/) | 蓝桥官方 OJ，有往年题目，每两周有双周赛（奖金很多）。打蓝桥杯考前刷这个就对了。 |
| [团体程序设计天梯赛练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) | PTA 的真题，题目不多，打 PTA 考前临时练一下。 |

### XCPC 向

| 平台 | 简介 |
| --- | --- |
| 🥳 [洛谷](https://www.luogu.com.cn/) | OI 爷的主场，题解质量参差不齐。洛谷月赛质量不错。 |
| 🥳 [Codeforces](https://mirror.codeforces.com/) | 世界上最大的刷题网站，比赛分 div1~4，思维题较多。Gym 里有各地区域赛、网络赛、省赛题目。作息比较阴间，常在凌晨。 |
| 🥳 [AtCoder](https://atcoder.jp/) | 日本的刷题网站，ABC 对新人友好，知识点考察全面。 |
| 🥳 [牛客竞赛](https://ac.nowcoder.com/) | 周赛越办越好，有小白月赛、练习赛、挑战赛。牛客多校非常适合 acmer 练习。 |
| [HDU](https://acm.hdu.edu.cn/) | 杭电的 OJ，典题可以在这写，寒暑假也有多校训练。 |
| [ACGO 竞赛](https://www.acgo.cn/contest) | 培训机构的 OJ，容易打到比赛奖品，可以去图一乐。 |

## 学习资源

::: tip 省流
打 XCPC 必备 C++。想走 Java 就去看代码随想录 / AcWing 刷力扣。
:::

### 线上免费

- 🥳 [代码随想录](https://programmercarl.com)：带我入门的网站，卡哥的教程不错，免费，B 站还有配套视频。[B 站地址](https://space.bilibili.com/525438321)。
- [算法大师兄（英雄哥）](https://space.bilibili.com/1784235102)：视频偏娱乐，CSDN「夜深人静写算法」收费专栏质量很高（英雄哥是 HDU 第一届打入 WorldFinal 的）。[B 站大号](https://space.bilibili.com/319521269)。
- 🥳 [灵茶山艾府](https://space.bilibili.com/206214)：我灵伟大，🖐️需多言。打力扣必看灵神！
- 🥳 [董晓算法](https://space.bilibili.com/517494241)：视频更了好几年，图解清晰。不理解线段树、树状数组、平衡树可以看这个。
- 🥳 [NotOnlySuccess](https://space.bilibili.com/3546647317448859)：可视化做得不错，讲得也挺原理。
- [左程云](https://space.bilibili.com/8888480)：讲的视频也不错。
- [今天你学废了么](https://space.bilibili.com/3461575069403560)：教得也挺全，适合 oier 爷看。

**比赛讲解向：**

- [RegenFallen](https://space.bilibili.com/23358007)：小码王教练，CF/ATC 简单题题解，容易理解。
- [幻想家协会会长](https://space.bilibili.com/55927668)：讲 CF/ATC 较难的题，最近搬运 ATC 的 4 分钟题解。

**比赛实况向：**

- [jiangly](https://space.bilibili.com/130648068)：世界第一的含金量，🖐️需多盐。
- [小羊肖恩 Yawn_Sean](https://space.bilibili.com/193004900)：羊神，常年霸占力扣前几，出力扣比赛实况。

### 线上付费

- [labuladong 的算法笔记](https://labuladong.online/algo/home/)：和代码随想录类似，做了代码可视化插件。[B 站地址](https://space.bilibili.com/14089380)。
- [英雄哥的专栏](https://blog.csdn.net/whereisherofrom/category_9273531.html)：**999.98 元**，慎入。
- 🥳 [AcWing](https://www.acwing.com/activity/)：算法基础课不错，**200 元**售价。

### 辅助工具

- [VisuAlgo](https://visualgo.net/zh)：通过动画可视化数据结构和算法。
- 🥳 [OI Wiki](https://oi-wiki.org/)：算法界的百科全书。
- 🥳 [cp-algorithms.com](https://cp-algorithms.com/index.html)：英文网站，算法原理讲得很好，比如 KMP 的文章是我见过最好的。

### 实体书籍

实体书籍的代码基本是 C++ 撰写。

- 🥳 [《算法竞赛》（清华大学出版社）](http://www.tup.tsinghua.edu.cn/booksCenter/book_08808001.html)：白皮书，罗勇军写的，知识点非常全面，**十分推荐**。
- [《算法导论》（麻省理工学院出版社）](https://baike.baidu.com/item/算法导论/1775186)：黑皮书，数学论证较多，难度很大，**慎入**。
- 《深入浅出程序设计竞赛 - 基础篇》（洛谷）：质量不错，十分基础，适合初学者。
- 《算法竞赛入门经典》—— 刘汝佳：紫书，ACM 选修课用书。
- 🥳 《算法竞赛进阶指南》—— 李煜东：相当于一本刷题指南，有一定上手难度。

## 编程环境

::: tip 必看网站
先看 [cczuacm.cn](https://cczuacm.cn/)（导航站 [xcpc.link](https://xcpc.link/)）。
:::

### 课程推荐

免费讲基础语法的课程（选适合自己的）：

- 🎬 [基础语法课（B 站）](https://www.bilibili.com/video/BV1Wx2TBrEEp/)：基础语法看完还要补充常用 STL，并在后续学习中持续补充。

### 打蓝桥

- 🎬 [蓝桥杯学会暴力，稳拿省一](https://www.bilibili.com/video/BV1Qe411J7zc/)：里面还有洛谷的题单。

### IDE

| IDE | 评价 |
| --- | --- |
| [小熊猫 C++](http://royqh.net/redpandacpp/) | 下载即用，适合中国宝宝体质，轻量级。 |
| [VS Code](https://code.visualstudio.com/) | 搭配 CPH 插件十分好用，需自己配环境，推荐配 WSL。 |
| Dev-C++ | 很多比赛提供的就是这个，不会配环境就用它。 |
| CLion | debug 十分方便，改编译设置需要点基础。 |

> 想了解各种 IDE 可看 [OI Wiki 的编辑器介绍](https://oi-wiki.org/tools/editor/)。

### 插件

**VS Code 插件：**

- 🥳 **CPH Judge**：更方便测试样例。搭配 [Competitive Companion](https://github.com/jmerle/competitive-companion) 一键把题目用例拉取到 VS Code。

**浏览器插件：**

- 🥳 [Codeforces Better](https://chromewebstore.google.com/detail/codeforces-better-comment/dmkcpaljgkhdcachgfmplaoldejhafgn)、[AtCoder Better](https://greasyfork.org/en/scripts/471106-atcoder-better)：页面翻译、题目翻译。
- 🥳 [力扣插件 Refined LeetCode](https://github.com/XYShaoKang/refined-leetcode)：实时预测周赛分、黑名单等功能。

**安卓 / Windows 应用：**

- 🥳 [OJHelper](https://github.com/2754LM/oj_helper)：查询各大 OJ 近期比赛，获取你的 Rating 和题量。
- 🥳 [CodeforcesContestHelper](https://github.com/CodeforcesContestHelper/CCHv2)：功能很多，Codeforces 相关。

### 笔记工具

- 📓 **Obsidian**：笔记用，本地、免费、Markdown。

## 常用 STL 速查

### STL 容器（S 级·常用）

`vector` · `string` · `pair` · `queue` · `priority_queue` · `set` · `map` · `unordered_map` · `deque` · `stack` · `unordered_set` · `array`

### STL 算法（S 级·常用）

`sort` · `lower_bound` / `upper_bound` · `binary_search` · `reverse` · `unique` · `max_element` / `min_element` · `find` · `count`

### Math 数学函数（S 级）

`abs` · `sqrt` · `pow` · `floor` · `ceil`
