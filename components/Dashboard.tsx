import React from 'react';
import { Child, ActivityLog, ActivityType } from '../types';
import { Clock, Utensils, Moon, AlertCircle, ArrowUpRight, Sun } from 'lucide-react';

interface DashboardProps {
  childrenData: Child[];
  activities: ActivityLog[];
}

const Dashboard: React.FC<DashboardProps> = ({ childrenData, activities }) => {
  const activeChild = childrenData[0];
  const recentActivities = activities
    .filter(a => a.childId === activeChild.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-bold text-emerald-800 drop-shadow-sm">Dashboard</h1>
          <p className="text-stone-500 font-medium text-lg mt-2 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            Welcome back to the village, Thompson Family!
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-100 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-amber-800">Meeting tomorrow @ 4 PM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Child Profile Card */}
        {childrenData.map(child => (
          <div key={child.id} className="ghibli-card overflow-hidden group border-0">
             <div className="h-32 bg-gradient-to-r from-sky-200 to-indigo-200 relative">
               <div className="absolute -bottom-12 left-8">
                 <img src={child.photoUrl} alt={child.firstName} className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" />
               </div>
             </div>
             <div className="pt-16 px-8 pb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-3xl font-bold text-stone-700">{child.firstName} {child.lastName}</h3>
                        <p className="text-stone-400 font-medium">{child.group}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wide">
                        Present
                    </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-stone-50 p-4 rounded-2xl text-center hover:bg-stone-100 transition-colors">
                    <span className="block text-stone-400 text-xs font-bold uppercase mb-1 tracking-wider">Status</span>
                    <span className="text-emerald-600 font-bold text-lg">Checked In</span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-2xl text-center hover:bg-stone-100 transition-colors">
                    <span className="block text-stone-400 text-xs font-bold uppercase mb-1 tracking-wider">Next Meal</span>
                    <span className="text-orange-400 font-bold text-lg">Snack</span>
                  </div>
                </div>
             </div>
          </div>
        ))}

        {/* Quick Stats Card */}
        <div className="ghibli-card p-8 flex flex-col justify-between border-0 bg-white/60">
           <h3 className="text-2xl font-bold text-stone-700 mb-6 flex items-center gap-2">
               Village Stats <ArrowUpRight className="w-5 h-5 text-stone-400" />
           </h3>
           <div className="space-y-4">
             <div className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-stone-50 hover:shadow-md transition-shadow cursor-default">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center"><Clock className="w-5 h-5"/></div>
                 <div>
                   <p className="font-bold text-stone-700">Attendance</p>
                   <p className="text-xs text-stone-400 font-medium">This Month</p>
                 </div>
               </div>
               <span className="text-2xl font-bold text-stone-700">98%</span>
             </div>
             <div className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-stone-50 hover:shadow-md transition-shadow cursor-default">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center"><Utensils className="w-5 h-5"/></div>
                 <div>
                   <p className="font-bold text-stone-700">Meals</p>
                   <p className="text-xs text-stone-400 font-medium">This Week</p>
                 </div>
               </div>
               <span className="text-2xl font-bold text-stone-700">14/15</span>
             </div>
           </div>
        </div>
      </div>

      {/* Activity Feed Snippet */}
      <div className="ghibli-card p-8 border-0">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-stone-700">Today's Journey</h3>
            <span className="text-stone-400 text-sm font-medium italic">Latest updates from the classroom</span>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
             <div key={activity.id} className="flex gap-6 p-4 rounded-2xl hover:bg-stone-50 transition-colors group">
               <div className="flex-shrink-0 mt-2">
                 <div className="w-10 h-10 rounded-full bg-white border border-stone-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform text-stone-500">
                    {activity.type === ActivityType.MEAL && <Utensils className="w-4 h-4 text-orange-400" />}
                    {activity.type === ActivityType.NAP && <Moon className="w-4 h-4 text-indigo-400" />}
                    {activity.type === ActivityType.PLAY && <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>}
                    {activity.type === ActivityType.CHECKIN && <Clock className="w-4 h-4 text-sky-400" />}
                 </div>
               </div>
               <div>
                 <div className="flex items-center gap-3 mb-1">
                    <p className="text-lg font-bold text-stone-700">{activity.description}</p>
                    <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-2 py-1 rounded-full">
                        {new Date(activity.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                 </div>
                 {activity.details && <p className="text-stone-500 leading-relaxed">{activity.details}</p>}
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;