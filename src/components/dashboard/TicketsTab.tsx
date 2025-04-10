
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, Users, ChevronRight } from 'lucide-react';

interface Booking {
  id: string;
  matchId: number;
  date: string;
  teams: string;
  venue: string;
  seats: string[];
}

interface TicketsTabProps {
  bookings: Booking[];
  isDarkMode: boolean;
}

const TicketsTab: React.FC<TicketsTabProps> = ({ bookings, isDarkMode }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Your Ticket Bookings</h3>
      
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map(booking => (
            <Card key={booking.id} className={`overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
              <div className="flex flex-col md:flex-row">
                <div className="bg-ipl-blue text-white p-6 flex flex-col items-center justify-center md:w-48">
                  <p className="text-xs uppercase tracking-wider mb-1">Booking ID</p>
                  <p className="font-bold">{booking.id}</p>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-lg font-bold mb-2">{booking.teams}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start">
                      <Calendar className={`h-4 w-4 mr-2 mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className={`h-4 w-4 mr-2 mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span>7:30 PM</span>
                    </div>
                    <div className="flex items-start">
                      <Users className={`h-4 w-4 mr-2 mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span>{booking.seats.join(', ')}</span>
                    </div>
                  </div>
                </div>
                <div className={`p-6 flex flex-col justify-center items-center md:items-end ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <Link to={`/book-tickets/${booking.matchId}`}>
                    <Button variant="ghost" className="flex items-center">
                      View Tickets
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className={`text-center p-10 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No ticket bookings found</p>
          <Link to="/matches">
            <Button className="mt-4 bg-ipl-blue">Browse Matches</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TicketsTab;
