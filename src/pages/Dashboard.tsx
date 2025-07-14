
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Calendar, AlertTriangle, Building, UserPlus, TrendingUp, TrendingDown } from 'lucide-react';
import { useEmployeeStore } from '../stores/employeeStore';
import { useAttendanceStore } from '../stores/attendanceStore';
import { DashboardStats } from '../types';
import { MainLayout } from '../components/Layout/MainLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { employees, departments } = useEmployeeStore();
  const { records } = useAttendanceStore();
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    presentToday: 0,
    onLeave: 0,
    pendingApprovals: 0,
    totalDepartments: 0,
    newJoinersThisMonth: 0
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const presentToday = records.filter(r => r.date === today && r.status === 'Present').length;
    const onLeave = records.filter(r => r.date === today && r.status === 'Absent').length;
    const thisMonth = new Date().getMonth();
    const newJoinersThisMonth = employees.filter(emp => 
      new Date(emp.joiningDate).getMonth() === thisMonth
    ).length;

    setStats({
      totalEmployees: employees.length,
      presentToday,
      onLeave,
      pendingApprovals: 12, // Mock data
      totalDepartments: departments.length,
      newJoinersThisMonth
    });
  }, [employees, departments, records]);

  // Mock chart data
  const attendanceData = [
    { name: 'Mon', present: 45, absent: 5 },
    { name: 'Tue', present: 48, absent: 2 },
    { name: 'Wed', present: 46, absent: 4 },
    { name: 'Thu', present: 49, absent: 1 },
    { name: 'Fri', present: 47, absent: 3 },
    { name: 'Sat', present: 25, absent: 25 },
    { name: 'Sun', present: 0, absent: 50 }
  ];

  const departmentData = departments.map(dept => ({
    name: dept.name,
    employees: dept.employeeCount
  }));

  const COLORS = ['#0369a1', '#0ea5e9', '#38bdf8', '#7dd3fc'];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your HR operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmployees}</div>
              <p className="text-xs text-blue-100 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{stats.newJoinersThisMonth} this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.presentToday}</div>
              <p className="text-xs text-green-100">
                {Math.round((stats.presentToday / stats.totalEmployees) * 100)}% attendance rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.onLeave}</div>
              <p className="text-xs text-orange-100">
                {Math.round((stats.onLeave / stats.totalEmployees) * 100)}% of workforce
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertTriangle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
              <p className="text-xs text-red-100">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Weekly Attendance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="present" stroke="#0369a1" strokeWidth={2} />
                  <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                Department Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="employees"
                    label={({name, value}) => `${name}: ${value}`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Rajesh Kumar punched in</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                  <Badge variant="secondary">Operations</Badge>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <UserPlus className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New employee onboarded</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                  <Badge variant="secondary">HR</Badge>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Leave request pending approval</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                  <Badge variant="secondary">Leave</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{dept.name}</p>
                      <p className="text-xs text-gray-500">{dept.head}</p>
                    </div>
                    <Badge variant="outline">{dept.employeeCount}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
