
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
            <h4 className="text-lg font-bold mb-3">Team Information</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2">
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Owner:</div>
                <div>{favoriteTeam.owner}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Home Ground:</div>
                <div>{favoriteTeam.homeGround}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Championships:</div>
                <div>{favoriteTeam.titles}</div>
              </div>
              <h5 className="font-medium mt-4 mb-2">Key Players</h5>
              <div className="flex flex-wrap gap-2">
                {favoriteTeam.players?.map((player, i) => (
                  <span key={i} className="bg-ipl-blue/10 text-ipl-blue px-2 py-1 rounded-full text-sm">
                    {player}
                  </span>
                ))}
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
