'use client';

import { memo, useRef, useEffect, useState, useCallback, lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import type { SxProps, Theme } from '@mui/material/styles';

// Lazy load heavy components
const LazyVideo = lazy(() => import('./LazyVideo'));

interface VideoBackgroundProps {
  videoSrc: string;
  imageSrc: string;
  children?: React.ReactNode;
  priority?: boolean;
  sx?: SxProps<Theme>;
  [key: string]: unknown;
}

const VideoBackground = memo(({ 
  videoSrc, 
  imageSrc, 
  children, 
  priority = false,
  sx = {},
  ...props 
}: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadedData = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use requestIdleCallback to defer non-critical work
    if ('requestIdleCallback' in window) {
      requestIdleCallback(
        () => {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsLoading(false))
              .catch(error => {
                console.error('Video play failed:', error);
                setHasError(true);
                setIsLoading(false);
              });
          }
        },
        { timeout: 2000 }
      );
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsLoading(false))
          .catch(error => {
            console.error('Video play failed:', error);
            setHasError(true);
            setIsLoading(false);
          });
      }
    }
  }, []);

  const handleError = useCallback(() => {
    console.error('Error loading video:', videoSrc);
    setHasError(true);
    setIsLoading(false);
  }, [videoSrc]);

  // Handle cleanup on mount/unmount and when videoSrc changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video properties
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.disablePictureInPicture = true;
    
    // Reset states when source changes
    setIsLoading(true);
    setHasError(false);

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleLoadedData);
    
    // Start loading the video
    video.load();

    // Cleanup function
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleLoadedData);
      
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [videoSrc, handleLoadedData, handleError]);

  return (
    <Box
      component="div"
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'background.default',
        ...sx,
      }}
      {...props}
    >
      {!hasError ? (
        <>
          <Suspense fallback={null}>
            <LazyVideo
              ref={videoRef}
              src={videoSrc}
              poster={imageSrc}
              onLoadedData={handleLoadedData}
              onError={handleError}
              playsInline
              muted
              loop
              disablePictureInPicture
              preload={priority ? 'auto' : 'metadata'}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: isLoading ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          </Suspense>
          {isLoading && (
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
                backgroundColor: 'background.paper',
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </>
      ) : (
        <Box
          component="img"
          src={imageSrc}
          alt="Background"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      {children}
    </Box>
  );
});

VideoBackground.displayName = 'VideoBackground';

export default VideoBackground;
