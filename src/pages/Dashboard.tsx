
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { matches, teams } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

// Import dashboard components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardBanner from '@/components/dashboard/DashboardBanner';
import DashboardCards from '@/components/dashboard/DashboardCards';
import TicketsTab from '@/components/dashboard/TicketsTab';
import MatchesTab from '@/components/dashboard/MatchesTab';
import TeamTab from '@/components/dashboard/TeamTab';
import AccountTab from '@/components/dashboard/AccountTab';

interface User {
  id: number;
  name: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Get user favorite team - for this example using Mumbai Indians
  const favoriteTeam = teams.find(team => team.id === 1);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');

    if (!isLoggedIn || !userData) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (e) {
      console.error('Error parsing user data', e);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      navigate('/login');
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, [navigate]);

  // Filter upcoming matches and past bookings
  const upcomingMatches = matches.filter(match => !match.isCompleted).slice(0, 3);
  
  // Mock ticket booking history
  const bookings = [
    {
      id: 'IPL-20250412',
      matchId: 1,
      date: 'Apr 12, 2025',
      teams: 'Mumbai Indians vs Chennai Super Kings',
      venue: 'Wankhede Stadium, Mumbai',
      seats: ['Premium - A12, A13']
    },
    {
      id: 'IPL-20250328',
      matchId: 3,
      date: 'Mar 28, 2025',
      teams: 'Royal Challengers Bangalore vs Delhi Capitals',
      venue: 'M. Chinnaswamy Stadium, Bangalore',
      seats: ['Executive - C45, C46, C47']
    }
  ];

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  if (!user) {
    return null; // Will redirect to login in useEffect
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50'}`}>
      <Navbar />
      
      <main className={`flex-grow py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <DashboardHeader 
            userName={user.name} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
          />
          
          <DashboardBanner />
          
          <DashboardCards 
            bookingsCount={bookings.length} 
            upcomingMatchesCount={upcomingMatches.length} 
            isDarkMode={isDarkMode}
            favoriteTeamId={1}
          />
          
          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className={`mb-6 ${isDarkMode ? 'bg-gray-800' : ''}`}>
              <TabsTrigger value="tickets">My Tickets</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
              <TabsTrigger value="favorite">Favorite Team</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tickets">
              <TicketsTab 
                bookings={bookings} 
                isDarkMode={isDarkMode} 
              />
            </TabsContent>
            
            <TabsContent value="upcoming">
              <MatchesTab 
                matches={upcomingMatches} 
                isDarkMode={isDarkMode} 
              />
            </TabsContent>

            <TabsContent value="favorite">
              <TeamTab 
                favoriteTeam={favoriteTeam} 
                isDarkMode={isDarkMode} 
              />
            </TabsContent>
            
            <TabsContent value="account">
              <AccountTab 
                user={user} 
                isDarkMode={isDarkMode} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Dashboard;
