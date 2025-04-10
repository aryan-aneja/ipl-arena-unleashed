
import React from 'react';
import { Card } from '@/components/ui/card';

interface User {
  id: number;
  name: string;
}

interface AccountTabProps {
  user: User;
  isDarkMode: boolean;
}

const AccountTab: React.FC<AccountTabProps> = ({ user, isDarkMode }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Account Information</h3>
      
      <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
        <div className="space-y-4">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
            <p className="font-medium">user@example.com</p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
            <p className="font-medium">+91 98765 43210</p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Member Since</p>
            <p className="font-medium">January 2025</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountTab;
