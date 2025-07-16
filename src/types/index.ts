
export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
  department: string;
  avatar?: string;
  permissions: string[];
}

export enum EmployeeType {
  Regular = 'Regular',
  Outsourced = 'Outsourced',
  Contractual = 'Contractual',
  Intern = 'Intern'
}

export enum EmployeeStatus {
  Probation = 'Probation',
  Confirmed = 'Confirmed',
  Exited = 'Exited'
}

export interface Employee {
  id: string;
  username: string;
  email: string;
  emp_code: string;
  type_code: EmployeeType;
  first_name: string;
  last_name: string;
  phone?: string;
  dob?: string;
  doj: string;
  status: EmployeeStatus;
  probation_end?: string;
  department_id: string;
  designation_id: string;
  is_active: boolean;
  department?: Department;
  designation?: Designation;
  role?: Role;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  punchIn?: string;
  punchOut?: string;
  totalHours: number;
  overtime: number;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  location?: string;
}

export interface Department {
  id: string;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Designation {
  id: string;
  title: string;
  level?: number;
  is_active: boolean;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingApprovals: number;
  totalDepartments: number;
  newJoinersThisMonth: number;
}
