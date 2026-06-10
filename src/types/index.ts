import type { UserRole } from '@/lib/mock-data';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  level: string;
  gpa: number;
  attendance: number;
  status: 'active' | 'warning' | 'inactive';
}

export interface Lecturer {
  id: string;
  name: string;
  email: string;
  department: string;
  courses: number;
  avgScore: number;
  rating: number;
  passRate: number;
  status: 'active' | 'inactive';
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  permissions?: string[];
}
