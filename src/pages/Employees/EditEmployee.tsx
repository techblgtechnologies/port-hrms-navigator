
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPen, Save, ArrowLeft, Loader } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { EmployeeType, EmployeeStatus } from '../../types';

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    emp_code: '',
    type_code: EmployeeType.Regular,
    first_name: '',
    last_name: '',
    phone: '',
    dob: '',
    doj: '',
    status: EmployeeStatus.Probation,
    probation_end: '',
    department_id: '',
    designation_id: '',
    is_active: true
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        // Mock API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFormData({
          username: 'john.doe',
          email: 'john.doe@company.com',
          emp_code: 'EMP001',
          type_code: EmployeeType.Regular,
          first_name: 'John',
          last_name: 'Doe',
          phone: '+1234567890',
          dob: '1990-01-01',
          doj: '2023-01-01',
          status: EmployeeStatus.Confirmed,
          probation_end: '',
          department_id: '1',
          designation_id: '1',
          is_active: true
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch employee details.",
          variant: "destructive",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
      
      toast({
        title: "Employee Updated",
        description: `${formData.first_name} ${formData.last_name} has been updated successfully.`,
      });
      
      navigate('/employees');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update employee. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
              <UserPen className="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-blue-600" />
              Edit Employee
            </h1>
            <p className="text-gray-600 mt-2">Update employee information</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/employees')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emp_code">Employee Code *</Label>
                  <Input
                    id="emp_code"
                    value={formData.emp_code}
                    onChange={(e) => setFormData({ ...formData, emp_code: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type_code">Employee Type *</Label>
                  <Select 
                    value={formData.type_code} 
                    onValueChange={(value) => setFormData({ ...formData, type_code: value as EmployeeType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(EmployeeType).map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ ...formData, status: value as EmployeeStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(EmployeeStatus).map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="doj">Date of Joining *</Label>
                  <Input
                    id="doj"
                    type="date"
                    value={formData.doj}
                    onChange={(e) => setFormData({ ...formData, doj: e.target.value })}
                    required
                  />
                </div>
                {formData.status === EmployeeStatus.Probation && (
                  <div>
                    <Label htmlFor="probation_end">Probation End Date</Label>
                    <Input
                      id="probation_end"
                      type="date"
                      value={formData.probation_end}
                      onChange={(e) => setFormData({ ...formData, probation_end: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active Employee</Label>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Updating...' : 'Update Employee'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/employees')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditEmployee;
