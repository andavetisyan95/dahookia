import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const PlayButton = styled(Box)(() => ({
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
  willChange: 'transform',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.95)',
  }
}));
