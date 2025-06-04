
import { Student } from '@/types/school';

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

export const generateResultPDF = (studentData: StudentData) => {
  // Create a simple HTML template for PDF generation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Result Slip - ${studentData.name}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .school-name { font-size: 24px; font-weight: bold; color: #1e40af; }
        .student-info { margin: 20px 0; }
        .results-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .results-table th, .results-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .results-table th { background-color: #f2f2f2; }
        .summary { margin: 20px 0; padding: 15px; background-color: #f9f9f9; }
        .pass { color: green; font-weight: bold; }
        .fail { color: red; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="school-name">MEGHIS SECONDARY SCHOOL</div>
        <h2>STUDENT RESULT SLIP</h2>
        <p>${studentData.semester}</p>
      </div>
      
      <div class="student-info">
        <p><strong>Name:</strong> ${studentData.name}</p>
        <p><strong>Student ID:</strong> ${studentData.studentId}</p>
        <p><strong>Class:</strong> ${studentData.class}</p>
      </div>
      
      <table class="results-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Score</th>
            <th>Grade</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          ${studentData.subjects.map(subject => `
            <tr>
              <td>${subject.name}</td>
              <td>${subject.score}</td>
              <td>${subject.grade}</td>
              <td>${subject.remarks}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="summary">
        <p><strong>Total Score:</strong> ${studentData.totalScore}</p>
        <p><strong>Average:</strong> ${studentData.average.toFixed(1)}%</p>
        <p><strong>Position:</strong> ${studentData.position} out of ${studentData.totalStudents}</p>
        <p><strong>Status:</strong> <span class="${studentData.status.toLowerCase()}">${studentData.status}</span></p>
      </div>
    </body>
    </html>
  `;

  // Create a blob and download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${studentData.studentId}_${studentData.semester.replace(/\s+/g, '_')}_Result.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
