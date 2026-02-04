import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';
import { NavigationProvider } from '../contexts/NavigationContext';

export const metadata: Metadata = {
  title: 'Dahookia',
  description: 'Dahookia - Your Ski School',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationProvider>
      <ClientLayout>
        {children}
      </ClientLayout>
    </NavigationProvider>
  );
}
