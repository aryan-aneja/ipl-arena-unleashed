
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, MapPin, Users, Award, Calendar } from 'lucide-react';
import TeamCard from '@/components/TeamCard';

interface Team {
  id: number;
  name: string;
  code: string;
  logo: string;
  primaryColor: string;
  captain: string;
  titles: number;
  description?: string;
  owner?: string;
  homeGround?: string;
  players?: string[];
}

interface TeamTabProps {
  favoriteTeam?: Team;
  isDarkMode: boolean;
}

const TeamTab: React.FC<TeamTabProps> = ({ favoriteTeam, isDarkMode }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Your Favorite Team</h3>
      
      {favoriteTeam ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TeamCard {...favoriteTeam} />
          
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <h4 className="text-lg font-bold mb-4 flex items-center">
              <Trophy size={18} className="mr-2" style={{ color: favoriteTeam.primaryColor }} />
              Team Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Users size={16} className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} w-24`}>Owner:</div>
                <div className="font-medium">{favoriteTeam.owner}</div>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} w-24`}>Home Ground:</div>
                <div className="font-medium">{favoriteTeam.homeGround}</div>
              </div>
              <div className="flex items-center">
                <Award size={16} className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} w-24`}>Championships:</div>
                <div className="font-medium">{favoriteTeam.titles}</div>
              </div>
              
              <div className="pt-2">
                <h5 className="font-medium mb-3 flex items-center">
                  <Users size={16} className="mr-2" style={{ color: favoriteTeam.primaryColor }} />
                  Key Players
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {favoriteTeam.players?.map((player, i) => (
                    <div 
                      key={i} 
                      className="flex items-center bg-ipl-blue/10 text-ipl-blue px-3 py-2 rounded-md"
                      style={{ backgroundColor: `${favoriteTeam.primaryColor}15`, color: favoriteTeam.primaryColor }}
                    >
                      <span className="w-5 h-5 rounded-full bg-white mr-2 flex items-center justify-center text-xs" style={{ color: favoriteTeam.primaryColor }}>
                        {i+1}
                      </span>
                      {player}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-3">
                <p className="text-sm leading-relaxed">
                  {favoriteTeam.description || `${favoriteTeam.name} is one of the premier teams in the IPL. Follow their journey throughout the season!`}
                </p>
                <Link to={`/teams/${favoriteTeam.id}`}>
                  <Button 
                    className="mt-4 w-full"
                    style={{ 
                      backgroundColor: favoriteTeam.primaryColor,
                      color: '#ffffff'
                    }}
                  >
                    View Complete Team Profile
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className={`text-center p-10 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No favorite team selected</p>
          <Link to="/teams">
            <Button className="mt-4 bg-ipl-blue">Browse Teams</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TeamTab;
