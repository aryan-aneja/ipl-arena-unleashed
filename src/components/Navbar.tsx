import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
      
      if (loginStatus) {
        try {
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          setUserName(userData.name || 'User');
        } catch (e) {
          console.error('Error parsing user data', e);
        }
      }
    };
    
    checkLoginStatus();
    // Add event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-ipl-blue text-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/8/84/Indian_Premier_League_Official_Logo.svg" 
                alt="IPL Logo" 
                className="w-8 h-8"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/40?text=IPL";
                }}
              />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-ipl-orange">IPL</span> Arena
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-ipl-orange transition py-2 border-b-2 ${
                isActive('/') ? 'border-ipl-orange text-ipl-orange' : 'border-transparent'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/teams" 
              className={`hover:text-ipl-orange transition py-2 border-b-2 ${
                isActive('/teams') ? 'border-ipl-orange text-ipl-orange' : 'border-transparent'
              }`}
            >
              Teams
            </Link>
            <Link 
              to="/matches" 
              className={`hover:text-ipl-orange transition py-2 border-b-2 ${
                isActive('/matches') ? 'border-ipl-orange text-ipl-orange' : 'border-transparent'
              }`}
            >
              Matches
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/dashboard" 
                  className="text-ipl-gold hover:text-white transition"
                >
                  Dashboard
                </Link>
                
                {/* Notifications Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        2
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      New match schedule announced!
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Ticket booking now available
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Settings Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
          <button onClick={toggleMenu} className="md:hidden text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-ipl-blue z-50 shadow-lg fadeIn p-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/"
                className={`py-2 hover:text-ipl-orange transition ${
                  isActive('/') ? 'text-ipl-orange' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/teams"
                className={`py-2 hover:text-ipl-orange transition ${
                  isActive('/teams') ? 'text-ipl-orange' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Teams
              </Link>
              <Link 
                to="/matches"
                className={`py-2 hover:text-ipl-orange transition ${
                  isActive('/matches') ? 'text-ipl-orange' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Matches
              </Link>
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/dashboard"
                    className="text-ipl-gold hover:text-white transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button 
                    variant="outline" 
                    className="border-ipl-gold text-ipl-gold hover:bg-ipl-gold hover:text-black flex items-center justify-center"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Log Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
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
