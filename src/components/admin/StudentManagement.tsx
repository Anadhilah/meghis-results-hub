
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Upload, Edit, Trash2, User, Mail, Phone } from 'lucide-react';
import { Student } from '@/types/school';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data - in real app this would come from API
  const students: Student[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      studentId: 'STU001',
      email: 'sarah.johnson@email.com',
      phone: '+1234567890',
      parentEmail: 'parent1@email.com',
      parentPhone: '+1234567899',
      departmentId: '1',
      programId: '1',
      classId: '1',
      form: 'Form 3',
      profilePhoto: '',
      dateOfBirth: '2005-03-15',
      address: '123 Main St',
      guardianName: 'John Johnson',
      admissionDate: '2022-09-01',
      status: 'active'
    },
    {
      id: '2',
      name: 'Michael Chen',
      studentId: 'STU002',
      email: 'michael.chen@email.com',
      phone: '+1234567891',
      parentEmail: 'parent2@email.com',
      parentPhone: '+1234567898',
      departmentId: '1',
      programId: '1',
      classId: '2',
      form: 'Form 3',
      profilePhoto: '',
      dateOfBirth: '2005-05-20',
      address: '456 Oak Ave',
      guardianName: 'Lisa Chen',
      admissionDate: '2022-09-01',
      status: 'active'
    },
    {
      id: '3',
      name: 'Emily Davis',
      studentId: 'STU003',
      email: 'emily.davis@email.com',
      phone: '+1234567892',
      parentEmail: 'parent3@email.com',
      parentPhone: '+1234567897',
      departmentId: '2',
      programId: '3',
      classId: '3',
      form: 'Form 2',
      profilePhoto: '',
      dateOfBirth: '2006-01-10',
      address: '789 Pine St',
      guardianName: 'Robert Davis',
      admissionDate: '2023-09-01',
      status: 'suspended'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      case 'transferred': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClassLabel = (classId: string) => {
    // Mock class mapping - in real app this would come from API
    const classMap: { [key: string]: string } = {
      '1': 'Form 3A',
      '2': 'Form 3B',
      '3': 'Form 2A'
    };
    return classMap[classId] || 'Unknown';
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.classId === selectedClass;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="meghis-gradient text-white">
                <Plus size={16} className="mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>Create a new student account</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Student ID" />
                <Input placeholder="Email" />
                <Input placeholder="Phone" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Form 3A</SelectItem>
                    <SelectItem value="2">Form 3B</SelectItem>
                    <SelectItem value="3">Form 2A</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full meghis-gradient text-white">Add Student</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline">
            <Upload size={16} className="mr-2" />
            Bulk Import
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2 flex-1">
              <Search size={16} className="text-gray-400" />
              <Input
                placeholder="Search by name or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="1">Form 3A</SelectItem>
                <SelectItem value="2">Form 3B</SelectItem>
                <SelectItem value="3">Form 2A</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
                <SelectItem value="transferred">Transferred</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Students ({filteredStudents.length})</CardTitle>
          <CardDescription>Manage student accounts and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Class</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-meghis-blue text-white rounded-full flex items-center justify-center">
                          <User size={20} />
                        </div>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail size={14} className="mr-2 text-gray-400" />
                          {student.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone size={14} className="mr-2 text-gray-400" />
                          {student.phone}
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <Badge variant="outline">{getClassLabel(student.classId)}</Badge>
                    </td>
                    <td className="text-center py-4 px-4">
                      <Badge className={getStatusColor(student.status)}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit size={14} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 size={14} />
                        </Button>
                      </div>
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

export default StudentManagement;
