
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
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

  return (
    <header className="bg-ipl-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 mr-2 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/8/84/Indian_Premier_League_Official_Logo.svg" 
                alt="IPL Logo" 
                className="w-8 h-8"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/40?text=IPL";
                }}
              />
            </div>
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
                <Link to="/dashboard" className="text-ipl-gold hover:text-white transition">
                  Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  className="border-ipl-gold text-ipl-gold hover:bg-ipl-gold hover:text-black flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
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
                  <Link 
                    to="/dashboard"
                    className="text-ipl-gold hover:text-white transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button 
                    variant="outline" 
                    className="border-ipl-gold text-ipl-gold hover:bg-ipl-gold hover:text-black flex items-center"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
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
