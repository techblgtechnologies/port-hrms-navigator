
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
import { toast } from '@/hooks/use-toast';

const AddEmployee = () => {
  const navigate = useNavigate();
  const { addEmployee } = useEmployeeStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    classification: 'Executive',
    basicSalary: '',
    joiningDate: new Date().toISOString().split('T')[0],
    address: '',
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
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

  const generateEmployeeId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `IPA-${year}-${randomNum}`;
  };

  const handleSubmit = () => {
    const newEmployee = {
      employeeId: generateEmployeeId(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      designation: formData.designation,
      classification: formData.classification as 'Executive' | 'Non-Executive' | 'Contract' | 'Trainee',
      status: 'Active' as const,
      joiningDate: formData.joiningDate,
      basicSalary: parseInt(formData.basicSalary) || 25000,
      address: formData.address,
      emergencyContact: formData.emergencyContact
    };
    
    addEmployee(newEmployee);
    toast({
      title: "Employee Added Successfully",
      description: `${formData.name} has been added to the system.`,
    });
    navigate('/employees');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter full address"
              />
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Emergency Contact</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <Input
                  value={formData.emergencyContact.name}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                  })}
                  placeholder="Emergency contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <Input
                  value={formData.emergencyContact.phone}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
                  })}
                  placeholder="Emergency contact phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                <Input
                  value={formData.emergencyContact.relation}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    emergencyContact: { ...formData.emergencyContact, relation: e.target.value }
                  })}
                  placeholder="Relationship (e.g., Spouse, Parent)"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                <option value="Operations">Operations</option>
                <option value="Engineering">Engineering</option>
                <option value="Finance">Finance</option>
                <option value="HR">Human Resources</option>
                <option value="Security">Security</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <Input
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="Enter designation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Classification</label>
              <select
                value={formData.classification}
                onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Executive">Executive</option>
                <option value="Non-Executive">Non-Executive</option>
                <option value="Contract">Contract</option>
                <option value="Trainee">Trainee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
              <Input
                type="date"
                value={formData.joiningDate}
                onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
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
                  <span className="text-sm text-gray-600">Name:</span>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Department:</span>
                  <p className="font-medium">{formData.department}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Designation:</span>
                  <p className="font-medium">{formData.designation}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Classification:</span>
                  <Badge>{formData.classification}</Badge>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Basic Salary:</span>
                  <p className="font-medium">₹{formData.basicSalary}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Address:</span>
                  <p className="font-medium">{formData.address}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Emergency Contact:</span>
                  <p className="font-medium">{formData.emergencyContact.name} ({formData.emergencyContact.relation})</p>
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
