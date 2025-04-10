
import React from 'react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { teams } from '@/lib/data';
import { Link } from 'react-router-dom';

interface MatchCardProps {
  id: number;
  homeTeam: number;
  awayTeam: number;
  date: string;
  venue: string;
  homeTeamScore?: string | null;
  awayTeamScore?: string | null;
  isCompleted: boolean;
  result?: string;
  tickets?: {
    available: boolean;
    priceCategories: {
      name: string;
      price: number;
    }[];
  };
}

const MatchCard: React.FC<MatchCardProps> = ({
  id,
  homeTeam,
  awayTeam,
  date,
  venue,
  homeTeamScore,
  awayTeamScore,
  isCompleted,
  result,
  tickets
}) => {
  const homeTeamData = teams.find(team => team.id === homeTeam);
  const awayTeamData = teams.find(team => team.id === awayTeam);
  
  // Parse date
  const matchDate = new Date(date);
  const formattedDate = matchDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime = matchDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  // Check if match is upcoming (in the future)
  const isUpcoming = matchDate > new Date();
  
  if (!homeTeamData || !awayTeamData) {
    return null;
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Match status banner */}
      <div className={`px-4 py-1 text-center text-sm font-medium text-white ${isCompleted ? 'bg-gray-600' : 'bg-green-600'}`}>
        {isCompleted ? 'Completed' : 'Upcoming'}
      </div>
      
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Match information */}
          <div className="w-full md:w-2/3 flex flex-col mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 overflow-hidden flex items-center justify-center">
                  <img 
                    src={homeTeamData.logo} 
                    alt={homeTeamData.name} 
                    className="h-auto max-w-full object-contain"
                  />
                </div>
                <p className="font-semibold mt-1">{homeTeamData.code}</p>
                {isCompleted && homeTeamScore && (
                  <p className="text-sm">{homeTeamScore}</p>
                )}
              </div>
              
              <div className="text-xl font-bold">VS</div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 overflow-hidden flex items-center justify-center">
                  <img 
                    src={awayTeamData.logo} 
                    alt={awayTeamData.name} 
                    className="h-auto max-w-full object-contain"
                  />
                </div>
                <p className="font-semibold mt-1">{awayTeamData.code}</p>
                {isCompleted && awayTeamScore && (
                  <p className="text-sm">{awayTeamScore}</p>
                )}
              </div>
            </div>
            
            {/* Match result for completed matches */}
            {isCompleted && result && (
              <div className="bg-gray-100 text-center px-4 py-2 rounded mt-4">
                <p className="font-medium text-sm">{result}</p>
              </div>
            )}
            
            {/* Match details */}
            <div className="mt-4 space-y-2 flex flex-col items-center md:items-start">
              <div className="flex items-center text-gray-600">
                <CalendarDays size={16} className="mr-2" />
                <span className="text-sm">{formattedDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-2" />
                <span className="text-sm">{formattedTime}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">{venue}</span>
              </div>
            </div>
          </div>
          
          {/* Tickets section */}
          {isUpcoming && tickets && tickets.available && (
            <div className="w-full md:w-1/3 flex flex-col items-center border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-4">
              <h4 className="font-semibold mb-2">Tickets Available</h4>
              <p className="text-sm text-gray-600 mb-4 text-center">
                Starting from ₹{Math.min(...tickets.priceCategories.map(c => c.price)).toLocaleString()}
              </p>
              <Link to={`/book-tickets/${id}`}>
                <Button className="bg-ipl-orange hover:bg-ipl-orange/90 text-white w-full">
                  Book Tickets
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
