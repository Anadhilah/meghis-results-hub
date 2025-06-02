
export interface Department {
  id: string;
  name: string;
  description: string;
  programs: Program[];
}

export interface Program {
  id: string;
  name: string;
  departmentId: string;
  description: string;
}

export interface ClassLevel {
  id: string;
  form: 'Form 1' | 'Form 2' | 'Form 3';
  track: string; // e.g., "Science A", "Arts B", "Business C"
  departmentId: string;
  programId: string;
  capacity: number;
  currentEnrollment: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  type: 'core' | 'elective';
  description: string;
  assignedClasses: string[]; // ClassLevel IDs
  teacherId?: string;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  departmentId: string;
  programId: string;
  classId: string;
  form: 'Form 1' | 'Form 2' | 'Form 3';
  profilePhoto?: string;
}

export interface GradeScale {
  id: string;
  grade: string;
  minScore: number;
  maxScore: number;
  points: number;
  remark: string;
}

export interface GradingSystem {
  id: string;
  name: string;
  description: string;
  gradeScale: GradeScale[];
  isDefault: boolean;
}

export interface Result {
  id: string;
  studentId: string;
  subjectId: string;
  classId: string;
  semester: string;
  score: number;
  grade: string;
  points: number;
  remarks: string;
  teacherId: string;
  uploadedAt: string;
}

export interface BulkUpload {
  id: string;
  fileName: string;
  classId: string;
  subjectId: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  totalRecords: number;
  processedRecords: number;
  errors: string[];
}

export type AdminRole = 'super_admin' | 'academic_admin' | 'department_head' | 'teacher';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  departmentId?: string; // For department heads
  assignedSubjects?: string[]; // For teachers
  permissions: AdminPermission[];
}

export interface AdminPermission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}
