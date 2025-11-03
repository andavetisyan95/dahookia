import { Metadata } from 'next';
import Lessons from '@/components/lessons/Lessons';

export const metadata: Metadata = {
  title: 'Ski & Snowboard Lessons | Dahookia',
  description: 'Professional ski and snowboard lessons for all skill levels. Book your private lesson today!',
};

export default function Page() {
  return <Lessons />;
}
