'use client';
import React, { useState } from 'react';
import Layout from './Layout';
import Dashboard from './Dashboard';
import DailyFeed from './DailyFeed';
import ProgressTracker from './ProgressTracker';
import ChildRegistration from './ChildRegistration';
import { MOCK_ACTIVITIES, MOCK_PROGRESS } from '../constants';
import { Child } from '../types';
import { LayoutDashboard, Users, Activity, BarChart, PlusCircle, Baby, Utensils, ArrowLeft, Loader2, Upload, CheckCircle2 } from 'lucide-react';
import FoodMenu from './FoodMenu';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface AdminPortalProps {
  childrenData: Child[];
  onRegister: (child: Child) => void;
  onLogout: () => void;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ childrenData, onRegister, onLogout }) => {
  const { firstName } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [loadingChild, setLoadingChild] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'children', label: 'All Children', icon: Users },
    { id: 'feed', label: 'Center Feed', icon: Activity },
    { id: 'progress', label: 'Progress Reports', icon: BarChart },
    { id: 'menu', label: 'Food Menu', icon: Utensils },
    { id: 'register', label: 'Register Child', icon: PlusCircle },
  ];

  const handleViewDetails = async (childId: string) => {
    setLoadingChild(true);
    setCurrentView('child_details');
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', childId)
        .single();

      if (error) throw error;

      if (data) {
        const child: Child = {
          id: data.id,
          firstName: data.first_nm,
          lastName: data.last_nm,
          dateOfBirth: data.dob,
          allergies: data.medication || 'None',
          medication: data.medication,
          group: data.grade_level,
          photoUrl: data.photo_url || `https://picsum.photos/seed/${data.id}/200`,
          enrollmentType: data.enrollment_type,
          emergencyContact: data.emergency_contact,
          email: data.parent_email,
        };
        setSelectedChild(child);
      }
    } catch (error) {
      console.error('Error fetching child details:', error);
    } finally {
      setLoadingChild(false);
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0 || !selectedChild) return;

    if (files.length > 10) {
      alert('You can only upload up to 10 photos at a time.');
      return;
    }

    setUploadingPhoto(true);
    setUploadSuccess(false);

    let successCount = 0;
    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${selectedChild.id}/${fileName}`;

        const { error } = await supabase.storage
          .from('photos')
          .upload(filePath, file);

        if (error) {
          console.error(`Error uploading ${file.name}:`, error);
          continue;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('photos')
          .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;

        // Insert into activity_photos table
        const { error: dbError } = await supabase
          .from('activity_photos')
          .insert([
            {
              student_id: selectedChild.id,
              photo_url: publicUrl,
              description: `Activity on ${new Date().toLocaleDateString()}`
            }
          ]);

        if (dbError) {
          console.error(`Error recording ${file.name} in DB:`, dbError);
          continue;
        }

        successCount++;
      }

      if (successCount > 0) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }

      if (successCount < files.length) {
        alert(`Successfully uploaded ${successCount} out of ${files.length} photos.`);
      }
    } catch (error: any) {
      console.error('Error during multi-upload:', error);
      alert(`Upload process failed: ${error.message}`);
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard childrenData={childrenData} activities={MOCK_ACTIVITIES} />;
      case 'feed':
        return <DailyFeed activities={MOCK_ACTIVITIES} childrenData={childrenData} />;
      case 'progress':
        return <ProgressTracker data={MOCK_PROGRESS} childrenData={childrenData} />;
      case 'menu':
        return <FoodMenu isEditable={true} />;
      case 'register':
        return <ChildRegistration onRegister={(c) => { onRegister(c); setCurrentView('children'); }} onCancel={() => setCurrentView('dashboard')} />;
      case 'children':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-12">
            {childrenData.map(child => (
              <div key={child.id} className="ghibli-card p-6 flex flex-col items-center border-0">
                <div className="w-24 h-24 rounded-full p-1 mb-4 bg-linear-to-br from-emerald-100 to-sky-100 shadow-inner">
                  <img src={child.photoUrl} alt={child.firstName} className="w-full h-full rounded-full object-cover border-2 border-white" />
                </div>
                <h3 className="font-bold text-xl text-stone-700">{child.firstName} {child.lastName}</h3>
                <p className="text-stone-500 font-medium text-sm mb-6 bg-stone-100 px-3 py-1 rounded-full">{child.group}</p>
                <button
                  onClick={() => handleViewDetails(child.id)}
                  className="ghibli-btn px-6 py-2 bg-emerald-500 text-white text-sm font-bold w-full shadow-md shadow-emerald-200"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        );
      case 'child_details':
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <button
              onClick={() => setCurrentView('children')}
              className="flex items-center gap-2 text-stone-500 font-bold hover:text-emerald-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Children
            </button>

            {loadingChild ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              </div>
            ) : selectedChild ? (
              <Card className="ghibli-card border-0 overflow-hidden">
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100 pb-8 pt-8 px-8">
                  <div className="flex items-center gap-6">
                    <img
                      src={selectedChild.photoUrl}
                      alt={selectedChild.firstName}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-3xl font-bold text-stone-700 font-[Patrick_Hand]">
                        {selectedChild.firstName} {selectedChild.lastName}
                      </CardTitle>
                      <p className="text-emerald-600 font-medium mt-1">{selectedChild.group} • {selectedChild.enrollmentType || 'Status Unknown'}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleUploadPhoto}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingPhoto}
                        className={`ghibli-btn px-6 py-2.5 flex items-center gap-2 text-sm font-bold shadow-md transition-all
                          ${uploadSuccess
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-100'
                          }
                          disabled:opacity-50
                        `}
                      >
                        {uploadingPhoto ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </>
                        ) : uploadSuccess ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Success!
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Upload Photos
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <tbody className="divide-y divide-stone-100">
                        <tr className="hover:bg-stone-50/50 transition-colors">
                          <th className="py-4 px-8 font-bold text-stone-500 w-1/3">Student ID</th>
                          <td className="py-4 px-8 text-stone-700 font-mono text-sm">{selectedChild.id}</td>
                        </tr>
                        <tr className="hover:bg-stone-50/50 transition-colors">
                          <th className="py-4 px-8 font-bold text-stone-500 w-1/3">Date of Birth</th>
                          <td className="py-4 px-8 text-stone-700">{selectedChild.dateOfBirth}</td>
                        </tr>
                        <tr className="hover:bg-stone-50/50 transition-colors">
                          <th className="py-4 px-8 font-bold text-stone-500 w-1/3">Parent Email</th>
                          <td className="py-4 px-8 text-stone-700">{selectedChild.email}</td>
                        </tr>
                        <tr className="hover:bg-stone-50/50 transition-colors">
                          <th className="py-4 px-8 font-bold text-stone-500 w-1/3">Emergency Contact</th>
                          <td className="py-4 px-8 text-stone-700">{selectedChild.emergencyContact || 'N/A'}</td>
                        </tr>
                        <tr className="hover:bg-stone-50/50 transition-colors">
                          <th className="py-4 px-8 font-bold text-stone-500 w-1/3">Medications / Allergies</th>
                          <td className="py-4 px-8 text-stone-700">{selectedChild.medication || 'None'}</td>
                        </tr>
                        <tr className="hover:bg-stone-50/50 transition-colors">
                          <th className="py-4 px-8 font-bold text-stone-500 w-1/3">Enrollment Type</th>
                          <td className="py-4 px-8 text-stone-700">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${selectedChild.enrollmentType === 'Full Time'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                              }`}>
                              {selectedChild.enrollmentType}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center p-12 text-stone-400">Child details not found.</div>
            )}
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
      user={{ name: firstName || "Admin", role: "Admin", icon: <Baby className="w-6 h-6" /> }}
    >
      {renderContent()}
    </Layout>
  );
};

export default AdminPortal;