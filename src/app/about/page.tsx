import { Metadata } from 'next';
import AboutPage from '@/components/about/AboutPage';

export const metadata: Metadata = {
  title: 'About Us | Dahookia',
  description: 'Explore Dahookia through our video gallery and discover our work.',
};

export default function Page() {
  return <AboutPage />;
}
