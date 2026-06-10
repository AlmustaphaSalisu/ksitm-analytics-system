import type { Lecturer } from '@/types';
import { getStorageItem, setStorageItem, generateId, STORAGE_KEYS } from './storage';

export const LecturerService = {
  getAll(): Lecturer[] {
    return getStorageItem<Lecturer[]>(STORAGE_KEYS.LECTURERS) ?? [];
  },

  getById(id: string): Lecturer | undefined {
    return this.getAll().find((l) => l.id === id);
  },

  create(item: Omit<Lecturer, 'id'>): Lecturer {
    const lecturers = this.getAll();
    const newLecturer: Lecturer = { ...item, id: generateId(lecturers) };
    setStorageItem(STORAGE_KEYS.LECTURERS, [...lecturers, newLecturer]);
    return newLecturer;
  },

  update(id: string, updatedData: Partial<Omit<Lecturer, 'id'>>): Lecturer | null {
    const lecturers = this.getAll();
    const index = lecturers.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const updated: Lecturer = { ...lecturers[index], ...updatedData };
    const next = [...lecturers];
    next[index] = updated;
    setStorageItem(STORAGE_KEYS.LECTURERS, next);
    return updated;
  },

  delete(id: string): boolean {
    const lecturers = this.getAll();
    const filtered = lecturers.filter((l) => l.id !== id);
    if (filtered.length === lecturers.length) return false;
    setStorageItem(STORAGE_KEYS.LECTURERS, filtered);
    return true;
  },
};
