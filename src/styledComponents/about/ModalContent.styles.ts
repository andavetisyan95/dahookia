import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '1100px',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
  borderRadius: '12px',
  outline: 'none',
  maxHeight: '90vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:focus-visible': {
    outline: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    maxHeight: '80vh',
  },
}));
