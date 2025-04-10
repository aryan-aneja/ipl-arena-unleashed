
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { matches, teams } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Calendar, Ticket, Clock, Users, Trophy, Settings, Bell, ChevronRight, Sun, Moon } from 'lucide-react';
import TeamCard from '@/components/TeamCard';

interface User {
  id: number;
  name: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Get user favorite team - for this example using Mumbai Indians
  const favoriteTeam = teams.find(team => team.id === 1);

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

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
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

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  if (!user) {
    return null; // Will redirect to login in useEffect
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50'}`}>
      <Navbar />
      
      <main className={`flex-grow py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage your IPL experience from your personal dashboard
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <Button onClick={toggleTheme} variant="outline" size="icon" className="mr-2">
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </Button>
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
          
          {/* Dashboard Video Banner */}
          <div className="mb-8 overflow-hidden rounded-lg">
            <div className="relative w-full" style={{ height: "300px" }}>
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                muted 
                loop 
              >
                <source src="https://player.vimeo.com/external/577442929.hd.mp4?s=95cd585203a1df85b00594cf8551cf763bfd252e&profile_id=174&oauth2_token_id=57447761" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-ipl-blue/80 to-transparent flex items-center">
                <div className="p-8 max-w-lg">
                  <h2 className="text-3xl font-bold text-white mb-4">IPL 2025 Season</h2>
                  <p className="text-white/90 text-lg mb-6">Experience the excitement of the world's biggest T20 cricket league!</p>
                  <Button className="bg-ipl-orange hover:bg-ipl-orange/90">
                    Book Tickets Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className={`p-6 transition-all duration-300 ${isDarkMode 
              ? 'bg-gradient-to-br from-ipl-blue/80 to-ipl-purple/80 text-white border-gray-700' 
              : 'bg-gradient-to-br from-ipl-blue to-ipl-purple text-white'}`}>
              <div className="flex items-center mb-4">
                <Ticket className="h-8 w-8 mr-3" />
                <h3 className="text-xl font-bold">My Tickets</h3>
              </div>
              <p className="text-3xl font-bold mb-1">{bookings.length}</p>
              <p className="text-sm opacity-80">Active bookings</p>
            </Card>
            
            <Card className={`p-6 transition-all duration-300 ${isDarkMode 
              ? 'bg-gradient-to-br from-ipl-orange/80 to-ipl-gold/80 text-white border-gray-700' 
              : 'bg-gradient-to-br from-ipl-orange to-ipl-gold text-white'}`}>
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 mr-3" />
                <h3 className="text-xl font-bold">Upcoming Matches</h3>
              </div>
              <p className="text-3xl font-bold mb-1">{upcomingMatches.length}</p>
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
          
          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className={`mb-6 ${isDarkMode ? 'bg-gray-800' : ''}`}>
              <TabsTrigger value="tickets">My Tickets</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
              <TabsTrigger value="favorite">Favorite Team</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tickets" className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="upcoming">
              <h3 className="text-xl font-bold mb-4">Upcoming Matches</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMatches.map(match => {
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
            </TabsContent>

            <TabsContent value="favorite">
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
                        {favoriteTeam.players.map((player, i) => (
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
            </TabsContent>
            
            <TabsContent value="account">
              <h3 className="text-xl font-bold mb-4">Account Information</h3>
              
              <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <div className="space-y-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                    <p className="font-medium">user@example.com</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Member Since</p>
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
