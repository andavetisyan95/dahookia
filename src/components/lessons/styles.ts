import { styled } from '@mui/material/styles';
import { Card, Chip, Typography } from '@mui/material';

// Card Styles
export const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(0, 0, 0, 0.04)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
  },
});

export const StyledCardMedia = styled('div')({
  position: 'relative',
  width: '100%',
  height: '200px', // Fixed height for all images
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
    height: '180px', // Slightly smaller on mobile
  },
});

export const PopularBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: '#4CAF50',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  height: '28px',
  borderRadius: '14px',
  padding: '0 12px',
  zIndex: 1,
  '& .MuiChip-label': {
    padding: '0 4px',
  },
  '& .MuiChip-icon': {
    color: 'white',
    margin: 0,
    marginRight: '4px',
  },
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
}));

export const Price = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 700,
  color: '#1976d2',
  margin: '16px 0 4px',
  fontFamily: '"Poppins", sans-serif',
  letterSpacing: '-0.5px',
});

export const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: 'line-through',
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  marginLeft: '8px',
  opacity: 0.8,
}));

export const FeatureItem = styled('li')(({ theme }) => ({
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.primary,
  fontSize: '0.95rem',
  lineHeight: 1.5,
  '&:before': {
    content: '""',
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    marginRight: '12px',
    flexShrink: 0,
  },
}));
