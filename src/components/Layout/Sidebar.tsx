
import { useState, useEffect } from 'react';
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
  badge?: string;
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
      { title: 'Designations', href: '/designations', icon: Briefcase },
      { title: 'Probation Tracking', href: '/employees/probation', icon: Timer, badge: '5' }
    ]
  },
  {
    title: 'Attendance',
    icon: Clock,
    children: [
      { title: 'Overview', href: '/attendance', icon: Clock },
      { title: 'Punch In/Out', href: '/attendance/punch', icon: Timer },
      { title: 'Manual Entry', href: '/attendance/manual', icon: PlusCircle },
      { title: 'Approvals', href: '/attendance/approvals', icon: Shield, badge: '3' },
      { title: 'Overtime', href: '/attendance/overtime', icon: TrendingUp },
      { title: 'Shifts & Roster', href: '/attendance/shifts', icon: Calendar }
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
    title: 'Leave Management',
    icon: Calendar,
    children: [
      { title: 'Overview', href: '/leave', icon: Calendar },
      { title: 'Leave Types', href: '/leave/types', icon: Settings },
      { title: 'Requests', href: '/leave/requests', icon: FileText, badge: '2' },
      { title: 'Encashment', href: '/leave/encashment', icon: DollarSign }
    ]
  },
  {
    title: 'Reports',
    icon: FileText,
    children: [
      { title: 'Dashboard', href: '/reports', icon: BarChart3 },
      { title: 'Salary Reports', href: '/reports/salary', icon: DollarSign },
      { title: 'Attendance Reports', href: '/reports/attendance', icon: Clock },
      { title: 'Export Data', href: '/reports/export', icon: FileSpreadsheet }
    ]
  }
];

export const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const { user } = useAuthStore();

  // Auto-expand parent menu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const findParentItem = (items: SidebarItem[]): string | null => {
      for (const item of items) {
        if (item.children) {
          for (const child of item.children) {
            if (child.href === currentPath) {
              return item.title;
            }
          }
        }
      }
      return null;
    };

    const parentItem = findParentItem(sidebarItems);
    if (parentItem && !expandedItems.includes(parentItem)) {
      setExpandedItems(prev => [...prev.filter(item => item !== parentItem), parentItem]);
    }
  }, [location.pathname]);

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

  const isActiveRoute = (href?: string) => {
    if (!href) return false;
    return location.pathname === href;
  };

  const hasActiveChild = (children?: SidebarItem[]) => {
    if (!children) return false;
    return children.some(child => isActiveRoute(child.href));
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    if (!hasPermission(item.permissions)) return null;

    const isExpanded = expandedItems.includes(item.title);
    const isActive = isActiveRoute(item.href);
    const hasActiveChildren = hasActiveChild(item.children);
    const isHovered = hoveredItem === item.title;
    
    return (
      <div key={item.title}>
        {item.href ? (
          <NavLink
            to={item.href}
            onMouseEnter={() => setHoveredItem(item.title)}
            onMouseLeave={() => setHoveredItem(null)}
            className={({ isActive: navIsActive }) => cn(
              'flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group',
              level > 0 && 'ml-6 pl-8',
              navIsActive 
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 shadow-sm' 
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700',
              isHovered && !navIsActive && 'bg-gray-50'
            )}
          >
            <div className="flex items-center">
              <item.icon className={cn(
                "w-5 h-5 mr-3 flex-shrink-0 transition-colors",
                isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"
              )} />
              <span className="truncate">{item.title}</span>
            </div>
            {item.badge && (
              <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        ) : (
          <button
            onClick={() => toggleExpanded(item.title)}
            onMouseEnter={() => setHoveredItem(item.title)}
            onMouseLeave={() => setHoveredItem(null)}
            className={cn(
              'flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-left rounded-lg transition-all duration-200 group',
              level > 0 && 'ml-6',
              'text-gray-700 hover:bg-blue-50 hover:text-blue-700',
              isHovered && 'bg-gray-50',
              (isExpanded || hasActiveChildren) && 'text-blue-700 bg-blue-50'
            )}
          >
            <div className="flex items-center">
              <item.icon className={cn(
                "w-5 h-5 mr-3 flex-shrink-0 transition-colors",
                (isExpanded || hasActiveChildren) ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"
              )} />
              <span className="truncate">{item.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.badge && (
                <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {item.children && (
                <div className={cn(
                  "transition-transform duration-200",
                  isExpanded ? "rotate-0" : "rotate-0"
                )}>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              )}
            </div>
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
      <nav className="p-4 space-y-1">
        {sidebarItems.map(item => renderSidebarItem(item))}
      </nav>
      
      {/* Admin Section */}
      {user?.role === 'admin' && (
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="space-y-1">
            <NavLink
              to="/admin/users"
              className={({ isActive }) => cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive 
                  ? 'bg-red-50 text-red-700 border-r-2 border-red-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <UserCog className="w-5 h-5 mr-3" />
              User Management
            </NavLink>
            <NavLink
              to="/admin/audit"
              className={({ isActive }) => cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive 
                  ? 'bg-red-50 text-red-700 border-r-2 border-red-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Shield className="w-5 h-5 mr-3" />
              Audit Logs
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
