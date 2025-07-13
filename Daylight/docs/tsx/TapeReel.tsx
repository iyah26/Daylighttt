import React from 'react';

interface TapeReelProps {
  isSpinning: boolean;
  size?: 'small' | 'large';
}

const TapeReel: React.FC<TapeReelProps> = ({ isSpinning, size = 'small' }) => {
  const sizeClass = size === 'large' ? 'w-16 h-16' : 'w-8 h-8';
  
  return (
    <div className={`${sizeClass} relative`}>
      {/* Outer ring */}
      <div className={`${sizeClass} bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-full shadow-lg border-2 border-gray-600 ${isSpinning ? 'animate-spin' : ''}`}>
        {/* Inner spokes */}
        <div className="absolute inset-2 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full">
          <div className="absolute inset-1 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full">
            {/* Center hole */}
            <div className="absolute inset-3 bg-black rounded-full border border-gray-400"></div>
            {/* Spokes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-gray-400 absolute rotate-0"></div>
              <div className="w-full h-0.5 bg-gray-400 absolute rotate-45"></div>
              <div className="w-full h-0.5 bg-gray-400 absolute rotate-90"></div>
              <div className="w-full h-0.5 bg-gray-400 absolute rotate-135"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapeReel;
