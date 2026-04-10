import { redirect } from 'next/navigation';

export default function RootPage() {
  // Chuyển hướng mặc định vào trang tiếng Việt
  redirect('/vi/dashboard');
}