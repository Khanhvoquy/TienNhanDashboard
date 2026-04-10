import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num);
}
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
}
// Deterministic Random Generator (Mock)
export function seededRandom(seed: string) {
  let h = 0xdeadbeef ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 2654435761);
  }
  return function() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h >>> 0) / 4294967296);
  };
}