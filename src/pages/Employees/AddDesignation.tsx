
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Save, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AddDesignation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    level: '',
    is_active: true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
      
      toast({
        title: "Designation Created",
        description: `${formData.title} has been added successfully.`,
      });
      
      navigate('/designations');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create designation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-blue-600" />
              Add Designation
            </h1>
            <p className="text-gray-600 mt-2">Create a new designation</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/designations')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Designation Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Designation Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter designation title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select 
                    value={formData.level} 
                    onValueChange={(value) => setFormData({ ...formData, level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Level 1 - Executive</SelectItem>
                      <SelectItem value="2">Level 2 - Senior</SelectItem>
                      <SelectItem value="3">Level 3 - Junior</SelectItem>
                      <SelectItem value="4">Level 4 - Entry Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active Designation</Label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Creating...' : 'Create Designation'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/designations')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddDesignation;
