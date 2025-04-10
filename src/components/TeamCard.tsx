
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
}

const TeamCard: React.FC<TeamCardProps> = ({
  id,
  name,
  code,
  logo,
  primaryColor,
  captain,
  titles,
  description
}) => {
  return (
    <Card className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <div 
        className="h-2" 
        style={{ backgroundColor: primaryColor }} 
      />
      <CardHeader className="flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-2 overflow-hidden flex items-center justify-center">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="h-auto max-w-full object-contain"
          />
        </div>
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="text-sm text-muted-foreground">{code}</div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="mb-4 flex-grow">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Captain:</div>
            <div className="font-medium text-right">{captain}</div>
            <div className="text-muted-foreground">Titles:</div>
            <div className="font-medium text-right">{titles}</div>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
              {description}
            </p>
          )}
        </div>
        <Link to={`/teams/${id}`}>
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between hover:bg-ipl-blue/10"
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
