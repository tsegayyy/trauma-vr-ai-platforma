import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Moon, Sun, User } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import Logo from '../common/Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useUserStore();

  // Toggle for mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement dark mode logic here
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="safe-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold text-primary-700">Serenity Space</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
              Home
            </NavLink>
            <NavLink to="/chat-rooms" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
              Support Groups
            </NavLink>
            <NavLink to="/resources" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
              Resources
            </NavLink>
            <NavLink to="/calendar" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
              Events
            </NavLink>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-surface-600 hover:text-primary-600 hover:bg-primary-50"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isAuthenticated ? (
              <Link to="/profile" className="btn-primary">
                <User size={18} className="mr-2" />
                My Profile
              </Link>
            ) : (
              <Link to="/auth" className="btn-primary">
                <Heart size={18} className="mr-2" />
                Join Community
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg text-surface-700 hover:bg-surface-100"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-1">
              <NavLink to="/" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                Home
              </NavLink>
              <NavLink to="/chat-rooms" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                Support Groups
              </NavLink>
              <NavLink to="/resources" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                Resources
              </NavLink>
              <NavLink to="/calendar" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                Events
              </NavLink>
              
              <div className="pt-4 flex items-center justify-between">
                <button 
                  onClick={toggleDarkMode}
                  className="flex items-center nav-link"
                >
                  {isDarkMode ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                
                {isAuthenticated ? (
                  <Link to="/profile" className="btn-primary">
                    <User size={18} className="mr-2" />
                    My Profile
                  </Link>
                ) : (
                  <Link to="/auth" className="btn-primary">
                    <Heart size={18} className="mr-2" />
                    Join Community
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;