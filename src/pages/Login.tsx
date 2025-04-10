
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { users } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    // Simulate login process
    setIsLoading(true);
    setTimeout(() => {
      const user = users.find(
        u => u.email === email && u.password === password
      );
      
      if (user) {
        // In a real app, we would set authentication tokens/state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name }));
        navigate('/'); // Redirect to homepage/dashboard
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-gray-600">Log in to access your IPL Arena account</p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    <a href="#" className="text-sm text-ipl-blue hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-ipl-blue hover:bg-ipl-blue/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <g transform="matrix(1, 0, 0, 1, 27.009, -39.238)">
                      <path fill="#4285F4" d="M-3.264,51.509c0,-0.79 -0.07,-1.54 -0.19,-2.27l-11.745,0l0,4.51l6.73,0c-0.29,1.54 -1.16,2.85 -2.48,3.72l0,3.09l4.02,0c2.35,-2.17 3.7,-5.37 3.7,-9.05Z"></path>
                      <path fill="#34A853" d="M-15.199,60.979c3.36,0 6.19,-1.12 8.25,-3.05l-4.02,-3.09c-1.12,0.75 -2.55,1.19 -4.23,1.19c-3.26,0 -6.01,-2.19 -6.99,-5.14l-4.17,0l0,3.19c2.05,4.06 6.27,6.9 11.16,6.9Z"></path>
                      <path fill="#FBBC05" d="M-22.189,50.899c-0.25,-0.75 -0.39,-1.55 -0.39,-2.37c0,-0.82 0.14,-1.62 0.39,-2.37l0,-3.19l-4.17,0c-0.84,1.69 -1.32,3.6 -1.32,5.56c0,1.96 0.48,3.87 1.32,5.56l4.17,-3.19Z"></path>
                      <path fill="#EA4335" d="M-15.199,43.169c1.84,0 3.48,0.63 4.78,1.86l3.56,-3.56c-2.17,-2.02 -5,-3.25 -8.34,-3.25c-4.89,0 -9.11,2.84 -11.16,6.9l4.17,3.19c0.98,-2.95 3.73,-5.14 6.99,-5.14Z"></path>
                    </g>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm">
              <p>Don't have an account?{' '}
                <Link to="/signup" className="text-ipl-blue font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Hint: To test login, use email: user@example.com / password: password123</p>
          </div>
        </div>
      </div>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Login;
