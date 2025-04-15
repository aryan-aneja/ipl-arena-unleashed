
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Users } from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <video 
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay 
        muted 
        loop 
      >
        <source src="https://player.vimeo.com/external/577442929.hd.mp4?s=95cd585203a1df85b00594cf8551cf763bfd252e&profile_id=174&oauth2_token_id=57447761" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">Coming Soon</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              IPL <span className="text-ipl-orange">2025</span>
              <br />Season
            </h1>
            
            <p className="text-white/90 text-xl mb-8 leading-relaxed max-w-lg">
              Experience the thrill of cricket's biggest festival with exclusive access to matches, 
              behind-the-scenes content, and premium features.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 text-white/80">
                <CalendarDays className="w-5 h-5 text-ipl-orange" />
                <span>April 5 - May 30, 2025</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-5 h-5 text-ipl-orange" />
                <span>10 Venues Across India</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Users className="w-5 h-5 text-ipl-orange" />
                <span>10 Teams • 74 Matches</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/matches">
                <Button size="lg" className="bg-ipl-orange hover:bg-ipl-orange/90 text-white px-8">
                  Book Tickets
                </Button>
              </Link>
              <Link to="/teams">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  View Teams
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 text-white/30 text-sm">
        IPL 2025 • The Greatest Cricket Show
      </div>
    </div>
  );
};

export default Banner;
