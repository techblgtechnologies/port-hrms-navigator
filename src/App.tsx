
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/Employees/EmployeeList";
import AddEmployee from "./pages/Employees/AddEmployee";
import EmployeeProfile from "./pages/Employees/EmployeeProfile";
import DepartmentList from "./pages/Employees/DepartmentList";
import DesignationList from "./pages/Employees/DesignationList";
import AttendanceOverview from "./pages/Attendance/AttendanceOverview";
import PayrollDashboard from "./pages/Payroll/PayrollDashboard";
import LeaveManagement from "./pages/Leave/LeaveManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Employee Management Routes */}
          <Route path="/employees" element={
            <ProtectedRoute requiredPermissions={['employees.read']}>
              <EmployeeList />
            </ProtectedRoute>
          } />
          
          <Route path="/employees/add" element={
            <ProtectedRoute requiredPermissions={['employees.create']}>
              <AddEmployee />
            </ProtectedRoute>
          } />
          
          <Route path="/employees/:id" element={
            <ProtectedRoute requiredPermissions={['employees.read']}>
              <EmployeeProfile />
            </ProtectedRoute>
          } />
          
          {/* Department Management Routes */}
          <Route path="/departments" element={
            <ProtectedRoute requiredPermissions={['departments.read']}>
              <DepartmentList />
            </ProtectedRoute>
          } />
          
          {/* Designation Management Routes */}
          <Route path="/designations" element={
            <ProtectedRoute requiredPermissions={['designations.read']}>
              <DesignationList />
            </ProtectedRoute>
          } />
          
          {/* Attendance Routes */}
          <Route path="/attendance" element={
            <ProtectedRoute requiredPermissions={['attendance.read']}>
              <AttendanceOverview />
            </ProtectedRoute>
          } />
          
          {/* Payroll Routes */}
          <Route path="/payroll" element={
            <ProtectedRoute requiredPermissions={['payroll.read']}>
              <PayrollDashboard />
            </ProtectedRoute>
          } />
          
          {/* Leave Management Routes */}
          <Route path="/leave" element={
            <ProtectedRoute requiredPermissions={['leave.read']}>
              <LeaveManagement />
            </ProtectedRoute>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
