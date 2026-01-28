'use client';
import React from 'react';
import { Settings, LogOut, LucideIcon, X, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  colorClass = "green",
  onLogout
}) => {
  const accentColor = colorClass === 'pink' ? 'text-rose-500' : 'text-emerald-600';
  const activeBg = colorClass === 'pink' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-stone-800/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-md border-r border-stone-100 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
        isOpen ? 'translate-x-0' : '-translate-x-full',
        "md:translate-x-0 md:static md:inset-auto"
      )}>
        <div className="p-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              colorClass === 'pink' ? 'bg-rose-100' : 'bg-emerald-100'
            )}>
              <Baby className={cn("w-5 h-5", accentColor)} />
            </div>
            <span className={cn("text-2xl font-bold font-[Patrick_Hand] tracking-wide", accentColor)}>{title}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="md:hidden text-stone-400 hover:text-stone-600"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => {
                  setView(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full justify-start gap-4 px-6 py-6 rounded-3xl text-sm font-semibold transition-all duration-300",
                  isActive
                    ? cn(activeBg, "shadow-sm translate-x-2")
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-700 hover:translate-x-1"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} strokeWidth={2} />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-stone-100 space-y-2 shrink-0">
          <Button
            variant="ghost"
            onClick={() => {
              setView('settings');
              setIsOpen(false);
            }}
            className={cn(
              "w-full justify-start gap-4 px-6 py-6 rounded-3xl text-sm font-semibold transition-all duration-300",
              currentView === 'settings'
                ? cn(activeBg, "shadow-sm")
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
            )}
          >
            <Settings className="w-5 h-5" />
            Settings
          </Button>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start gap-4 px-6 py-6 rounded-3xl text-sm font-semibold text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;