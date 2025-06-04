
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Subject {
  name: string;
  score: number;
  grade: string;
  remarks: string;
}

interface PerformanceChartProps {
  subjects: Subject[];
  historicalData?: Array<{
    semester: string;
    average: number;
    position: number;
  }>;
}

const PerformanceChart = ({ subjects, historicalData }: PerformanceChartProps) => {
  const subjectData = subjects.map(subject => ({
    name: subject.name.substring(0, 8) + (subject.name.length > 8 ? '...' : ''),
    score: subject.score,
    fullName: subject.name
  }));

  const mockHistoricalData = historicalData || [
    { semester: '2022/23 S1', average: 85.2, position: 5 },
    { semester: '2022/23 S2', average: 87.1, position: 4 },
    { semester: '2023/24 S1', average: 86.8, position: 3 },
    { semester: '2023/24 S2', average: 88.6, position: 3 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subject Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value: number, name: string, props: any) => [
                  `${value}%`, 
                  props.payload.fullName
                ]}
              />
              <Bar dataKey="score" fill="#1e40af" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockHistoricalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" fontSize={12} />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value: number) => [`${value}%`, 'Average']} />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#eab308" 
                strokeWidth={3}
                dot={{ fill: '#eab308', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceChart;
