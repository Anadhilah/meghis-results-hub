
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
