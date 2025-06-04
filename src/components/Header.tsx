
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings } from 'lucide-react';

interface HeaderProps {
  studentName?: string;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  isAdmin?: boolean;
  onSettingsClick?: () => void;
}

const Header = ({ studentName, isLoggedIn = false, onLogout, isAdmin = false, onSettingsClick }: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b-4 border-meghis-yellow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and School Name */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 meghis-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-meghis-blue">Meghis</h1>
              <p className="text-sm text-gray-600">Senior High School</p>
            </div>
          </div>

          {/* User Actions */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-meghis-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User size={20} />
                <span className="hidden sm:block">
                  {isAdmin ? 'Admin' : studentName || 'Student'}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <button 
                      onClick={() => {
                        onSettingsClick?.();
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    <button 
                      onClick={onLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-red-600"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
