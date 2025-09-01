import { memo } from "react";
import { Box, Drawer, IconButton, Stack, Typography, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import SocialIcons from "../social-icons";
// Navigation items matching the header
import { pages } from "../../../../source/navLinks";
import Image from "next/image";

type DrawerMenuProps = {
  openDrawer: boolean;
  closeDrawer: () => void;
};

function DrawerMenu({ openDrawer, closeDrawer }: DrawerMenuProps) {
  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={closeDrawer}
      sx={{ 
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '380px' },
          backgroundColor: '#f8f9fa',
          boxShadow: '5px 0 15px rgba(0, 0, 0, 0.1)',
        },
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
    </Drawer>
  );
}

export default memo(DrawerMenu);
