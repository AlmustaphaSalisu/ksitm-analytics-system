import { useState, useCallback } from 'react';
import type { Lecturer } from '@/types';
import { LecturerService } from '@/services/LecturerService';

export function useLecturers() {
  const [lecturers, setLecturers] = useState<Lecturer[]>(() => LecturerService.getAll());

  const refresh = useCallback(() => {
    setLecturers(LecturerService.getAll());
  }, []);

  const addLecturer = useCallback(
    (item: Omit<Lecturer, 'id'>) => {
      LecturerService.create(item);
      refresh();
    },
    [refresh],
  );

  const updateLecturer = useCallback(
    (id: string, updatedData: Partial<Omit<Lecturer, 'id'>>) => {
      const updated = LecturerService.update(id, updatedData);
      refresh();
      return updated;
    },
    [refresh],
  );

  const deleteLecturer = useCallback(
    (id: string) => {
      const deleted = LecturerService.delete(id);
      refresh();
      return deleted;
    },
    [refresh],
  );

  const getLecturerById = useCallback((id: string) => {
    return LecturerService.getById(id);
  }, []);

  return {
    lecturers,
    addLecturer,
    updateLecturer,
    deleteLecturer,
    getLecturerById,
    refresh,
  };
}
