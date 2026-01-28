'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            // Not authenticated - redirect to login
            if (!user) {
                router.push('/login');
                return;
            }

            // Authenticated but wrong role
            if (requireAdmin && !isAdmin) {
                // User is not admin but trying to access admin route
                router.push('/parent');
            } else if (!requireAdmin && isAdmin) {
                // User is admin but trying to access parent route
                router.push('/admin');
            }
        }
    }, [user, loading, isAdmin, requireAdmin, router]);

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-stone-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render children if redirecting
    if (!user || (requireAdmin && !isAdmin) || (!requireAdmin && isAdmin)) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
