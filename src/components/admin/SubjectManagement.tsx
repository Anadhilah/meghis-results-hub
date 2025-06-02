
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, BookOpen, Users } from 'lucide-react';
import { Subject } from '@/types/school';

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Mathematics',
      code: 'MATH101',
      departmentId: '1',
      type: 'core',
      description: 'Core mathematics including algebra and geometry',
      assignedClasses: ['1', '2']
    },
    {
      id: '2',
      name: 'Physics',
      code: 'PHYS101',
      departmentId: '1',
      type: 'core',
      description: 'Introduction to mechanics and thermodynamics',
      assignedClasses: ['1', '2']
    },
    {
      id: '3',
      name: 'Chemistry',
      code: 'CHEM101',
      departmentId: '1',
      type: 'core',
      description: 'Basic chemistry principles and reactions',
      assignedClasses: ['1', '2']
    },
    {
      id: '4',
      name: 'Biology',
      code: 'BIO101',
      departmentId: '1',
      type: 'elective',
      description: 'Life sciences and biological processes',
      assignedClasses: ['1']
    },
    {
      id: '5',
      name: 'English Literature',
      code: 'ENG101',
      departmentId: '2',
      type: 'core',
      description: 'Poetry, prose, and drama analysis',
      assignedClasses: ['3']
    },
    {
      id: '6',
      name: 'History',
      code: 'HIST101',
      departmentId: '2',
      type: 'core',
      description: 'World history and African studies',
      assignedClasses: ['3']
    },
    {
      id: '7',
      name: 'Economics',
      code: 'ECON101',
      departmentId: '3',
      type: 'core',
      description: 'Microeconomics and macroeconomics basics',
      assignedClasses: ['4']
    },
    {
      id: '8',
      name: 'Computer Science',
      code: 'CS101',
      departmentId: '4',
      type: 'core',
      description: 'Programming fundamentals and algorithms',
      assignedClasses: ['5']
    }
  ]);

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

  const getClassNames = (classIds: string[]) => {
    const classMap: { [key: string]: string } = {
      '1': 'Form 1 Science A',
      '2': 'Form 1 Science B',
      '3': 'Form 2 Arts A',
      '4': 'Form 3 Business A',
      '5': 'Form 2 Technical A'
    };
    return classIds.map(id => classMap[id] || 'Unknown').join(', ');
  };

  const subjectsByDepartment = subjects.reduce((acc, subject) => {
    const deptName = getDepartmentName(subject.departmentId);
    if (!acc[deptName]) acc[deptName] = [];
    acc[deptName].push(subject);
    return acc;
  }, {} as { [key: string]: Subject[] });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-meghis-blue">Subject Management</h2>
          <p className="text-gray-600">Manage subjects and course assignments</p>
        </div>
        <Button className="meghis-gradient text-white">
          <Plus size={16} className="mr-2" />
          Add Subject
        </Button>
      </div>

      {/* Subject Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-md">
          <CardContent className="p-6 text-center">
            <BookOpen className="w-8 h-8 text-meghis-blue mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
            <p className="text-sm text-gray-600">Total Subjects</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-bold text-sm">C</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{subjects.filter(s => s.type === 'core').length}</p>
            <p className="text-sm text-gray-600">Core Subjects</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold text-sm">E</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{subjects.filter(s => s.type === 'elective').length}</p>
            <p className="text-sm text-gray-600">Elective Subjects</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-meghis-yellow mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{Object.keys(subjectsByDepartment).length}</p>
            <p className="text-sm text-gray-600">Departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Subjects by Department */}
      {Object.entries(subjectsByDepartment).map(([departmentName, deptSubjects]) => (
        <Card key={departmentName} className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-meghis-blue">{departmentName}</CardTitle>
            <CardDescription>{deptSubjects.length} subjects offered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deptSubjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{subject.name}</h4>
                        <p className="text-sm text-gray-500">{subject.code}</p>
                      </div>
                      <Badge 
                        className={subject.type === 'core' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                        }
                      >
                        {subject.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{subject.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Classes: {getClassNames(subject.assignedClasses)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit size={14} />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubjectManagement;
