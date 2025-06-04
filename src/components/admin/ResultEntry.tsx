import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Plus, Save, FileSpreadsheet, Users, BookOpen, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ClassLevel, Subject, Student, Result, BulkUpload } from '@/types/school';

const ResultEntry = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [currentSemester] = useState('2023/2024 - Semester 2');
  const [results, setResults] = useState<Result[]>([]);
  const [bulkUploads, setBulkUploads] = useState<BulkUpload[]>([]);

  // Mock data
  const classes: ClassLevel[] = [
    { id: '1', form: 'Form 1', track: 'Science A', departmentId: '1', programId: '1', capacity: 30, currentEnrollment: 28 },
    { id: '2', form: 'Form 2', track: 'Arts B', departmentId: '2', programId: '3', capacity: 32, currentEnrollment: 30 },
    { id: '3', form: 'Form 3', track: 'Business C', departmentId: '3', programId: '5', capacity: 25, currentEnrollment: 24 }
  ];

  const subjects: Subject[] = [
    { id: '1', name: 'Mathematics', code: 'MATH001', departmentId: '1', type: 'core', description: 'Core Mathematics', assignedClasses: ['1', '2'] },
    { id: '2', name: 'Physics', code: 'PHYS001', departmentId: '1', type: 'core', description: 'Core Physics', assignedClasses: ['1'] },
    { id: '3', name: 'English Literature', code: 'ENG001', departmentId: '2', type: 'core', description: 'Core English', assignedClasses: ['2'] }
  ];

  const students: Student[] = [
    { 
      id: '1', 
      name: 'John Doe', 
      studentId: 'STU001', 
      departmentId: '1', 
      programId: '1', 
      classId: '1', 
      form: 'Form 1',
      admissionDate: '2023-09-01',
      status: 'active'
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      studentId: 'STU002', 
      departmentId: '1', 
      programId: '1', 
      classId: '1', 
      form: 'Form 1',
      admissionDate: '2023-09-01',
      status: 'active'
    },
    { 
      id: '3', 
      name: 'Bob Johnson', 
      studentId: 'STU003', 
      departmentId: '2', 
      programId: '3', 
      classId: '2', 
      form: 'Form 2',
      admissionDate: '2023-09-01',
      status: 'active'
    }
  ];

  const mockBulkUploads: BulkUpload[] = [
    {
      id: '1',
      fileName: 'mathematics_form1_results.csv',
      classId: '1',
      subjectId: '1',
      uploadedBy: 'admin001',
      uploadedAt: '2024-01-15 10:30:00',
      status: 'completed',
      totalRecords: 28,
      processedRecords: 28,
      errors: []
    },
    {
      id: '2',
      fileName: 'physics_form1_results.xlsx',
      classId: '1',
      subjectId: '2',
      uploadedBy: 'teacher002',
      uploadedAt: '2024-01-14 14:20:00',
      status: 'failed',
      totalRecords: 28,
      processedRecords: 15,
      errors: ['Invalid score format in row 16', 'Missing student ID in row 23']
    }
  ];

  const getClassStudents = () => {
    return students.filter(student => student.classId === selectedClass);
  };

  const getSubjectsForClass = () => {
    return subjects.filter(subject => subject.assignedClasses.includes(selectedClass));
  };

  const handleScoreChange = (studentId: string, score: string) => {
    const numericScore = parseFloat(score);
    if (isNaN(numericScore)) return;

    setResults(prev => {
      const existingIndex = prev.findIndex(r => r.studentId === studentId && r.subjectId === selectedSubject);
      const newResult: Result = {
        id: existingIndex >= 0 ? prev[existingIndex].id : `result_${Date.now()}_${studentId}`,
        studentId,
        subjectId: selectedSubject,
        classId: selectedClass,
        semester: currentSemester,
        score: numericScore,
        grade: calculateGrade(numericScore),
        points: calculatePoints(numericScore),
        remarks: generateRemarks(numericScore),
        teacherId: 'current_teacher',
        uploadedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newResult;
        return updated;
      } else {
        return [...prev, newResult];
      }
    });
  };

  const calculateGrade = (score: number): string => {
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const calculatePoints = (score: number): number => {
    if (score >= 80) return 4.0;
    if (score >= 70) return 3.0;
    if (score >= 60) return 2.0;
    if (score >= 50) return 1.0;
    return 0.0;
  };

  const generateRemarks = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Improvement';
  };

  const getStudentResult = (studentId: string) => {
    return results.find(r => r.studentId === studentId && r.subjectId === selectedSubject);
  };

  const saveResults = () => {
    console.log('Saving results:', results);
    // Here you would save to your backend
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-meghis-blue">Result Entry</h2>
          <p className="text-gray-600">Enter and manage student results by class and subject</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileSpreadsheet size={16} className="mr-2" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Bulk Upload Results</DialogTitle>
                <DialogDescription>
                  Upload results via CSV or Excel file for selected class and subject
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Class</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map(cls => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.form} - {cls.track}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Drop your file here or click to browse</p>
                  <p className="text-sm text-gray-500 mt-2">Supports CSV and Excel files (.csv, .xlsx)</p>
                  <Button className="mt-4">
                    <Upload size={16} className="mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Upload Results</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Class and Subject Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Class and Subject</CardTitle>
          <CardDescription>Choose the class and subject for result entry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.form} - {cls.track}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {getSubjectsForClass().map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name} ({subject.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Semester</Label>
              <Input value={currentSemester} readOnly className="bg-gray-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Result Entry Table */}
      {selectedClass && selectedSubject && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Enter Results</CardTitle>
                <CardDescription>
                  {getClassStudents().length} students in {classes.find(c => c.id === selectedClass)?.track} - {subjects.find(s => s.id === selectedSubject)?.name}
                </CardDescription>
              </div>
              <Button onClick={saveResults} className="meghis-gradient text-white">
                <Save size={16} className="mr-2" />
                Save Results
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getClassStudents().map(student => {
                  const result = getStudentResult(student.id);
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.studentId}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={result?.score || ''}
                          onChange={(e) => handleScoreChange(student.id, e.target.value)}
                          className="w-20"
                          placeholder="0-100"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant={result?.grade === 'A' ? 'default' : result?.grade === 'F' ? 'destructive' : 'secondary'}>
                          {result?.grade || '-'}
                        </Badge>
                      </TableCell>
                      <TableCell>{result?.points?.toFixed(1) || '-'}</TableCell>
                      <TableCell className="text-sm text-gray-600">{result?.remarks || '-'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Recent Bulk Uploads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bulk Uploads</CardTitle>
          <CardDescription>Track the status of bulk result uploads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBulkUploads.map(upload => (
              <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet size={20} className="text-gray-500" />
                  <div>
                    <p className="font-medium">{upload.fileName}</p>
                    <p className="text-sm text-gray-500">
                      {upload.processedRecords}/{upload.totalRecords} records processed
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={
                    upload.status === 'completed' ? 'default' :
                    upload.status === 'failed' ? 'destructive' :
                    upload.status === 'processing' ? 'secondary' : 'outline'
                  }>
                    {upload.status}
                  </Badge>
                  {upload.errors.length > 0 && (
                    <AlertCircle size={16} className="text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultEntry;
