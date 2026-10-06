import { NextResponse, type NextRequest } from "next/server";

/*
 * Enrutado de idiomas (Next 16: proxy.ts reemplaza a middleware.ts).
 * - Español sin prefijo:  /proyectos/      → se sirve desde /es/proyectos/
 * - Inglés con prefijo:   /en/proyectos/
 * - /es/... redirige a la versión sin prefijo para no duplicar contenido.
 * Va en la raíz del proyecto porque app/ está en la raíz (no en src/).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Todo menos API, internos de Next y archivos con extensión (sitemap.xml, robots.txt, imágenes).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
