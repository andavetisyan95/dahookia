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

  useEffect(() => {
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

  return (
    <html lang="en">
      <body 
        className={inter.className}
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          width: '100%',
          overflowX: 'hidden',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column'
        }}
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
