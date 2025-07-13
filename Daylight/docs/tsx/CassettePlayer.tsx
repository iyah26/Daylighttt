import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Rewind, FastForward, Volume2, SkipBack, SkipForward } from 'lucide-react';
import TapeReel from './TapeReel';
import VolumeWheel from './VolumeWheel';

const songs = [
  { title: "Summer Nights", artist: "Neon Dreams", duration: 245 },
  { title: "Midnight Drive", artist: "Retro Wave", duration: 198 },
  { title: "Electric Feel", artist: "Synth City", duration: 267 },
  { title: "Ocean Breeze", artist: "Coastal Vibes", duration: 223 },
  { title: "City Lights", artist: "Urban Echo", duration: 189 },
];

const CassettePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [position, setPosition] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songPosition, setSongPosition] = useState(0);

  const currentSong = songs[currentSongIndex];

  // Simulate song progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSongPosition(prev => {
          const newPosition = prev + 1;
          if (newPosition >= currentSong.duration) {
            // Auto-advance to next song
            handleNextSong();
            return 0;
          }
          return newPosition;
        });
        setPosition(prev => Math.min(prev + (100 / currentSong.duration), 100));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong.duration]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setPosition(0);
    setSongPosition(0);
  };

  const handleRewind = () => {
    setSongPosition(prev => Math.max(prev - 10, 0));
    setPosition(prev => Math.max(prev - (1000 / currentSong.duration), 0));
  };

  const handleFastForward = () => {
    setSongPosition(prev => Math.min(prev + 10, currentSong.duration));
    setPosition(prev => Math.min(prev + (1000 / currentSong.duration), 100));
  };

  const handlePrevSong = () => {
    const newIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
    setCurrentSongIndex(newIndex);
    setSongPosition(0);
    setPosition(0);
  };

  const handleNextSong = () => {
    const newIndex = currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
    setCurrentSongIndex(newIndex);
    setSongPosition(0);
    setPosition(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-8">
      <div className="bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 p-8 rounded-3xl shadow-2xl border-4 border-gray-500 max-w-2xl w-full">
        {/* Cassette Window */}
        <div className="bg-black p-6 rounded-2xl mb-8 border-2 border-gray-700 shadow-inner">
          <div className="bg-gradient-to-b from-amber-100 to-amber-200 p-4 rounded-xl border border-amber-300">
            {/* Tape Label */}
            <div className="text-center mb-4">
              <div className="bg-white p-2 rounded border border-gray-300 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800">MIX TAPE '92</h3>
                <p className="text-xs text-gray-600">Side A</p>
                <div className="text-xs text-gray-700 mt-1">
                  <div className="font-semibold truncate">{currentSong.title}</div>
                  <div className="text-gray-600 truncate">{currentSong.artist}</div>
                </div>
              </div>
            </div>
            
            {/* Tape Reels */}
            <div className="flex justify-between items-center px-4">
              <TapeReel isSpinning={isPlaying} size="large" />
              <div className="flex-1 mx-6 relative">
                {/* Tape */}
                <div className="h-1 bg-gradient-to-r from-amber-800 to-amber-900 rounded-full shadow-sm"></div>
                {/* Progress indicator */}
                <div 
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full transition-all duration-300"
                  style={{ width: `${(songPosition / currentSong.duration) * 100}%` }}
                ></div>
              </div>
              <TapeReel isSpinning={isPlaying} size="large" />
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Track Navigation */}
          <div className="flex justify-center space-x-2">
            <button
              onClick={handlePrevSong}
              className="bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 p-3 rounded-full shadow-lg border-2 border-gray-500 transition-all duration-150 active:scale-95"
            >
              <SkipBack className="w-5 h-5 text-gray-800" />
            </button>
            
            <button
              onClick={handleNextSong}
              className="bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 p-3 rounded-full shadow-lg border-2 border-gray-500 transition-all duration-150 active:scale-95"
            >
              <SkipForward className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          {/* Main Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRewind}
              className="bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 p-4 rounded-full shadow-lg border-2 border-gray-500 transition-all duration-150 active:scale-95 active:shadow-md"
            >
              <Rewind className="w-6 h-6 text-gray-800" />
            </button>
            
            <button
              onClick={handlePlay}
              className={`p-4 rounded-full shadow-lg border-2 transition-all duration-150 active:scale-95 active:shadow-md ${
                isPlaying 
                  ? 'bg-gradient-to-b from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 border-red-700' 
                  : 'bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 border-green-700'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
            
            <button
              onClick={handleStop}
              className="bg-gradient-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 p-4 rounded-full shadow-lg border-2 border-gray-900 transition-all duration-150 active:scale-95 active:shadow-md"
            >
              <Square className="w-6 h-6 text-white fill-current" />
            </button>
            
            <button
              onClick={handleFastForward}
              className="bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 p-4 rounded-full shadow-lg border-2 border-gray-500 transition-all duration-150 active:scale-95 active:shadow-md"
            >
              <FastForward className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-between bg-gradient-to-b from-gray-200 to-gray-300 p-4 rounded-xl border-2 border-gray-400 shadow-inner">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-semibold text-gray-700">VOLUME</span>
            </div>
            <VolumeWheel volume={volume} onChange={setVolume} />
          </div>

          {/* Display */}
          <div className="bg-black p-4 rounded-xl border-2 border-gray-700 shadow-inner">
            <div className="bg-green-900 p-3 rounded border border-green-700">
              <div className="font-mono text-green-400 text-center">
                <div className="text-lg">{isPlaying ? '▶ PLAY' : '⏸ PAUSE'}</div>
                <div className="text-sm mt-1">
                  {formatTime(songPosition)} / {formatTime(currentSong.duration)}
                </div>
                <div className="text-xs mt-1">
                  Track {currentSongIndex + 1} of {songs.length} | VOL: {volume}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};