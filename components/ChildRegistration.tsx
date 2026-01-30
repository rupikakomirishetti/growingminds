'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Heart, Shield, Phone, User, Calendar, GraduationCap, Pill, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Child } from '../types';

interface ChildRegistrationProps {
  onCheckComplete?: () => void;
  onRegister?: (child: Child) => void;
  onCancel?: () => void;
}

const ChildRegistration: React.FC<ChildRegistrationProps> = ({ onCheckComplete, onRegister, onCancel }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gradeLevel: '',
    enrollmentType: 'Full Time',
    medication: '',
    emergencyContact: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user?.email) {
      setError("User email not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const { data: insertedData, error: insertError } = await supabase
        .from('students')
        .insert([
          {
            first_nm: formData.firstName,
            last_nm: formData.lastName,
            dob: formData.dob,
            grade_level: formData.gradeLevel,
            medication: formData.medication,
            emergency_contact: formData.emergencyContact,
            parent_email: user.email,
            enrollment_type: formData.enrollmentType,
          },
        ])
        .select();

      if (insertError) throw insertError;

      if (onRegister && insertedData && insertedData[0]) {
        const dbChild = insertedData[0];
        const newChild: Child = {
          id: dbChild.id,
          firstName: dbChild.first_nm,
          lastName: dbChild.last_nm,
          dateOfBirth: dbChild.dob,
          allergies: dbChild.medication || 'None',
          medication: dbChild.medication,
          group: dbChild.grade_level,
          photoUrl: dbChild.photo_url || `https://picsum.photos/seed/${dbChild.id}/200`,
          enrollmentType: dbChild.enrollment_type,
          emergencyContact: dbChild.emergency_contact,
          email: dbChild.parent_email
        };
        onRegister(newChild);
      } else if (onCheckComplete) {
        onCheckComplete();
      }
    } catch (err: any) {
      console.error('Error registering child:', err);
      setError(err.message || 'Failed to register child. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Welcome Banner */}
        <div className="mb-8 text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4 shadow-sm animate-bounce-slow">
            <Sparkles className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-stone-800 font-[Patrick_Hand]">Welcome to the Village!</h1>
          <p className="text-xl text-stone-600 max-w-lg mx-auto">
            We're so excited to have you. Let's get to know your little one so we can provide the best care possible.
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-emerald-300 via-sky-300 to-rose-300"></div>

          <CardHeader className="pb-0 pt-8 px-8">
            <CardTitle className="text-2xl font-bold text-stone-700 flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-100" />
              Child Registration
            </CardTitle>
            <CardDescription className="text-stone-500 text-base">
              Please fill out the details below. This helps us ensure a safe and personalized environment.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2 text-stone-600 font-semibold">
                    <User className="w-4 h-4 text-emerald-500" /> First Name
                  </Label>
                  <Input
                    id="firstName"
                    required
                    className="bg-stone-50 border-stone-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-12"
                    placeholder="e.g. Oliver"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2 text-stone-600 font-semibold">
                    <User className="w-4 h-4 text-emerald-500" /> Last Name
                  </Label>
                  <Input
                    id="lastName"
                    required
                    className="bg-stone-50 border-stone-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-12"
                    placeholder="e.g. Thompson"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dob" className="flex items-center gap-2 text-stone-600 font-semibold">
                    <Calendar className="w-4 h-4 text-sky-500" /> Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    required
                    className="bg-stone-50 border-stone-200 focus:border-sky-400 focus:ring-sky-400/20 h-12"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradeLevel" className="flex items-center gap-2 text-stone-600 font-semibold">
                    <GraduationCap className="w-4 h-4 text-amber-500" /> Grade Level
                  </Label>
                  <Select
                    value={formData.gradeLevel}
                    onValueChange={(value) => setFormData({ ...formData, gradeLevel: value })}
                  >
                    <SelectTrigger className="bg-stone-50 border-stone-200 focus:border-amber-400 focus:ring-amber-400/20 h-12">
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Infant">Infant (0-12 mo)</SelectItem>
                      <SelectItem value="Toddler">Toddler (1-2 yr)</SelectItem>
                      <SelectItem value="Preschool">Preschool (3-4 yr)</SelectItem>
                      <SelectItem value="Pre-K">Pre-K (4-5 yr)</SelectItem>
                      <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="enrollmentType" className="flex items-center gap-2 text-stone-600 font-semibold">
                    <Clock className="w-4 h-4 text-violet-500" /> Enrollment Type
                  </Label>
                  <Select
                    value={formData.enrollmentType}
                    onValueChange={(value) => setFormData({ ...formData, enrollmentType: value })}
                  >
                    <SelectTrigger className="bg-stone-50 border-stone-200 focus:border-violet-400 focus:ring-violet-400/20 h-12">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full Time">Full Time</SelectItem>
                      <SelectItem value="Part Time">Part Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact" className="flex items-center gap-2 text-stone-600 font-semibold">
                    <Phone className="w-4 h-4 text-rose-500" /> Emergency Contact
                  </Label>
                  <Input
                    id="emergencyContact"
                    type="tel"
                    required
                    placeholder="(555) 123-4567"
                    className="bg-stone-50 border-stone-200 focus:border-rose-400 focus:ring-rose-400/20 h-12"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medication" className="flex items-center gap-2 text-stone-600 font-semibold">
                  <Pill className="w-4 h-4 text-violet-500" /> Medication (if any)
                </Label>
                <Textarea
                  id="medication"
                  placeholder="Please list any medications your child is currently taking, or write 'None'."
                  className="bg-stone-50 border-stone-200 focus:border-violet-400 focus:ring-violet-400/20 min-h-[100px]"
                  value={formData.medication}
                  onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                />
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-14 text-lg font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200 rounded-xl transition-all hover:-translate-y-1"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </Button>

              {onCancel && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel}
                  className="w-full h-12 text-stone-500 font-medium hover:bg-stone-100 mt-2"
                >
                  Cancel
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChildRegistration;