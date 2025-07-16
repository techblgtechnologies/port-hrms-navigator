
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/Layout/MainLayout';
import { useEmployeeStore } from '../../stores/employeeStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Edit, 
  Phone, 
  Mail, 
  Building, 
  Calendar, 
  DollarSign,
  FileText,
  Clock,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useEmployeeStore();
  const [isEditing, setIsEditing] = useState(false);

  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">Employee Not Found</h2>
          <p className="text-gray-600 mt-2">The requested employee profile could not be found.</p>
          <Button onClick={() => navigate('/employees')} className="mt-4">
            Back to Employees
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Mock salary data for graph - using a base salary of 50000 if not available
  const baseSalary = employee.basicSalary || 50000;
  const salaryData = [
    { month: 'Jan', salary: baseSalary * 0.9 },
    { month: 'Feb', salary: baseSalary * 0.95 },
    { month: 'Mar', salary: baseSalary },
    { month: 'Apr', salary: baseSalary * 1.1 },
    { month: 'May', salary: baseSalary * 1.05 },
    { month: 'Jun', salary: baseSalary * 1.15 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Exited':
        return 'bg-red-100 text-red-800';
      case 'Probation':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
              <p className="text-gray-600">{employee.designation?.title || 'N/A'} • {employee.department?.name || 'N/A'}</p>
              <Badge className={getStatusColor(employee.status)}>
                {employee.status}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            <Button
              onClick={() => navigate(`/employees/${employee.id}/salary`)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Manage Salary
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Employee ID</p>
                  <p className="text-lg font-semibold">{employee.emp_code}</p>
                </div>
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Basic Salary</p>
                  <p className="text-lg font-semibold">₹{(employee.basicSalary || 50000).toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Years of Service</p>
                  <p className="text-lg font-semibold">
                    {new Date().getFullYear() - new Date(employee.doj).getFullYear()}
                  </p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Employee Type</p>
                  <p className="text-lg font-semibold">{employee.type_code}</p>
                </div>
                <Building className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="salary">Salary Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{employee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{employee.phone || '+91 98765 43210'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Date of Birth</p>
                        <p className="font-medium">{employee.dob ? new Date(employee.dob).toLocaleDateString() : '15th March, 1990'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">123, Sample Street, Mumbai, Maharashtra - 400001</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Emergency Contact</p>
                      <p className="font-medium">Jane Doe - +91 98765 43211</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-medium">{employee.department?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Designation</p>
                      <p className="font-medium">{employee.designation?.title || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Joining Date</p>
                      <p className="font-medium">{new Date(employee.doj).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Reporting Manager</p>
                      <p className="font-medium">John Smith</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Work Location</p>
                      <p className="font-medium">Mumbai Port Office</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Employee Type</p>
                      <Badge>{employee.type_code}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salary">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Current Salary Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Basic Salary:</span>
                      <span className="font-medium">₹{(employee.basicSalary || 50000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HRA (30%):</span>
                      <span className="font-medium">₹{((employee.basicSalary || 50000) * 0.3).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DA (20%):</span>
                      <span className="font-medium">₹{((employee.basicSalary || 50000) * 0.2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medical Allowance:</span>
                      <span className="font-medium">₹1,500</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                      <span>Gross Salary:</span>
                      <span>₹{((employee.basicSalary || 50000) * 1.5 + 1500).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Salary Trend (Last 6 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={salaryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="salary" stroke="#0369a1" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Documents & Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Aadhar Card', status: 'Verified', date: '2024-01-15' },
                    { name: 'PAN Card', status: 'Verified', date: '2024-01-15' },
                    { name: 'Degree Certificate', status: 'Pending', date: '2024-01-20' },
                    { name: 'Experience Letter', status: 'Verified', date: '2024-01-10' },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">Uploaded on {doc.date}</p>
                        </div>
                      </div>
                      <Badge className={doc.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EmployeeProfile;
