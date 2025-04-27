import React from 'react';
import { Bell, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {window.location.pathname === '/' ? 'Dashboard' : 
             window.location.pathname.split('/')[1].charAt(0).toUpperCase() + 
             window.location.pathname.split('/')[1].slice(1)}
          </h1>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none">
            <HelpCircle size={20} />
          </button>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
              <span className="font-medium text-sm">
                {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;