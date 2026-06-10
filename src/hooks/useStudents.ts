import { useState, useCallback } from 'react';
import type { Student } from '@/types';
import { StudentService } from '@/services/StudentService';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(() => StudentService.getAll());

  const refresh = useCallback(() => {
    setStudents(StudentService.getAll());
  }, []);

  const addStudent = useCallback(
    (item: Omit<Student, 'id'>) => {
      StudentService.create(item);
      refresh();
    },
    [refresh],
  );

  const updateStudent = useCallback(
    (id: string, updatedData: Partial<Omit<Student, 'id'>>) => {
      const updated = StudentService.update(id, updatedData);
      refresh();
      return updated;
    },
    [refresh],
  );

  const deleteStudent = useCallback(
    (id: string) => {
      const deleted = StudentService.delete(id);
      refresh();
      return deleted;
    },
    [refresh],
  );

  const getStudentById = useCallback((id: string) => {
    return StudentService.getById(id);
  }, []);

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    refresh,
  };
}
