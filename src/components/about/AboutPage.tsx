'use client';

import { Box, Typography, Breadcrumbs, Link, Divider, Button, Container } from '@mui/material';
import dynamicImport from 'next/dynamic';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/material/styles';
import { videoItems } from '@/constants/videos';
import type { VideoItem } from '@/types/video';

// Dynamically import client-side only components with proper error handling
const VideoGallery = dynamicImport<{ videos: VideoItem[] }>(
  () => import('@/components/about/VideoGallery')
    .then(mod => mod.default || mod)
    .catch(() => {
      console.error('Failed to load VideoGallery component');
      return () => null; // Return a no-op component on error
    }),
  { 
    ssr: false,
    loading: () => null
  }
);

// This is a Client Component
export const dynamic = 'force-dynamic';

function BreadcrumbNav() {
  return (
    <Breadcrumbs 
      aria-label="breadcrumb" 
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ 
        mb: 4,
        '& .MuiBreadcrumbs-ol': {
          justifyContent: 'flex-start',
        }
      }}
    >
      <Link 
        underline="hover" 
        color="inherit" 
        href="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            color: 'primary.main',
          }
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
        Home
      </Link>
      <Typography color="primary" fontWeight={500}>
        About
      </Typography>
    </Breadcrumbs>
  );
}

export default function AboutPage() {
  return (
    <Box sx={{ 
      pt: { xs: 12, md: 16 },
      pb: { xs: 6, md: 12 },
      minHeight: '100vh',
      position: 'relative',
      fontFamily: '"Montserrat", "Roboto", sans-serif',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: 'linear-gradient(135deg, rgba(13, 71, 161, 0.25) 0%, rgba(74, 20, 140, 0.3) 100%)',
        zIndex: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <BreadcrumbNav />
        
        <Box sx={{ 
          mb: { xs: 6, md: 8 },
          textAlign: 'center',
          maxWidth: '1000px',
          mx: 'auto'
        }}>
          <Typography 
            variant="h1" 
            sx={{
              fontSize: { xs: '2.2rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 4,
              color: '#2c3e50',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              fontFamily: '"Montserrat", sans-serif'
            }}
          >
            Discover Our Story
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
            textAlign: 'left'
          }}>
            <Box sx={{ 
              flex: 1.5,
              '& p': {
                marginBottom: '1.5rem',
                lineHeight: 1.8,
                fontSize: '1.1rem',
                color: '#333'
              }
            }}>
              <p><strong>Welcome to our professional ski and snowboard school</strong> in the heart of Tsaghkadzor, Armenia's premier winter sports destination. Our certified instructors are passionate about sharing their love for winter sports with students of all levels.</p>
              
              <p>Located at an elevation of 1,966 meters, <strong>Tsaghkadzor</strong> offers excellent snow conditions from December through March, with modern lifts and well-groomed slopes perfect for learning and improving your skills.</p>
              
              <p>We offer private and group lessons for all ages and abilities. Whether you're taking your first turns or perfecting advanced techniques, our instructors will help you progress in a fun, safe environment.</p>
            </Box>
            
            <Box sx={{ 
              flex: 1,
              position: 'relative',
              width: '100%',
              height: { xs: '300px', md: '500px' },
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
              margin: { xs: '0 auto', md: '0' },
              '&:hover img': {
                transform: 'scale(1.02)'
              }
            }}>
              <img 
                src="/aboutPage/instructor.jpg" 
                alt="Ski instructor in Tsaghkadzor"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.3s ease',
                  display: 'block'
                }}
              />
            </Box>
          </Box>
        </Box>
        
        {/* <VideoGallery videos={videoItems} /> */}

        <Box 
          sx={{ 
            textAlign: 'center',
            mt: { xs: 6, md: 10 },
            p: { xs: 4, md: 6 },
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid rgba(0,0,0,0.03)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
            }
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 3, 
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2.125rem' },
              color: 'text.primary'
            }}
          >
            Experience the Magic of Dahookia
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              maxWidth: '700px', 
              mx: 'auto', 
              color: 'text.secondary',
              fontSize: '1.1rem',
              lineHeight: 1.8
            }}
          >
            Ready to create unforgettable memories? Book your stay with us today and discover why Dahookia is the perfect mountain getaway.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/booking"
            sx={{
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            Book Your Stay
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
