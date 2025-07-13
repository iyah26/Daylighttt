import React, { useRef, useCallback } from 'react';

interface VolumeWheelProps {
  volume: number;
  onChange: (volume: number) => void;
}

const VolumeWheel: React.FC<VolumeWheelProps> = ({ volume, onChange }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastAngle = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !wheelRef.current) return;

    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const angleDiff = angle - lastAngle.current;
    
    // Normalize angle difference
    let normalizedDiff = angleDiff;
    if (normalizedDiff > Math.PI) normalizedDiff -= 2 * Math.PI;
    if (normalizedDiff < -Math.PI) normalizedDiff += 2 * Math.PI;
    
    const volumeChange = (normalizedDiff / (2 * Math.PI)) * 200; // Sensitivity
    const newVolume = Math.max(0, Math.min(100, volume + volumeChange));
    
    onChange(newVolume);
    lastAngle.current = angle;
  }, [volume, onChange]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const rotation = (volume / 100) * 270 - 135; // -135 to +135 degrees

  return (
    <div className="relative w-16 h-16">
      {/* Volume wheel */}
      <div
        ref={wheelRef}
        className="w-16 h-16 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600 rounded-full shadow-lg border-2 border-gray-500 cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Wheel grooves */}
        <div className="absolute inset-1 rounded-full border border-gray-700">
          <div className="absolute inset-1 rounded-full border border-gray-600">
            <div className="absolute inset-1 rounded-full border border-gray-700">
              {/* Indicator line */}
              <div className="absolute top-1 left-1/2 w-0.5 h-3 bg-red-500 rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Volume markers */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 25, 50, 75, 100].map((mark) => {
          const markRotation = (mark / 100) * 270 - 135;
          return (
            <div
              key={mark}
              className="absolute w-0.5 h-2 bg-gray-600 top-0 left-1/2 transform -translate-x-1/2 origin-bottom"
              style={{
                transform: `translateX(-50%) rotate(${markRotation}deg)`,
                transformOrigin: '50% 32px'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VolumeWheel;