
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  DollarSign, 
  MapPin, 
  FileText, 
  Settings,
  Calendar,
  Building,
  Shield,
  ChevronDown,
  ChevronRight,
  Home,
  UserPlus,
  PlusCircle,
  Timer,
  Calculator,
  TrendingUp,
  CreditCard,
  Gift,
  Briefcase,
  BarChart3,
  FileSpreadsheet,
  UserCog,
  Gavel,
  LogOut,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '../../stores/authStore';

interface SidebarItem {
  title: string;
  href?: string;
  icon: any;
  children?: SidebarItem[];
  permissions?: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Employee Management',
    icon: Users,
    children: [
      { title: 'All Employees', href: '/employees', icon: Users },
      { title: 'Add Employee', href: '/employees/add', icon: UserPlus },
      { title: 'Departments', href: '/departments', icon: Building },
      { title: 'Probation Tracking', href: '/employees/probation', icon: Timer }
    ]
  },
  {
    title: 'Attendance',
    icon: Clock,
    children: [
      { title: 'Overview', href: '/attendance', icon: Clock },
      { title: 'Punch In/Out', href: '/attendance/punch', icon: Timer },
      { title: 'Manual Entry', href: '/attendance/manual', icon: PlusCircle },
      { title: 'Approvals', href: '/attendance/approvals', icon: Shield },
      { title: 'Overtime', href: '/attendance/overtime', icon: TrendingUp },
      { title: 'Shifts & Roster', href: '/attendance/shifts', icon: Calendar },
      { title: 'Devices', href: '/attendance/devices', icon: Settings }
    ]
  },
  {
    title: 'Payroll',
    icon: DollarSign,
    children: [
      { title: 'Dashboard', href: '/payroll', icon: DollarSign },
      { title: 'Process Payroll', href: '/payroll/process', icon: Calculator },
      { title: 'Pay Slips', href: '/payroll/slips', icon: FileText },
      { title: 'Tax & Compliance', href: '/payroll/tax', icon: Gavel },
      { title: 'History', href: '/payroll/history', icon: Clock }
    ]
  },
  {
    title: 'Salary Administration',
    icon: CreditCard,
    children: [
      { title: 'Dashboard', href: '/salary', icon: CreditCard },
      { title: 'Basic Salary', href: '/salary/basic', icon: DollarSign },
      { title: 'Increments', href: '/salary/increments', icon: TrendingUp },
      { title: 'Bonuses', href: '/salary/bonuses', icon: Gift },
      { title: 'Revisions', href: '/salary/revisions', icon: FileText }
    ]
  },
  {
    title: 'Leave Management',
    icon: Calendar,
    children: [
      { title: 'Overview', href: '/leave', icon: Calendar },
      { title: 'Leave Types', href: '/leave/types', icon: Settings },
      { title: 'Requests', href: '/leave/requests', icon: FileText },
      { title: 'Encashment', href: '/leave/encashment', icon: DollarSign }
    ]
  },
  {
    title: 'Festival Advances',
    icon: Gift,
    children: [
      { title: 'Dashboard', href: '/advances', icon: Gift },
      { title: 'Recovery Tracking', href: '/advances/recovery', icon: BarChart3 }
    ]
  },
  {
    title: 'Location Management',
    icon: MapPin,
    children: [
      { title: 'Overview', href: '/locations', icon: MapPin },
      { title: 'Geofencing', href: '/locations/geofencing', icon: Shield },
      { title: 'Real-time Tracking', href: '/locations/tracking', icon: Timer },
      { title: 'Alerts', href: '/locations/alerts', icon: Bell }
    ]
  },
  {
    title: 'Reports',
    icon: FileText,
    children: [
      { title: 'Dashboard', href: '/reports', icon: BarChart3 },
      { title: 'Salary Reports', href: '/reports/salary', icon: DollarSign },
      { title: 'Attendance Reports', href: '/reports/attendance', icon: Clock },
      { title: 'Payroll Reports', href: '/reports/payroll', icon: Calculator },
      { title: 'Custom Reports', href: '/reports/custom', icon: Settings },
      { title: 'Export Data', href: '/reports/export', icon: FileSpreadsheet }
    ]
  }
];

export const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Employee Management']);
  const location = useLocation();
  const { user } = useAuthStore();

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const hasPermission = (permissions?: string[]) => {
    if (!permissions || !user) return true;
    return permissions.some(permission => 
      user.permissions.includes('all') || user.permissions.includes(permission)
    );
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    if (!hasPermission(item.permissions)) return null;

    const isExpanded = expandedItems.includes(item.title);
    const isActive = item.href && location.pathname === item.href;
    
    return (
      <div key={item.title}>
        {item.href ? (
          <NavLink
            to={item.href}
            className={({ isActive }) => cn(
              'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-blue-50',
              level > 0 && 'ml-4 pl-8',
              isActive 
                ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600 shadow-sm' 
                : 'text-gray-700 hover:text-blue-700'
            )}
          >
            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="truncate">{item.title}</span>
          </NavLink>
        ) : (
          <button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              'flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg transition-all duration-200 hover:bg-blue-50',
              level > 0 && 'ml-4',
              'text-gray-700 hover:text-blue-700'
            )}
          >
            <div className="flex items-center">
              <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">{item.title}</span>
            </div>
            {item.children && (
              <div className="ml-2">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                )}
              </div>
            )}
          </button>
        )}
        
        {item.children && isExpanded && (
          <div className="mt-1 space-y-1 animate-fade-in">
            {item.children.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white shadow-lg h-full overflow-y-auto border-r border-gray-200">
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">IPA HRMS</h1>
            <p className="text-xs text-gray-500">Port Authority System</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map(item => renderSidebarItem(item))}
      </nav>
      
      {/* Admin Section */}
      {user?.role === 'admin' && (
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="space-y-2">
            <NavLink
              to="/admin/users"
              className={({ isActive }) => cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive 
                  ? 'bg-red-100 text-red-900 border-r-2 border-red-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <UserCog className="w-5 h-5 mr-3" />
              User Management
            </NavLink>
            <NavLink
              to="/admin/audit"
              className={({ isActive }) => cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive 
                  ? 'bg-red-100 text-red-900 border-r-2 border-red-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Shield className="w-5 h-5 mr-3" />
              Audit Logs
            </NavLink>
            <NavLink
              to="/admin/security"
              className={({ isActive }) => cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive 
                  ? 'bg-red-100 text-red-900 border-r-2 border-red-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Settings className="w-5 h-5 mr-3" />
              System Settings
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
