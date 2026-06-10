import type { Student } from '@/types';
import { getStorageItem, setStorageItem, generateId, STORAGE_KEYS } from './storage';

export const StudentService = {
  getAll(): Student[] {
    return getStorageItem<Student[]>(STORAGE_KEYS.STUDENTS) ?? [];
  },

  getById(id: string): Student | undefined {
    return this.getAll().find((s) => s.id === id);
  },

  create(item: Omit<Student, 'id'>): Student {
    const students = this.getAll();
    const newStudent: Student = { ...item, id: generateId(students) };
    setStorageItem(STORAGE_KEYS.STUDENTS, [...students, newStudent]);
    return newStudent;
  },

  update(id: string, updatedData: Partial<Omit<Student, 'id'>>): Student | null {
    const students = this.getAll();
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const updated: Student = { ...students[index], ...updatedData };
    const next = [...students];
    next[index] = updated;
    setStorageItem(STORAGE_KEYS.STUDENTS, next);
    return updated;
  },

  delete(id: string): boolean {
    const students = this.getAll();
    const filtered = students.filter((s) => s.id !== id);
    if (filtered.length === students.length) return false;
    setStorageItem(STORAGE_KEYS.STUDENTS, filtered);
    return true;
  },
};
