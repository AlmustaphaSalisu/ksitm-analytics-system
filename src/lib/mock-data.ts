// Mock data for the KSITM Analytics Platform

export type UserRole = 'student' | 'lecturer' | 'hod' | 'admin' | 'sysadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export const mockUsers: Record<UserRole, User> = {
  student: { id: '1', name: 'Kabir Rabi\'atu', email: 'kabir.rabi@ksitm.edu.ng', role: 'student', department: 'COM' },
  lecturer: { id: '2', name: 'Dr. Abubakar Ahmad', email: 'abubakar@ksitm.edu.ng', role: 'lecturer', department: 'COM' },
  hod: { id: '3', name: 'Prof. Fatima Abubakar', email: 'fatima@ksitm.edu.ng', role: 'hod', department: 'COM' },
  admin: { id: '4', name: 'Alhaji Sani Bello', email: 'sani@ksitm.edu.ng', role: 'admin' },
  sysadmin: { id: '5', name: 'Kauthar Kabir', email: 'kauthar@ksitm.edu.ng', role: 'sysadmin' },
};

export const roleLabels: Record<UserRole, string> = {
  student: 'Student',
  lecturer: 'Lecturer',
  hod: 'Head of Department',
  admin: 'Academic Administrator',
  sysadmin: 'System Administrator',
};

export const studentPerformance = {
  gpa: 3.45,
  cgpa: 3.32,
  attendance: 87,
  riskLevel: 'low' as const,
  totalCourses: 6,
  completedCredits: 84,
  totalCredits: 120,
  courses: [
    { code: 'CSE101', name: 'Computer System', grade: 'A', score: 82, attendance: 92, status: 'active' },
    { code: 'CSE111', name: 'Introduction to Programming', grade: 'B+', score: 75, attendance: 88, status: 'active' },
    { code: 'CSE121', name: 'Basic Digital System', grade: 'A-', score: 78, attendance: 90, status: 'active' },
    { code: 'CSE131', name: 'Internet and World Wide Web', grade: 'B', score: 68, attendance: 80, status: 'active' },
    { code: 'CSE102', name: 'Data Structure and Algorithm', grade: 'B+', score: 73, attendance: 85, status: 'active' },
    { code: 'ENT201', name: 'Introduction to Entrepreneuship', grade: 'A', score: 85, attendance: 95, status: 'active' },
  ],
  gpaHistory: [
    { semester: '100L S1', gpa: 2.8 },
    { semester: '100L S2', gpa: 3.0 },
    { semester: '200L S1', gpa: 3.1 },
    { semester: '200L S2', gpa: 3.25 },
    { semester: '300L S1', gpa: 3.32 },
    { semester: '300L S2', gpa: 3.45 },
  ],
  aiRecommendations: [
    { type: 'study', message: 'Focus more on CSE131 - your score is below average', priority: 'high' },
    { type: 'resource', message: 'Recommended: MIT OCW CSE121 lectures', priority: 'medium' },
    { type: 'attendance', message: 'Your CSE131 attendance is dropping - attend next 3 classes', priority: 'high' },
    { type: 'strength', message: 'Great performance in CSE102! Consider advanced algorithms', priority: 'low' },
  ],
};

export const lecturerData = {
  totalStudents: 156,
  averageClassScore: 67.5,
  passRate: 78.3,
  atRiskStudents: 12,
  courses: [
    { code: 'CSE101', name: 'Computer System', students: 45, avgScore: 72, passRate: 85, attendance: 88 },
    { code: 'CSE102', name: 'Data Structure and Algorithm', students: 52, avgScore: 65, passRate: 74, attendance: 82 },
    { code: 'CSE201', name: 'Programming Concept', students: 38, avgScore: 70, passRate: 79, attendance: 90 },
    { code: 'CSE111', name: 'Introduction to Programming', students: 21, avgScore: 58, passRate: 65, attendance: 76 },
  ],
  atRiskList: [
    { id: '101', name: 'Kabir Rabi\'atu', course: 'CSE101', score: 35, attendance: 45, risk: 'high' as const },
    { id: '102', name: 'Faruk Aisha Sambo', course: 'CSE102', score: 42, attendance: 55, risk: 'high' as const },
    { id: '103', name: 'Sani Khadija', course: 'CSE111', score: 48, attendance: 60, risk: 'medium' as const },
    { id: '104', name: 'Mustapha Fatima', course: 'CSE201', score: 50, attendance: 68, risk: 'medium' as const },
    { id: '105', name: 'Abubakar Halimatu Sadiq', course: 'CSE101', score: 38, attendance: 50, risk: 'high' as const },
  ],
  performanceTrend: [
    { month: 'Sep', avgScore: 62, attendance: 85 },
    { month: 'Oct', avgScore: 65, attendance: 83 },
    { month: 'Nov', avgScore: 68, attendance: 80 },
    { month: 'Dec', avgScore: 64, attendance: 78 },
    { month: 'Jan', avgScore: 70, attendance: 82 },
    { month: 'Feb', avgScore: 67, attendance: 84 },
  ],
  aiSuggestions: [
    'Consider adding more practical exercises in CSE111 - student engagement is low',
    'CSE102 has a high failure rate - review assessment difficulty',
    'Students respond well to your CSE201 course - consider mentorship program',
  ],
};

export const hodData = {
  totalStudents: 892,
  totalLecturers: 24,
  departmentGpa: 2.98,
  dropoutRate: 4.2,
  atRiskCount: 67,
  courses: 18,
  lecturerPerformance: [
    { name: 'Dr. Abubakar Ahmad', courses: 4, avgScore: 72, rating: 4.5, passRate: 82 },
    { name: 'Lawal Ahmad Al-Hassan', courses: 3, avgScore: 68, rating: 4.2, passRate: 76 },
    { name: 'Aisha Abdulkadiri', courses: 3, avgScore: 75, rating: 4.7, passRate: 88 },
    { name: 'Mohammed Hamza Kankara', courses: 2, avgScore: 60, rating: 3.8, passRate: 68 },
    { name: 'Abdullahi Hassan Dan Ali', courses: 3, avgScore: 65, rating: 4.0, passRate: 72 },
  ],
  courseComparison: [
    { course: 'CSE101', passRate: 85, avgScore: 72, students: 45 },
    { course: 'CSE111', passRate: 74, avgScore: 65, students: 52 },
    { course: 'CSE102', passRate: 79, avgScore: 70, students: 38 },
    { course: 'CSE121', passRate: 65, avgScore: 58, students: 42 },
    { course: 'CSE201', passRate: 88, avgScore: 75, students: 35 },
  ],
  dropoutTrend: [
    { year: '2019', rate: 6.8 },
    { year: '2020', rate: 7.2 },
    { year: '2021', rate: 5.5 },
    { year: '2022', rate: 4.8 },
    { year: '2023', rate: 4.2 },
    { year: '2024', rate: 3.8 },
  ],
};

export const adminData = {
  totalStudents: 5420,
  totalLecturers: 186,
  departments: 12,
  retentionRate: 94.5,
  overallGpa: 3.05,
  dropoutRate: 3.2,
  departmentPerformance: [
    { dept: 'COM', students: 892, gpa: 2.98, passRate: 78, dropout: 4.2 },
    { dept: 'HND-AI', students: 654, gpa: 3.12, passRate: 82, dropout: 3.1 },
    { dept: 'HND-CS', students: 543, gpa: 2.85, passRate: 74, dropout: 5.0 },
    { dept: 'HND-ACC', students: 876, gpa: 3.25, passRate: 85, dropout: 2.8 },
    { dept: 'HND-NCC', students: 432, gpa: 3.15, passRate: 80, dropout: 3.5 },
    { dept: 'HND-CDP', students: 765, gpa: 3.08, passRate: 79, dropout: 3.0 },
  ],
  enrollmentTrend: [
    { year: '2019', students: 4200 },
    { year: '2020', students: 4500 },
    { year: '2021', students: 4800 },
    { year: '2022', students: 5100 },
    { year: '2023', students: 5300 },
    { year: '2024', students: 5420 },
  ],
  aiPredictions: [
    { metric: 'Projected Dropout Rate (2025)', value: '2.9%', trend: 'down' as const },
    { metric: 'Expected Enrollment Growth', value: '+5.2%', trend: 'up' as const },
    { metric: 'Teaching Quality Index', value: '4.1/5.0', trend: 'up' as const },
    { metric: 'Student Satisfaction', value: '78%', trend: 'up' as const },
  ],
};

export const sysadminData = {
  systemHealth: 98.5,
  activeUsers: 3240,
  apiRequests: 45600,
  errorRate: 0.3,
  uptime: '99.97%',
  storageUsed: 67,
  users: [
    { id: '1', name: 'Kabir Rabi\'atu', email: 'kabir.rabi@ksitm.edu.ng', role: 'student' as const, status: 'active', lastLogin: '2024-01-15' },
    { id: '2', name: 'Dr. Abubakar Ahmad', email: 'abubakar@ksitm.edu.ng', role: 'lecturer' as const, status: 'active', lastLogin: '2024-01-15' },
    { id: '3', name: 'Prof. Fatima Abubakar', email: 'fatima@ksitm.edu.ng', role: 'hod' as const, status: 'active', lastLogin: '2024-01-14' },
    { id: '4', name: 'Alhaji Sani Bello', email: 'sani@ksitm.edu.ng', role: 'admin' as const, status: 'active', lastLogin: '2024-01-15' },
    { id: '5', name: 'Kauthar Kabir', email: 'kauthar@ksitm.edu.ng', role: 'sysadmin' as const, status: 'active', lastLogin: '2024-01-15' },
    { id: '6', name: 'Faruk Aisha Sambo', email: 'faruk.aisha@ksitm.edu.ng', role: 'student' as const, status: 'inactive', lastLogin: '2024-01-10' },
  ],
  logs: [
    { time: '14:32:05', level: 'info', message: 'User login: amina@ksitm.edu.ng', source: 'auth' },
    { time: '14:31:22', level: 'warning', message: 'High API response time: /ai/predictions (2.3s)', source: 'api' },
    { time: '14:30:15', level: 'info', message: 'Backup completed successfully', source: 'system' },
    { time: '14:28:44', level: 'error', message: 'Failed to send notification: timeout', source: 'notifications' },
    { time: '14:25:33', level: 'info', message: 'AI model retrained with latest data', source: 'ai-engine' },
    { time: '14:20:10', level: 'info', message: 'Database optimization completed', source: 'database' },
  ],
  serverMetrics: [
    { time: '12:00', cpu: 45, memory: 62, requests: 1200 },
    { time: '13:00', cpu: 52, memory: 65, requests: 1500 },
    { time: '14:00', cpu: 48, memory: 63, requests: 1350 },
    { time: '15:00', cpu: 55, memory: 68, requests: 1800 },
    { time: '16:00', cpu: 60, memory: 70, requests: 2100 },
    { time: '17:00', cpu: 42, memory: 60, requests: 900 },
  ],
};

export const notifications = [
  { id: '1', title: 'Low Attendance Warning', message: 'Your CSE131 attendance is below 80%', type: 'warning' as const, time: '2h ago', read: false },
  { id: '2', title: 'Grade Posted', message: 'CSE101 Assignment 3 grade has been posted', type: 'info' as const, time: '5h ago', read: false },
  { id: '3', title: 'AI Recommendation', message: 'New study resources recommended for you', type: 'success' as const, time: '1d ago', read: true },
  { id: '4', title: 'Exam Schedule', message: 'Mid-semester exams start in 2 weeks', type: 'info' as const, time: '2d ago', read: true },
];
