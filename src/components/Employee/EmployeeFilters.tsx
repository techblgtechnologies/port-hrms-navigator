
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  Users,
  Building,
  Briefcase
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { EmployeeType, EmployeeStatus } from '../../types';

interface EmployeeFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedFilters: {
    status: string[];
    department: string[];
    type_code: string[];
  };
  onFilterChange: (type: string, value: string) => void;
  onClearFilters: () => void;
  availableOptions: {
    departments: string[];
    statuses: string[];
    types: string[];
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount = Object.values(selectedFilters).reduce(
    (acc, filters) => acc + filters.length, 0
  );

  const removeFilter = (type: string, value: string) => {
    onFilterChange(type, value);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search and Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, employee code, email..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Users className="w-4 h-4 mr-2" />
                    Status
                    {selectedFilters.status.length > 0 && (
                      <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                        {selectedFilters.status.length}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Employee Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.values(EmployeeStatus).map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => onFilterChange('status', status)}
                      className="flex items-center justify-between"
                    >
                      <span>{status}</span>
                      {selectedFilters.status.includes(status) && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Type Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Type
                    {selectedFilters.type_code.length > 0 && (
                      <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                        {selectedFilters.type_code.length}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Employee Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.values(EmployeeType).map((type) => (
                    <DropdownMenuItem
                      key={type}
                      onClick={() => onFilterChange('type_code', type)}
                      className="flex items-center justify-between"
                    >
                      <span>{type}</span>
                      {selectedFilters.type_code.includes(type) && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Department Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Building className="w-4 h-4 mr-2" />
                    Department
                    {selectedFilters.department.length > 0 && (
                      <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                        {selectedFilters.department.length}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Departments</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {availableOptions.departments.map((dept) => (
                    <DropdownMenuItem
                      key={dept}
                      onClick={() => onFilterChange('department', dept)}
                      className="flex items-center justify-between"
                    >
                      <span>{dept}</span>
                      {selectedFilters.department.includes(dept) && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  onClick={onClearFilters}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedFilters.status.map((status) => (
                <Badge key={`status-${status}`} variant="secondary" className="flex items-center gap-1">
                  Status: {status}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-600" 
                    onClick={() => removeFilter('status', status)}
                  />
                </Badge>
              ))}
              {selectedFilters.type_code.map((type) => (
                <Badge key={`type-${type}`} variant="secondary" className="flex items-center gap-1">
                  Type: {type}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-600" 
                    onClick={() => removeFilter('type_code', type)}
                  />
                </Badge>
              ))}
              {selectedFilters.department.map((dept) => (
                <Badge key={`dept-${dept}`} variant="secondary" className="flex items-center gap-1">
                  Dept: {dept}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-600" 
                    onClick={() => removeFilter('department', dept)}
                  />
                </Badge>
              ))}
            </div>
          )}

          {/* Results Summary */}
          <div className="text-sm text-gray-600">
            Showing {filteredCount} of {totalCount} employees
            {activeFiltersCount > 0 && (
              <span className="ml-2 text-blue-600">
                ({activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied)
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
