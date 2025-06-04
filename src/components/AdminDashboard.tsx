import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Upload, BookOpen, Bell, Plus, Search, Building, GraduationCap, Book, Send, BarChart3, UserCheck } from 'lucide-react';
import DepartmentManagement from './admin/DepartmentManagement';
import ClassManagement from './admin/ClassManagement';
import SubjectManagement from './admin/SubjectManagement';
import ResultEntry from './admin/ResultEntry';
import GradingSystem from './admin/GradingSystem';
import AdminRoles from './admin/AdminRoles';
import StudentManagement from './admin/StudentManagement';
import ResultPublishing from './admin/ResultPublishing';
import Analytics from './admin/Analytics';
import AnnouncementManager from './admin/AnnouncementManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalStudents: 1247,
    totalClasses: 24,
    totalDepartments: 5,
    totalSubjects: 45,
    currentSemester: '2023/2024 - Semester 2',
    resultsUploaded: 856,
    pendingResults: 391
  };

  const recentActivities = [
    { action: 'Results uploaded for Class 12A Mathematics', time: '2 hours ago', type: 'success' },
    { action: 'New student registered: John Doe (STU2024001)', time: '4 hours ago', type: 'info' },
    { action: 'Results notification sent to 125 students', time: '1 day ago', type: 'success' },
    { action: 'Grade report generated for Physics Department', time: '2 days ago', type: 'info' }
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', class: '12A', average: 96.5 },
    { name: 'Michael Chen', class: '12B', average: 94.8 },
    { name: 'Emily Davis', class: '11A', average: 93.2 },
    { name: 'David Wilson', class: '12A', average: 92.7 },
    { name: 'Lisa Thompson', class: '11B', average: 91.9 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-meghis-blue mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage students, results, and school data</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', name: 'Overview', icon: Users },
                { id: 'departments', name: 'Departments', icon: Building },
                { id: 'classes', name: 'Classes', icon: GraduationCap },
                { id: 'subjects', name: 'Subjects', icon: Book },
                { id: 'students', name: 'Students', icon: UserCheck },
                { id: 'result-entry', name: 'Result Entry', icon: Upload },
                { id: 'result-publishing', name: 'Publish Results', icon: Send },
                { id: 'analytics', name: 'Analytics', icon: BarChart3 },
                { id: 'grading', name: 'Grading System', icon: BookOpen },
                { id: 'admin-roles', name: 'Admin Roles', icon: Users },
                { id: 'announcements', name: 'Announcements', icon: Bell }
              ].map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === id
                      ? 'border-meghis-blue text-meghis-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  <span>{name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-meghis-blue mb-2">{stats.totalStudents}</div>
                  <div className="text-gray-600">Total Students</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-meghis-yellow mb-2">{stats.totalClasses}</div>
                  <div className="text-gray-600">Total Classes</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalDepartments}</div>
                  <div className="text-gray-600">Departments</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalSubjects}</div>
                  <div className="text-gray-600">Subjects</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-meghis-blue">Recent Activities</CardTitle>
                  <CardDescription>Latest actions and updates in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-meghis-blue">Top Performers</CardTitle>
                  <CardDescription>Students with highest averages this semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers.map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-meghis-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">Class {student.class}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {student.average}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && <DepartmentManagement />}

        {/* Classes Tab */}
        {activeTab === 'classes' && <ClassManagement />}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && <SubjectManagement />}

        {/* Students Tab */}
        {activeTab === 'students' && <StudentManagement />}

        {/* Result Entry Tab */}
        {activeTab === 'result-entry' && <ResultEntry />}

        {/* Result Publishing Tab */}
        {activeTab === 'result-publishing' && <ResultPublishing />}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && <Analytics />}

        {/* Grading System Tab */}
        {activeTab === 'grading' && <GradingSystem />}

        {/* Admin Roles Tab */}
        {activeTab === 'admin-roles' && <AdminRoles />}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && <AnnouncementManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;
