'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Box, Typography, Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbProps {
  currentPage: string;
  sx?: object;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage, sx = {} }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

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
        separator={
          <Box component="span" sx={{ color: 'white', mx: 1 }}>
            &gt;
          </Box>
        }
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: 'white',
            mx: 1,
          },
        }}
      >
        <Link 
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Box 
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: '#4da8f5',
                textDecoration: 'none',
              },
              '& svg': {
                color: 'white',
              }
            }}
          >
            <HomeIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
            Home
          </Box>
        </Link>  
        <Typography 
          color="text.primary" 
          sx={{ 
            color: '#4da8f5',
            fontSize: '1rem',
            fontWeight: 500,
          }}
        >
          {currentPage}
        </Typography>
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
