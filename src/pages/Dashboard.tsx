import React from 'react';
import { UsersRound, ClipboardList, Calendar, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Stats based on user role
  const statsCards = [
    {
      title: 'Total Patients',
      value: '256',
      icon: <UsersRound size={24} className="text-blue-500" />,
      change: '+12% from last month',
      positive: true
    },
    ...(currentUser?.role === UserRole.DOCTOR
      ? [
          {
            title: 'Consultations Today',
            value: '18',
            icon: <Calendar size={24} className="text-green-500" />,
            change: '+5% from yesterday',
            positive: true
          },
          {
            title: 'New Prescriptions',
            value: '24',
            icon: <ClipboardList size={24} className="text-purple-500" />,
            change: '+8% from last week',
            positive: true
          }
        ]
      : [
          {
            title: 'Tokens Generated',
            value: '32',
            icon: <Calendar size={24} className="text-orange-500" />,
            change: '+15% from yesterday',
            positive: true
          },
          {
            title: 'Revenue Today',
            value: '$1,250',
            icon: <CreditCard size={24} className="text-green-500" />,
            change: '+10% from yesterday',
            positive: true
          }
        ])
  ];
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {currentUser?.name}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of what's happening today at the clinic.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">{stat.title}</h3>
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-semibold text-gray-800">{stat.value}</p>
              <p className={`text-sm mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card title="Recent Activity">
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} className="py-3">
                <p className="text-sm font-medium text-gray-800">
                  {item % 2 === 0
                    ? 'New patient registered'
                    : item % 3 === 0
                    ? 'Prescription created'
                    : 'Token generated'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(Date.now() - item * 1000 * 60 * 60).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </Card>
        
        <Card title={currentUser?.role === UserRole.DOCTOR ? 'Upcoming Consultations' : 'Recent Tokens'}>
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} className="py-3">
                {currentUser?.role === UserRole.DOCTOR ? (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-800">Patient {item}</p>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        Token #{item + 10}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Scheduled for {new Date(Date.now() + item * 1000 * 60 * 30).toLocaleTimeString()}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-800">Patient {item}</p>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Token #{item + 10}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Generated at {new Date(Date.now() - item * 1000 * 60 * 15).toLocaleTimeString()}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;