
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, User, Calendar, BookOpen } from 'lucide-react';

interface Subject {
  name: string;
  score: number;
  grade: string;
  remarks: string;
}

interface StudentData {
  name: string;
  studentId: string;
  class: string;
  semester: string;
  subjects: Subject[];
  totalScore: number;
  average: number;
  position: number;
  totalStudents: number;
  status: 'PASS' | 'FAIL';
}

interface StudentDashboardProps {
  studentData: StudentData;
}

const StudentDashboard = ({ studentData }: StudentDashboardProps) => {
  const [selectedSemester, setSelectedSemester] = useState('Current Semester');

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      case 'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadResult = () => {
    // This would trigger PDF download in a real implementation
    console.log('Downloading result slip...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Student Profile Header */}
        <Card className="mb-8 shadow-lg border-0 animate-fade-in">
          <CardHeader className="meghis-gradient text-white rounded-t-lg">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl font-bold">{studentData.name}</CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  Student ID: {studentData.studentId} | Class: {studentData.class}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Results Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-meghis-blue mb-2">{studentData.totalScore}</div>
              <div className="text-gray-600">Total Score</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-meghis-yellow mb-2">{studentData.average.toFixed(1)}%</div>
              <div className="text-gray-600">Average</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {studentData.position}/{studentData.totalStudents}
              </div>
              <div className="text-gray-600">Class Position</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Badge 
                className={`text-lg px-4 py-2 ${
                  studentData.status === 'PASS' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {studentData.status}
              </Badge>
              <div className="text-gray-600 mt-2">Status</div>
            </CardContent>
          </Card>
        </div>

        {/* Semester Selection and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <Calendar size={20} className="text-meghis-blue" />
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option>Current Semester</option>
              <option>Previous Semester</option>
              <option>2023/2024 - Semester 1</option>
              <option>2022/2023 - Semester 2</option>
            </select>
          </div>
          
          <Button 
            onClick={handleDownloadResult}
            className="meghis-yellow-gradient hover:opacity-90 text-white"
          >
            <Download size={16} className="mr-2" />
            Download Result Slip
          </Button>
        </div>

        {/* Subject Results */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BookOpen size={24} className="text-meghis-blue" />
              Subject Results - {studentData.semester}
            </CardTitle>
            <CardDescription>
              Detailed breakdown of your performance in each subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Score</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Grade</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.subjects.map((subject, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium">{subject.name}</td>
                      <td className="text-center py-4 px-4">
                        <span className="font-bold text-lg">{subject.score}</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <Badge className={getGradeColor(subject.grade)}>
                          {subject.grade}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{subject.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card className="mt-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-meghis-blue">Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-meghis-blue mb-2">Strongest Subjects</h4>
                <ul className="space-y-1">
                  {studentData.subjects
                    .filter(s => s.score >= 80)
                    .map((subject, index) => (
                      <li key={index} className="text-sm">
                        • {subject.name} ({subject.score}%)
                      </li>
                    ))}
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-meghis-yellow mb-2">Areas for Improvement</h4>
                <ul className="space-y-1">
                  {studentData.subjects
                    .filter(s => s.score < 70)
                    .map((subject, index) => (
                      <li key={index} className="text-sm">
                        • {subject.name} ({subject.score}%)
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
