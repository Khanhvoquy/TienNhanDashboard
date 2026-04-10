import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num);
}
export function safeJsonParse<T>(str: string | null, fallback: T): T {
  if (!str) return fallback;
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}