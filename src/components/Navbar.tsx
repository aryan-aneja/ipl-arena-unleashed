
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demo purposes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // For demo purposes
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="bg-ipl-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-ipl-orange">IPL</span> Arena
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-ipl-orange transition">Home</Link>
            <Link to="/teams" className="hover:text-ipl-orange transition">Teams</Link>
            <Link to="/matches" className="hover:text-ipl-orange transition">Matches</Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-ipl-gold">Welcome, Fan!</span>
                <Button 
                  variant="outline" 
                  className="border-ipl-gold text-ipl-gold hover:bg-ipl-gold hover:text-black"
                  onClick={toggleLogin}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="hover:text-ipl-orange">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-ipl-orange hover:bg-ipl-orange/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-ipl-blue z-50 shadow-lg fadeIn">
            <div className="flex flex-col py-4 px-4 space-y-2">
              <Link 
                to="/" 
                className="py-2 hover:text-ipl-orange transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/teams" 
                className="py-2 hover:text-ipl-orange transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Teams
              </Link>
              <Link 
                to="/matches" 
                className="py-2 hover:text-ipl-orange transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Matches
              </Link>
              {isLoggedIn ? (
                <div className="py-2 flex flex-col gap-2">
                  <span className="text-sm text-ipl-gold">Welcome, Fan!</span>
                  <Button 
                    variant="outline" 
                    className="border-ipl-gold text-ipl-gold hover:bg-ipl-gold hover:text-black"
                    onClick={() => {
                      toggleLogin();
                      setIsMenuOpen(false);
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full hover:text-ipl-orange">
                      Login
                    </Button>
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-ipl-orange hover:bg-ipl-orange/90">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
