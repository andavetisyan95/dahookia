import { forwardRef, memo, useMemo } from 'react';
import type { ForwardedRef, VideoHTMLAttributes } from 'react';

interface LazyVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'ref'> {
  src: string;
  poster?: string;
}

const LazyVideo = memo(forwardRef<HTMLVideoElement, LazyVideoProps>(
  ({
    src,
    poster,
    style,
    ...rest
  },
  ref: ForwardedRef<HTMLVideoElement>
) => {
  // Memoize the source element to prevent unnecessary re-renders
  const sourceElement = useMemo(() => (
    <source src={src} type="video/mp4" />
  ), [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      playsInline
      muted
      loop
      preload="metadata"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style,
      }}
      {...rest}
    >
      {sourceElement}
      Your browser does not support the video tag.
    </video>
  );
}));

LazyVideo.displayName = 'LazyVideo';

export default LazyVideo;
