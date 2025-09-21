'use client';

import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal, { ModalProps } from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeOff from '@mui/icons-material/VolumeOff';
import Fullscreen from '@mui/icons-material/Fullscreen';
import FullscreenExit from '@mui/icons-material/FullscreenExit';
import Close from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { videos } from '@/data/videos';
import type { VideoItem } from '@/types/video';

// Simple wrapper for Modal that's compatible with React 19
const CompatibleModal = forwardRef<HTMLDivElement, ModalProps>(({ children, ...props }, ref) => {
  // Create a container ref
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use a callback ref to handle both function and object refs
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    // Set the local ref
    if (containerRef.current !== node) {
      containerRef.current = node;
    }
    
    // Handle the forwarded ref
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);
  
  return (
    <Modal {...props}>
      <div ref={setRefs}>
        {children}
      </div>
    </Modal>
  );
});

CompatibleModal.displayName = 'CompatibleModal';

const VideoThumbnail = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease',
  backgroundColor: '#f5f5f5',
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    boxShadow: theme.shadows[6],
    '& .play-button': {
      transform: 'translate(-50%, -50%) scale(1.1)',
      opacity: 0.9,
    }
  },
  '& img': {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  }
}));

const PlayButton = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  willChange: 'transform',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.95)',
  }
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '1100px',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
  borderRadius: '12px',
  outline: 'none',
  maxHeight: '90vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:focus-visible': {
    outline: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    maxHeight: '80vh',
  },
}));

export default function VideoGallery() {
  // State for video player
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle horizontal scroll with mouse wheel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY + e.deltaX;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle thumbnail image error
  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (isModalOpen) {
      const hideControls = () => setShowControls(false);
      controlsTimeout.current = setTimeout(hideControls, 3000);
      return () => {
        if (controlsTimeout.current) {
          clearTimeout(controlsTimeout.current);
        }
      };
    }
  }, [isModalOpen, currentTime]);

  const showControlsWithTimeout = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  // Handle video click
  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    setIsPlaying(false);
  };

  // Handle close modal
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => console.error('Error playing video:', e));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle progress click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(pos * 100);
      setCurrentTime(newTime);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      const shouldMute = !videoRef.current.muted;
      videoRef.current.muted = shouldMute;
      setIsMuted(shouldMute);
      
      // If unmuting, set the volume to the previous non-zero value or 0.5
      if (!shouldMute && volume === 0) {
        const newVolume = 0.5;
        setVolume(newVolume);
        if (videoRef.current) {
          videoRef.current.volume = newVolume;
        }
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
      
      // Show controls when adjusting volume
      showControlsWithTimeout();
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err}`);
        });
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error(`Error attempting to exit fullscreen: ${err}`);
        });
      }
      setIsFullscreen(false);
    }
    
    // Show controls after toggling fullscreen
    showControlsWithTimeout();
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    
    switch (e.code) {
      case 'Space':
      case 'KeyK':
        e.preventDefault();
        togglePlay();
        break;
      case 'KeyM':
        e.preventDefault();
        toggleMute();
        break;
      case 'KeyF':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (videoRef.current) {
          const newVolume = Math.min(1, volume + 0.1);
          setVolume(newVolume);
          videoRef.current.volume = newVolume;
          videoRef.current.muted = false;
          setIsMuted(false);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (videoRef.current) {
          const newVolume = Math.max(0, volume - 0.1);
          setVolume(newVolume);
          videoRef.current.volume = newVolume;
          videoRef.current.muted = newVolume === 0;
          setIsMuted(newVolume === 0);
        }
        break;
      default:
        break;
    }
    
    // Show controls on any key press
    showControlsWithTimeout();
  };

  // Format time
  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Get video source URL
  const getVideoSource = (video: VideoItem): string => {
    return video.videoUrl;
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Mobile: Horizontal scroll */}
      <Box 
        ref={scrollContainerRef}
        sx={{
        display: { xs: 'flex', sm: 'grid' },
        gridTemplateColumns: {
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 3,
        width: '100%',
        overflowX: { xs: 'auto', sm: 'visible' },
        flexWrap: { xs: 'nowrap', sm: 'wrap' },
        pb: 1, // Add some padding for scrollbar
        // Show scrollbar on mobile
        '&::-webkit-scrollbar': {
          height: 6,
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 3,
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.3)',
          },
        },
        '& > *': {
          flex: { xs: '0 0 80%', sm: 'auto' },
          maxWidth: { xs: '80%', sm: 'none' },
        },
      }}>
        {videos.map((video) => (
          <Box key={video.id} sx={{ 
            width: '100%',
            flexShrink: 0,
          }}>
            <VideoThumbnail 
              onClick={() => handleVideoClick(video)}
              sx={{
                width: '100%',
                height: { xs: '180px', sm: '180px', md: '200px' },
              }}
            >
              {!thumbnailError && video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={400}
                  height={225}
                  onError={handleThumbnailError}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover' 
                  }}
                />
              ) : (
                <Box sx={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.1)'
                }}>
                  <PlayArrow sx={{ fontSize: 40, color: 'text.secondary' }} />
                </Box>
              )}
              <PlayButton className="play-button">
                <PlayArrow sx={{ fontSize: 30, color: 'primary.main' }} />
              </PlayButton>
            </VideoThumbnail>
            <Typography variant="subtitle1" mt={1} fontWeight={500}>
              {video.title}
            </Typography>
          </Box>
        ))}
      </Box>

      <CompatibleModal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="video-modal-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
        }}
      >
        <ModalContent>
          <Box 
            sx={{ 
              position: 'relative', 
              paddingBottom: '53%', // 16:9 aspect ratio
              backgroundColor: '#000',
              // Show controls on hover for all screen sizes
              '&:hover .video-controls, &:hover .close-button': {
                opacity: 1,
              },
              // Always show controls on large screens
              '@media (min-width: 901px)': {
                '& .video-controls, & .close-button': {
                  opacity: 1,
                },
              },
              // Hide controls by default on small screens
              '@media (max-width: 900px)': {
                '& .video-controls, & .close-button': {
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&:hover .video-controls, &:hover .close-button': {
                  opacity: 1,
                },
              },
            }}
            onMouseMove={showControlsWithTimeout}
            onMouseEnter={showControlsWithTimeout}
            onClick={togglePlay}
            onDoubleClick={toggleFullscreen}
          >
            {/* Close Button */}
            <IconButton
              className="close-button"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              size="large"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 20,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              <Close />
            </IconButton>
            {selectedVideo && (
              <>
                <video
                  ref={videoRef}
                  src={getVideoSource(selectedVideo)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    outline: 'none',
                  }}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                />

                {/* Overlay Play Button */}
                {!isPlaying && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        },
                      }}
                    >
                      <PlayArrow sx={{ fontSize: 40, color: '#fff' }} />
                    </Box>
                  </Box>
                )}

                {/* Video Controls */}
                <Box
                  className="video-controls"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                    padding: '16px',
                    opacity: showControls ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 10,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Progress Bar */}
                  <Box 
                    ref={progressRef}
                    sx={{ 
                      position: 'relative',
                      width: '100%',
                      height: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      marginBottom: '12px',
                      cursor: 'pointer',
                      '&:hover': {
                        height: '6px',
                        '&::after': {
                          height: '6px',
                        },
                      },
                    }}
                    onClick={handleProgressClick}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: '#ff4d4f',
                        borderRadius: '2px',
                        transition: 'width 0.1s linear',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: `${progress}%`,
                        transform: 'translate(-50%, -50%)',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#ff4d4f',
                        borderRadius: '50%',
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                        pointerEvents: 'none',
                      }}
                    />
                  </Box>

                  {/* Controls Bar */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    width: '100%',
                    gap: '12px',
                  }}>
                    <IconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      size="small"
                      sx={{ 
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                      }}
                    >
                      {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    
                    {/* Volume Controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <IconButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        size="small"
                        sx={{ 
                          color: 'white',
                          padding: '4px',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeOff sx={{ fontSize: '1.25rem' }} />
                        ) : volume < 0.5 ? (
                          <VolumeDown sx={{ fontSize: '1.25rem' }} />
                        ) : (
                          <VolumeUp sx={{ fontSize: '1.25rem' }} />
                        )}
                      </IconButton>
                      
                      <Box sx={{ 
                        width: '80px', 
                        display: 'flex', 
                        alignItems: 'center',
                        '&:hover input[type="range"]::-webkit-slider-thumb': {
                          opacity: 1,
                        },
                      }}>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            width: '100%',
                            height: '4px',
                            WebkitAppearance: 'none',
                            background: `linear-gradient(to right, #fff 0%, #fff ${volume * 100}%, rgba(255, 255, 255, 0.3) ${volume * 100}%, rgba(255, 255, 255, 0.3) 100%)`,
                            borderRadius: '2px',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                        />
                      </Box>
                    </Box>

                    {/* Time Display */}
                    <Box sx={{ 
                      flex: 1, 
                      display: 'flex', 
                      justifyContent: 'flex-end',
                      marginRight: 1,
                    }}>
                      <Typography 
                        variant="caption" 
                        color="white" 
                        sx={{ 
                          fontVariantNumeric: 'tabular-nums',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                        }}
                      >
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </Typography>
                    </Box>

                    <IconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFullscreen();
                      }}
                      size="small"
                      sx={{ 
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                      }}
                    >
                      {isFullscreen ? (
                        <FullscreenExit sx={{ fontSize: '1.25rem' }} />
                      ) : (
                        <Fullscreen sx={{ fontSize: '1.25rem' }} />
                      )}
                    </IconButton>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </ModalContent>
      </CompatibleModal>
    </Box>
  );
}
