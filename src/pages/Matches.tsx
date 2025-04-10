
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { matches, teams } from '@/lib/data';
import MatchCard from '@/components/MatchCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Matches = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [filteredMatches, setFilteredMatches] = useState(matches.filter(match => !match.isCompleted));
  
  // Filter matches based on selected filters - only show upcoming
  useEffect(() => {
    // Start with upcoming matches only
    let filtered = matches.filter(match => !match.isCompleted);
    
    // Filter by team
    if (selectedTeam !== 'all') {
      const teamId = parseInt(selectedTeam);
      filtered = filtered.filter(match => 
        match.homeTeam === teamId || match.awayTeam === teamId
      );
    }
    
    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(match => {
        const matchDate = new Date(match.date);
        return (
          matchDate.getDate() === selectedDate.getDate() &&
          matchDate.getMonth() === selectedDate.getMonth() &&
          matchDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }
    
    setFilteredMatches(filtered);
  }, [selectedDate, selectedTeam]);
  
  // Clear all filters
  const handleClearFilters = () => {
    setSelectedDate(undefined);
    setSelectedTeam('all');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-ipl-purple text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Upcoming IPL Matches</h1>
            <p className="max-w-2xl mx-auto text-lg">
              View all upcoming IPL 2025 matches and book tickets for live games.
            </p>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto py-6 px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Team Filter */}
                <div>
                  <Select
                    value={selectedTeam}
                    onValueChange={setSelectedTeam}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teams</SelectItem>
                      {teams.map(team => (
                        <SelectItem key={team.id} value={team.id.toString()}>
                          <div className="flex items-center">
                            <img 
                              src={team.logo} 
                              alt={team.name}
                              className="w-5 h-5 mr-2" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/20?text=T";
                              }}
                            />
                            {team.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Date Filter */}
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[180px] justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Clear Filters Button */}
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                className="self-start md:self-center"
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Matches Grid */}
        <div className="container mx-auto py-8 px-4">
          {filteredMatches.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No upcoming matches found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or select a different date to find matches.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredMatches.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Matches;
