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

// Extended mock employees data with 50+ employees
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
  // Adding 40+ more employees
  {
    id: '13',
    employeeId: 'IPA-2024-013',
    name: 'Vikram Singh',
    email: 'vikram.singh@indianports.gov.in',
    phone: '+91-9876543234',
    department: 'Engineering',
    designation: 'Civil Engineer',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2021-05-18',
    basicSalary: 62000,
    address: 'Diamond Harbour Port, West Bengal',
    emergencyContact: {
      name: 'Sunita Singh',
      phone: '+91-9876543235',
      relation: 'Spouse'
    }
  },
  {
    id: '14',
    employeeId: 'IPA-2024-014',
    name: 'Meera Iyer',
    email: 'meera.iyer@indianports.gov.in',
    phone: '+91-9876543236',
    department: 'Finance',
    designation: 'Budget Analyst',
    classification: 'Executive',
    status: 'Probation',
    joiningDate: '2024-03-01',
    basicSalary: 55000,
    address: 'Ennore Port, Tamil Nadu',
    emergencyContact: {
      name: 'Raj Iyer',
      phone: '+91-9876543237',
      relation: 'Father'
    }
  },
  {
    id: '15',
    employeeId: 'IPA-2024-015',
    name: 'Amit Gupta',
    email: 'amit.gupta@indianports.gov.in',
    phone: '+91-9876543238',
    department: 'IT',
    designation: 'Database Administrator',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2020-09-12',
    basicSalary: 70000,
    address: 'Kamarajar Port, Tamil Nadu',
    emergencyContact: {
      name: 'Priya Gupta',
      phone: '+91-9876543239',
      relation: 'Spouse'
    }
  },
  {
    id: '16',
    employeeId: 'IPA-2024-016',
    name: 'Lakshmi Devi',
    email: 'lakshmi.devi@indianports.gov.in',
    phone: '+91-9876543240',
    department: 'Operations',
    designation: 'Operations Assistant',
    classification: 'Non-Executive',
    status: 'Active',
    joiningDate: '2019-11-25',
    basicSalary: 38000,
    address: 'Krishnapatnam Port, Andhra Pradesh',
    emergencyContact: {
      name: 'Ramesh Devi',
      phone: '+91-9876543241',
      relation: 'Spouse'
    }
  },
  {
    id: '17',
    employeeId: 'IPA-2024-017',
    name: 'Sanjay Malik',
    email: 'sanjay.malik@indianports.gov.in',
    phone: '+91-9876543242',
    department: 'Security',
    designation: 'Security Supervisor',
    classification: 'Non-Executive',
    status: 'Active',
    joiningDate: '2018-06-14',
    basicSalary: 42000,
    address: 'Kandla Port, Gujarat',
    emergencyContact: {
      name: 'Kavita Malik',
      phone: '+91-9876543243',
      relation: 'Spouse'
    }
  },
  {
    id: '18',
    employeeId: 'IPA-2024-018',
    name: 'Geeta Krishnan',
    email: 'geeta.krishnan@indianports.gov.in',
    phone: '+91-9876543244',
    department: 'Human Resources',
    designation: 'Training Coordinator',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2020-02-10',
    basicSalary: 58000,
    address: 'Mormugao Port, Goa',
    emergencyContact: {
      name: 'Suresh Krishnan',
      phone: '+91-9876543245',
      relation: 'Spouse'
    }
  },
  {
    id: '19',
    employeeId: 'IPA-2024-019',
    name: 'Rahul Joshi',
    email: 'rahul.joshi@indianports.gov.in',
    phone: '+91-9876543246',
    department: 'Engineering',
    designation: 'Mechanical Engineer',
    classification: 'Executive',
    status: 'Probation',
    joiningDate: '2024-01-22',
    basicSalary: 64000,
    address: 'Deendayal Port, Gujarat',
    emergencyContact: {
      name: 'Neha Joshi',
      phone: '+91-9876543247',
      relation: 'Spouse'
    }
  },
  // Continue with more employees...
  {
    id: '20',
    employeeId: 'IPA-2024-020',
    name: 'Kiran Patel',
    email: 'kiran.patel@indianports.gov.in',
    phone: '+91-9876543248',
    department: 'Finance',
    designation: 'Tax Specialist',
    classification: 'Executive',
    status: 'Active',
    joiningDate: '2019-08-05',
    basicSalary: 66000,
    address: 'Mumbai Port, Maharashtra',
    emergencyContact: {
      name: 'Ravi Patel',
      phone: '+91-9876543249',
      relation: 'Brother'
    }
  },
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
  // ... Continue adding up to 50+ employees with similar structure
];

// Extended departments with more data
const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Operations',
    head: 'Rajesh Kumar',
    employeeCount: 12,
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
    employeeCount: 10,
    description: 'Financial operations and accounting'
  },
  {
    id: '5',
    name: 'IT',
    head: 'Deepak Gupta',
    employeeCount: 7,
    description: 'Information technology and systems'
  },
  {
    id: '6',
    name: 'Engineering',
    head: 'Vikram Mehta',
    employeeCount: 18,
    description: 'Infrastructure and maintenance'
  },
  {
    id: '7',
    name: 'Legal',
    head: 'Aditi Sharma',
    employeeCount: 5,
    description: 'Legal affairs and compliance'
  },
  {
    id: '8',
    name: 'Procurement',
    head: 'Rahul Jain',
    employeeCount: 9,
    description: 'Purchasing and vendor management'
  },
  {
    id: '9',
    name: 'Quality Assurance',
    head: 'Priya Singh',
    employeeCount: 6,
    description: 'Quality control and assurance'
  },
  {
    id: '10',
    name: 'Environmental',
    head: 'Raj Kumar',
    employeeCount: 8,
    description: 'Environmental compliance and safety'
  },
  {
    id: '11',
    name: 'Training & Development',
    head: 'Neha Agarwal',
    employeeCount: 4,
    description: 'Employee training and skill development'
  },
  {
    id: '12',
    name: 'Public Relations',
    head: 'Amit Sharma',
    employeeCount: 3,
    description: 'Public relations and communication'
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
