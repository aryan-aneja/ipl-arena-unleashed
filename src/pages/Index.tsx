
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, Trophy, Users } from 'lucide-react';
import { teams, matches, newsFeed } from '@/lib/data';
import TeamCard from '@/components/TeamCard';
import MatchCard from '@/components/MatchCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  // Filter for featured upcoming matches (limited to 3)
  const upcomingMatches = matches
    .filter(match => !match.isCompleted)
    .slice(0, 3);
  
  // Featured teams (limited to 4)
  const featuredTeams = teams.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Welcome to <span className="text-ipl-orange">IPL</span> Arena
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-md">
              Your one-stop destination for all things IPL - follow teams, watch matches, and book tickets for the world's biggest cricket league.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/matches">
                <Button className="bg-ipl-orange hover:bg-ipl-orange/90">
                  View Matches
                </Button>
              </Link>
              <Link to="/teams">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore Teams
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1624458198744-0bd9348e9e0e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500" 
              alt="IPL Stadium" 
              className="rounded-lg shadow-lg max-w-full h-auto animate-bounce-subtle"
              style={{ maxHeight: '350px' }}
            />
          </div>
        </div>
      </section>
      
      {/* Stats Banner */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <Trophy className="w-8 h-8 text-ipl-blue" />
              </div>
              <h3 className="text-2xl font-bold">17 Seasons</h3>
              <p className="text-gray-600">of Cricketing Excellence</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-ipl-blue" />
              </div>
              <h3 className="text-2xl font-bold">10 Teams</h3>
              <p className="text-gray-600">Competing for Glory</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <CalendarDays className="w-8 h-8 text-ipl-blue" />
              </div>
              <h3 className="text-2xl font-bold">70+ Matches</h3>
              <p className="text-gray-600">Thrilling Cricket Action</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Matches Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Upcoming Matches</h2>
            <Link to="/matches" className="text-ipl-blue hover:text-ipl-blue/80 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {upcomingMatches.map(match => (
              <MatchCard key={match.id} {...match} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Teams Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Teams</h2>
            <Link to="/teams" className="text-ipl-blue hover:text-ipl-blue/80 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTeams.map(team => (
              <TeamCard key={team.id} {...team} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Book Tickets CTA */}
      <section className="py-16 stadium-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto p-6 md:p-10 bg-black/60 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Action Live!</h2>
            <p className="text-xl mb-8">
              Book your tickets now and witness the excitement of IPL 2025 in person.
            </p>
            <Link to="/matches">
              <Button size="lg" className="bg-ipl-orange hover:bg-ipl-orange/90">
                Book Tickets Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Latest News</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsFeed.map(news => (
              <div key={news.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{news.date}</p>
                  <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                  <p className="text-gray-600">{news.summary}</p>
                  <a href="#" className="text-ipl-blue hover:underline mt-3 inline-block">
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
