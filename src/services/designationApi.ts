
export interface Designation {
  id: string;
  name: string;
  level: number;
  description: string;
  department_id?: string;
  employee_count: number;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface DesignationResponse {
  designations: Designation[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface CreateDesignationRequest {
  name: string;
  level: number;
  description: string;
  department_id?: string;
}

export interface UpdateDesignationRequest {
  id: string;
  name: string;
  level: number;
  description: string;
  department_id?: string;
}

export const designationApi = {
  // Get all designations with pagination
  getDesignations: async (params: {
    page?: number;
    page_size?: number;
    search?: string;
    level?: number;
    department_id?: string;
  } = {}): Promise<DesignationResponse> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.page_size) searchParams.append('page_size', params.page_size.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.level) searchParams.append('level', params.level.toString());
    if (params.department_id) searchParams.append('department_id', params.department_id);

    const response = await fetch(`${API_BASE_URL}/designations?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-Tenant-Code': localStorage.getItem('tenant_code') || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch designations');
    }

    return response.json();
  },

  // Create new designation
  createDesignation: async (data: CreateDesignationRequest): Promise<Designation> => {
    const response = await fetch(`${API_BASE_URL}/designations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-Tenant-Code': localStorage.getItem('tenant_code') || '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create designation');
    }

    return response.json();
  },

  // Update designation
  updateDesignation: async (data: UpdateDesignationRequest): Promise<Designation> => {
    const response = await fetch(`${API_BASE_URL}/designations/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-Tenant-Code': localStorage.getItem('tenant_code') || '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update designation');
    }

    return response.json();
  },

  // Delete designation
  deleteDesignation: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/designations/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-Tenant-Code': localStorage.getItem('tenant_code') || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete designation');
    }
  },

  // Get designation by ID
  getDesignationById: async (id: string): Promise<Designation> => {
    const response = await fetch(`${API_BASE_URL}/designations/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-Tenant-Code': localStorage.getItem('tenant_code') || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch designation');
    }

    return response.json();
  },
};
