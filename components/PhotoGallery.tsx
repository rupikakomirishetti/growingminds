import React from 'react';
import { ActivityLog } from '../types';
import { Image as ImageIcon, Calendar } from 'lucide-react';

interface PhotoGalleryProps {
  activities: ActivityLog[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ activities }) => {
  const photos = activities
    .filter(activity => activity.imageUrl)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold text-stone-700">Memories</h1>
        <p className="text-stone-400 font-medium mt-2">Captured moments of joy and wonder</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 md:px-0">
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            className={`group relative bg-white p-4 pb-12 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:z-10 hover:rotate-0 ${index % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}
            style={{ borderRadius: '2px' }} // Polaroid sharp corners or slight rounding
          >
             {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm border-l border-r border-white/40 transform -rotate-1 shadow-sm z-20"></div>

            <div className="aspect-square overflow-hidden mb-4 bg-stone-100">
                <img 
                src={photo.imageUrl} 
                alt={photo.description}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter sepia-[.15] group-hover:sepia-0"
                />
            </div>
            
            <div className="text-center">
                <p className="font-[Patrick_Hand] text-2xl text-stone-600 truncate">{photo.description}</p>
                <div className="flex items-center justify-center gap-2 text-stone-400 text-sm mt-2 font-medium">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(photo.timestamp).toLocaleDateString()}</span>
                </div>
            </div>
          </div>
        ))}

        {photos.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-stone-400 ghibli-card border-0 bg-white/50">
            <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6">
              <ImageIcon className="w-10 h-10 text-stone-300" />
            </div>
            <p className="font-bold text-xl">No photos available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;