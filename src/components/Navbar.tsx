import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">NeoMyst</Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;