
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  Users,
  Building,
  Award,
  Clock
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';

interface EmployeeFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<'status' | 'department' | 'classification'>('status');

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).reduce((count, filters) => count + filters.length, 0);
  };

  const getFilterColor = (type: string, value: string) => {
    switch (type) {
      case 'status':
        switch (value) {
          case 'Active': return 'bg-green-100 text-green-800 border-green-200';
          case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
          case 'Probation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
          default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
      case 'classification':
        switch (value) {
          case 'Executive': return 'bg-blue-100 text-blue-800 border-blue-200';
          case 'Non-Executive': return 'bg-purple-100 text-purple-800 border-purple-200';
          case 'Contract': return 'bg-orange-100 text-orange-800 border-orange-200';
          case 'Trainee': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
          default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const FilterSection = ({ type, options, icon: Icon }: { 
    type: keyof typeof selectedFilters; 
    options: string[]; 
    icon: any;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-gray-600" />
        <h4 className="font-medium text-gray-900 capitalize">{type}</h4>
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onFilterChange(type, option)}
            className={cn(
              "w-full text-left p-2 rounded-md border transition-colors text-sm",
              selectedFilters[type].includes(option)
                ? getFilterColor(type, option)
                : "border-gray-200 hover:bg-gray-50"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 sm:p-6">
        {/* Search and Filter Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search employees by name, ID, email, or department..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-2">
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "relative",
                    getActiveFiltersCount() > 0 && "border-blue-500 text-blue-700"
                  )}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {getActiveFiltersCount() > 0 && (
                    <Badge className="ml-2 bg-blue-600 text-white text-xs px-1.5 py-0.5">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Filter Employees</h3>
                    {getActiveFiltersCount() > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="text-red-600 hover:text-red-700"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>

                  {/* Mobile Filter Tabs */}
                  <div className="block sm:hidden mb-4">
                    <div className="flex border-b">
                      {[
                        { key: 'status' as const, label: 'Status', icon: Clock },
                        { key: 'department' as const, label: 'Dept', icon: Building },
                        { key: 'classification' as const, label: 'Class', icon: Award }
                      ].map(({ key, label, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => setActiveFilterTab(key)}
                          className={cn(
                            "flex-1 py-2 px-1 text-sm font-medium border-b-2 transition-colors",
                            activeFilterTab === key
                              ? "border-blue-600 text-blue-600"
                              : "border-transparent text-gray-500 hover:text-gray-700"
                          )}
                        >
                          <Icon className="w-4 h-4 mx-auto mb-1" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter Content */}
                  <div className="space-y-6">
                    {/* Desktop: Show all filters */}
                    <div className="hidden sm:block space-y-6">
                      <FilterSection 
                        type="status" 
                        options={availableOptions.statuses} 
                        icon={Clock}
                      />
                      <FilterSection 
                        type="department" 
                        options={availableOptions.departments} 
                        icon={Building}
                      />
                      <FilterSection 
                        type="classification" 
                        options={availableOptions.classifications} 
                        icon={Award}
                      />
                    </div>

                    {/* Mobile: Show active tab */}
                    <div className="block sm:hidden">
                      {activeFilterTab === 'status' && (
                        <FilterSection 
                          type="status" 
                          options={availableOptions.statuses} 
                          icon={Clock}
                        />
                      )}
                      {activeFilterTab === 'department' && (
                        <FilterSection 
                          type="department" 
                          options={availableOptions.departments} 
                          icon={Building}
                        />
                      )}
                      {activeFilterTab === 'classification' && (
                        <FilterSection 
                          type="classification" 
                          options={availableOptions.classifications} 
                          icon={Award}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-red-600 hover:text-red-700 px-2"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(selectedFilters).map(([type, filters]) =>
              filters.map((filter) => (
                <Badge
                  key={`${type}-${filter}`}
                  className={cn(
                    "text-xs border cursor-pointer hover:opacity-80",
                    getFilterColor(type, filter)
                  )}
                  onClick={() => onFilterChange(type, filter)}
                >
                  {filter}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))
            )}
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>
              Showing {filteredCount} of {totalCount} employees
            </span>
          </div>
          
          {filteredCount !== totalCount && (
            <span className="text-blue-600 font-medium">
              {((filteredCount / totalCount) * 100).toFixed(0)}% filtered
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
