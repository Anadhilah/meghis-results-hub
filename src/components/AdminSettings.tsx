
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Settings, Users, Bell, Activity, Shield, Building, Palette, AlertTriangle, Download } from 'lucide-react';

const AdminSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [studentSelfRegistration, setStudentSelfRegistration] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Dr. Patricia Mensah',
    email: 'patricia.mensah@meghis.edu.gh',
    phone: '+233 20 123 4567',
    role: 'Super Administrator'
  });

  const [schoolInfo, setSchoolInfo] = useState({
    name: 'Meghis Senior High School',
    address: 'P.O. Box 123, Accra, Ghana',
    phone: '+233 30 123 4567',
    email: 'info@meghis.edu.gh',
    website: 'www.meghis.edu.gh',
    currentTerm: '2023/2024 - Semester 2',
    termStartDate: '2024-01-15',
    termEndDate: '2024-06-15'
  });

  const [gradingSystem, setGradingSystem] = useState([
    { grade: 'A', minScore: 80, maxScore: 100, points: 4.0, remark: 'Excellent' },
    { grade: 'B', minScore: 70, maxScore: 79, points: 3.0, remark: 'Very Good' },
    { grade: 'C', minScore: 60, maxScore: 69, points: 2.0, remark: 'Good' },
    { grade: 'D', minScore: 50, maxScore: 59, points: 1.0, remark: 'Satisfactory' },
    { grade: 'E', minScore: 40, maxScore: 49, points: 0.5, remark: 'Weak' },
    { grade: 'F', minScore: 0, maxScore: 39, points: 0.0, remark: 'Fail' }
  ]);

  const adminUsers = [
    { name: 'Dr. Patricia Mensah', role: 'Super Admin', email: 'patricia.mensah@meghis.edu.gh', status: 'Active', lastLogin: '2 hours ago' },
    { name: 'Mr. Kwame Asante', role: 'Academic Admin', email: 'kwame.asante@meghis.edu.gh', status: 'Active', lastLogin: '1 day ago' },
    { name: 'Mrs. Akosua Osei', role: 'Department Head - Science', email: 'akosua.osei@meghis.edu.gh', status: 'Active', lastLogin: '3 hours ago' },
    { name: 'Mr. Samuel Adjei', role: 'Teacher - Mathematics', email: 'samuel.adjei@meghis.edu.gh', status: 'Inactive', lastLogin: '1 week ago' }
  ];

  const systemLogs = [
    { action: 'Result Upload', user: 'Mr. Kwame Asante', details: 'Uploaded Mathematics results for Form 2A', timestamp: '2024-01-15 14:30:00', type: 'success' },
    { action: 'Student Login', user: 'Sarah Johnson (STU001)', details: 'Student logged in successfully', timestamp: '2024-01-15 14:25:00', type: 'info' },
    { action: 'Admin Login', user: 'Dr. Patricia Mensah', details: 'Super admin logged in', timestamp: '2024-01-15 14:20:00', type: 'info' },
    { action: 'Failed Login', user: 'Unknown', details: 'Failed login attempt with student ID: STU999', timestamp: '2024-01-15 14:15:00', type: 'warning' },
    { action: 'System Update', user: 'System', details: 'Grading system configuration updated', timestamp: '2024-01-15 14:10:00', type: 'info' }
  ];

  const handleProfileUpdate = () => {
    console.log('Admin profile updated:', profileData);
  };

  const handleSchoolInfoUpdate = () => {
    console.log('School information updated:', schoolInfo);
  };

  const handleGradingSystemUpdate = () => {
    console.log('Grading system updated:', gradingSystem);
  };

  const handleExportLogs = () => {
    console.log('Exporting system logs...');
    // In real app, this would generate and download a CSV file
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-meghis-blue mb-2">Admin Settings</h1>
        <p className="text-gray-600">Manage system configuration and user access</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center space-x-1">
            <User size={14} />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-1">
            <Settings size={14} />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-1">
            <Users size={14} />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-1">
            <Bell size={14} />
            <span className="hidden sm:inline">Notify</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center space-x-1">
            <Activity size={14} />
            <span className="hidden sm:inline">Logs</span>
          </TabsTrigger>
          <TabsTrigger value="school" className="flex items-center space-x-1">
            <Building size={14} />
            <span className="hidden sm:inline">School</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User size={20} />
                <span>Admin Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-xl">PM</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-sm text-gray-500 mt-2">Max file size: 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Full Name</Label>
                  <Input
                    id="adminName"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email Address</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPhone">Phone Number</Label>
                  <Input
                    id="adminPhone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminRole">Role</Label>
                  <Input
                    id="adminRole"
                    value={profileData.role}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <Button onClick={handleProfileUpdate}>Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="system">
          <div className="space-y-6">
            {/* Grading System */}
            <Card>
              <CardHeader>
                <CardTitle>Grading System Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gradingSystem.map((grade, index) => (
                    <div key={grade.grade} className="grid grid-cols-6 gap-2 items-center">
                      <Input value={grade.grade} readOnly className="text-center font-bold" />
                      <Input 
                        type="number" 
                        value={grade.minScore} 
                        onChange={(e) => {
                          const newSystem = [...gradingSystem];
                          newSystem[index].minScore = parseInt(e.target.value);
                          setGradingSystem(newSystem);
                        }}
                      />
                      <Input 
                        type="number" 
                        value={grade.maxScore}
                        onChange={(e) => {
                          const newSystem = [...gradingSystem];
                          newSystem[index].maxScore = parseInt(e.target.value);
                          setGradingSystem(newSystem);
                        }}
                      />
                      <Input 
                        type="number" 
                        step="0.1"
                        value={grade.points}
                        onChange={(e) => {
                          const newSystem = [...gradingSystem];
                          newSystem[index].points = parseFloat(e.target.value);
                          setGradingSystem(newSystem);
                        }}
                      />
                      <Input 
                        value={grade.remark}
                        onChange={(e) => {
                          const newSystem = [...gradingSystem];
                          newSystem[index].remark = e.target.value;
                          setGradingSystem(newSystem);
                        }}
                      />
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  ))}
                </div>
                <Button onClick={handleGradingSystemUpdate} className="mt-4">Update Grading System</Button>
              </CardContent>
            </Card>

            {/* System Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle size={20} />
                  <span>System Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-gray-500">Disable student login temporarily</p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Student Self-Registration</p>
                    <p className="text-sm text-gray-500">Allow students to create their own accounts</p>
                  </div>
                  <Switch
                    checked={studentSelfRegistration}
                    onCheckedChange={setStudentSelfRegistration}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>User Management</span>
                </CardTitle>
                <Button>Add New Admin</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Last login: {user.lastLogin}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Permissions</Button>
                        {user.status === 'Active' ? (
                          <Button variant="outline" size="sm" className="text-red-600">Suspend</Button>
                        ) : (
                          <Button variant="outline" size="sm" className="text-green-600">Activate</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell size={20} />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Global Email Notifications</p>
                  <p className="text-sm text-gray-500">Enable system-wide email notifications</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Enable SMS alerts for critical updates</p>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Announcement Templates</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Results Published Template</Label>
                    <Textarea 
                      placeholder="Your results for {semester} have been published. Log in to view your grades."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>General Announcement Template</Label>
                    <Textarea 
                      placeholder="Dear students, {announcement_text}"
                      className="mt-2"
                    />
                  </div>
                </div>
                <Button>Save Templates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Activity size={20} />
                  <span>System Logs</span>
                </CardTitle>
                <Button onClick={handleExportLogs} className="flex items-center space-x-2">
                  <Download size={16} />
                  <span>Export CSV</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="login">Login Activities</SelectItem>
                      <SelectItem value="upload">Result Uploads</SelectItem>
                      <SelectItem value="system">System Changes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="date" className="w-48" />
                  <Input type="date" className="w-48" />
                </div>

                <div className="space-y-2">
                  {systemLogs.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          log.type === 'success' ? 'bg-green-500' : 
                          log.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          <p className="text-xs text-gray-500">by {log.user}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{log.timestamp}</p>
                        <Badge variant="outline" className="mt-1">
                          {log.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* School Info Tab */}
        <TabsContent value="school">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building size={20} />
                <span>School Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={schoolInfo.name}
                    onChange={(e) => setSchoolInfo({...schoolInfo, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolPhone">Phone Number</Label>
                  <Input
                    id="schoolPhone"
                    value={schoolInfo.phone}
                    onChange={(e) => setSchoolInfo({...schoolInfo, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolEmail">Email Address</Label>
                  <Input
                    id="schoolEmail"
                    type="email"
                    value={schoolInfo.email}
                    onChange={(e) => setSchoolInfo({...schoolInfo, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolWebsite">Website</Label>
                  <Input
                    id="schoolWebsite"
                    value={schoolInfo.website}
                    onChange={(e) => setSchoolInfo({...schoolInfo, website: e.target.value})}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="schoolAddress">Address</Label>
                  <Textarea
                    id="schoolAddress"
                    value={schoolInfo.address}
                    onChange={(e) => setSchoolInfo({...schoolInfo, address: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentTerm">Current Term</Label>
                  <Input
                    id="currentTerm"
                    value={schoolInfo.currentTerm}
                    onChange={(e) => setSchoolInfo({...schoolInfo, currentTerm: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="termStart">Term Start Date</Label>
                  <Input
                    id="termStart"
                    type="date"
                    value={schoolInfo.termStartDate}
                    onChange={(e) => setSchoolInfo({...schoolInfo, termStartDate: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="termEnd">Term End Date</Label>
                  <Input
                    id="termEnd"
                    type="date"
                    value={schoolInfo.termEndDate}
                    onChange={(e) => setSchoolInfo({...schoolInfo, termEndDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">School Logo</h4>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-meghis-blue rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                    M
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Upload New Logo</Button>
                    <p className="text-sm text-gray-500 mt-2">Recommended: 200x200px, PNG/JPG</p>
                  </div>
                </div>
              </div>

              <Button onClick={handleSchoolInfoUpdate}>Update School Information</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
