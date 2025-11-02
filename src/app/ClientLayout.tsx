'use client';

import { Inter } from 'next/font/google';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/main";
import FloatingBookButton from '@/components/common/FloatingBookButtonWrapper';
import GlobalLoading from '@/components/common/GlobalLoading';
import Footer from '@/components/main/footer';

const inter = Inter({ subsets: ['latin'] });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      // Small delay to prevent flash of content
      setTimeout(() => setIsLoading(false), 500);
    };

    handleStart();
    handleComplete();

    return () => {
      setIsLoading(false);
    };
  }, [pathname]);

  // Only apply opacity transition after component mounts on client
  const bodyStyle: React.CSSProperties = {
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    width: '100%',
    overflowX: 'hidden' as const,
    opacity: isMounted ? (isLoading ? 0 : 1) : 1,
    transition: isMounted ? 'opacity 0.3s ease-in-out' : 'none',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <html lang="en">
      <body 
        className={inter.className}
        style={bodyStyle}
        suppressHydrationWarning
      >
        {isLoading && <GlobalLoading />}
        <Navbar />
        <Box component="main" sx={{ flex: 1 }}>
          {children}
        </Box>
        <Footer />
        <FloatingBookButton />
      </body>
    </html>
  );
}
