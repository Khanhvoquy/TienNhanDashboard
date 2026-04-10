import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-primary' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Tu Tiên ITSM Dashboard',
  description: 'Hệ thống quản lý yêu cầu dịch vụ IT theo phong cách Tu Tiên',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${cinzel.variable} font-sans bg-bg-deep text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}