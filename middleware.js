/* 
    @formatjs/intl-localematcher库的match函数能帮忙匹配出最合适的语言
*/
import { match } from "@formatjs/intl-localematcher";

/* 
Negotiator这个库，将请求作为参数传给Negotiator构造函数,
就可以通过new Negotiator(request).languages()快速获取支持的语言,
比如请求的accept-language为`'en;q=0.8, es, pt'，
new Negotiator(request).languages()`  的值为 `['es', 'pt', 'en']`。
*/
import Negotiator from "negotiator";
import { locales, defaultLocale } from "@/config.js";

function getLocale(request) {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // 判断请求路径中是否已存在语言，已存在语言则跳过
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 获取匹配的 locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // 重定向，如 /products 重定向到 /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
