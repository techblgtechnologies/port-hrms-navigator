import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/Employees/EmployeeList';
import AddEmployee from './pages/Employees/AddEmployee';
import EmployeeProfile from './pages/Employees/EmployeeProfile';
import DepartmentList from './pages/Employees/DepartmentList';
import DesignationList from './pages/Employees/DesignationList';
import AddDepartment from './pages/Employees/AddDepartment';
import EditDepartment from './pages/Employees/EditDepartment';
import AddDesignation from './pages/Employees/AddDesignation';
import EditDesignation from './pages/Employees/EditDesignation';
import EditEmployee from './pages/Employees/EditEmployee';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <QueryClient>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/add" element={<AddDepartment />} />
          <Route path="/departments/:id/edit" element={<EditDepartment />} />
          <Route path="/designations" element={<DesignationList />} />
          <Route path="/designations/add" element={<AddDesignation />} />
          <Route path="/designations/:id/edit" element={<EditDesignation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </QueryClient>
  );
}

export default App;
