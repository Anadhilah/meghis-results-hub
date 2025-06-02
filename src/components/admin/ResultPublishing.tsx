
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Eye, Users, Mail, MessageSquare, Bell } from 'lucide-react';

const ResultPublishing = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [notificationMethods, setNotificationMethods] = useState({
    email: true,
    sms: false,
    inApp: true
  });

  // Mock data
  const classes = [
    { id: '1', name: 'Form 12A', students: 35, resultsReady: true },
    { id: '2', name: 'Form 12B', students: 32, resultsReady: true },
    { id: '3', name: 'Form 11A', students: 38, resultsReady: false },
    { id: '4', name: 'Form 11B', students: 36, resultsReady: true }
  ];

  const publishedResults = [
    {
      id: '1',
      class: 'Form 12A',
      semester: '2023/2024 - Semester 2',
      publishedAt: '2024-01-15',
      studentsNotified: 35,
      totalStudents: 35,
      status: 'published'
    },
    {
      id: '2',
      class: 'Form 12B',
      semester: '2023/2024 - Semester 2',
      publishedAt: '2024-01-14',
      studentsNotified: 30,
      totalStudents: 32,
      status: 'published'
    }
  ];

  const handlePublishResults = () => {
    console.log('Publishing results for:', { selectedClass, selectedSemester, notificationMethods });
  };

  const handleSendNotification = () => {
    console.log('Sending notification with methods:', notificationMethods);
  };

  return (
    <div className="space-y-6">
      {/* Publish Results Section */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send size={24} className="text-meghis-blue" />
            Publish Results
          </CardTitle>
          <CardDescription>Make student results available and send notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id} disabled={!cls.resultsReady}>
                      {cls.name} ({cls.students} students) {!cls.resultsReady && '- Results Not Ready'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Semester</label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024-sem2">2023/2024 - Semester 2</SelectItem>
                  <SelectItem value="2023-2024-sem1">2023/2024 - Semester 1</SelectItem>
                  <SelectItem value="2022-2023-sem2">2022/2023 - Semester 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Notification Methods</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email"
                  checked={notificationMethods.email}
                  onCheckedChange={(checked) => setNotificationMethods(prev => ({ ...prev, email: checked as boolean }))}
                />
                <Mail size={16} className="text-gray-500" />
                <label htmlFor="email" className="text-sm">Email notifications to students and parents</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sms"
                  checked={notificationMethods.sms}
                  onCheckedChange={(checked) => setNotificationMethods(prev => ({ ...prev, sms: checked as boolean }))}
                />
                <MessageSquare size={16} className="text-gray-500" />
                <label htmlFor="sms" className="text-sm">SMS notifications</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="inApp"
                  checked={notificationMethods.inApp}
                  onCheckedChange={(checked) => setNotificationMethods(prev => ({ ...prev, inApp: checked as boolean }))}
                />
                <Bell size={16} className="text-gray-500" />
                <label htmlFor="inApp" className="text-sm">In-app notifications</label>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={handlePublishResults}
              disabled={!selectedClass || !selectedSemester}
              className="meghis-gradient text-white"
            >
              <Send size={16} className="mr-2" />
              Publish Results & Notify
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye size={16} className="mr-2" />
                  Preview Notification
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notification Preview</DialogTitle>
                  <DialogDescription>Preview how the notification will look</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Your Results Are Now Available!</h4>
                    <p className="text-blue-800 mt-2">
                      Dear Student, your results for {selectedSemester} have been published. 
                      Log in to your portal to view your performance.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Class Status Overview */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Class Status Overview</CardTitle>
          <CardDescription>Current status of results for each class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {classes.map((cls) => (
              <Card key={cls.id} className="text-center">
                <CardContent className="p-4">
                  <div className="text-lg font-semibold">{cls.name}</div>
                  <div className="text-2xl font-bold text-meghis-blue my-2">{cls.students}</div>
                  <div className="text-sm text-gray-600">Students</div>
                  <Badge className={cls.resultsReady ? 'bg-green-100 text-green-800 mt-2' : 'bg-yellow-100 text-yellow-800 mt-2'}>
                    {cls.resultsReady ? 'Results Ready' : 'Pending'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Published Results History */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Recently Published Results</CardTitle>
          <CardDescription>History of published results and notification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Class</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Semester</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Published Date</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Notifications</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {publishedResults.map((result) => (
                  <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium">{result.class}</td>
                    <td className="py-4 px-4">{result.semester}</td>
                    <td className="text-center py-4 px-4">{result.publishedAt}</td>
                    <td className="text-center py-4 px-4">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium">{result.studentsNotified}/{result.totalStudents}</span>
                        <span className="text-xs text-gray-500">notified</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleSendNotification}
                        disabled={result.studentsNotified === result.totalStudents}
                      >
                        <Users size={14} className="mr-1" />
                        Resend
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPublishing;
