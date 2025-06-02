
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Upload, BookOpen, Bell, Plus, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalStudents: 1247,
    totalClasses: 24,
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
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: Users },
                { id: 'students', name: 'Students', icon: Users },
                { id: 'results', name: 'Results', icon: BookOpen },
                { id: 'notifications', name: 'Notifications', icon: Bell }
              ].map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
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
                  <div className="text-3xl font-bold text-green-600 mb-2">{stats.resultsUploaded}</div>
                  <div className="text-gray-600">Results Uploaded</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{stats.pendingResults}</div>
                  <div className="text-gray-600">Pending Results</div>
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

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <Button className="meghis-gradient text-white">
                  <Plus size={16} className="mr-2" />
                  Add Student
                </Button>
                <Button variant="outline">
                  <Upload size={16} className="mr-2" />
                  Bulk Import
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="border border-gray-300 rounded-lg px-4 py-2 w-64"
                />
              </div>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Manage student accounts and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Student management interface will be implemented here</p>
                  <p className="text-sm">Features: Add, edit, delete students, manage classes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <Button className="meghis-yellow-gradient text-white">
                  <Upload size={16} className="mr-2" />
                  Upload Results
                </Button>
                <Button variant="outline">
                  <BookOpen size={16} className="mr-2" />
                  Generate Reports
                </Button>
              </div>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Results Management</CardTitle>
                <CardDescription>Upload and manage student results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Results management interface will be implemented here</p>
                  <p className="text-sm">Features: Upload individual/bulk results, generate reports</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button className="meghis-gradient text-white">
                <Bell size={16} className="mr-2" />
                Send Notification
              </Button>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Notification Center</CardTitle>
                <CardDescription>Send notifications to students and parents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Bell size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Notification management interface will be implemented here</p>
                  <p className="text-sm">Features: Send emails, SMS, in-app notifications</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
