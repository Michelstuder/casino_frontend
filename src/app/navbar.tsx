import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, PlayIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-800 hover:text-blue-500">
              <HomeIcon className="h-6 w-6" />
              <span className="hidden md:inline">Home</span>
            </Link>
            <Link to="/games" className="text-gray-800 hover:text-blue-500">
              <PlayIcon className="h-6 w-6" />
              <span className="hidden md:inline">Games</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-800 hover:text-blue-500"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="hidden md:inline">Profile</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="text-gray-800 hover:text-blue-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-800 hover:text-blue-500">
                <UserCircleIcon className="h-6 w-6" />
                <span className="hidden md:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
