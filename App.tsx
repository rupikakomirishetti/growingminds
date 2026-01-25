import React, { useState, useEffect, createContext, useContext } from 'react';
import HomePage from './app/page';
import LoginPage from './app/login/page';
import SignUpPage from './app/signup/page';
import AdminPage from './app/admin/page';
import ParentPage from './app/parent/page';
import { useAuth } from './contexts/AuthContext';

// Next.js Navigation Mock
type RoutePath = '/' | '/login' | '/signup' | '/admin' | '/parent';

interface RouterContextType {
  push: (path: RoutePath) => void;
  pathname: RoutePath;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error("useRouter must be used within NavigationProvider");
  return context;
};

export default function PageRouter() {
  const [pathname, setPathname] = useState<RoutePath>('/');
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleHash = () => {
      const hash = (window.location.hash.replace('#', '') || '/') as RoutePath;
      setPathname(hash);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const push = (path: RoutePath) => {
    window.location.hash = path;
    setPathname(path);
  };

  // Middleware simulation
  useEffect(() => {
    if (!loading) {
      const protectedPaths: RoutePath[] = ['/admin', '/parent'];
      if (!user && protectedPaths.includes(pathname)) {
        push('/login');
      }
      if (user && (pathname === '/login' || pathname === '/signup' || pathname === '/')) {
        push('/parent'); // Default entry
      }
    }
  }, [user, loading, pathname]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-stone-400 font-bold animate-pulse font-[Patrick_Hand] text-xl">The Village is Waking Up...</p>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (pathname) {
      case '/': return <HomePage />;
      case '/login': return <LoginPage />;
      case '/signup': return <SignUpPage />;
      case '/admin': return <AdminPage />;
      case '/parent': return <ParentPage />;
      default: return <HomePage />;
    }
  };

  return (
    <RouterContext.Provider value={{ push, pathname }}>
      <div className="animate-fade-in">
        {renderCurrentPage()}
      </div>
    </RouterContext.Provider>
  );
}