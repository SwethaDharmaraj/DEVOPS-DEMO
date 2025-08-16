import React, { useState, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Sample travel planning videos (you can replace with actual video URLs)
  const videos = [
    {
      id: 1,
      title: "How to Plan Your Perfect Trip",
      description: "Learn the essential steps to plan an unforgettable travel experience",
      thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: 2,
      title: "Budget Travel Tips & Tricks",
      description: "Discover how to travel more while spending less",
      thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
      id: 3,
      title: "Packing Essentials Guide",
      description: "Master the art of packing light and smart",
      thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="bg-card rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-[var(--shadow-float)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Travel Planning Videos</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Video Player */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <video
                ref={videoRef}
                src={selectedVideo.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
                poster={selectedVideo.thumbnail}
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                <Button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </Button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <div className="space-y-2">
                  {/* Progress Bar */}
                  <div className="flex items-center space-x-2 text-white text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                    />
                    <span>{formatTime(duration)}</span>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={togglePlay}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white" />
                        )}
                      </Button>
                      
                      <Button
                        onClick={restart}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0"
                      >
                        <RotateCcw className="w-4 h-4 text-white" />
                      </Button>

                      <Button
                        onClick={toggleMute}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-white" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-white" />
                        )}
                      </Button>
                    </div>

                    <Button
                      onClick={toggleFullscreen}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0"
                    >
                      <Maximize className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-muted-foreground">
                {selectedVideo.description}
              </p>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">More Videos</h4>
            <div className="space-y-3">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`cursor-pointer p-3 rounded-lg border transition-colors ${
                    selectedVideo.id === video.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex space-x-3">
                    <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm line-clamp-2 text-foreground">
                        {video.title}
                      </h5>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h5 className="font-semibold text-foreground mb-2">Why Watch?</h5>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Expert travel planning tips</li>
                <li>• Save money on your trips</li>
                <li>• Avoid common mistakes</li>
                <li>• Maximize your experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};