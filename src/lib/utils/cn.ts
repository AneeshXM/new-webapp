import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  });
}

export function formatTime(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    ...options,
  });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${formatDate(d)} at ${formatTime(d)}`;
}

export function getRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (Math.abs(diffMins) < 60) {
    return diffMins >= 0 ? `in ${diffMins}m` : `${Math.abs(diffMins)}m ago`;
  }
  if (Math.abs(diffHours) < 24) {
    return diffHours >= 0 ? `in ${diffHours}h` : `${Math.abs(diffHours)}h ago`;
  }
  if (Math.abs(diffDays) < 7) {
    return diffDays >= 0 ? `in ${diffDays}d` : `${Math.abs(diffDays)}d ago`;
  }
  return formatDate(d);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'LIVE':
    case 'IN_PLAY':
      return 'text-red-500';
    case 'PAUSED':
      return 'text-yellow-500';
    case 'FINISHED':
    case 'FINISHED_AFTER_EXTRA_TIME':
    case 'FINISHED_AFTER_PENALTIES':
      return 'text-gray-500';
    case 'SCHEDULED':
      return 'text-blue-500';
    default:
      return 'text-gray-400';
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'LIVE':
    case 'IN_PLAY':
      return 'bg-red-500/10 text-red-500 border-red-500/30';
    case 'PAUSED':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
    case 'FINISHED':
    case 'FINISHED_AFTER_EXTRA_TIME':
    case 'FINISHED_AFTER_PENALTIES':
      return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    case 'SCHEDULED':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
}

export function getResultColor(result: 'W' | 'D' | 'L' | string): string {
  switch (result) {
    case 'W':
      return 'text-green-500';
    case 'D':
      return 'text-yellow-500';
    case 'L':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}

export function getPositionColor(position: number): string {
  if (position <= 2) return 'text-fifa-gold';
  if (position <= 4) return 'text-fifa-cyan';
  return 'text-gray-400';
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
