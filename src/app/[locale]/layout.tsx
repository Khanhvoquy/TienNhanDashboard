import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { TuTienBackground } from '@/components/cultivation/TuTienBackground';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Background 3D cố định toàn cục */}
      <TuTienBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}