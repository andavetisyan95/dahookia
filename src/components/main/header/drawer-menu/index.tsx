import { memo, useEffect, useState } from 'react';
import { Box, IconButton, Stack, Typography, Divider, useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import SocialIcons from '../social-icons';
import { pages } from '../../../../source/navLinks';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

// Custom Drawer component to avoid ref issues in React 19
const CustomDrawer = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'anchor' })(
  ({ theme, open, anchor = 'left' }) => ({
    position: 'fixed',
    top: 0,
    [anchor]: open ? 0 : '-100%',
    width: '100%',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    boxShadow: '5px 0 15px rgba(0, 0, 0, 0.1)',
    transition: theme.transitions.create([anchor], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: theme.zIndex.drawer + 1,
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '380px',
      [anchor]: open ? 0 : '-380px',
    },
  })
);

// Backdrop component
const Backdrop = styled(Box)(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: theme.zIndex.drawer,
  opacity: open ? 1 : 0,
  visibility: open ? 'visible' : 'hidden',
  transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, visibility 0s',
  transitionDelay: open ? '0s' : '225ms',
}));

type DrawerMenuProps = {
  openDrawer: boolean;
  closeDrawer: () => void;
};

function DrawerMenu({ openDrawer, closeDrawer }: DrawerMenuProps) {
  const theme = useTheme();
  const [isBrowser, setIsBrowser] = useState(false);

  // Only render on client-side
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Close drawer when clicking on the backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeDrawer();
    }
  };

  // Close drawer when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openDrawer) {
        closeDrawer();
      }
    };

    if (isBrowser && openDrawer) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [openDrawer, closeDrawer, isBrowser]);

  if (!isBrowser) {
    return null;
  }

  return (
    <>
      <Backdrop 
        open={openDrawer} 
        onClick={handleBackdropClick}
        sx={{
          position: 'fixed',
          zIndex: theme.zIndex.drawer,
        }}
      />
      <CustomDrawer 
        open={openDrawer} 
        anchor="left"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
      <Box sx={{ 
        p: 3, 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box sx={{ width: '120px' }}>
            <Image 
              src="/images/logo/logo.JPG" 
              alt="Dahookia Logo" 
              width={120} 
              height={60}
              style={{ objectFit: 'contain', borderRadius: '4px' }}
              priority
            />
          </Box>
          <IconButton 
            onClick={closeDrawer}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#333',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

        </Box>

        <Divider sx={{ my: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }} />

        <Stack spacing={3} sx={{ 
          mt: 6, 
          px: 4,
          alignItems: 'center',
          '& a': {
            width: '100%',
            textAlign: 'center',
            '&.active': {
              color: '#1976d2',
              fontWeight: 600,
            },
          },
        }}>
          {pages.map(({ name, href }) => (
            <Link 
              href={href} 
              key={name}
              onClick={closeDrawer}
              style={{ textDecoration: 'none',position: 'relative' }}
            >
              <Typography
                sx={{
                  color: '#333',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    color: '#1976d2',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {name}
              </Typography>
            </Link>
          ))}
        </Stack>


        <Box sx={{ 
          mt: 'auto',
          py: 3,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <SocialIcons />
        </Box>
      </Box>
      </CustomDrawer>
    </>
  );
}

export default memo(DrawerMenu);
