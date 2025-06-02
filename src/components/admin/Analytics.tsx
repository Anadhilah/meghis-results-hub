
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, BookOpen, Award, Download, Calendar } from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-semester');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Mock analytics data
  const overviewStats = [
    { title: 'Overall Pass Rate', value: '87.5%', change: '+2.3%', trend: 'up', color: 'text-green-600' },
    { title: 'Average Score', value: '78.2', change: '+1.8', trend: 'up', color: 'text-green-600' },
    { title: 'Top Performers', value: '142', change: '+12', trend: 'up', color: 'text-green-600' },
    { title: 'At Risk Students', value: '23', change: '-5', trend: 'down', color: 'text-red-600' }
  ];

  const classPerformanceData = [
    { class: 'Form 12A', average: 82.5, passRate: 94.3, students: 35 },
    { class: 'Form 12B', average: 78.9, passRate: 87.5, students: 32 },
    { class: 'Form 11A', average: 75.2, passRate: 84.2, students: 38 },
    { class: 'Form 11B', average: 79.8, passRate: 89.9, students: 36 }
  ];

  const subjectPerformanceData = [
    { subject: 'Mathematics', average: 72.5, difficulty: 'High' },
    { subject: 'Physics', average: 76.8, difficulty: 'High' },
    { subject: 'Chemistry', average: 78.2, difficulty: 'Medium' },
    { subject: 'Biology', average: 81.5, difficulty: 'Medium' },
    { subject: 'English', average: 79.3, difficulty: 'Low' },
    { subject: 'History', average: 82.1, difficulty: 'Low' }
  ];

  const monthlyTrendsData = [
    { month: 'Sep', scores: 75.2, submissions: 245 },
    { month: 'Oct', scores: 76.8, submissions: 289 },
    { month: 'Nov', scores: 78.1, submissions: 312 },
    { month: 'Dec', scores: 79.5, submissions: 298 },
    { month: 'Jan', scores: 78.2, submissions: 334 }
  ];

  const gradeDistributionData = [
    { grade: 'A', count: 145, color: '#22c55e' },
    { grade: 'B', count: 289, color: '#3b82f6' },
    { grade: 'C', count: 167, color: '#f59e0b' },
    { grade: 'D', count: 89, color: '#ef4444' },
    { grade: 'F', count: 34, color: '#6b7280' }
  ];

  const chartConfig = {
    average: { label: 'Average Score', color: '#3b82f6' },
    passRate: { label: 'Pass Rate', color: '#22c55e' },
    scores: { label: 'Average Scores', color: '#3b82f6' },
    submissions: { label: 'Submissions', color: '#f59e0b' }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-semester">Current Semester</SelectItem>
              <SelectItem value="previous-semester">Previous Semester</SelectItem>
              <SelectItem value="academic-year">Full Academic Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="class-performance">Class Performance</SelectItem>
              <SelectItem value="subject-analysis">Subject Analysis</SelectItem>
              <SelectItem value="student-progress">Student Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar size={16} className="mr-2" />
            Schedule Report
          </Button>
          <Button className="meghis-yellow-gradient text-white">
            <Download size={16} className="mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex items-center ${stat.color}`}>
                  {stat.trend === 'up' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  <span className="ml-1 text-sm font-medium">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={24} className="text-meghis-blue" />
              Class Performance Comparison
            </CardTitle>
            <CardDescription>Average scores and pass rates by class</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="average" fill="var(--color-average)" name="Average Score" />
                  <Bar dataKey="passRate" fill="var(--color-passRate)" name="Pass Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={24} className="text-meghis-blue" />
              Performance Trends
            </CardTitle>
            <CardDescription>Monthly average scores and submission trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="scores" stroke="var(--color-scores)" strokeWidth={2} name="Avg Scores" />
                  <Line type="monotone" dataKey="submissions" stroke="var(--color-submissions)" strokeWidth={2} name="Submissions" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen size={24} className="text-meghis-blue" />
              Subject Performance Analysis
            </CardTitle>
            <CardDescription>Average scores and difficulty levels by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectPerformanceData.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{subject.subject}</div>
                    <div className="text-sm text-gray-600">Average: {subject.average}%</div>
                  </div>
                  <Badge className={
                    subject.difficulty === 'High' ? 'bg-red-100 text-red-800' :
                    subject.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {subject.difficulty}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award size={24} className="text-meghis-blue" />
              Grade Distribution
            </CardTitle>
            <CardDescription>Overall distribution of grades across all students</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ grade, count }) => `${grade}: ${count}`}
                  >
                    {gradeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights and Recommendations */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl text-meghis-blue">Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Positive Trends</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Overall pass rate increased by 2.3% this semester</li>
                <li>• Form 12A showing exceptional performance (94.3% pass rate)</li>
                <li>• Biology and History subjects performing above average</li>
                <li>• Steady improvement in monthly score trends</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Areas for Improvement</h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• Mathematics needs additional support (lowest average: 72.5%)</li>
                <li>• 23 students identified as at-risk - require intervention</li>
                <li>• Form 11A underperforming compared to other classes</li>
                <li>• Consider review sessions for high-difficulty subjects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
