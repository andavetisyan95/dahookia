import { memo, useEffect, useState, useRef, useCallback } from 'react';
import { Box, IconButton, Stack, Typography, Divider, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import SocialIcons from '../social-icons';
import { pages } from '../../../../source/navLinks';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { useNavigation } from '../../../../contexts/NavigationContext';

// Custom Drawer component with optimized transitions
const CustomDrawer = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    position: 'fixed',
    top: 0,
    left: open ? 0 : '-100%',
    width: '100%',
    maxWidth: '380px',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    boxShadow: '5px 0 15px rgba(0, 0, 0, 0.1)',
    transition: 'left 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    zIndex: theme.zIndex.drawer + 1,
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      left: open ? 0 : '-380px',
    },
  })
);

// Backdrop component with optimized transitions
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
  transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)',
  pointerEvents: open ? 'auto' : 'none',
}));

type DrawerMenuProps = {
  openDrawer: boolean;
  closeDrawer: () => void;
};

function DrawerMenu({ openDrawer, closeDrawer }: DrawerMenuProps) {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const isFirstRender = useRef(true);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { handleNavigation } = useNavigation();

  // Only render on client-side after mount
  useEffect(() => {
    setMounted(true);
    return () => {
      isFirstRender.current = false;
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Close drawer when clicking on the backdrop
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeDrawer();
    }
  }, [closeDrawer]);

  // Close drawer when pressing Escape key
  useEffect(() => {
    if (!mounted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openDrawer) {
        closeDrawer();
      }
    };

    if (openDrawer) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDrawer, closeDrawer, mounted]);

  // Don't render anything during SSR or before first client-side render
  if (!mounted || isFirstRender.current) {
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
        ref={drawerRef}
        open={openDrawer}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Box 
          sx={{ 
            p: 3, 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box'
          }}
        >
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

          <Stack 
            spacing={3} 
            sx={{ 
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
            }}
          >
            {pages.map(({ name, href }) => (
              <Box 
                key={name}
                component="a"
                href={href}
                onClick={(e) => {
                  handleNavigation(e, href);
                  closeDrawer();
                }}
                style={{ textDecoration: 'none', position: 'relative' }}
              >
                <Typography
                  sx={{
                    color: '#333',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    py: 1.5,
                    px: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#1976d2',
                    },
                    transition: 'color 0.2s ease',
                  }}
                >
                  {name}
                </Typography>
              </Box>
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
