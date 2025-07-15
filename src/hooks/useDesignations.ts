
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { designationApi, DesignationResponse, CreateDesignationRequest, UpdateDesignationRequest, Designation } from '../services/designationApi';
import { toast } from './use-toast';

// Query keys
export const designationKeys = {
  all: ['designations'] as const,
  lists: () => [...designationKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...designationKeys.lists(), filters] as const,
  details: () => [...designationKeys.all, 'detail'] as const,
  detail: (id: string) => [...designationKeys.details(), id] as const,
};

// Get designations with pagination and filters
export const useDesignations = (params: {
  page?: number;
  page_size?: number;
  search?: string;
  level?: number;
  department_id?: string;
} = {}) => {
  return useQuery({
    queryKey: designationKeys.list(params),
    queryFn: () => designationApi.getDesignations(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get designation by ID
export const useDesignation = (id: string) => {
  return useQuery({
    queryKey: designationKeys.detail(id),
    queryFn: () => designationApi.getDesignationById(id),
    enabled: !!id,
  });
};

// Create designation mutation
export const useCreateDesignation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDesignationRequest) => designationApi.createDesignation(data),
    onSuccess: (newDesignation) => {
      // Invalidate and refetch designations list
      queryClient.invalidateQueries({ queryKey: designationKeys.lists() });
      
      toast({
        title: "Designation Created",
        description: `${newDesignation.name} has been added successfully.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create designation",
        variant: "destructive",
      });
    },
  });
};

// Update designation mutation
export const useUpdateDesignation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDesignationRequest) => designationApi.updateDesignation(data),
    onSuccess: (updatedDesignation) => {
      // Update specific designation in cache
      queryClient.setQueryData(
        designationKeys.detail(updatedDesignation.id),
        updatedDesignation
      );
      
      // Invalidate designations list
      queryClient.invalidateQueries({ queryKey: designationKeys.lists() });
      
      toast({
        title: "Designation Updated",
        description: `${updatedDesignation.name} has been updated successfully.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update designation",
        variant: "destructive",
      });
    },
  });
};

// Delete designation mutation
export const useDeleteDesignation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => designationApi.deleteDesignation(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: designationKeys.detail(deletedId) });
      
      // Invalidate designations list
      queryClient.invalidateQueries({ queryKey: designationKeys.lists() });
      
      toast({
        title: "Designation Deleted",
        description: "Designation has been removed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete designation",
        variant: "destructive",
      });
    },
  });
};
