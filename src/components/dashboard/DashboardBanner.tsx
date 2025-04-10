
import React from 'react';
import { Button } from '@/components/ui/button';

const DashboardBanner: React.FC = () => {
  return (
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
  );
};

export default DashboardBanner;
