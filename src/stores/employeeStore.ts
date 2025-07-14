
import { create } from 'zustand';
import { Employee, Department } from '../types';

interface EmployeeState {
  employees: Employee[];
  departments: Department[];
  loading: boolean;
  fetchEmployees: () => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;
}

// Mock data
const mockEmployees: Employee[] = [
  {
    id: '1',
    employeeId: 'IPA-2024-001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@indianports.gov.in',
    phone: '+91-9876543210',
    department: 'Operations',
    designation: 'Port Manager',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2020-01-15',
    basicSalary: 85000,
    address: 'Mumbai Port Area, Mumbai, Maharashtra',
    emergencyContact: {
      name: 'Priya Kumar',
      phone: '+91-9876543211',
      relation: 'Spouse'
    }
  },
  {
    id: '2',
    employeeId: 'IPA-2024-002',
    name: 'Sunita Sharma',
    email: 'sunita.sharma@indianports.gov.in',
    phone: '+91-9876543212',
    department: 'Human Resources',
    designation: 'HR Manager',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2019-03-20',
    basicSalary: 75000,
    address: 'Kandla Port Area, Gandhinagar, Gujarat',
    emergencyContact: {
      name: 'Amit Sharma',
      phone: '+91-9876543213',
      relation: 'Spouse'
    }
  },
  {
    id: '3',
    employeeId: 'IPA-2024-003',
    name: 'Mohammed Ali',
    email: 'mohammed.ali@indianports.gov.in',
    phone: '+91-9876543214',
    department: 'Security',
    designation: 'Security Officer',
    classification: 'Non-Executive',
    status: 'Active',
    joiningDate: '2021-07-10',
    basicSalary: 45000,
    address: 'Cochin Port Area, Kochi, Kerala',
    emergencyContact: {
      name: 'Fatima Ali',
      phone: '+91-9876543215',
      relation: 'Spouse'
    }
  }
];

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Operations',
    head: 'Rajesh Kumar',
    employeeCount: 25,
    description: 'Port operations and cargo handling'
  },
  {
    id: '2',
    name: 'Human Resources',
    head: 'Sunita Sharma',
    employeeCount: 8,
    description: 'Employee management and administration'
  },
  {
    id: '3',
    name: 'Security',
    head: 'Mohammed Ali',
    employeeCount: 15,
    description: 'Port security and surveillance'
  },
  {
    id: '4',
    name: 'Finance',
    head: 'Priya Patel',
    employeeCount: 12,
    description: 'Financial operations and accounting'
  }
];

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: mockEmployees,
  departments: mockDepartments,
  loading: false,
  fetchEmployees: () => {
    set({ loading: true });
    // Simulate API call
    setTimeout(() => {
      set({ loading: false });
    }, 1000);
  },
  addEmployee: (employeeData) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
    };
    set((state) => ({
      employees: [...state.employees, newEmployee]
    }));
  },
  updateEmployee: (id, employeeData) => {
    set((state) => ({
      employees: state.employees.map(emp => 
        emp.id === id ? { ...emp, ...employeeData } : emp
      )
    }));
  },
  deleteEmployee: (id) => {
    set((state) => ({
      employees: state.employees.filter(emp => emp.id !== id)
    }));
  },
  getEmployeeById: (id) => {
    return get().employees.find(emp => emp.id === id);
  }
}));
