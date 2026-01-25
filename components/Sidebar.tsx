import React from 'react';
import { Settings, LogOut, LucideIcon, X, Baby } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menuItems: MenuItem[];
  title: string;
  colorClass?: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setView, 
  isOpen, 
  setIsOpen, 
  menuItems,
  title,
  colorClass = "green", // default to nature green
  onLogout
}) => {
  
  // Theme colors - soft nature tones
  const themeColors: Record<string, string> = {
    indigo: 'text-indigo-600 bg-indigo-50',
    pink: 'text-rose-500 bg-rose-50',
    green: 'text-emerald-600 bg-emerald-50',
    blue: 'text-sky-600 bg-sky-50',
  };

  const activeStyle = themeColors[colorClass] || themeColors.green;
  const accentColor = colorClass === 'pink' ? 'text-rose-500' : 'text-emerald-600';

  return (
    <>
      {/* Mobile Overlay with blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-stone-800/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-md border-r border-stone-100 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:inset-auto md:flex md:flex-col
        shadow-[4px_0_24px_rgba(0,0,0,0.02)]
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${colorClass === 'pink' ? 'bg-rose-100' : 'bg-emerald-100'} flex items-center justify-center`}>
              <Baby className={`w-5 h-5 ${accentColor}`} />
            </div>
            <span className={`text-2xl font-bold ${accentColor} tracking-wide`}>{title}</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-stone-400 hover:text-stone-600">
             <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-sm font-semibold transition-all duration-300
                  ${isActive 
                    ? `${activeStyle} shadow-sm translate-x-2` 
                    : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700 hover:translate-x-1'}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} strokeWidth={2} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-stone-100 space-y-2">
           <button 
             onClick={() => {
                setView('settings');
                setIsOpen(false);
             }}
             className={`w-full flex items-center gap-4 px-6 py-3 rounded-3xl text-sm font-semibold transition-all duration-300
               ${currentView === 'settings' 
                 ? `${activeStyle} shadow-sm` 
                 : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'}
             `}
           >
             <Settings className="w-5 h-5" />
             Settings
           </button>
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-4 px-6 py-3 rounded-3xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-colors"
            >
             <LogOut className="w-5 h-5" />
             Logout
           </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;