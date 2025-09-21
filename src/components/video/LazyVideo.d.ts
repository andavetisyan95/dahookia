import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { VideoHTMLAttributes } from 'react';

declare const LazyVideo: ForwardRefExoticComponent<
  VideoHTMLAttributes<HTMLVideoElement> & {
    src: string;
    poster?: string;
  } & RefAttributes<HTMLVideoElement>
>;

export default LazyVideo;
