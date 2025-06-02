
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { Department, Program } from '@/types/school';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: '1',
      name: 'General Science',
      description: 'Mathematics, Physics, Chemistry, Biology focus',
      programs: [
        { id: '1', name: 'Pure Science', departmentId: '1', description: 'Advanced science subjects' },
        { id: '2', name: 'Applied Science', departmentId: '1', description: 'Practical science applications' }
      ]
    },
    {
      id: '2',
      name: 'General Arts',
      description: 'Languages, Literature, History, Geography focus',
      programs: [
        { id: '3', name: 'Humanities', departmentId: '2', description: 'Literature and social studies' },
        { id: '4', name: 'Languages', departmentId: '2', description: 'Modern and classical languages' }
      ]
    },
    {
      id: '3',
      name: 'Business',
      description: 'Commerce, Economics, Accounting focus',
      programs: [
        { id: '5', name: 'Commerce', departmentId: '3', description: 'Business and trade studies' },
        { id: '6', name: 'Economics', departmentId: '3', description: 'Economic theory and practice' }
      ]
    },
    {
      id: '4',
      name: 'Technical',
      description: 'Engineering, Technology, Computer Science focus',
      programs: [
        { id: '7', name: 'Engineering', departmentId: '4', description: 'Basic engineering principles' },
        { id: '8', name: 'ICT', departmentId: '4', description: 'Information and Communication Technology' }
      ]
    },
    {
      id: '5',
      name: 'Visual Arts',
      description: 'Art, Design, Creative studies focus',
      programs: [
        { id: '9', name: 'Fine Arts', departmentId: '5', description: 'Painting, sculpture, drawing' },
        { id: '10', name: 'Graphic Design', departmentId: '5', description: 'Digital and print design' }
      ]
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-meghis-blue">Department Management</h2>
          <p className="text-gray-600">Manage school departments and programs</p>
        </div>
        <Button className="meghis-gradient text-white">
          <Plus size={16} className="mr-2" />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((department) => (
          <Card key={department.id} className="shadow-lg border-0">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-meghis-blue">{department.name}</CardTitle>
                  <CardDescription>{department.description}</CardDescription>
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
                  <span className="text-sm font-medium">Programs</span>
                  <Badge variant="secondary">{department.programs.length}</Badge>
                </div>
                
                <div className="space-y-2">
                  {department.programs.map((program) => (
                    <div key={program.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{program.name}</p>
                        <p className="text-sm text-gray-500">{program.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">0 students</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  <Plus size={16} className="mr-2" />
                  Add Program
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManagement;
