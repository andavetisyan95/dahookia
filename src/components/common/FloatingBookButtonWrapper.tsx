'use client';

import dynamic from 'next/dynamic';

const FloatingBookButton = dynamic(
  () => import('./FloatingBookButton'),
  { ssr: false }
);

export default function FloatingBookButtonWrapper() {
  return <FloatingBookButton />;
}
