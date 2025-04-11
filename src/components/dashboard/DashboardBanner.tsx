
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';

const DashboardBanner: React.FC = () => {
  return (
    <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
      <div className="relative w-full" style={{ height: "400px" }}>
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
        >
          <source src="https://player.vimeo.com/external/577442929.hd.mp4?s=95cd585203a1df85b00594cf8551cf763bfd252e&profile_id=174&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-ipl-blue/90 via-ipl-blue/70 to-transparent flex items-center">
          <div className="p-8 max-w-lg">
            <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              Coming Soon
            </span>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              IPL 2025 <span className="text-ipl-orange">Season</span>
            </h2>
            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              Experience the excitement of the world's biggest T20 cricket league with exclusive access to matches and behind-the-scenes content!
            </p>
            
            <div className="mb-7 space-y-3">
              <div className="flex items-center text-white/80">
                <Calendar size={16} className="mr-2" />
                <span>April 5 - May 30, 2025</span>
              </div>
              <div className="flex items-center text-white/80">
                <MapPin size={16} className="mr-2" />
                <span>10 Venues Across India</span>
              </div>
              <div className="flex items-center text-white/80">
                <Clock size={16} className="mr-2" />
                <span>74 Matches • 10 Teams</span>
              </div>
            </div>
            
            <Button className="bg-ipl-orange hover:bg-ipl-orange/90 text-white font-semibold px-6 py-5 h-auto text-base shadow-lg transform transition hover:scale-105">
              Book Tickets Now
            </Button>
          </div>
        </div>
        
        {/* IPL logo watermark */}
        <div className="absolute bottom-5 right-5 opacity-50">
          <div className="text-white text-xl font-bold">
            IPL 2025
          </div>
        </div>
        
        {/* Video play status indicator */}
        <div className="absolute bottom-5 left-5 flex items-center text-white/50 text-xs">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
          <span>LIVE PREVIEW</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
