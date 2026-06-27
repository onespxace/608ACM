/**
 * 608ACM — Cloudflare Workers 路由 Worker
 *
 * VitePress 配置了 base: '/608ACM/'，所有资源路径为 /608ACM/...
 * 但 Cloudflare Workers 静态资源挂载在根路径 /。
 * 此 Worker 将 /608ACM/* 的请求映射到 assets 根目录。
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const { pathname } = url

    // /608ACM/... → 去掉前缀，从 assets 根目录加载
    if (pathname.startsWith('/608ACM/')) {
      const newPath = pathname.slice(7) // 去掉 '/608ACM'
      url.pathname = newPath || '/'
      return env.ASSETS.fetch(new Request(url, request))
    }

    // /608ACM（无尾斜杠）→ 加斜杠
    if (pathname === '/608ACM') {
      return Response.redirect(`${url.origin}/608ACM/`, 301)
    }

    // 根路径 → 重定向到 /608ACM/
    if (pathname === '/') {
      return Response.redirect(`${url.origin}/608ACM/`, 302)
    }

    // 其他路径（如 /assets/...）→ 直接由 assets 处理
    return env.ASSETS.fetch(request)
  }
}
