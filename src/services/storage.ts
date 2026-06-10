export const STORAGE_KEYS = {
  STUDENTS: 'students',
  LECTURERS: 'lecturers',
  USERS: 'users',
  AUTH_USER: 'auth_user',
  APP_SETTINGS: 'app_settings',
} as const;

export function getStorageItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(key);
}

export function generateId(items: { id: string }[]): string {
  const maxId = items.reduce((max, item) => {
    const num = parseInt(item.id, 10);
    return Number.isNaN(num) ? max : Math.max(max, num);
  }, 0);
  return String(maxId + 1);
}
