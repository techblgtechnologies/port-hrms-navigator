import { create } from 'zustand';
import { Employee, Department, EmployeeType, EmployeeStatus } from '../types';

// Mock employees data with proper database model structure
const mockEmployees: Employee[] = [
  {
    id: '1',
    username: 'john.doe',
    email: 'john.doe@company.com',
    emp_code: 'EMP001',
    type_code: EmployeeType.Regular,
    first_name: 'John',
    last_name: 'Doe',
    phone: '+1-555-0101',
    dob: '1990-01-15',
    doj: '2020-03-15',
    status: EmployeeStatus.Confirmed,
    department_id: '1',
    designation_id: '1',
    is_active: true,
    get name() { return `${this.first_name} ${this.last_name}`; },
    department: { id: '1', name: 'Engineering', is_active: true, is_deleted: false },
    designation: { id: '1', title: 'Senior Developer', level: 2, is_active: true, is_deleted: false }
  },
  {
    id: '2',
    username: 'jane.smith',
    email: 'jane.smith@company.com',
    emp_code: 'EMP002',
    type_code: EmployeeType.Contractual,
    first_name: 'Jane',
    last_name: 'Smith',
    phone: '+1-555-0102',
    dob: '1992-05-20',
    doj: '2021-08-01',
    status: EmployeeStatus.Probation,
    department_id: '2',
    designation_id: '2',
    is_active: true,
    get name() { return `${this.first_name} ${this.last_name}`; },
    department: { id: '2', name: 'Human Resources', is_active: true, is_deleted: false },
    designation: { id: '2', title: 'HR Manager', level: 3, is_active: true, is_deleted: false }
  },
  {
    id: '3',
    username: 'robert.jones',
    email: 'robert.jones@company.com',
    emp_code: 'EMP003',
    type_code: EmployeeType.Outsourced,
    first_name: 'Robert',
    last_name: 'Jones',
    phone: '+1-555-0103',
    dob: '1988-11-10',
    doj: '2019-01-20',
    status: EmployeeStatus.Confirmed,
    department_id: '3',
    designation_id: '3',
    is_active: false,
    get name() { return `${this.first_name} ${this.last_name}`; },
    department: { id: '3', name: 'Finance', is_active: true, is_deleted: false },
    designation: { id: '3', title: 'Accountant', level: 1, is_active: true, is_deleted: false }
  },
  {
    id: '4',
    username: 'emily.brown',
    email: 'emily.brown@company.com',
    emp_code: 'EMP004',
    type_code: EmployeeType.Regular,
    first_name: 'Emily',
    last_name: 'Brown',
    phone: '+1-555-0104',
    dob: '1995-03-01',
    doj: '2022-07-01',
    status: EmployeeStatus.Confirmed,
    department_id: '4',
    designation_id: '4',
    is_active: true,
    get name() { return `${this.first_name} ${this.last_name}`; },
    department: { id: '4', name: 'Marketing', is_active: true, is_deleted: false },
    designation: { id: '4', title: 'Marketing Specialist', level: 2, is_active: true, is_deleted: false }
  },
  {
    id: '5',
    username: 'michael.davis',
    email: 'michael.davis@company.com',
    emp_code: 'EMP005',
    type_code: EmployeeType.Intern,
    first_name: 'Michael',
    last_name: 'Davis',
    phone: '+1-555-0105',
    dob: '2000-08-25',
    doj: '2023-06-01',
    status: EmployeeStatus.Probation,
    department_id: '5',
    designation_id: '5',
    is_active: true,
    get name() { return `${this.first_name} ${this.last_name}`; },
    department: { id: '5', name: 'Sales', is_active: true, is_deleted: false },
    designation: { id: '5', title: 'Sales Intern', level: 4, is_active: true, is_deleted: false }
  }
] as Employee[];

// Mock departments
const mockDepartments: Department[] = [
  { id: '1', name: 'Engineering', is_active: true, is_deleted: false },
  { id: '2', name: 'Human Resources', is_active: true, is_deleted: false },
  { id: '3', name: 'Finance', is_active: true, is_deleted: false },
  { id: '4', name: 'Marketing', is_active: true, is_deleted: false },
  { id: '5', name: 'Sales', is_active: true, is_deleted: false },
  { id: '6', name: 'Operations', is_active: true, is_deleted: false },
  { id: '7', name: 'Research and Development', is_active: true, is_deleted: false },
  { id: '8', name: 'Customer Service', is_active: true, is_deleted: false },
  { id: '9', name: 'Legal', is_active: true, is_deleted: false },
  { id: '10', name: 'Information Technology', is_active: true, is_deleted: false }
];

interface EmployeeStore {
  employees: Employee[];
  departments: Department[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchEmployees: () => Promise<void>;
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  getEmployeeById: (id: string) => Employee | undefined;
  
  // Department actions
  fetchDepartments: () => Promise<void>;
  addDepartment: (department: Omit<Department, 'id'>) => Promise<void>;
  updateDepartment: (id: string, department: Partial<Department>) => Promise<void>;
  deleteDepartment: (id: string) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: mockEmployees,
  departments: mockDepartments,
  loading: false,
  error: null,

  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ employees: mockEmployees, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch employees', loading: false });
    }
  },

  addEmployee: async (employee) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newEmployee: Employee = {
        ...employee,
        id: Date.now().toString(),
        get name() { return `${this.first_name} ${this.last_name}`; }
      };
      set(state => ({
        employees: [...state.employees, newEmployee],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add employee', loading: false });
    }
  },

  updateEmployee: async (id, employee) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        employees: state.employees.map(emp => 
          emp.id === id ? { ...emp, ...employee } : emp
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update employee', loading: false });
    }
  },

  deleteEmployee: async (id) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        employees: state.employees.filter(emp => emp.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete employee', loading: false });
    }
  },

  getEmployeeById: (id) => {
    return get().employees.find(emp => emp.id === id);
  },

  fetchDepartments: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ departments: mockDepartments, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch departments', loading: false });
    }
  },

  addDepartment: async (department) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newDepartment: Department = {
        ...department,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      set(state => ({
        departments: [...state.departments, newDepartment],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add department', loading: false });
    }
  },

  updateDepartment: async (id, department) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        departments: state.departments.map(dept => 
          dept.id === id 
            ? { ...dept, ...department, updated_at: new Date().toISOString() }
            : dept
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update department', loading: false });
    }
  },

  deleteDepartment: async (id) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        departments: state.departments.map(dept =>
          dept.id === id ? { ...dept, is_deleted: true, is_active: false } : dept
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete department', loading: false });
    }
  },
}));
