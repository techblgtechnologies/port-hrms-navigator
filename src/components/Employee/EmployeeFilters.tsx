
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  Users, 
  Building, 
  Award,
  RotateCcw
} from 'lucide-react';

interface EmployeeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFilters: {
    status: string[];
    department: string[];
    classification: string[];
  };
  onFilterChange: (type: string, value: string) => void;
  onClearFilters: () => void;
  availableOptions: {
    departments: string[];
    statuses: string[];
    classifications: string[];
  };
  totalCount: number;
  filteredCount: number;
}

export const EmployeeFilters = ({
  searchTerm,
  onSearchChange,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  availableOptions,
  totalCount,
  filteredCount
}: EmployeeFiltersProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const hasActiveFilters = 
    selectedFilters.status.length > 0 ||
    selectedFilters.department.length > 0 ||
    selectedFilters.classification.length > 0;

  const removeFilter = (type: string, value: string) => {
    onFilterChange(type, value);
  };

  return (
    <div className="space-y-4">
      {/* Search and Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search employees by name, ID, email, or department..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={showAdvancedFilters ? "default" : "outline"}
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="whitespace-nowrap"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                {selectedFilters.status.length + selectedFilters.department.length + selectedFilters.classification.length}
              </Badge>
            )}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center text-sm text-gray-600">
        <Users className="w-4 h-4 mr-2" />
        Showing {filteredCount} of {totalCount} employees
        {hasActiveFilters && <span className="ml-1">(filtered)</span>}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.status.map(status => (
            <Badge key={status} variant="secondary" className="pr-1">
              Status: {status}
              <button
                onClick={() => removeFilter('status', status)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedFilters.department.map(dept => (
            <Badge key={dept} variant="secondary" className="pr-1">
              Dept: {dept}
              <button
                onClick={() => removeFilter('department', dept)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedFilters.classification.map(classification => (
            <Badge key={classification} variant="secondary" className="pr-1">
              Type: {classification}
              <button
                onClick={() => removeFilter('classification', classification)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Status
                </h4>
                <div className="space-y-2">
                  {availableOptions.statuses.map(status => (
                    <label key={status} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.status.includes(status)}
                        onChange={() => onFilterChange('status', status)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Department Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Department
                </h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {availableOptions.departments.map(dept => (
                    <label key={dept} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.department.includes(dept)}
                        onChange={() => onFilterChange('department', dept)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Classification Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Classification
                </h4>
                <div className="space-y-2">
                  {availableOptions.classifications.map(classification => (
                    <label key={classification} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.classification.includes(classification)}
                        onChange={() => onFilterChange('classification', classification)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{classification}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
