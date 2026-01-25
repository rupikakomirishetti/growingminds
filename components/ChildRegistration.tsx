import React, { useState } from 'react';
import { Child } from '../types';
import { Camera, UserPlus, Sparkles } from 'lucide-react';

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
    group: 'Toddlers'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newChild: Child = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      photoUrl: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`
    };
    onRegister(newChild);
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
                className="ghibli-input w-full"
                placeholder="e.g. Chihiro"
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-600 ml-1">Last Name</label>
              <input
                required
                type="text"
                className="ghibli-input w-full"
                placeholder="e.g. Ogino"
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
              />
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
                onChange={e => setFormData({...formData, dateOfBirth: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-600 ml-1">Assigned Group</label>
              <div className="relative">
                <select
                  className="ghibli-input w-full bg-white/90 appearance-none"
                  value={formData.group}
                  onChange={e => setFormData({...formData, group: e.target.value})}
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

          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-600 ml-1">Allergies & Medical Notes</label>
            <textarea
              className="ghibli-input w-full h-32 resize-none"
              placeholder="Any special needs or magic spells we should know about?"
              value={formData.allergies}
              onChange={e => setFormData({...formData, allergies: e.target.value})}
            ></textarea>
          </div>

          <div className="pt-8 flex items-center justify-end gap-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-3 rounded-full text-stone-500 font-bold hover:bg-stone-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ghibli-btn px-10 py-3 bg-sky-500 text-white font-bold shadow-lg shadow-sky-200 hover:bg-sky-600 hover:shadow-sky-300"
            >
              Welcome Child
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildRegistration;