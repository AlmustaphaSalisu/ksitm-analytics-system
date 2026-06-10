import type { SystemUser } from '@/types';
import { getStorageItem, setStorageItem, generateId, STORAGE_KEYS } from './storage';

export const UserService = {
  getAll(): SystemUser[] {
    return getStorageItem<SystemUser[]>(STORAGE_KEYS.USERS) ?? [];
  },

  getById(id: string): SystemUser | undefined {
    return this.getAll().find((u) => u.id === id);
  },

  getByRole(role: SystemUser['role']): SystemUser | undefined {
    return this.getAll().find((u) => u.role === role);
  },

  create(item: Omit<SystemUser, 'id'>): SystemUser {
    const users = this.getAll();
    const newUser: SystemUser = { ...item, id: generateId(users) };
    setStorageItem(STORAGE_KEYS.USERS, [...users, newUser]);
    return newUser;
  },

  update(id: string, updatedData: Partial<Omit<SystemUser, 'id'>>): SystemUser | null {
    const users = this.getAll();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    const updated: SystemUser = { ...users[index], ...updatedData };
    const next = [...users];
    next[index] = updated;
    setStorageItem(STORAGE_KEYS.USERS, next);
    return updated;
  },

  delete(id: string): boolean {
    const users = this.getAll();
    const filtered = users.filter((u) => u.id !== id);
    if (filtered.length === users.length) return false;
    setStorageItem(STORAGE_KEYS.USERS, filtered);
    return true;
  },
};
