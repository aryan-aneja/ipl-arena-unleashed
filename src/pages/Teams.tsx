
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { teams } from '@/lib/data';
import TeamCard from '@/components/TeamCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Search } from 'lucide-react';

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter teams based on search query
  const filteredTeams = teams.filter((team) => {
    const query = searchQuery.toLowerCase();
    return (
      team.name.toLowerCase().includes(query) || 
      team.code.toLowerCase().includes(query)
    );
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-ipl-blue text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">IPL Teams</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Explore all ten Indian Premier League teams, learn about their history, 
              players, achievements, and upcoming matches.
            </p>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto py-4 px-4">
            <div className="max-w-md mx-auto relative">
              <Input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>
        
        {/* Teams Grid */}
        <div className="container mx-auto py-8 px-4">
          {filteredTeams.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No teams found</h3>
              <p className="text-gray-600">
                Try adjusting your search query to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredTeams.map((team) => (
                <TeamCard key={team.id} {...team} />
              ))}
            </div>
          )}
        </div>
        
        {/* Team Stats Section */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">IPL Team Statistics</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-ipl-blue text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Team</th>
                    <th className="py-3 px-4 text-center">Titles</th>
                    <th className="py-3 px-4 text-center">Finals</th>
                    <th className="py-3 px-4 text-center">Win %</th>
                    <th className="py-3 px-4 text-left">Home Ground</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4">Mumbai Indians</td>
                    <td className="py-3 px-4 text-center">5</td>
                    <td className="py-3 px-4 text-center">6</td>
                    <td className="py-3 px-4 text-center">57.2%</td>
                    <td className="py-3 px-4">Wankhede Stadium</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Chennai Super Kings</td>
                    <td className="py-3 px-4 text-center">5</td>
                    <td className="py-3 px-4 text-center">9</td>
                    <td className="py-3 px-4 text-center">59.8%</td>
                    <td className="py-3 px-4">M.A. Chidambaram Stadium</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Kolkata Knight Riders</td>
                    <td className="py-3 px-4 text-center">2</td>
                    <td className="py-3 px-4 text-center">3</td>
                    <td className="py-3 px-4 text-center">51.6%</td>
                    <td className="py-3 px-4">Eden Gardens</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Gujarat Titans</td>
                    <td className="py-3 px-4 text-center">1</td>
                    <td className="py-3 px-4 text-center">2</td>
                    <td className="py-3 px-4 text-center">63.3%</td>
                    <td className="py-3 px-4">Narendra Modi Stadium</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Rajasthan Royals</td>
                    <td className="py-3 px-4 text-center">1</td>
                    <td className="py-3 px-4 text-center">2</td>
                    <td className="py-3 px-4 text-center">49.5%</td>
                    <td className="py-3 px-4">Sawai Mansingh Stadium</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Sunrisers Hyderabad</td>
                    <td className="py-3 px-4 text-center">1</td>
                    <td className="py-3 px-4 text-center">2</td>
                    <td className="py-3 px-4 text-center">47.9%</td>
                    <td className="py-3 px-4">Rajiv Gandhi Int'l Cricket Stadium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Teams;
