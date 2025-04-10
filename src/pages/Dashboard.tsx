
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { matches } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Calendar, Ticket, Clock, Users, Trophy, Settings, Bell, ChevronRight } from 'lucide-react';

interface User {
  id: number;
  name: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  if (!user) {
    return null; // Will redirect to login in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p className="text-gray-600">Manage your IPL experience from your personal dashboard</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="mr-2">
                <Settings size={16} className="mr-2" />
                Settings
              </Button>
              <Button variant="outline" className="relative">
                <Bell size={16} className="mr-2" />
                Notifications
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-ipl-blue to-ipl-purple text-white">
              <div className="flex items-center mb-4">
                <Ticket className="h-8 w-8 mr-3" />
                <h3 className="text-xl font-bold">My Tickets</h3>
              </div>
              <p className="text-3xl font-bold mb-1">{bookings.length}</p>
              <p className="text-sm opacity-80">Active bookings</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-ipl-orange to-ipl-gold text-white">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 mr-3" />
                <h3 className="text-xl font-bold">Upcoming Matches</h3>
              </div>
              <p className="text-3xl font-bold mb-1">{upcomingMatches.length}</p>
              <p className="text-sm opacity-80">In the next 7 days</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-ipl-green to-ipl-blue/70 text-white">
              <div className="flex items-center mb-4">
                <Trophy className="h-8 w-8 mr-3" />
                <h3 className="text-xl font-bold">Your Team</h3>
              </div>
              <p className="text-xl font-bold mb-1">Mumbai Indians</p>
              <p className="text-sm opacity-80">5 Championship titles</p>
            </Card>
          </div>
          
          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="tickets">My Tickets</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tickets" className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Your Ticket Bookings</h3>
              
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <Card key={booking.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="bg-ipl-blue text-white p-6 flex flex-col items-center justify-center md:w-48">
                          <p className="text-xs uppercase tracking-wider mb-1">Booking ID</p>
                          <p className="font-bold">{booking.id}</p>
                        </div>
                        <div className="p-6 flex-grow">
                          <p className="text-lg font-bold mb-2">{booking.teams}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-start">
                              <Calendar className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-start">
                              <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                              <span>7:30 PM</span>
                            </div>
                            <div className="flex items-start">
                              <Users className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                              <span>{booking.seats.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 bg-gray-50 flex flex-col justify-center items-center md:items-end">
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
                <div className="text-center p-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No ticket bookings found</p>
                  <Link to="/matches">
                    <Button className="mt-4 bg-ipl-blue">Browse Matches</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="upcoming">
              <h3 className="text-xl font-bold mb-4">Upcoming Matches</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMatches.map(match => {
                  const homeTeam = match.homeTeam;
                  const awayTeam = match.awayTeam;
                  const matchDate = new Date(match.date);
                  
                  return (
                    <Card key={match.id} className="overflow-hidden">
                      <div className="p-4 border-b">
                        <p className="text-sm text-gray-500">
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
                              src={`https://example.com/${homeTeam}.png`} 
                              alt={`${homeTeam} logo`}
                              className="max-w-full max-h-full"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/50?text=Team";
                              }}
                            />
                          </div>
                          <p className="font-bold mt-2">{homeTeam}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Match {match.id}</p>
                          <p className="font-bold text-xl">VS</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="h-16 w-16 flex items-center justify-center mx-auto">
                            <img 
                              src={`https://example.com/${awayTeam}.png`}
                              alt={`${awayTeam} logo`}
                              className="max-w-full max-h-full"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/50?text=Team";
                              }}
                            />
                          </div>
                          <p className="font-bold mt-2">{awayTeam}</p>
                        </div>
                      </div>
                      
                      <div className="p-4 border-t">
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
            </TabsContent>
            
            <TabsContent value="account">
              <h3 className="text-xl font-bold mb-4">Account Information</h3>
              
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">user@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">January 2025</p>
                  </div>
                </div>
              </Card>
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
