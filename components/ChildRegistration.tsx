'use client';
import React, { useState } from 'react';
import { Child } from '../types';
import { Camera, UserPlus, Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ChildRegistrationProps {
  onRegister: (child: Child) => void;
  onCancel: () => void;
}

const ChildRegistration: React.FC<ChildRegistrationProps> = ({ onRegister, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    allergies: '',
    group: 'Toddlers',
    enrollmentStatus: 'Full Time',
    parentEmail: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Validation functions
  const validateName = (name: string): boolean => {
    return /^[A-Za-z\s]+$/.test(name);
  };

  const validateEmail = (email: string): boolean => {
    return email.includes('@');
  };

  // Handle field validation on blur
  const handleNameBlur = (field: 'firstName' | 'lastName') => {
    const value = formData[field];
    if (value && !validateName(value)) {
      setErrors(prev => ({ ...prev, [field]: 'Provide a valid value' }));
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEmailBlur = () => {
    const value = formData.parentEmail;
    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Provide a valid value' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation check
    const firstNameValid = validateName(formData.firstName);
    const lastNameValid = validateName(formData.lastName);
    const emailValid = validateEmail(formData.parentEmail);

    if (!firstNameValid || !lastNameValid || !emailValid) {
      setErrors({
        firstName: !firstNameValid ? 'Provide a valid value' : '',
        lastName: !lastNameValid ? 'Provide a valid value' : '',
        email: !emailValid ? 'Provide a valid value' : ''
      });
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError('');

      // Insert into Supabase
      const { data, error } = await supabase
        .from('students')
        .insert([
          {
            first_nm: formData.firstName,
            last_nm: formData.lastName,
            dob: formData.dateOfBirth,
            grade_level: formData.group,
            medication: formData.allergies || null,
            enrollment_status: formData.enrollmentStatus,
            email: formData.parentEmail,
            photo_url: null // Will be handled by photo upload feature later
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Create Child object for local state update
      const newChild: Child = {
        id: data.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        allergies: formData.allergies,
        group: formData.group,
        photoUrl: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`
      };

      setSubmitSuccess(true);

      // Call parent callback
      setTimeout(() => {
        onRegister(newChild);
      }, 1500);

    } catch (error: any) {
      console.error('Error registering student:', error);
      setSubmitError(error.message || 'Failed to register student. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in pb-12">
      <div className="ghibli-card overflow-hidden bg-white/80 border-0">
        <div className="px-8 py-8 bg-sky-50/50 flex items-center gap-4 border-b border-sky-100">
          <div className="bg-sky-400 text-white p-3 rounded-full shadow-lg shadow-sky-200">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-sky-900">New Adventurer</h2>
            <p className="text-sky-700/60 font-medium">Register a new child to the village</p>
          </div>
        </div>

        {submitSuccess && (
          <div className="mx-10 mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <p className="text-emerald-700 font-semibold">Student registered successfully!</p>
          </div>
        )}

        {submitError && (
          <div className="mx-10 mt-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <p className="text-rose-700 font-semibold">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 bg-stone-50 rounded-full flex items-center justify-center border-2 border-stone-200 border-dashed cursor-pointer hover:bg-sky-50 hover:border-sky-300 transition-all group relative">
              <Camera className="w-10 h-10 text-stone-300 group-hover:text-sky-400 transition-colors" />
              <div className="absolute bottom-0 right-0 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">Upload</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-600 ml-1">First Name</label>
              <input
                required
                type="text"
                className={`ghibli-input w-full ${errors.firstName ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                placeholder="e.g. Chihiro"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                onBlur={() => handleNameBlur('firstName')}
              />
              {errors.firstName && (
                <p className="text-rose-500 text-sm font-semibold ml-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-600 ml-1">Last Name</label>
              <input
                required
                type="text"
                className={`ghibli-input w-full ${errors.lastName ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                placeholder="e.g. Ogino"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                onBlur={() => handleNameBlur('lastName')}
              />
              {errors.lastName && (
                <p className="text-rose-500 text-sm font-semibold ml-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-600 ml-1">Date of Birth</label>
              <input
                required
                type="date"
                className="ghibli-input w-full"
                value={formData.dateOfBirth}
                onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-600 ml-1">Assigned Group</label>
              <div className="relative">
                <select
                  className="ghibli-input w-full bg-white/90 appearance-none"
                  value={formData.group}
                  onChange={e => setFormData({ ...formData, group: e.target.value })}
                >
                  <option>Infants</option>
                  <option>Toddlers</option>
                  <option>Preschool</option>
                  <option>Kindergarten Prep</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-600 ml-1">Schedule Type</label>
              <div className="relative">
                <select
                  className="ghibli-input w-full bg-white/90 appearance-none"
                  value={formData.enrollmentStatus}
                  onChange={e => setFormData({ ...formData, enrollmentStatus: e.target.value })}
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-600 ml-1">Parent Email</label>
              <input
                required
                type="email"
                className={`ghibli-input w-full ${errors.email ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                placeholder="parent@example.com"
                value={formData.parentEmail}
                onChange={e => setFormData({ ...formData, parentEmail: e.target.value })}
                onBlur={handleEmailBlur}
              />
              {errors.email && (
                <p className="text-rose-500 text-sm font-semibold ml-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-600 ml-1">Allergies & Medical Notes</label>
            <textarea
              className="ghibli-input w-full h-32 resize-none"
              placeholder="Any special needs or magic spells we should know about?"
              value={formData.allergies}
              onChange={e => setFormData({ ...formData, allergies: e.target.value })}
            ></textarea>
          </div>

          <div className="pt-8 flex items-center justify-end gap-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="px-8 py-3 rounded-full text-stone-500 font-bold hover:bg-stone-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || submitSuccess}
              className="ghibli-btn px-10 py-3 bg-sky-500 text-white font-bold shadow-lg shadow-sky-200 hover:bg-sky-600 hover:shadow-sky-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registering...
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Registered!
                </>
              ) : (
                'Welcome Child'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildRegistration;