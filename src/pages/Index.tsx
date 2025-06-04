import { useState } from 'react';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import StudentDashboard from '@/components/StudentDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import StudentSettings from '@/components/StudentSettings';
import AdminSettings from '@/components/AdminSettings';

// Mock student data
const mockStudentData = {
  name: "Sarah Johnson",
  studentId: "STU001",
  class: "12A",
  semester: "2023/2024 - Semester 2",
  subjects: [
    { name: "Mathematics", score: 92, grade: "A", remarks: "Excellent performance" },
    { name: "Physics", score: 88, grade: "B", remarks: "Good understanding" },
    { name: "Chemistry", score: 85, grade: "B", remarks: "Consistent effort" },
    { name: "Biology", score: 90, grade: "A", remarks: "Outstanding work" },
    { name: "English", score: 87, grade: "B", remarks: "Well written" },
    { name: "History", score: 83, grade: "B", remarks: "Good analysis" },
    { name: "Geography", score: 89, grade: "B", remarks: "Strong grasp" },
    { name: "Computer Science", score: 95, grade: "A", remarks: "Exceptional skills" }
  ],
  totalScore: 709,
  average: 88.6,
  position: 3,
  totalStudents: 45,
  status: "PASS" as const
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'settings'>('dashboard');

  const handleLogin = (studentId: string, password: string, adminLogin = false) => {
    // In a real application, this would validate credentials against a backend
    console.log('Login attempt:', { studentId, password, adminLogin });
    
    setIsLoggedIn(true);
    setIsAdmin(adminLogin);
  };

  const handleLogout = () => {
    // Clear user session
    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowAdminLogin(false);
    setCurrentView('dashboard');
    
    // In a real application, you would also:
    // - Clear JWT tokens from localStorage/sessionStorage
    // - Call logout API endpoint
    // - Clear any cached user data
    
    console.log('User logged out successfully');
  };

  const handleSettingsClick = () => {
    setCurrentView('settings');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <div className="flex flex-col min-h-screen">
          <LoginForm 
            onLogin={handleLogin} 
            isAdmin={showAdminLogin}
          />
          
          {/* Toggle between student and admin login */}
          <div className="fixed bottom-4 right-4">
            <button
              onClick={() => setShowAdminLogin(!showAdminLogin)}
              className="bg-white text-meghis-blue px-4 py-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
            >
              {showAdminLogin ? 'Student Login' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        studentName={isAdmin ? undefined : mockStudentData.name}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onSettingsClick={handleSettingsClick}
        isAdmin={isAdmin}
      />
      
      {currentView === 'settings' ? (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
          <div className="max-w-7xl mx-auto p-4">
            <button
              onClick={handleBackToDashboard}
              className="mb-4 text-meghis-blue hover:text-blue-700 font-medium"
            >
              ← Back to Dashboard
            </button>
            {isAdmin ? <AdminSettings /> : <StudentSettings />}
          </div>
        </div>
      ) : (
        <>
          {isAdmin ? (
            <AdminDashboard />
          ) : (
            <StudentDashboard studentData={mockStudentData} />
          )}
        </>
      )}
    </div>
  );
};

export default Index;
