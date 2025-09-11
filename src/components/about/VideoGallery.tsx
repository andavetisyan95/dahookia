'use client';

import { useState } from 'react';
import { Box, Typography, Modal, IconButton } from '@mui/material';
import Image from 'next/image';
import { PlayArrow, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { VideoItem } from '@/types/video';

interface VideoGalleryProps {
  videos: VideoItem[];
}

const VideoThumbnail = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
    '& .play-button': {
      transform: 'scale(1.1)',
      opacity: 0.9,
    }
  }
}));

const PlayButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.95)',
  }
}));

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '1000px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
  outline: 'none',
  borderRadius: 1,
};

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openVideoModal = (videoUrl: string): void => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  // Function to get the embed URL from different video platforms
  const getEmbedUrl = (url: string): string => {
    // Handle YouTube URLs
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtube.com') 
        ? url.split('v=')[1]?.split('&')[0]
        : url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1`;
    }
    // Handle Vimeo URLs
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
    }
    return url;
  };

  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mb: 6 }}>
        {videos.map((item) => (
          <Box key={item.id}>
            <VideoThumbnail 
              onClick={() => openVideoModal(item.videoUrl)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openVideoModal(item.videoUrl)}
            >
              <Box sx={{ 
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                backgroundColor: 'rgba(0,0,0,0.1)'
              }}>
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                  priority={false}
                />
                <PlayButton className="play-button" aria-label={`Play ${item.title}`}>
                  <PlayArrow sx={{ color: 'black', fontSize: 40 }} />
                </PlayButton>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 500 }}>
                  {item.title}
                </Typography>
              </Box>
            </VideoThumbnail>
          </Box>
        ))}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="video-modal"
        aria-describedby="video-modal-description"
        sx={{ 
          backdropFilter: 'blur(4px)',
          '&:focus-visible': { outline: 'none' }
        }}
        disableAutoFocus
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton 
              onClick={closeModal} 
              size="small" 
              sx={{ color: 'text.primary' }}
              aria-label="Close video"
            >
              <Close />
            </IconButton>
          </Box>
          {selectedVideo && (
            <Box sx={{ 
              position: 'relative', 
              paddingBottom: '56.25%', 
              width: '100%',
              '& iframe': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }
            }}>
              <iframe
                src={getEmbedUrl(selectedVideo)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video player"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
