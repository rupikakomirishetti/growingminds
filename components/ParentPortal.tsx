'use client';
import React, { useState } from 'react';
import Layout from './Layout';
import DailyFeed from './DailyFeed';
import PhotoGallery from './PhotoGallery';
import ProgressTracker from './ProgressTracker';
import { MOCK_ACTIVITIES, MOCK_PROGRESS } from '../constants';
import { Child } from '../types';
import { Home, Activity, Image, BarChart3, MessageCircle, ArrowRight, Heart, Save, User, Mail, Phone, Hash, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ParentPortalProps {
  childrenData: Child[];
  onLogout: () => void;
}

const ParentPortal: React.FC<ParentPortalProps> = ({ childrenData, onLogout }) => {
  const [currentView, setCurrentView] = useState('home');
  const [myChild, setMyChild] = useState<Child>(childrenData[0]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  const myActivities = MOCK_ACTIVITIES.filter(a => a.childId === myChild.id);

  const menuItems = [
    { id: 'home', label: 'Home Overview', icon: Home },
    { id: 'feed', label: `${myChild.firstName}'s Day`, icon: Activity },
    { id: 'gallery', label: 'Photo Gallery', icon: Image },
    { id: 'progress', label: 'Development', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1000);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="space-y-8 pb-12">
             <div className="ghibli-card bg-gradient-to-r from-rose-200 to-orange-100 p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                   <h1 className="text-4xl font-bold text-stone-800 mb-2 font-[Patrick_Hand]">Hello, Thompson Family!</h1>
                   <p className="text-stone-700 font-medium text-lg">Here is what {myChild.firstName} is discovering today.</p>
                </div>
                <div className="relative z-10 w-28 h-28 rounded-full border-4 border-white shadow-lg p-1 bg-white/50">
                    <img src={myChild.photoUrl} alt={myChild.firstName} className="w-full h-full rounded-full object-cover" />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="ghibli-card p-8 bg-white border-0 hover:bg-emerald-50/30 transition-colors">
                   <h2 className="font-bold text-xl text-stone-600 mb-6 flex items-center gap-3">
                     <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                     Current Status
                   </h2>
                   <div className="text-center py-4">
                      <p className="text-6xl font-bold text-stone-700 mb-3 font-[Patrick_Hand]">Nap Time</p>
                      <p className="text-emerald-600 font-bold bg-emerald-50 inline-block px-4 py-2 rounded-full shadow-sm">Started at 1:00 PM</p>
                   </div>
                </div>
                 <div className="ghibli-card p-8 bg-white border-0 hover:bg-sky-50/30 transition-colors">
                   <h2 className="font-bold text-xl text-stone-600 mb-6">Latest Whisper</h2>
                   <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 relative mt-4">
                      <div className="absolute -top-3 left-6 w-6 h-6 bg-amber-50 transform rotate-45 border-t border-l border-amber-100"></div>
                      <p className="text-stone-700 font-medium text-lg italic">"{myActivities[0]?.description || 'Having a great day!'}"</p>
                      <p className="text-xs text-stone-400 font-bold mt-4 text-right uppercase tracking-wider">Just now</p>
                   </div>
                </div>
             </div>
             
             <div className="ghibli-card p-0 border-0 overflow-hidden">
                <div className="p-6 bg-violet-50 flex justify-between items-center">
                   <h2 className="font-bold text-xl text-violet-900">Recent Memories</h2>
                   <Button onClick={() => setCurrentView('gallery')} className="bg-white text-violet-600 text-xs font-bold px-4 py-2 rounded-full hover:bg-violet-100 transition-colors flex items-center gap-1 shadow-sm h-auto" variant="outline">
                     View Gallery <ArrowRight className="w-3 h-3"/>
                   </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white/60">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="aspect-square bg-stone-100 rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-sm">
                        <img src={`https://picsum.photos/300/300?random=${i+10}`} className="w-full h-full object-cover" alt="Preview" />
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );
      case 'feed': return <DailyFeed activities={myActivities} childrenData={childrenData} />;
      case 'gallery': return <PhotoGallery activities={myActivities} />;
      case 'progress': return <ProgressTracker data={MOCK_PROGRESS} childrenData={[myChild]} />;
      case 'messages':
        return (
           <div className="flex flex-col items-center justify-center h-[50vh] ghibli-card border-0 bg-white/60">
              <div className="bg-rose-50 p-6 rounded-full mb-6 animate-float">
                <MessageCircle className="w-16 h-16 text-rose-300" />
              </div>
              <p className="font-bold text-xl text-stone-600 mb-8">Quiet in the message box.</p>
              <a 
                href="mailto:growingmindsdaycaretx@gmail.com"
                className="ghibli-btn px-8 py-3 bg-rose-400 text-white font-bold shadow-lg shadow-rose-200 inline-block"
              >
                 Write to Teacher
              </a>
           </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="text-center mb-8">
               <h1 className="text-4xl font-bold text-stone-700 mb-2">Child Settings</h1>
               <p className="text-stone-400">Manage {myChild.firstName}'s information and contact details</p>
            </div>

            <form onSubmit={handleSaveSettings} className="ghibli-card p-10 bg-white border-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2 text-sm font-bold text-stone-500 ml-1">
                    <User className="w-4 h-4" /> First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    disabled
                    className="ghibli-input w-full bg-stone-50 text-stone-400 cursor-not-allowed border-stone-100 h-12"
                    value={myChild.firstName}
                  />
                  <p className="text-[10px] text-stone-400 italic ml-1">* Contact admin to change name</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2 text-sm font-bold text-stone-500 ml-1">
                    <User className="w-4 h-4" /> Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    disabled
                    className="ghibli-input w-full bg-stone-50 text-stone-400 cursor-not-allowed border-stone-100 h-12"
                    value={myChild.lastName}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId" className="flex items-center gap-2 text-sm font-bold text-stone-600 ml-1">
                  <Hash className="w-4 h-4" /> Student ID
                </Label>
                <Input
                  id="studentId"
                  type="text"
                  className="ghibli-input w-full h-12"
                  value={myChild.id}
                  onChange={e => setMyChild({...myChild, id: e.target.value})}
                  placeholder="ID Number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianEmail" className="flex items-center gap-2 text-sm font-bold text-stone-600 ml-1">
                  <Mail className="w-4 h-4" /> Guardian Email
                </Label>
                <Input
                  id="guardianEmail"
                  type="email"
                  className="ghibli-input w-full h-12"
                  value={myChild.email || ''}
                  onChange={e => setMyChild({...myChild, email: e.target.value})}
                  placeholder="parent@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianPhone" className="flex items-center gap-2 text-sm font-bold text-stone-600 ml-1">
                  <Phone className="w-4 h-4" /> Guardian Phone
                </Label>
                <Input
                  id="guardianPhone"
                  type="tel"
                  className="ghibli-input w-full h-12"
                  value={myChild.phoneNumber || ''}
                  onChange={e => setMyChild({...myChild, phoneNumber: e.target.value})}
                  placeholder="(555) 000-0000"
                />
              </div>

              <div className="pt-6 border-t border-stone-50">
                <Button
                  type="submit"
                  disabled={saveStatus !== 'idle'}
                  className={`w-full py-4 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 h-auto
                    ${saveStatus === 'saved' ? 'bg-emerald-500 shadow-emerald-100' : 'bg-rose-400 shadow-rose-100 hover:bg-rose-500'}
                    disabled:opacity-80
                  `}
                >
                  {saveStatus === 'idle' && (
                    <>
                      <Save className="w-5 h-5" />
                      SAVE SETTINGS
                    </>
                  )}
                  {saveStatus === 'saving' && (
                    <span className="animate-pulse">Updating Village Records...</span>
                  )}
                  {saveStatus === 'saved' && (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      SETTINGS SAVED!
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        );
      default: return null;
    }
  };

  return (
    <Layout
      currentView={currentView}
      setView={setCurrentView}
      menuItems={menuItems}
      title="GrowingMinds"
      colorClass="pink"
      onLogout={onLogout}
      user={{ name: "Thompson Family", role: "Parent", icon: <Heart className="w-6 h-6 fill-rose-200" /> }}
    >
      {renderContent()}
    </Layout>
  );
};

export default ParentPortal;