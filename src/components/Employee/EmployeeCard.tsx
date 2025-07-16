
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar,
  Building,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Employee } from '../../types';
import { cn } from '@/lib/utils';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  viewMode?: 'compact' | 'detailed';
}

export const EmployeeCard = ({ 
  employee, 
  onEdit, 
  onDelete, 
  viewMode = 'detailed' 
}: EmployeeCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Probation':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Exited':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Regular':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contractual':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Outsourced':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Intern':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (viewMode === 'compact') {
    return (
      <Card 
        className={cn(
          "transition-all duration-200 cursor-pointer hover:shadow-md border border-gray-200",
          isHovered && "shadow-lg scale-[1.02]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/employees/${employee.id}`)}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{employee.name}</h3>
              <p className="text-sm text-gray-600 truncate">{employee.designation?.title}</p>
              <p className="text-xs text-gray-500 font-mono">{employee.emp_code}</p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <Badge className={cn("text-xs", getStatusColor(employee.status))}>
                {employee.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/employees/${employee.id}`);
                  }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onEdit(employee.id);
                  }}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(employee.id);
                    }}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200 cursor-pointer hover:shadow-lg border border-gray-200 hover:border-blue-200",
        isHovered && "shadow-xl scale-[1.02] border-blue-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-blue-100">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{employee.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{employee.designation?.title}</p>
              <p className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                {employee.emp_code}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate(`/employees/${employee.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(employee.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Employee
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(employee.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={cn("text-xs border", getStatusColor(employee.status))}>
            {employee.status}
          </Badge>
          <Badge className={cn("text-xs border", getTypeColor(employee.type_code))}>
            {employee.type_code}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Building className="w-4 h-4 mr-2 text-gray-400" />
            <span>{employee.department?.name}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">{employee.email}</span>
          </div>
          
          {employee.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              <span>{employee.phone}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>Joined {new Date(employee.doj).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="text-sm">
            <span className="text-gray-500">Employee Code:</span>
            <span className="font-semibold text-gray-900 ml-1">
              {employee.emp_code}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/employees/${employee.id}`);
            }}
            className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
          >
            <User className="w-4 h-4 mr-1" />
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
