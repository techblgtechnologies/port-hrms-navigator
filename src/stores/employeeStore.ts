
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

// Expanded mock employees data
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
  },
  // Adding more mock employees for better pagination testing
  {
    id: '4',
    employeeId: 'IPA-2024-004',
    name: 'Priya Patel',
    email: 'priya.patel@indianports.gov.in',
    phone: '+91-9876543216',
    department: 'Finance',
    designation: 'Financial Analyst',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2022-01-15',
    basicSalary: 65000,
    address: 'Visakhapatnam Port, Andhra Pradesh',
    emergencyContact: {
      name: 'Ravi Patel',
      phone: '+91-9876543217',
      relation: 'Spouse'
    }
  },
  {
    id: '5',
    employeeId: 'IPA-2024-005',
    name: 'Arun Singh',
    email: 'arun.singh@indianports.gov.in',
    phone: '+91-9876543218',
    department: 'Operations',
    designation: 'Cargo Supervisor',
    classification: 'Non-Executive',
    status: 'Probation',
    joiningDate: '2024-06-01',
    basicSalary: 42000,
    address: 'Chennai Port, Tamil Nadu',
    emergencyContact: {
      name: 'Rita Singh',
      phone: '+91-9876543219',
      relation: 'Spouse'
    }
  },
  {
    id: '6',
    employeeId: 'IPA-2024-006',
    name: 'Kavya Reddy',
    email: 'kavya.reddy@indianports.gov.in',
    phone: '+91-9876543220',
    department: 'Human Resources',
    designation: 'HR Executive',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2021-09-12',
    basicSalary: 55000,
    address: 'Kolkata Port, West Bengal',
    emergencyContact: {
      name: 'Suresh Reddy',
      phone: '+91-9876543221',
      relation: 'Father'
    }
  },
  {
    id: '7',
    employeeId: 'IPA-2024-007',
    name: 'Deepak Gupta',
    email: 'deepak.gupta@indianports.gov.in',
    phone: '+91-9876543222',
    department: 'IT',
    designation: 'System Administrator',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2020-11-05',
    basicSalary: 68000,
    address: 'Haldia Port, West Bengal',
    emergencyContact: {
      name: 'Meera Gupta',
      phone: '+91-9876543223',
      relation: 'Spouse'
    }
  },
  {
    id: '8',
    employeeId: 'IPA-2024-008',
    name: 'Anita Joshi',
    email: 'anita.joshi@indianports.gov.in',
    phone: '+91-9876543224',
    department: 'Finance',
    designation: 'Accountant',
    classification: 'Non-Executive',
    status: 'Active',
    joiningDate: '2018-04-20',
    basicSalary: 48000,
    address: 'Mangalore Port, Karnataka',
    emergencyContact: {
      name: 'Vinod Joshi',
      phone: '+91-9876543225',
      relation: 'Spouse'
    }
  },
  {
    id: '9',
    employeeId: 'IPA-2024-009',
    name: 'Ravi Kumar',
    email: 'ravi.kumar@indianports.gov.in',
    phone: '+91-9876543226',
    department: 'Security',
    designation: 'Security Guard',
    classification: 'Non-Executive',
    status: 'Active',
    joiningDate: '2019-08-14',
    basicSalary: 35000,
    address: 'Tuticorin Port, Tamil Nadu',
    emergencyContact: {
      name: 'Lakshmi Kumar',
      phone: '+91-9876543227',
      relation: 'Spouse'
    }
  },
  {
    id: '10',
    employeeId: 'IPA-2024-010',
    name: 'Neha Agarwal',
    email: 'neha.agarwal@indianports.gov.in',
    phone: '+91-9876543228',
    department: 'Operations',
    designation: 'Operations Executive',
    classification: 'Executive',
    status: 'Probation',
    joiningDate: '2024-04-10',
    basicSalary: 52000,
    address: 'Paradip Port, Odisha',
    emergencyContact: {
      name: 'Rajesh Agarwal',
      phone: '+91-9876543229',
      relation: 'Father'
    }
  },
  {
    id: '11',
    employeeId: 'IPA-2024-011',
    name: 'Suresh Nair',
    email: 'suresh.nair@indianports.gov.in',
    phone: '+91-9876543230',
    department: 'IT',
    designation: 'Software Developer',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2021-02-28',
    basicSalary: 72000,
    address: 'New Mangalore Port, Karnataka',
    emergencyContact: {
      name: 'Divya Nair',
      phone: '+91-9876543231',
      relation: 'Spouse'
    }
  },
  {
    id: '12',
    employeeId: 'IPA-2024-012',
    name: 'Pooja Verma',
    email: 'pooja.verma@indianports.gov.in',
    phone: '+91-9876543232',
    department: 'Human Resources',
    designation: 'Recruitment Specialist',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2020-07-16',
    basicSalary: 58000,
    address: 'Jawaharlal Nehru Port, Maharashtra',
    emergencyContact: {
      name: 'Rohit Verma',
      phone: '+91-9876543233',
      relation: 'Brother'
    }
  }
];

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Operations',
    head: 'Rajesh Kumar',
    employeeCount: 4,
    description: 'Port operations and cargo handling'
  },
  {
    id: '2',
    name: 'Human Resources',
    head: 'Sunita Sharma',
    employeeCount: 3,
    description: 'Employee management and administration'
  },
  {
    id: '3',
    name: 'Security',
    head: 'Mohammed Ali',
    employeeCount: 2,
    description: 'Port security and surveillance'
  },
  {
    id: '4',
    name: 'Finance',
    head: 'Priya Patel',
    employeeCount: 2,
    description: 'Financial operations and accounting'
  },
  {
    id: '5',
    name: 'IT',
    head: 'Deepak Gupta',
    employeeCount: 2,
    description: 'Information technology and systems'
  },
  {
    id: '6',
    name: 'Engineering',
    head: 'Vikram Mehta',
    employeeCount: 8,
    description: 'Infrastructure and maintenance'
  },
  {
    id: '7',
    name: 'Legal',
    head: 'Aditi Sharma',
    employeeCount: 3,
    description: 'Legal affairs and compliance'
  },
  {
    id: '8',
    name: 'Procurement',
    head: 'Rahul Jain',
    employeeCount: 4,
    description: 'Purchasing and vendor management'
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
