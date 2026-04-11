// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing'; // Sửa: Bỏ 'src/' vì file đã nằm trong src rồi

export default createMiddleware(routing);

export const config = {
  // Chạy middleware trên tất cả các path trừ các file tĩnh và api
  matcher: [
    '/',
    '/(vi|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)' 
  ]
};