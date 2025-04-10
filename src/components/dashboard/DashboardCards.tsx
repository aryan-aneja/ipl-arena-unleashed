
import React from 'react';
import { Card } from '@/components/ui/card';
import { Ticket, Calendar, Trophy } from 'lucide-react';
import { teams } from '@/lib/data';

interface DashboardCardsProps {
  bookingsCount: number;
  upcomingMatchesCount: number;
  isDarkMode: boolean;
  favoriteTeamId?: number;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ 
  bookingsCount, 
  upcomingMatchesCount, 
  isDarkMode,
  favoriteTeamId
}) => {
  const favoriteTeam = favoriteTeamId ? teams.find(team => team.id === favoriteTeamId) : undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className={`p-6 transition-all duration-300 ${isDarkMode 
        ? 'bg-gradient-to-br from-ipl-blue/80 to-ipl-purple/80 text-white border-gray-700' 
        : 'bg-gradient-to-br from-ipl-blue to-ipl-purple text-white'}`}>
        <div className="flex items-center mb-4">
          <Ticket className="h-8 w-8 mr-3" />
          <h3 className="text-xl font-bold">My Tickets</h3>
        </div>
        <p className="text-3xl font-bold mb-1">{bookingsCount}</p>
        <p className="text-sm opacity-80">Active bookings</p>
      </Card>
      
      <Card className={`p-6 transition-all duration-300 ${isDarkMode 
        ? 'bg-gradient-to-br from-ipl-orange/80 to-ipl-gold/80 text-white border-gray-700' 
        : 'bg-gradient-to-br from-ipl-orange to-ipl-gold text-white'}`}>
        <div className="flex items-center mb-4">
          <Calendar className="h-8 w-8 mr-3" />
          <h3 className="text-xl font-bold">Upcoming Matches</h3>
        </div>
        <p className="text-3xl font-bold mb-1">{upcomingMatchesCount}</p>
        <p className="text-sm opacity-80">In the next 7 days</p>
      </Card>
      
      <Card className={`p-6 transition-all duration-300 ${isDarkMode 
        ? 'bg-gradient-to-br from-ipl-green/80 to-ipl-blue/70 text-white border-gray-700' 
        : 'bg-gradient-to-br from-ipl-green to-ipl-blue/70 text-white'}`}>
        <div className="flex items-center mb-4">
          <Trophy className="h-8 w-8 mr-3" />
          <h3 className="text-xl font-bold">Your Team</h3>
        </div>
        {favoriteTeam ? (
          <>
            <div className="flex items-center mb-1">
              <img 
                src={favoriteTeam.logo} 
                alt={favoriteTeam.name} 
                className="h-8 w-8 mr-2 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/32?text=Team";
                }}
              />
              <p className="text-xl font-bold">{favoriteTeam.name}</p>
            </div>
            <p className="text-sm opacity-80">{favoriteTeam.titles} Championship titles</p>
          </>
        ) : (
          <p className="text-xl font-bold mb-1">Select your favorite team</p>
        )}
      </Card>
    </div>
  );
};

export default DashboardCards;
