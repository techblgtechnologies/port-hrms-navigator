
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin.user',
    email: 'admin@indianports.gov.in',
    role: 'admin',
    emp_code: 'IPA-2024-001',
    permissions: ['all'],
    get name() { return 'Admin User'; },
    department: 'Administration'
  },
  {
    id: '2',
    username: 'hr.manager',
    email: 'hr@indianports.gov.in',
    role: 'hr',
    emp_code: 'IPA-2024-002',
    permissions: ['employees.read', 'employees.write', 'attendance.read', 'payroll.read'],
    get name() { return 'HR Manager'; },
    department: 'Human Resources'
  },
  {
    id: '3',
    username: 'dept.manager',
    email: 'manager@indianports.gov.in',
    role: 'manager',
    emp_code: 'IPA-2024-003',
    permissions: ['employees.read', 'attendance.read', 'attendance.write'],
    get name() { return 'Department Manager'; },
    department: 'Operations'
  }
] as User[];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password123') {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      }
    }),
    {
      name: 'auth-store'
    }
  )
);
