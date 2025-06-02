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
  email?: string;
  phone?: string;
  parentEmail?: string;
  parentPhone?: string;
  departmentId: string;
  programId: string;
  classId: string;
  form: 'Form 1' | 'Form 2' | 'Form 3';
  profilePhoto?: string;
  dateOfBirth?: string;
  address?: string;
  guardianName?: string;
  admissionDate: string;
  status: 'active' | 'suspended' | 'graduated' | 'transferred';
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

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'result_published' | 'general' | 'urgent' | 'event';
  recipientType: 'all_students' | 'specific_class' | 'specific_student' | 'parents';
  recipientIds?: string[];
  classIds?: string[];
  createdBy: string;
  createdAt: string;
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  deliveryMethods: ('email' | 'sms' | 'in_app')[];
}

export interface Analytics {
  id: string;
  type: 'class_performance' | 'subject_performance' | 'student_performance' | 'department_performance';
  period: string;
  data: Record<string, any>;
  generatedAt: string;
  generatedBy: string;
}

export interface ResultPublication {
  id: string;
  classId: string;
  semester: string;
  publishedBy: string;
  publishedAt: string;
  notificationSent: boolean;
  studentsNotified: string[];
  status: 'published' | 'unpublished';
}
