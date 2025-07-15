
import { Employee } from '../../types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  Building,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmployeeCardProps {
  employee: Employee;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const EmployeeCard = ({ employee, onEdit, onDelete }: EmployeeCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Probation':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Executive':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Non-Executive':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Contract':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Trainee':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 hover-scale">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
              {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{employee.name}</h3>
            <p className="text-sm text-gray-600 font-mono">{employee.employeeId}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Badge className={getStatusColor(employee.status)}>
            {employee.status}
          </Badge>
          <Badge className={getClassificationColor(employee.classification)}>
            {employee.classification}
          </Badge>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Building className="w-4 h-4 mr-2 text-gray-400" />
          <span className="truncate">{employee.department} • {employee.designation}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          <span className="truncate">{employee.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2 text-gray-400" />
          <span>{employee.phone || '+91 98765 43210'}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <span>Joined {new Date(employee.joiningDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-sm">
          <span className="text-gray-600">Salary: </span>
          <span className="font-semibold text-gray-900">₹{employee.basicSalary.toLocaleString()}</span>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/employees/${employee.id}`)}
            className="hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye className="w-4 h-4" />
          </Button>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(employee.id)}
              className="hover:bg-yellow-50 hover:text-yellow-600"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(employee.id)}
              className="hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
