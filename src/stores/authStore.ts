
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
    employeeId: 'IPA-2024-001',
    name: 'Admin User',
    email: 'admin@indianports.gov.in',
    role: 'admin',
    department: 'Administration',
    permissions: ['all']
  },
  {
    id: '2',
    employeeId: 'IPA-2024-002',
    name: 'HR Manager',
    email: 'hr@indianports.gov.in',
    role: 'hr',
    department: 'Human Resources',
    permissions: ['employees.read', 'employees.write', 'attendance.read', 'payroll.read']
  },
  {
    id: '3',
    employeeId: 'IPA-2024-003',
    name: 'Department Manager',
    email: 'manager@indianports.gov.in',
    role: 'manager',
    department: 'Operations',
    permissions: ['employees.read', 'attendance.read', 'attendance.write']
  }
];

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
