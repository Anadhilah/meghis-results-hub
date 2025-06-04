import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, User, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import SemesterSelector from './SemesterSelector';
import PerformanceChart from './PerformanceChart';
import { generateResultPDF } from '@/services/pdfService';

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
  const [selectedSemester, setSelectedSemester] = useState(studentData.semester);

  // Mock data for different semesters
  const getSemesterData = (semester: string) => {
    if (semester === studentData.semester) {
      return studentData;
    }
    
    // Mock previous semester data
    return {
      ...studentData,
      semester,
      subjects: studentData.subjects.map(subject => ({
        ...subject,
        score: Math.max(40, subject.score - Math.floor(Math.random() * 10)),
        grade: subject.score > 80 ? 'A' : subject.score > 70 ? 'B' : subject.score > 60 ? 'C' : 'D'
      })),
      average: 82.5,
      position: 5,
      totalScore: 660
    };
  };

  const currentData = getSemesterData(selectedSemester);

  // Calculate class position based on average (mock calculation)
  const calculatePosition = (average: number, totalStudents: number) => {
    // Simple mock: higher average = better position
    const positionEstimate = Math.max(1, Math.ceil(totalStudents - (average / 100) * totalStudents + 1));
    return Math.min(positionEstimate, totalStudents);
  };

  const position = calculatePosition(currentData.average, currentData.totalStudents);

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
    generateResultPDF({
      ...currentData,
      position
    });
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
                <CardTitle className="text-2xl font-bold">{currentData.name}</CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  Student ID: {currentData.studentId} | Class: {currentData.class}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Semester Selection */}
        <SemesterSelector 
          currentSemester={selectedSemester}
          onSemesterChange={setSelectedSemester}
        />

        {/* Results Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-meghis-blue mb-2">{currentData.totalScore}</div>
              <div className="text-gray-600">Total Score</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-meghis-yellow mb-2">{currentData.average.toFixed(1)}%</div>
              <div className="text-gray-600">Average</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {position}/{currentData.totalStudents}
              </div>
              <div className="text-gray-600">Class Position</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Badge 
                className={`text-lg px-4 py-2 ${
                  currentData.status === 'PASS' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {currentData.status}
              </Badge>
              <div className="text-gray-600 mt-2">Status</div>
            </CardContent>
          </Card>
        </div>

        {/* Download Action */}
        <div className="flex justify-end mb-6">
          <Button 
            onClick={handleDownloadResult}
            className="meghis-yellow-gradient hover:opacity-90 text-white"
          >
            <Download size={16} className="mr-2" />
            Download Result Slip
          </Button>
        </div>

        {/* Performance Charts */}
        <div className="mb-8">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp size={24} className="text-meghis-blue" />
                Performance Analytics
              </CardTitle>
              <CardDescription>
                Visual representation of your academic performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart subjects={currentData.subjects} />
            </CardContent>
          </Card>
        </div>

        {/* Subject Results */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BookOpen size={24} className="text-meghis-blue" />
              Subject Results - {selectedSemester}
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
                  {currentData.subjects.map((subject, index) => (
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
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-meghis-blue">Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-meghis-blue mb-2">Strongest Subjects</h4>
                <ul className="space-y-1">
                  {currentData.subjects
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
                  {currentData.subjects
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
