'use client';

import { Box, BoxProps } from '@mui/material';
import { useRef, useEffect } from 'react';

interface VideoBackgroundProps extends BoxProps {
  videoSrc: string;
  imageSrc: string;
  children?: React.ReactNode;
}

const VideoBackground = ({ videoSrc, imageSrc, children, ...props }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video properties
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'auto';
    
    // Start loading and playing
    video.load();
    video.play().catch(console.error);

    // Cleanup
    return () => {
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
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
      <Box
        component="video"
        ref={videoRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        playsInline
        muted
        loop
      >
        <source src={videoSrc} type="video/mp4" />
      </Box>
      
      <Box sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default VideoBackground;
