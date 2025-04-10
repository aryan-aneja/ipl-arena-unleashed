
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface TeamCardProps {
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

const TeamCard: React.FC<TeamCardProps> = ({
  id,
  name,
  code,
  logo,
  primaryColor,
  captain,
  titles,
  description,
  owner,
  homeGround,
  players
}) => {
  // Get dark mode state directly from HTML element to ensure it's always in sync
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <Card className={`overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : ''
    }`}>
      <div 
        className="h-2" 
        style={{ backgroundColor: primaryColor }} 
      />
      <CardHeader className="flex flex-col items-center text-center">
        <div 
          className={`w-24 h-24 mb-2 overflow-hidden flex items-center justify-center rounded-full border-2 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`} 
          style={{ borderColor: primaryColor }}
        >
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="h-auto max-w-full object-contain p-2"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/100?text=${code}`;
            }}
          />
        </div>
        <h3 className="text-xl font-bold">{name}</h3>
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
          {code}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="mb-4 flex-grow">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className={isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}>Captain:</div>
            <div className="font-medium text-right">{captain}</div>
            <div className={isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}>Titles:</div>
            <div className="font-medium text-right">{titles}</div>
            {owner && (
              <>
                <div className={isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}>Owner:</div>
                <div className="font-medium text-right truncate" title={owner}>{owner}</div>
              </>
            )}
            {homeGround && (
              <>
                <div className={isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}>Home:</div>
                <div className="font-medium text-right truncate" title={homeGround}>
                  {homeGround.split(',')[0]}
                </div>
              </>
            )}
          </div>
          {description && (
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'} mt-3 line-clamp-2`}>
              {description}
            </p>
          )}
          {players && players.length > 0 && (
            <div className="mt-3">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'} mb-1`}>
                Key Players:
              </p>
              <div className="flex flex-wrap gap-1">
                {players.slice(0, 3).map((player, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: `${primaryColor}20`, 
                      color: primaryColor 
                    }}
                  >
                    {player}
                  </span>
                ))}
                {players.length > 3 && (
                  <span className="text-xs text-gray-400">+{players.length - 3}</span>
                )}
              </div>
            </div>
          )}
        </div>
        <Link to={`/teams/${id}`}>
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between hover:bg-ipl-blue/10"
            style={{ color: primaryColor }}
          >
            <span>Team Details</span>
            <ChevronRight size={16} />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
