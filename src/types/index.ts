
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

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  classification: 'Executive' | 'Non-Executive' | 'Contract' | 'Trainee';
  status: 'Active' | 'Inactive' | 'Probation';
  joiningDate: string;
  basicSalary: number;
  avatar?: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
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
  head: string;
  employeeCount: number;
  description: string;
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingApprovals: number;
  totalDepartments: number;
  newJoinersThisMonth: number;
}
