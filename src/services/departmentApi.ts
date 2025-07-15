
import { Department } from '../types';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface DepartmentResponse {
  departments: Department[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface CreateDepartmentRequest {
  name: string;
  head: string;
  description: string;
  parent_id?: string;
}

export interface UpdateDepartmentRequest {
  id: string;
  name: string;
  head: string;
  description: string;
  parent_id?: string;
}

export const departmentApi = {
  // Get all departments with pagination
  getDepartments: async (params: {
    page?: number;
    page_size?: number;
    search?: string;
    status?: string;
  } = {}): Promise<DepartmentResponse> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.page_size) searchParams.append('page_size', params.page_size.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.status) searchParams.append('status', params.status);

    const response = await fetch(`${API_BASE_URL}/departments?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-Tenant-Code': localStorage.getItem('tenant_code') || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch departments');
    }

    return response.json();
  },

  // Create new department
  createDepartment: async (data: CreateDepartmentRequest): Promise<Department> => {
    const response = await fetch(`${API_BASE_URL}/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-Tenant-Code': localStorage.getItem('tenant_code') || '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create department');
    }

    return response.json();
  },

  // Update department
  updateDepartment: async (data: UpdateDepartmentRequest): Promise<Department> => {
    const response = await fetch(`${API_BASE_URL}/departments/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-Tenant-Code': localStorage.getItem('tenant_code') || '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update department');
    }

    return response.json();
  },

  // Delete department
  deleteDepartment: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-Tenant-Code': localStorage.getItem('tenant_code') || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete department');
    }
  },

  // Get department by ID
  getDepartmentById: async (id: string): Promise<Department> => {
    const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-Tenant-Code': localStorage.getItem('tenant_code') || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch department');
    }

    return response.json();
  },
};
