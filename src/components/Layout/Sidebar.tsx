
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
  Home
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
      { title: 'Add Employee', href: '/employees/add', icon: Users },
      { title: 'Departments', href: '/departments', icon: Building },
      { title: 'Probation Tracking', href: '/employees/probation', icon: Clock }
    ]
  },
  {
    title: 'Attendance',
    icon: Clock,
    children: [
      { title: 'Overview', href: '/attendance', icon: Clock },
      { title: 'Punch In/Out', href: '/attendance/punch', icon: Clock },
      { title: 'Manual Entry', href: '/attendance/manual', icon: Clock },
      { title: 'Approvals', href: '/attendance/approvals', icon: Clock },
      { title: 'Overtime', href: '/attendance/overtime', icon: Clock }
    ]
  },
  {
    title: 'Payroll',
    icon: DollarSign,
    children: [
      { title: 'Dashboard', href: '/payroll', icon: DollarSign },
      { title: 'Process Payroll', href: '/payroll/process', icon: DollarSign },
      { title: 'Pay Slips', href: '/payroll/slips', icon: FileText },
      { title: 'Tax & Compliance', href: '/payroll/tax', icon: Shield }
    ]
  },
  {
    title: 'Leave Management',
    icon: Calendar,
    children: [
      { title: 'Overview', href: '/leave', icon: Calendar },
      { title: 'Leave Types', href: '/leave/types', icon: Calendar },
      { title: 'Requests', href: '/leave/requests', icon: Calendar },
      { title: 'Encashment', href: '/leave/encashment', icon: DollarSign }
    ]
  },
  {
    title: 'Location Tracking',
    icon: MapPin,
    children: [
      { title: 'Overview', href: '/locations', icon: MapPin },
      { title: 'Geofencing', href: '/locations/geofencing', icon: MapPin },
      { title: 'Real-time Tracking', href: '/locations/tracking', icon: MapPin }
    ]
  },
  {
    title: 'Reports',
    icon: FileText,
    children: [
      { title: 'Dashboard', href: '/reports', icon: FileText },
      { title: 'Salary Reports', href: '/reports/salary', icon: DollarSign },
      { title: 'Attendance Reports', href: '/reports/attendance', icon: Clock },
      { title: 'Custom Reports', href: '/reports/custom', icon: FileText }
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
              'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              level > 0 && 'ml-4',
              isActive 
                ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.title}
          </NavLink>
        ) : (
          <button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              'flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg transition-colors',
              level > 0 && 'ml-4',
              'text-gray-700 hover:bg-gray-100'
            )}
          >
            <div className="flex items-center">
              <item.icon className="w-5 h-5 mr-3" />
              {item.title}
            </div>
            {item.children && (
              isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        
        {item.children && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white shadow-lg h-full overflow-y-auto">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">IPA HRMS</h1>
            <p className="text-xs text-gray-500">Port Authority System</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {sidebarItems.map(item => renderSidebarItem(item))}
      </nav>
      
      {user?.role === 'admin' && (
        <div className="p-4 border-t">
          <NavLink
            to="/admin"
            className={({ isActive }) => cn(
              'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              isActive 
                ? 'bg-red-100 text-red-900 border-r-2 border-red-600' 
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <Settings className="w-5 h-5 mr-3" />
            Admin Panel
          </NavLink>
        </div>
      )}
    </div>
  );
};
