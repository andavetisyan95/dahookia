import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const VideoThumbnail = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease',
  backgroundColor: '#f5f5f5',
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    boxShadow: theme.shadows[6],
    '& .play-button': {
      transform: 'translate(-50%, -50%) scale(1.1)',
      opacity: 0.9,
    }
  },
  '& img': {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  }
}));
