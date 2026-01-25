'use client';
import React, { useState } from 'react';
import Layout from './Layout';
import Dashboard from './Dashboard';
import DailyFeed from './DailyFeed';
import ProgressTracker from './ProgressTracker';
import ChildRegistration from './ChildRegistration';
import { MOCK_ACTIVITIES, MOCK_PROGRESS } from '../constants';
import { Child } from '../types';
import { LayoutDashboard, Users, Activity, BarChart, PlusCircle, Baby } from 'lucide-react';

interface AdminPortalProps {
  childrenData: Child[];
  onRegister: (child: Child) => void;
  onLogout: () => void;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ childrenData, onRegister, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'children', label: 'All Children', icon: Users },
    { id: 'feed', label: 'Center Feed', icon: Activity },
    { id: 'progress', label: 'Progress Reports', icon: BarChart },
    { id: 'register', label: 'Register Child', icon: PlusCircle },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard childrenData={childrenData} activities={MOCK_ACTIVITIES} />;
      case 'feed':
        return <DailyFeed activities={MOCK_ACTIVITIES} childrenData={childrenData} />;
      case 'progress':
        return <ProgressTracker data={MOCK_PROGRESS} childrenData={childrenData} />;
      case 'register':
        return <ChildRegistration onRegister={(c) => { onRegister(c); setCurrentView('children'); }} onCancel={() => setCurrentView('dashboard')} />;
      case 'children':
        return (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-12">
             {childrenData.map(child => (
               <div key={child.id} className="ghibli-card p-6 flex flex-col items-center border-0">
                 <div className="w-24 h-24 rounded-full p-1 mb-4 bg-gradient-to-br from-emerald-100 to-sky-100 shadow-inner">
                    <img src={child.photoUrl} alt={child.firstName} className="w-full h-full rounded-full object-cover border-2 border-white" />
                 </div>
                 <h3 className="font-bold text-xl text-stone-700">{child.firstName} {child.lastName}</h3>
                 <p className="text-stone-500 font-medium text-sm mb-6 bg-stone-100 px-3 py-1 rounded-full">{child.group}</p>
                 <button onClick={() => setCurrentView('progress')} className="ghibli-btn px-6 py-2 bg-emerald-500 text-white text-sm font-bold w-full shadow-md shadow-emerald-200">
                   View Progress
                 </button>
               </div>
             ))}
           </div>
        );
      default:
        return <Dashboard childrenData={childrenData} activities={MOCK_ACTIVITIES} />;
    }
  };

  return (
    <Layout
      currentView={currentView}
      setView={setCurrentView}
      menuItems={adminMenuItems}
      title="GrowingMinds"
      colorClass="green"
      onLogout={onLogout}
      user={{ name: "Sarah Johnson", role: "Director", icon: <Baby className="w-6 h-6" /> }}
    >
      {renderContent()}
    </Layout>
  );
};

export default AdminPortal;