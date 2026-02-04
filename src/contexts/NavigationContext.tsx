'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const NavigationLoading = dynamic(
  () => import('@/components/common/NavigationLoading'),
  { ssr: false }
);

type NavigationContextType = {
  isNavigating: boolean;
  handleNavigation: (e: React.MouseEvent, href: string) => Promise<void>;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = async (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (pathname === href) return;
    
    // Set loading state immediately
    setIsNavigating(true);
    
    // Use a small delay to ensure the loading state is shown
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      // Start the navigation
      const navigationPromise = router.push(href);
      
      // Wait for the navigation to complete or timeout after 5 seconds
      await Promise.race([
        navigationPromise,
        new Promise(resolve => setTimeout(resolve, 5000)) // 5 second timeout
      ]);
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      // Add a small delay before hiding the loading indicator
      // to prevent flickering on fast navigations
      setTimeout(() => {
        setIsNavigating(false);
      }, 300);
    }
  };

  // Listen for route changes to reset navigation state
  useEffect(() => {
    const handleRouteChange = () => setIsNavigating(false);
    
    // Reset when the component mounts in case we're coming from a different route
    setIsNavigating(false);
    
    // Listen for route changes
    window.addEventListener('routeChangeComplete', handleRouteChange);
    window.addEventListener('routeChangeError', handleRouteChange);
    
    return () => {
      window.removeEventListener('routeChangeComplete', handleRouteChange);
      window.removeEventListener('routeChangeError', handleRouteChange);
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ isNavigating, handleNavigation }}>
      {isNavigating && <NavigationLoading />}
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
