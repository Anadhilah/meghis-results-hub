
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface SemesterSelectorProps {
  currentSemester: string;
  onSemesterChange: (semester: string) => void;
}

const SemesterSelector = ({ currentSemester, onSemesterChange }: SemesterSelectorProps) => {
  const availableSemesters = [
    '2023/2024 - Semester 2',
    '2023/2024 - Semester 1', 
    '2022/2023 - Semester 2',
    '2022/2023 - Semester 1',
    '2021/2022 - Semester 2'
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar size={20} className="text-meghis-blue" />
          Select Semester
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={currentSemester} onValueChange={onSemesterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            {availableSemesters.map(semester => (
              <SelectItem key={semester} value={semester}>
                {semester}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default SemesterSelector;
