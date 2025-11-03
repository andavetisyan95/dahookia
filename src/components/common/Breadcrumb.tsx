'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Box, Typography, Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbProps {
  currentPage: string;
}

const Breadcrumb = ({ currentPage }: BreadcrumbProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  const handleNavigation = () => {
    if (pathname !== '/') {
      setIsNavigating(true);
    }
  };

  return (
    <Box sx={{ mb: 4, position: 'relative' }}>
      <MuiBreadcrumbs 
        aria-label="breadcrumb" 
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ 
          '& .MuiBreadcrumbs-ol': {
            justifyContent: 'flex-start',
          },
          '& .MuiBreadcrumbs-separator': {
            mx: 1,
          }
        }}
      >
        <Link 
          href="/"
          onClick={handleNavigation}
          style={{ textDecoration: 'none' }}
        >
          <Box 
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#757574',
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
    </Box>
  );
};

export default Breadcrumb;
