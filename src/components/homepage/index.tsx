"use client";

import { Box, Stack, Typography } from "@mui/material";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import ExperienceSection with SSR disabled
const ExperienceSection = dynamic(
  () => import('./ExperienceSection'),
  { ssr: false }
);

// Dynamically import VideoBackground with no SSR
const VideoBackground = dynamic(
  () => import('../common/VideoBackground'),
  { 
    ssr: false,
    loading: () => (
      <Box 
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#000',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          component="img"
          src="/images/logo/logo.JPG"
          alt="Loading"
          sx={{
            width: 120,
            height: 60,
            borderRadius: 1,
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.6 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.6 },
            },
          }}
        />
      </Box>
    )
  }
);

// List of available videos
const VIDEOS = [
  '/videos/vid1.mp4',
  '/videos/vid2.mp4',
  '/videos/vid3.mp4',
  '/videos/vid4.mp4',
  '/videos/vid5.mp4',
];

const HomePage: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % VIDEOS.length);
  };

  const handleVideoReady = () => {
    setIsVideoReady(true);
  };

  if (!isClient) {
    return (
      <Box 
        sx={{
          width: '100%',
          height: '100vh',
          backgroundImage: 'url(/heroSection/homeMain.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            opacity: isVideoReady ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <VideoBackground
            key={currentVideo}
            videoSrc={VIDEOS[currentVideo]}
            imageSrc="/heroSection/homeMain.jpg"
            onEnded={handleVideoEnd}
            onCanPlay={handleVideoReady}
          />
        </Box>
        {/* Dark overlay for better text contrast */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 2,
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '0 20px',
          }}
        >
          <Stack
            sx={{ 
              zIndex: 2, 
              maxWidth: { xs: '90%', md: '70%', lg: '50%' },
              flexWrap: 'wrap',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
            spacing={2.5}
          >
            <Typography
              variant="h2"
              sx={{
                color: '#fff',
                textTransform: 'uppercase',
                fontSize: { xs: 12, sm: 14, md: 16 },
                letterSpacing: 2,
                lineHeight: 1.2,
                fontWeight: 500,
              }}
            >
              Welcome to Dahookia
            </Typography>
            <Box
              sx={{
                borderBottom: '1px solid rgba(255,255,255,0.8)',
                width: '3rem',
                alignSelf: 'center',
                height: '2px',
              }}
            />
            <Typography
              variant="h1"
              sx={{
                color: '#fff',
                textTransform: 'uppercase',
                fontSize: { xs: 22, sm: 28, md: 36, lg: 48 },
                letterSpacing: { xs: '0.05em', sm: '0.1em' },
                lineHeight: { xs: 1.1, sm: 1.2, md: 1.3 },
                fontWeight: 700,
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                px: { xs: 1, sm: 2 },
                my: 1,
              }}
            >
              YOUR MOUNTAIN ADVENTURE STARTS HERE
            </Typography>
          </Stack>
        </Box>
      </Box>
      <ExperienceSection />
    </Box>
  );
};

export default HomePage;
