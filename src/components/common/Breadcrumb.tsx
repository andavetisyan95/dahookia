'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Typography, Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbProps {
  currentPage: string;
  sx?: object;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage, sx = {} }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent) => {
    if (pathname !== '/') {
      e.preventDefault();
      setIsNavigating(true);
      router.push('/');
      
      // Reset navigation state after a short delay
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  };

  return (
    <Box 
      component="nav" 
      aria-label="breadcrumb"
      sx={{
        width: '100%',
        position: 'relative',
        zIndex: 10,
        pt: { xs: 2, md: 3 },
        pb: 1,
        px: { xs: 2, sm: 0 },
        ...sx
      }}
    >
      <MuiBreadcrumbs 
        aria-label="breadcrumb" 
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ 
          '& .MuiBreadcrumbs-ol': {
            justifyContent: 'flex-start',
            flexWrap: 'nowrap',
            px: 0,
            mx: 0,
          },
          '& .MuiBreadcrumbs-separator': {
            mx: 1,
          },
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          py: 0.5,
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
              color: "#f0f5f1",
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: '#0791f0',
              },
              '& svg': {
                fontSize: '1.15rem',
                mr: 0.5,
                color:"#f0f5f1"
              }
            }}
          >
            <HomeIcon />
            Home
          </Box>
        </Link>
        <Typography 
          color="#0791f0" 
          sx={{ 
            fontSize: '1rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {currentPage}
        </Typography>
      </MuiBreadcrumbs>
      
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
          alignItems: 'center',
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
    </Box>
  );
};

export default Breadcrumb;
