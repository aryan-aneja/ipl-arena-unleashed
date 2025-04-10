
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Bell, Sun, Moon } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, isDarkMode, toggleTheme }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, {userName}!</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your IPL experience from your personal dashboard
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-2">
        <Button onClick={toggleTheme} variant="outline" size="icon" className="mr-2">
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
        <Button variant="outline" className="mr-2">
          <Settings size={16} className="mr-2" />
          Settings
        </Button>
        <Button variant="outline" className="relative">
          <Bell size={16} className="mr-2" />
          Notifications
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            2
          </span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
