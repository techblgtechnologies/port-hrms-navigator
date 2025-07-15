
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  Settings,
  X,
  ChevronDown,
  ChevronRight,
  Building,
  UserPlus,
  Clock,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '../../stores/authStore';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  {
    title: 'Employee Management',
    icon: Users,
    children: [
      { title: 'All Employees', href: '/employees' },
      { title: 'Add Employee', href: '/employees/add' },
      { title: 'Departments', href: '/departments' },
      { title: 'Probation Tracking', href: '/employees/probation' }
    ]
  },
  {
    title: 'Attendance',
    icon: Clock,
    children: [
      { title: 'Overview', href: '/attendance' },
      { title: 'Punch In/Out', href: '/attendance/punch' },
      { title: 'Manual Entry', href: '/attendance/manual' },
      { title: 'Approvals', href: '/attendance/approvals' }
    ]
  },
  {
    title: 'Payroll',
    icon: DollarSign,
    children: [
      { title: 'Dashboard', href: '/payroll' },
      { title: 'Process Payroll', href: '/payroll/process' },
      { title: 'Pay Slips', href: '/payroll/slips' }
    ]
  },
  {
    title: 'Reports',
    icon: FileText,
    children: [
      { title: 'Dashboard', href: '/reports' },
      { title: 'Export Data', href: '/reports/export' }
    ]
  }
];

export const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Employee Management']);
  const { user } = useAuthStore();

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-slide-in-right lg:hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">IPA HRMS</h2>
            <p className="text-xs text-gray-500">Port Authority</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4">
        {/* User info */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="font-medium text-gray-900">{user?.name}</p>
          <p className="text-sm text-blue-600 capitalize">{user?.role}</p>
          <p className="text-xs text-gray-500 mt-1">{user?.department}</p>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isExpanded = expandedItems.includes(item.title);
            
            return (
              <div key={item.title}>
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className="flex items-center justify-between w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3 text-gray-600 group-hover:text-blue-600" />
                    <span className="font-medium text-gray-900 group-hover:text-blue-700">{item.title}</span>
                  </div>
                  <div className="transition-transform duration-200">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="ml-8 mt-1 space-y-1 animate-fade-in">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        onClick={onClose}
                        className={({ isActive }) => cn(
                          'block p-3 rounded-md text-sm transition-colors',
                          isActive 
                            ? 'bg-blue-100 text-blue-900 font-medium border-l-2 border-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'
                        )}
                      >
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
