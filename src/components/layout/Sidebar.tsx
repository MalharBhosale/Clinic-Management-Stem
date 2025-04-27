import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

const Sidebar: React.FC = () => {
  const { currentUser, signOut } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Common navigation items
  const commonNavItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Patients', path: '/patients', icon: <Users size={20} /> },
  ];
  
  // Doctor specific navigation items
  const doctorNavItems = [
    { name: 'Consultations', path: '/consultations', icon: <Calendar size={20} /> },
    { name: 'Prescriptions', path: '/prescriptions', icon: <FileText size={20} /> },
  ];
  
  // Receptionist specific navigation items
  const receptionistNavItems = [
    { name: 'Tokens', path: '/tokens', icon: <Calendar size={20} /> },
    { name: 'Billing', path: '/billing', icon: <CreditCard size={20} /> },
  ];
  
  // Determine which navigation items to show based on user role
  const navItems = [
    ...commonNavItems,
    ...(currentUser?.role === UserRole.DOCTOR ? doctorNavItems : []),
    ...(currentUser?.role === UserRole.RECEPTIONIST ? receptionistNavItems : []),
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];
  
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">Direction Clinic</h1>
        <p className="text-sm text-gray-500 mt-1">Management System</p>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="px-4 py-3">
          <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
          <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
        </div>
        <button
          onClick={signOut}
          className="flex items-center w-full px-4 py-3 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;