import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary border-primary' : 'text-gray-600 border-transparent hover:text-primary hover:border-primary';
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <i className="fas fa-image text-primary text-2xl"></i>
            <span className="font-bold text-xl text-gray-900">Image Analyzer</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/')} border-b-2 flex items-center h-16 transition-colors duration-200`}
            >
              <i className="fas fa-home mr-2"></i> Home
            </Link>
            <Link 
              to="/upload" 
              className={`${isActive('/upload')} border-b-2 flex items-center h-16 transition-colors duration-200`}
            >
              <i className="fas fa-upload mr-2"></i> Upload
            </Link>
            <Link 
              to="/analysis" 
              className={`${isActive('/analysis')} border-b-2 flex items-center h-16 transition-colors duration-200`}
            >
              <i className="fas fa-chart-bar mr-2"></i> Analysis
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-primary">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            <i className="fas fa-home mr-2"></i> Home
          </Link>
          <Link 
            to="/upload" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            <i className="fas fa-upload mr-2"></i> Upload
          </Link>
          <Link 
            to="/analysis" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            <i className="fas fa-chart-bar mr-2"></i> Analysis
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;