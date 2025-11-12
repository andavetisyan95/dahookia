import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// Card Styles
export const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#ffffff',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
    zIndex: 1,
  },
  '& .MuiTypography-root': {
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  },
});

export const StyledCardMedia = styled('div')({
  position: 'relative',
  width: '100%',
  height: '200px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
  '@media (max-width: 600px)': {
    height: '180px',
  },
});

export const PopularBadge = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 15,
  right: 15,
  padding: '6px 12px',
  background: 'linear-gradient(45deg, #3a8bd9 0%, #1976d2 100%)',
  color: 'white',
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  textAlign: 'center',
  boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  zIndex: 2,
  whiteSpace: 'nowrap',
  borderRadius: '4px',
  '& svg': {
    fontSize: '0.9rem',
    margin: 0,
    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
    pointerEvents: 'none',
  },
  '@media (max-width: 600px)': {
    top: 10,
    right: 10,
    padding: '4px 8px',
    fontSize: '0.65rem',
    '& svg': {
      fontSize: '0.8rem',
    },
  },
  '&:hover': {
    background: 'linear-gradient(45deg, #3a8bd9 0%, #1565c0 100%)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  }
}));

export const Price = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '8px',
  marginBottom: '12px',
  '& .price-container': {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '3px',
  },
  '& .main-price': {
    fontSize: '1.7rem',
    fontWeight: 700,
    color: '#ffffff',
    lineHeight: 1,
    fontFamily: '"Poppins", sans-serif',
  },
  '& .per-person': {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '0.15rem',
  },
});

export const OriginalPrice = styled('span')({
  color: '#ff6b6b',
  fontSize: '1.8rem',
  fontWeight: 600,
  textDecoration: 'line-through',
  position: 'relative',
  left: '10px',
  top: '-10px',
});

export const FeatureItem = styled('li')({
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  color: 'rgba(255, 255, 255, 0.95)',
  fontSize: '0.95rem',
  fontWeight: 500,
  lineHeight: 1.4,
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  '&:before': {
    content: '""',
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#4da8f5',
    marginRight: '12px',
    flexShrink: 0,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  },
  '@media (max-width: 600px)': {
    fontSize: '0.9rem',
    marginBottom: '10px',
  },
});
