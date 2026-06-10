import { useState, useCallback } from 'react';
import type { SystemUser } from '@/types';
import { UserService } from '@/services/UserService';

export function useUsers() {
  const [users, setUsers] = useState<SystemUser[]>(() => UserService.getAll());

  const refresh = useCallback(() => {
    setUsers(UserService.getAll());
  }, []);

  const addUser = useCallback(
    (item: Omit<SystemUser, 'id'>) => {
      UserService.create(item);
      refresh();
    },
    [refresh],
  );

  const updateUser = useCallback(
    (id: string, updatedData: Partial<Omit<SystemUser, 'id'>>) => {
      const updated = UserService.update(id, updatedData);
      refresh();
      return updated;
    },
    [refresh],
  );

  const deleteUser = useCallback(
    (id: string) => {
      const deleted = UserService.delete(id);
      refresh();
      return deleted;
    },
    [refresh],
  );

  const getUserById = useCallback((id: string) => {
    return UserService.getById(id);
  }, []);

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    refresh,
  };
}
