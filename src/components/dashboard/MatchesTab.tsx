
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { teams } from '@/lib/data';

interface Match {
  id: number;
  homeTeam: number;
  awayTeam: number;
  date: string;
  venue: string;
  isCompleted: boolean;
}

interface MatchesTabProps {
  matches: Match[];
  isDarkMode: boolean;
}

const MatchesTab: React.FC<MatchesTabProps> = ({ matches, isDarkMode }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Upcoming Matches</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(match => {
          const homeTeamData = teams.find(team => team.id === match.homeTeam);
          const awayTeamData = teams.find(team => team.id === match.awayTeam);
          const matchDate = new Date(match.date);
          
          return (
            <Card key={match.id} className={`overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : ''}`}>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {matchDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short' 
                  })} • {matchDate.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
                <p className="font-medium">{match.venue}</p>
              </div>
              
              <div className="flex items-center justify-between p-4">
                <div className="text-center">
                  <div className="h-16 w-16 flex items-center justify-center mx-auto">
                    <img 
                      src={homeTeamData?.logo} 
                      alt={`${homeTeamData?.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/50?text=Team";
                      }}
                    />
                  </div>
                  <p className="font-bold mt-2">{homeTeamData?.code || 'TBD'}</p>
                </div>
                
                <div className="text-center">
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Match {match.id}</p>
                  <p className="font-bold text-xl">VS</p>
                </div>
                
                <div className="text-center">
                  <div className="h-16 w-16 flex items-center justify-center mx-auto">
                    <img 
                      src={awayTeamData?.logo}
                      alt={`${awayTeamData?.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/50?text=Team";
                      }}
                    />
                  </div>
                  <p className="font-bold mt-2">{awayTeamData?.code || 'TBD'}</p>
                </div>
              </div>
              
              <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : ''}`}>
                <Link to={`/book-tickets/${match.id}`}>
                  <Button className="w-full bg-ipl-blue hover:bg-ipl-blue/90">
                    Book Tickets
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MatchesTab;
