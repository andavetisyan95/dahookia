'use client';

import { Box, Container, Typography, Link as MuiLink, IconButton, Grid } from '@mui/material';
import { Facebook, Instagram, Email, Phone, LocationOn } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { pages } from '@/source/navLinks';

const FooterColumn = ({ children, ...props }: any) => (
  <Grid item {...props} sx={{ display: 'flex', flexDirection: 'column', ...props.sx }}>
    {children}
  </Grid>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0a1a2e',
        color: 'white',
        pt: 3,
        pb: 1,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 6, lg: 8 } }}>
        <Grid 
          container 
          spacing={{ xs: 1, md: 6 }}
          justifyContent="space-around"
          sx={{
            maxWidth: '1400px',
            mx: 'auto',
          }}
        >
          {/* Logo and Description */}
          <FooterColumn xs={12} sm={5} md={4} sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            mb: { xs: 4, md: 0 },
          }}>
            <Box sx={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: { xs: 'center', md: 'flex-start' } 
            }}>
              <Box sx={{ width: '100%' }}>
                <Box 
                  sx={{ 
                    mb: 2,
                    width: '180px',
                    height: '60px',
                    position: 'relative',
                    mx: { xs: 'auto', md: 0 },
                    '& img': {
                      width: '100%',
                      height: '100%',
                    }
                  }}
                >
                  <Image 
                    src="/images/logo/logo.JPG" 
                    alt="Dahookia Logo" 
                    fill
                    sizes="180px"
                    priority
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    opacity: 0.8, 
                    maxWidth: '300px', 
                    lineHeight: 1.6,
                    mx: { xs: 'auto', md: 0 },
                    width: '100%'
                  }}
                >
                  Your premier destination for unforgettable adventures
                  and experiences in the heart of nature.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <IconButton 
                    aria-label="Facebook" 
                    sx={{ 
                      color: 'white', 
                      
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        color: '#4267B2',
                        transform: 'translateY(-2px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      } 
                    }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton 
                    aria-label="Instagram" 
                    sx={{ 
                      color: 'white', 
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        color: '#E1306C',
                        transform: 'translateY(-2px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      } 
                    }}
                  >
                    <Instagram />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </FooterColumn>

          {/* Quick Links */}
          <FooterColumn 
            xs={12} 
            sm={3} 
            md={3}
            sx={{ 
              display: 'flex',
              mb: { xs: 4, md: 0 },
             
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {pages.map((page) => (
                <MuiLink 
                key={`${page.name}_${page.href}`}
                component={Link} 
                href={page.href} 
                color="inherit" 
                underline="none" 
                sx={{ 
                  '&:hover': { 
                    color: '#42a5f5',
                  } 
                }}
              >
                {page.name}
              </MuiLink>
              ))}
            </Box>
          </FooterColumn>

          {/* Contact Info */}
          <FooterColumn 
            xs={12} 
            sm={4} 
            md={4}
            sx={{ 
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              mb: { xs: 4, md: 0 },
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2.5,
              maxWidth: '300px',
              width: '100%'
            }}>
              <Box sx={{ display: 'flex',cursor: 'pointer', alignItems: 'center', gap: 2,'&:hover': {
                    color: '#42a5f5',
                    '& .MuiSvgIcon-root': {
                      color: '#42a5f5',
                    }
                  } }}>
                <LocationOn sx={{ opacity: 0.8 }} />
                <Typography variant="body2">Tsaghkadzor, Tandzaghbyuri St.</Typography>
              </Box>
              <MuiLink 
                href="tel:+1234567890" 
                color="inherit" 
                underline="none"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  '&:hover': {
                    color: '#42a5f5',
                    '& .MuiSvgIcon-root': {
                      color: '#42a5f5',
                    }
                  }
                }}
              >
                <Phone sx={{ opacity: 0.8 }} />
                <Typography variant="body2">+374 77 27 00 79</Typography>
              </MuiLink>
              <MuiLink 
                href="mailto:info@dahookia.com" 
                color="inherit" 
                underline="none"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  '&:hover': {
                    color: '#42a5f5',
                    '& .MuiSvgIcon-root': {
                      color: '#42a5f5',
                    }
                  }
                }}
              >
                <Email sx={{ opacity: 0.8 }} />
                <Typography variant="body2">info@dahookia.com</Typography>
              </MuiLink>
            </Box>
          </FooterColumn>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 2,
            pt: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.8rem' }}>
            © {currentYear} Dahookia. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
