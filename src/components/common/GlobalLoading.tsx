'use client';

import { Box, keyframes } from '@mui/system';
import { useEffect, useState } from 'react';

// Animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const GlobalLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (typeof window === 'undefined' || !show || !isLoading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.5s ease-out',
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? 'auto' : 'none',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            borderRadius: '50%',
            border: '2px solid #1976d2',
            borderTopColor: 'transparent',
            animation: `${spin} 1.5s linear infinite`,
          },
          '&::before': {
            width: '100%',
            height: '100%',
            borderWidth: '2px',
            opacity: 0.3,
          },
          '&::after': {
            width: '80%',
            height: '80%',
            borderWidth: '3px',
            animationDirection: 'reverse',
          }
        }}
      >
        <Box
          component="img"
          src="/images/logo/logo.JPG"
          alt="Dahookia"
          sx={{
            width: 80,
            height: 'auto',
            animation: `${pulse} 2s ease-in-out infinite`,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        />
      </Box>
    </Box>
  );
};

export default GlobalLoading;
