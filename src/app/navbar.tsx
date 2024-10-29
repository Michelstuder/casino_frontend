import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, PlayIcon, UserCircleIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close the dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-800 hover:text-indigo-500 flex items-center">
              <HomeIcon className="h-6 w-6" />
              <span className="hidden md:inline ml-1">Home</span>
            </Link>
            <Link to="/games" className="text-gray-800 hover:text-indigo-500 flex items-center">
              <PlayIcon className="h-6 w-6" />
              <span className="hidden md:inline ml-1">Games</span>
            </Link>
          </div>
          <div className="relative flex items-center">
            {isLoggedIn ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="text-gray-800 hover:text-indigo-500 flex items-center focus:outline-none"
                >
                  <UserCircleIcon className="h-6 w-6" />
                </button>
                
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        onLogout();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <ArrowLeftStartOnRectangleIcon className="h-5 w-5 inline mr-1" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="text-gray-800 hover:text-indigo-500 flex items-center">
                <UserCircleIcon className="h-6 w-6" />
                <span className="hidden md:inline ml-1">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
