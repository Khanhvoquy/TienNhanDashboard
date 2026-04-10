import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { Negotiator } from 'negotiator';
export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const headerStore = headers();
  let locale = 'vi'; // Default
  // Priority: Cookie > Header > Default
  const cookieLang = cookieStore.get('NEXT_LOCALE')?.value;
  if (cookieLang && ['vi', 'en'].includes(cookieLang)) {
    locale = cookieLang;
  } else {
    const acceptLanguage = headerStore.get('accept-language');
    if (acceptLanguage) {
      const negotiator = new Negotiator({ headers: { 'accept-language': acceptLanguage } });
      const preferred = negotiator.language(['vi', 'en']);
      if (preferred) locale = preferred;
    }
  }
  return {
    locale,
    messages: (await import(./messages/${locale}.json)).default,
  };
});