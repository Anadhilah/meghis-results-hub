
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, User, Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (studentId: string, password: string, isAdmin?: boolean) => void;
  isAdmin?: boolean;
}

const LoginForm = ({ onLogin, isAdmin = false }: LoginFormProps) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      onLogin(studentId, password, isAdmin);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-yellow-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        {/* School Logo Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 meghis-gradient rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">M</span>
          </div>
          <h1 className="text-3xl font-bold text-meghis-blue mb-2">Meghis</h1>
          <p className="text-gray-600">Senior High School</p>
          <p className="text-sm text-gray-500 mt-2">Student Results Portal</p>
        </div>

        <Card className="shadow-2xl border-0 animate-slide-in">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isAdmin ? 'Admin Login' : 'Student Login'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isAdmin 
                ? 'Access the administrative dashboard' 
                : 'Enter your student ID and password to view your results'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User size={16} />
                  {isAdmin ? 'Admin ID' : 'Student ID'}
                </label>
                <Input
                  type="text"
                  placeholder={isAdmin ? "Enter admin ID" : "Enter your student ID"}
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-meghis-blue transition-colors"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-meghis-blue transition-colors"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 meghis-gradient hover:opacity-90 transition-opacity text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <LogIn size={20} />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Demo Credentials:</p>
              <p className="font-mono bg-gray-100 p-2 rounded mt-2">
                Student ID: STU001 | Password: password
              </p>
              {!isAdmin && (
                <p className="text-xs mt-2 text-gray-500">
                  Contact school administration if you forgot your credentials
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
