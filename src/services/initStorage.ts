import { getStorageItem, setStorageItem, STORAGE_KEYS } from './storage';
import { SEED_STUDENTS, SEED_LECTURERS, SEED_USERS } from './seedData';
import type { Student, Lecturer, SystemUser } from '@/types';

export function initializeStorage(): void {
  if (!getStorageItem<Student[]>(STORAGE_KEYS.STUDENTS)) {
    setStorageItem(STORAGE_KEYS.STUDENTS, SEED_STUDENTS);
  }

  if (!getStorageItem<Lecturer[]>(STORAGE_KEYS.LECTURERS)) {
    setStorageItem(STORAGE_KEYS.LECTURERS, SEED_LECTURERS);
  }

  if (!getStorageItem<SystemUser[]>(STORAGE_KEYS.USERS)) {
    setStorageItem(STORAGE_KEYS.USERS, SEED_USERS);
  }

  const settings = getStorageItem<{ seeded: boolean }>(STORAGE_KEYS.APP_SETTINGS);
  if (!settings) {
    setStorageItem(STORAGE_KEYS.APP_SETTINGS, { seeded: true });
  }
}
