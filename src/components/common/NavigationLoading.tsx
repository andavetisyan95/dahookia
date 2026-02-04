'use client';

import { Box, keyframes } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const NavigationLoading: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999,
        backdropFilter: 'blur(3px)',
        animation: `${fadeIn} 0.2s ease-out forwards`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          animation: `${fadeIn} 0.3s ease-out 0.1s both`,
        }}
      >
        <CircularProgress 
          color="primary" 
          size={60} 
          thickness={4}
          sx={{
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default NavigationLoading;
