'use client';

import { Box, BoxProps, CircularProgress } from '@mui/material';
import { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps extends BoxProps {
  videoSrc: string;
  imageSrc: string;
  children?: React.ReactNode;
}

const VideoBackground = ({ videoSrc, imageSrc, children, ...props }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadedData = () => {
    setIsLoading(false);
    const video = videoRef.current;
    if (!video) return;
    
    // Try to play the video
    const playPromise = video.play();
    
    // Handle autoplay restrictions
    if (playPromise !== undefined) {
      playPromise
        .catch(error => {
          console.error('Video play failed:', error);
          setHasError(true);
        });
    }
  };

  const handleError = () => {
    console.error('Error loading video:', videoSrc);
    setHasError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video properties
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'metadata';
    
    // Reset states when source changes
    setIsLoading(true);
    setHasError(false);

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleLoadedData);

    // Start loading the video
    video.load();

    // Cleanup
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleLoadedData);
      
      if (!video.paused) {
        video.pause();
      }
      
      // Don't clear the source to avoid potential errors during cleanup
      // Just pause and reset the video
      video.currentTime = 0;
    };
  }, [videoSrc]);

  return (
    <Box
      {...props}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000',
        ...props.sx,
      }}
    >
      {!hasError ? (
        <>
          <Box
            component="video"
            ref={videoRef}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out',
            }}
            playsInline
            muted
            loop
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src={videoSrc} type="video/mp4" />
          </Box>
          
          {/* Fallback image */}
          <Box
            component="img"
            src={imageSrc}
            alt="Background"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isLoading || hasError ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        </>
      ) : (
        <Box
          component="img"
          src={imageSrc}
          alt="Background"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      
      {/* Loading indicator */}
      {isLoading && !hasError && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      
      <Box sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default VideoBackground;
