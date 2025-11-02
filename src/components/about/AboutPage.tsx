'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import dynamicImport from 'next/dynamic';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { videos as videoItems } from '@/data/videos';
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
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  const handleNavigation = () => {
    if (pathname !== '/') {
      setIsNavigating(true);
    }
  };

  return (
    <>
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
          href="/"
          passHref
          onClick={handleNavigation}
          style={{ textDecoration: 'none' }}
        >
          <Box 
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#757574', // Darker silver for better visibility
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'none',
              }
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Box>
        </Link>
        <Typography color="primary" fontWeight={500}>
          About
        </Typography>
      </Breadcrumbs>
      {isNavigating && (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Box sx={{ 
            width: 60, 
            height: 60, 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3f51b5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }} />
        </Box>
      )}
    </>
  );
}

export default function AboutPage() {
  return (
    <Box sx={{ 
      pt: { xs: 14, md: 16 },
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
          mx: 'auto',
        }}>
          <Typography 
            variant="h1" 
            sx={{
              fontSize: { xs: '2.2rem', md: '3.5rem' },
              fontWeight: 800,
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
            mt: { xs: 10, md: 8 },
            alignItems: 'center',
            gap: 4,
            textAlign: 'left'
          }}>
            <Box sx={{ 
              flex: 1.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              '& p': {
                marginBottom: '0.5rem',
                lineHeight: 1.6,
                fontSize: '1.1rem',
                color: '#333',
                textAlign: 'justify',
                '&:not(:last-child)': {
                  marginBottom: '1rem'
                }
              }
            }}>
              <p><strong>Welcome to our professional ski and snowboard school</strong> in the heart of Tsaghkadzor, Armenia&apos;s premier winter sports destination. Our certified instructors are passionate about sharing their love for winter sports with students of all levels.</p>
              <p>Located at an elevation of 1,966 meters, <strong>Tsaghkadzor</strong> offers excellent snow conditions from December through March, with modern lifts and well-groomed slopes perfect for learning and improving your skills.</p>
              <p>It&apos;s our mission to help you achieve your goals and reach new heights in your career. Whether you&apos;re just starting out or looking to take the next step, we&apos;re here to support you every step of the way.chniques, our instructors will help you progress in a fun, safe environment.</p>
            </Box>
            
            <Box sx={{ 
              flex: 1,
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: { xs: '300px', md: '400px' },
              maxHeight: { md: '500px' },
              overflow: 'hidden',
              borderRadius: 2,
              boxShadow: 3,
              margin: { xs: '0 auto', md: '0' },
              alignSelf: 'stretch',
              '&:hover img': {
                transform: 'scale(1.02)'
              }
            }}>
              <Image 
                src="/aboutPage/instructor.jpg" 
                alt="Ski instructor in Tsaghkadzor"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.3s ease',
                }}
                priority
              />
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ 
          width: '100%',
          bgcolor: 'background.default',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            zIndex: 0,
          }
        }}>
          <Box sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 } }}>
            <Container maxWidth="lg">
              <VideoGallery videos={videoItems} />
            </Container>
          </Box>
        </Box>

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
              color: '#2c3e50',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              fontFamily: '"Montserrat", sans-serif'  
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
            Book Your Lesson
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
