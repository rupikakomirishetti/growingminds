import React, { useState } from 'react';
import Sidebar, { MenuItem } from './Sidebar';
import { Menu, Search, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
  currentView: string;
  setView: (view: string) => void;
  title: string;
  colorClass: 'green' | 'pink' | 'blue' | 'indigo';
  user: { name: string; role: string; icon: React.ReactNode };
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  menuItems, 
  currentView, 
  setView, 
  title, 
  colorClass, 
  user: displayedUser,
  onLogout
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen flex bg-[#fdfcf0]">
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        menuItems={menuItems}
        title={title}
        colorClass={colorClass}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navigation / Header */}
        <header className="h-24 flex items-center justify-between px-6 md:px-8 z-30 shrink-0 border-b border-stone-100/50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-stone-500 hover:bg-stone-100 rounded-xl transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden lg:block group">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search the village..." 
                className="pl-12 pr-6 py-2.5 bg-white/40 border border-stone-200 rounded-2xl text-sm font-semibold focus:bg-white focus:shadow-md outline-none transition-all w-64 xl:w-80 placeholder:text-stone-400 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-3 bg-white/50 border border-stone-100 rounded-full hover:bg-stone-50 transition-colors shadow-sm flex items-center justify-center">
              <Bell className="w-5 h-5 text-stone-400" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-400 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 md:gap-4 pl-2 md:pl-0">
               <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm md:text-base font-bold text-stone-700 whitespace-nowrap leading-tight">
                  {displayedUser.name}
                </span>
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap mt-0.5 ${colorClass === 'green' ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {displayedUser.role}
                </span>
              </div>
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-sm border shrink-0 ${colorClass === 'green' ? 'bg-emerald-100 border-emerald-200 text-emerald-600' : 'bg-rose-100 border-rose-200 text-rose-500'}`}>
                {displayedUser.icon}
              </div>
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-auto p-4 md:p-10 bg-transparent">
          <div className="max-w-7xl mx-auto animate-fade-in">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;