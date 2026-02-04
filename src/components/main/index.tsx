"use client";

import { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import DrawerMenu from "./header/drawer-menu";
import { pages } from "../../source/navLinks";
import GlobalLoading from "../common/GlobalLoading";
import { useNavigation } from "../../contexts/NavigationContext";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isNavigating, handleNavigation } = useNavigation();

  // Set isMounted to true after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    
    const handleResize = () => {
      // Close drawer if screen size is desktop (sm breakpoint or larger)
      if (window.innerWidth >= 600) {
        setDrawerOpen(false);
      }
    };
    
    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    // Initial check
    handleScroll();
    
    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  // Close drawer when clicking outside
  useEffect(() => {
    if (!drawerOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const drawer = document.querySelector('.MuiDrawer-root');
      
      if (drawer && !drawer.contains(target)) {
        setDrawerOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [drawerOpen]);

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <AppBar 
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          transition: "all 0.3s ease",
          width: "100%",
        }}
      >
        <Toolbar />
      </AppBar>
    );
  }

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 4 : 0}
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        color: scrolled ? '#262A58' : '#ffffff',
        transition: 'all 0.3s ease',
        px: 2,
        width: '100%',
        maxWidth: '100%',
        left: 0,
        right: 0,
      }}
    >
      <Toolbar 
        disableGutters 
        sx={{ 
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: '1440px',
          mx: 'auto',
          px: { xs: 1, md: 2 },  // Reduced horizontal padding
        }}
      >
        <Box 
          component={Link}
          href="/"
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            height: '85px',  // Increased height for logo
            '&:hover': {
              opacity: 0.9,
            }
          }}
        >
          <Box
            component="img"
            src="/images/logo/logoheader.svg"
            alt="Dahookia Logo"
            sx={{
              height: '100%',
              width: 'auto',
              maxWidth: '350px',  // Increased max width
              objectFit: 'contain',
            }}
          />
        </Box>
        
        {/* Navigation Links - Desktop */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          gap: 2,
          '& .MuiButton-root': {
            color: 'inherit',
            fontWeight: 500,
            '&:hover': {
              color: scrolled ? '#1a1a1a' : '#ffffff',
              
            }
          }
        }}>
          {pages.map((page) => (
            <Button
              key={page.href}
              href={page.href}
              onClick={(e) => handleNavigation(e, page.href)}
              sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: '1rem',
                textTransform: 'none',
                '&:hover': {
                  opacity: 0.9,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>

        {/* Mobile menu button */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <DownhillSkiingIcon
            onClick={() => setDrawerOpen(true)}
            sx={{
              padding: '4px',
              width: 35,
              height: 35,
              cursor: 'pointer',
              border: scrolled
                ? '1px solid rgba(0, 5, 59, 0.85)'
                : '1px solid #fff',
              borderRadius: '10px',
              color: scrolled ? 'rgba(0, 5, 59, 0.85)' : '#fff',
              '&:hover': {
                background: 'rgba(0, 5, 59, 0.85)',
                color: '#fff',
              },
            }}
          />
        </Box>
      </Toolbar>

      {/* Mobile menu */}
      <DrawerMenu
        openDrawer={drawerOpen}
        closeDrawer={() => setDrawerOpen(false)}
      />
      
      {/* Global Loading Overlay */}
      {isNavigating && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            pointerEvents: 'auto',
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <GlobalLoading />
        </Box>
      )}
    </AppBar>
  );
}
