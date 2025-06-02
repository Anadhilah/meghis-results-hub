
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Users, GraduationCap } from 'lucide-react';
import { ClassLevel } from '@/types/school';

const ClassManagement = () => {
  const [classes, setClasses] = useState<ClassLevel[]>([
    {
      id: '1',
      form: 'Form 1',
      track: 'Science A',
      departmentId: '1',
      programId: '1',
      capacity: 40,
      currentEnrollment: 35
    },
    {
      id: '2',
      form: 'Form 1',
      track: 'Science B',
      departmentId: '1',
      programId: '1',
      capacity: 40,
      currentEnrollment: 38
    },
    {
      id: '3',
      form: 'Form 2',
      track: 'Arts A',
      departmentId: '2',
      programId: '3',
      capacity: 35,
      currentEnrollment: 32
    },
    {
      id: '4',
      form: 'Form 3',
      track: 'Business A',
      departmentId: '3',
      programId: '5',
      capacity: 30,
      currentEnrollment: 28
    },
    {
      id: '5',
      form: 'Form 2',
      track: 'Technical A',
      departmentId: '4',
      programId: '7',
      capacity: 25,
      currentEnrollment: 22
    }
  ]);

  const getEnrollmentStatus = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return { color: 'bg-red-100 text-red-800', status: 'Full' };
    if (percentage >= 75) return { color: 'bg-yellow-100 text-yellow-800', status: 'High' };
    return { color: 'bg-green-100 text-green-800', status: 'Available' };
  };

  const getDepartmentName = (departmentId: string) => {
    const deptMap: { [key: string]: string } = {
      '1': 'General Science',
      '2': 'General Arts',
      '3': 'Business',
      '4': 'Technical',
      '5': 'Visual Arts'
    };
    return deptMap[departmentId] || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-meghis-blue">Class Management</h2>
          <p className="text-gray-600">Manage classes, forms, and student enrollment</p>
        </div>
        <Button className="meghis-gradient text-white">
          <Plus size={16} className="mr-2" />
          Add Class
        </Button>
      </div>

      {/* Form Level Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Form 1', 'Form 2', 'Form 3'].map((form) => {
          const formClasses = classes.filter(c => c.form === form);
          const totalStudents = formClasses.reduce((sum, c) => sum + c.currentEnrollment, 0);
          const totalCapacity = formClasses.reduce((sum, c) => sum + c.capacity, 0);
          
          return (
            <Card key={form} className="shadow-md">
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-8 h-8 text-meghis-blue mx-auto mb-2" />
                <h3 className="text-lg font-bold text-meghis-blue">{form}</h3>
                <p className="text-2xl font-bold text-gray-900">{formClasses.length}</p>
                <p className="text-sm text-gray-600">Classes</p>
                <p className="text-sm text-gray-500 mt-1">{totalStudents}/{totalCapacity} Students</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Classes List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {classes.map((classLevel) => {
          const enrollmentStatus = getEnrollmentStatus(classLevel.currentEnrollment, classLevel.capacity);
          
          return (
            <Card key={classLevel.id} className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-meghis-blue">
                      {classLevel.form} - {classLevel.track}
                    </CardTitle>
                    <CardDescription>{getDepartmentName(classLevel.departmentId)}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit size={14} />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-sm font-medium">Enrollment</span>
                    </div>
                    <Badge className={enrollmentStatus.color}>
                      {enrollmentStatus.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Students</span>
                      <span>{classLevel.currentEnrollment}/{classLevel.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-meghis-blue h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((classLevel.currentEnrollment / classLevel.capacity) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <Button variant="outline" className="w-full">
                      View Students
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ClassManagement;
