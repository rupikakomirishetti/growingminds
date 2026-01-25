'use client';
import React from 'react';
import { ActivityLog, ActivityType, Child } from '../types';
import { Utensils, Moon, Gamepad2, BookOpen, Clock, Baby } from 'lucide-react';

interface DailyFeedProps {
  activities: ActivityLog[];
  childrenData: Child[];
}

const DailyFeed: React.FC<DailyFeedProps> = ({ activities, childrenData }) => {
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case ActivityType.MEAL: return <Utensils className="w-5 h-5 text-orange-500" />;
      case ActivityType.NAP: return <Moon className="w-5 h-5 text-indigo-500" />;
      case ActivityType.PLAY: return <Gamepad2 className="w-5 h-5 text-emerald-500" />;
      case ActivityType.LEARNING: return <BookOpen className="w-5 h-5 text-sky-500" />;
      case ActivityType.BATHROOM: return <Baby className="w-5 h-5 text-rose-500" />;
      default: return <Clock className="w-5 h-5 text-stone-500" />;
    }
  };

  const getBgColor = (type: ActivityType) => {
    switch (type) {
      case ActivityType.MEAL: return 'bg-orange-100';
      case ActivityType.NAP: return 'bg-indigo-100';
      case ActivityType.PLAY: return 'bg-emerald-100';
      case ActivityType.LEARNING: return 'bg-sky-100';
      case ActivityType.BATHROOM: return 'bg-rose-100';
      default: return 'bg-stone-100';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-4xl font-bold text-stone-700">Daily Journey</h1>
            <p className="text-stone-400 mt-1">Tracing footsteps through the day</p>
        </div>
        <input 
          type="date" 
          className="ghibli-input"
          defaultValue={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="relative ml-4 md:ml-8 space-y-12">
        {/* Vine Line */}
        <div className="absolute left-0 top-4 bottom-4 w-1 bg-stone-200 rounded-full"></div>

        {sortedActivities.map((activity, index) => {
          const child = childrenData.find(c => c.id === activity.childId);
          return (
            <div key={activity.id} className="relative pl-12">
              {/* Leaf/Flower Marker */}
              <div className={`absolute -left-[1.15rem] top-0 w-10 h-10 rounded-full border-4 border-[#fdfcf0] ${getBgColor(activity.type)} flex items-center justify-center shadow-sm z-10 transition-transform hover:scale-110`}>
                {getIcon(activity.type)}
              </div>

              {/* Content Card */}
              <div 
                className="ghibli-card p-6 bg-white hover:bg-white/80 transition-colors border-0"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-between items-start mb-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    {child && (
                       <img src={child.photoUrl} alt={child.firstName} className="w-8 h-8 rounded-full shadow-sm object-cover" />
                    )}
                    <span className="font-bold text-stone-700 text-lg">{child?.firstName}</span>
                    <span className="bg-stone-100 text-stone-500 text-xs px-3 py-1 font-semibold rounded-full tracking-wide">{activity.type}</span>
                  </div>
                  <time className="text-sm font-semibold text-stone-400 bg-stone-50 px-3 py-1 rounded-full">
                    {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </time>
                </div>
                
                <p className="text-xl font-bold text-stone-800 mb-2">{activity.description}</p>
                {activity.details && (
                  <p className="text-base text-stone-500 italic bg-stone-50/50 p-3 rounded-xl border border-stone-50/50 mb-4 inline-block">
                    "{activity.details}"
                  </p>
                )}

                {activity.imageUrl && (
                  <div className="mt-2 rounded-2xl overflow-hidden shadow-sm rotate-1 hover:rotate-0 transition-transform duration-500">
                    <img 
                      src={activity.imageUrl} 
                      alt="Activity" 
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyFeed;