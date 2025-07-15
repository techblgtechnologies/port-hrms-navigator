import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/Layout/MainLayout';
import { useEmployeeStore } from '../../stores/employeeStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { EmployeeCard } from '../../components/Employee/EmployeeCard';
import { EmployeeFilters } from '../../components/Employee/EmployeeFilters';
import { EmployeeViewToggle } from '../../components/Employee/EmployeeViewToggle';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Plus, 
  Users,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';

const EmployeeList = () => {
  const navigate = useNavigate();
  const { employees, deleteEmployee } = useEmployeeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedFilters, setSelectedFilters] = useState({
    status: [] as string[],
    department: [] as string[],
    classification: [] as string[]
  });

  // Generate available filter options
  const availableOptions = useMemo(() => {
    const departments = [...new Set(employees.map(emp => emp.department))];
    const statuses = ['Active', 'Inactive', 'Probation'];
    const classifications = ['Executive', 'Non-Executive', 'Contract', 'Trainee'];
    
    return { departments, statuses, classifications };
  }, [employees]);

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedFilters.status.length === 0 || 
        selectedFilters.status.includes(employee.status);
      const matchesDepartment = selectedFilters.department.length === 0 || 
        selectedFilters.department.includes(employee.department);
      const matchesClassification = selectedFilters.classification.length === 0 || 
        selectedFilters.classification.includes(employee.classification);

      return matchesSearch && matchesStatus && matchesDepartment && matchesClassification;
    });
  }, [employees, searchTerm, selectedFilters]);

  const handleFilterChange = (type: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev].includes(value)
        ? prev[type as keyof typeof prev].filter(item => item !== value)
        : [...prev[type as keyof typeof prev], value]
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      status: [],
      department: [],
      classification: []
    });
    setSearchTerm('');
  };

  const handleDeleteEmployee = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      deleteEmployee(id);
      toast({
        title: "Employee Deleted",
        description: `${employee.name} has been removed from the system.`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Probation':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Executive':
        return 'bg-blue-100 text-blue-800';
      case 'Non-Executive':
        return 'bg-purple-100 text-purple-800';
      case 'Contract':
        return 'bg-orange-100 text-orange-800';
      case 'Trainee':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-blue-600" />
              Employee Management
            </h1>
            <p className="text-gray-600 mt-2">Manage your workforce efficiently</p>
          </div>
          <Button 
            onClick={() => navigate('/employees/add')}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{employees.length}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Active</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    {employees.filter(emp => emp.status === 'Active').length}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">On Probation</p>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                    {employees.filter(emp => emp.status === 'Probation').length}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Departments</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-600">{availableOptions.departments.length}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <EmployeeFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          availableOptions={availableOptions}
          totalCount={employees.length}
          filteredCount={filteredEmployees.length}
        />

        {/* View Toggle and Employee List */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Employee Directory</CardTitle>
              <EmployeeViewToggle
                currentView={viewMode}
                onViewChange={setViewMode}
                totalCount={filteredEmployees.length}
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No employees found</p>
                <p className="text-gray-400 text-sm">
                  {searchTerm || Object.values(selectedFilters).some(arr => arr.length > 0)
                    ? "Try adjusting your search or filters"
                    : "Get started by adding your first employee"
                  }
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEmployees.map((employee) => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onEdit={(id) => navigate(`/employees/${id}/edit`)}
                    onDelete={handleDeleteEmployee}
                  />
                ))}
              </div>
            ) : (
              <div className="hidden md:block rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Classification</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joining Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-medium">
                                {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{employee.name}</p>
                              <p className="text-sm text-gray-500 font-mono">{employee.employeeId}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{employee.department}</p>
                            <p className="text-sm text-gray-500">{employee.designation}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getClassificationColor(employee.classification)}>
                            {employee.classification}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(employee.joiningDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/employees/${employee.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/employees/${employee.id}/edit`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Employee
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteEmployee(employee.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EmployeeList;
