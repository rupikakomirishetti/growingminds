'use client';
import React, { useState } from 'react';
import { ArrowLeft, Mail, User, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignUpPageProps {
  onSignUpSuccess: () => void;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUpSuccess, onBack, onSwitchToLogin }) => {
  const { signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleLogin = async () => {
      try {
          setIsLoggingIn(true);
          await signInWithGoogle();
      } catch (e) {
          console.error(e);
          setIsLoggingIn(false);
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, registration logic would go here
    onSignUpSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-sky-50 to-[#fdfcf0] flex items-center justify-center p-6 relative overflow-hidden font-[Quicksand]">
       
       {/* Decorative Background Elements */}
       <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-amber-100/50 rounded-full blur-3xl animate-float"></div>
       <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl"></div>

       <div className="max-w-md w-full relative z-10 animate-fade-in">
          <Button variant="ghost" onClick={onBack} className="mb-6 flex items-center gap-2 text-stone-500 hover:text-stone-700 font-bold">
            <ArrowLeft className="w-5 h-5" /> Back to Village
          </Button>

          <div className="ghibli-card p-8 bg-white/90 shadow-xl border border-white">
             <div className="text-center mb-8">
               <h1 className="text-4xl font-bold text-stone-700 font-[Patrick_Hand] mb-2 tracking-wide">Join the Village</h1>
               <p className="text-stone-500 font-medium">Begin your little one's magical journey</p>
             </div>

             <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-bold text-stone-600 ml-1">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 z-10" />
                      <Input
                        id="firstName"
                        type="text" 
                        required 
                        className="ghibli-input w-full pl-10 h-12" 
                        placeholder="e.g. Mei"
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-bold text-stone-600 ml-1">Last Name</Label>
                     <Input
                        id="lastName"
                        type="text" 
                        required 
                        className="ghibli-input w-full h-12" 
                        placeholder="Kusakabe"
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                      />
                  </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold text-stone-600 ml-1">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 z-10" />
                      <Input
                        id="email"
                        type="email" 
                        required 
                        className="ghibli-input w-full pl-10 h-12" 
                        placeholder="parent@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-bold text-stone-600 ml-1">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 z-10" />
                      <Input
                        id="password"
                        type="password" 
                        required 
                        className="ghibli-input w-full pl-10 h-12" 
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                </div>

                <Button type="submit" className="w-full bg-emerald-500 text-white py-3.5 font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:shadow-emerald-300 transition-all h-auto mt-4">
                  Create Account
                </Button>
             </form>

             <div className="mt-8 text-center">
               <p className="text-stone-500 font-medium">
                 Already have a home here?{' '}
                 <Button variant="link" onClick={onSwitchToLogin} className="text-emerald-600 font-bold hover:underline h-auto p-0">
                   Log In
                 </Button>
               </p>
             </div>

             <div className="my-6 flex items-center gap-4">
               <div className="h-px bg-stone-200 flex-1"></div>
               <span className="text-stone-400 text-sm font-bold">or</span>
               <div className="h-px bg-stone-200 flex-1"></div>
             </div>

             <Button
               variant="outline"
               className="w-full bg-white border border-stone-200 text-stone-600 py-3 font-bold shadow-sm hover:bg-stone-50 flex items-center justify-center gap-3 h-auto"
               onClick={handleGoogleLogin}
               disabled={isLoggingIn}
             >
               {isLoggingIn ? (
                  <span className="animate-pulse">Connecting...</span>
               ) : (
                <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign up with Google
                </>
               )}
             </Button>
          </div>
       </div>
    </div>
  );
};

export default SignUpPage;