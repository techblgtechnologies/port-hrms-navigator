import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Building, 
  DollarSign,
  FileText
} from 'lucide-react';
import { useEmployeeStore } from '../../stores/employeeStore';
import { EmployeeType, EmployeeStatus } from '../../types';
import { toast } from '@/hooks/use-toast';

const AddEmployee = () => {
  const navigate = useNavigate();
  const { addEmployee } = useEmployeeStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    emp_code: '',
    type_code: EmployeeType.Regular,
    first_name: '',
    last_name: '',
    phone: '',
    dob: '',
    doj: new Date().toISOString().split('T')[0],
    status: EmployeeStatus.Probation,
    probation_end: '',
    department_id: '',
    designation_id: '',
    is_active: true,
    basicSalary: ''
  });

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Job Details', icon: Building },
    { id: 3, title: 'Salary Config', icon: DollarSign },
    { id: 4, title: 'Review', icon: FileText }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateEmployeeCode = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `EMP-${year}-${randomNum}`;
  };

  const handleSubmit = () => {
    const newEmployee = {
      username: formData.username,
      email: formData.email,
      emp_code: formData.emp_code || generateEmployeeCode(),
      type_code: formData.type_code,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      dob: formData.dob,
      doj: formData.doj,
      status: formData.status,
      probation_end: formData.probation_end,
      department_id: formData.department_id,
      designation_id: formData.designation_id,
      is_active: formData.is_active,
      // Computed properties for backward compatibility
      get name() { return `${this.first_name} ${this.last_name}`; },
      // UI compatibility properties
      joiningDate: formData.doj,
      basicSalary: parseInt(formData.basicSalary) || 25000,
      classification: 'Executive',
      employeeId: formData.emp_code || generateEmployeeCode()
    };
    
    addEmployee(newEmployee);
    toast({
      title: "Employee Added Successfully",
      description: `${formData.first_name} ${formData.last_name} has been added to the system.`,
    });
    navigate('/employees');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <Input
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <Input
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <Input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <Input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee Code</label>
              <Input
                value={formData.emp_code}
                onChange={(e) => setFormData({ ...formData, emp_code: e.target.value })}
                placeholder="Enter employee code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee Type</label>
              <select
                value={formData.type_code}
                onChange={(e) => setFormData({ ...formData, type_code: e.target.value as EmployeeType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(EmployeeType).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as EmployeeStatus })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(EmployeeStatus).map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
              <Input
                type="date"
                value={formData.doj}
                onChange={(e) => setFormData({ ...formData, doj: e.target.value })}
              />
            </div>
            {formData.status === EmployeeStatus.Probation && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Probation End Date</label>
                <Input
                  type="date"
                  value={formData.probation_end}
                  onChange={(e) => setFormData({ ...formData, probation_end: e.target.value })}
                />
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
              <Input
                value={formData.department_id}
                onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                placeholder="Enter department ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation ID</label>
              <Input
                value={formData.designation_id}
                onChange={(e) => setFormData({ ...formData, designation_id: e.target.value })}
                placeholder="Enter designation ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary (INR)</label>
              <Input
                type="number"
                value={formData.basicSalary}
                onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })}
                placeholder="Enter basic salary"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Salary Breakdown Preview</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Basic Salary:</span>
                  <span>₹{formData.basicSalary || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span>HRA (30%):</span>
                  <span>₹{Math.round((parseInt(formData.basicSalary) || 0) * 0.3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>DA (20%):</span>
                  <span>₹{Math.round((parseInt(formData.basicSalary) || 0) * 0.2)}</span>
                </div>
                <div className="flex justify-between font-medium text-blue-900 border-t pt-1">
                  <span>Gross Salary:</span>
                  <span>₹{Math.round((parseInt(formData.basicSalary) || 0) * 1.5)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Review Employee Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">First Name:</span>
                  <p className="font-medium">{formData.first_name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Name:</span>
                  <p className="font-medium">{formData.last_name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Username:</span>
                  <p className="font-medium">{formData.username}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Employee Code:</span>
                  <p className="font-medium">{formData.emp_code}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Employee Type:</span>
                  <p className="font-medium">{formData.type_code}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <p className="font-medium">{formData.status}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Joining Date:</span>
                  <p className="font-medium">{formData.doj}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Basic Salary:</span>
                  <p className="font-medium">₹{formData.basicSalary}</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <UserPlus className="h-8 w-8 mr-3 text-blue-600" />
              Add New Employee
            </h1>
            <p className="text-gray-600 mt-2">Create a new employee profile with complete details</p>
          </div>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      Step {step.id}
                    </p>
                    <p className={`text-xs ${
                      currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-px mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              {currentStep < 4 ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  Create Employee
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddEmployee;
