'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card,
  CardContent, 
  Button, 
  Divider, 
  Chip,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';
import Breadcrumb from '@/components/common/Breadcrumb';
import { lessons, type LessonCategory } from './lessonsData';
import { 
  StyledCard, 
  StyledCardMedia, 
  PopularBadge, 
  Price, 
  OriginalPrice, 
  FeatureItem 
} from './styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lesson-tabpanel-${index}`}
      aria-labelledby={`lesson-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `lesson-tab-${index}`,
    'aria-controls': `lesson-tabpanel-${index}`,
  };
}

const Lessons: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBookNow = (title: string) => {
    console.log(`Booking ${title}`);
    // Add your booking logic here
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Hero Section with Background */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/services/ropeway.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: -1,
        }
      }}>
        {/* Breadcrumb */}
        <Container 
          maxWidth="lg" 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            pt: { xs: 14, md: 16 },
            width: '100%',
          }}
        >
          <Breadcrumb currentPage="Lessons" />
        </Container>
        
        {/* Hero Content */}
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            px: 3,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography 
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 700,
              mb: 3,
              textShadow: "0 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            Discover Our Lessons
          </Typography>
          
          <Typography 
            variant="h5"
            sx={{
              maxWidth: '800px',
              mb: 4,
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
            }}
          >
            Professional ski and snowboard instruction tailored to your needs
          </Typography>
          
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '50px',
              textTransform: 'none',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4
              },
              transition: 'all 0.3s ease'
            }}
          >
            Book Your Lesson Now
          </Button>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="lesson categories"
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
                height: '3px',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.1rem',
                color: '#64748b',
                '&.Mui-selected': {
                  color: '#1976d2',
                },
              },
            }}
          >
            <Tab 
              label="Ski Lessons"
              {...a11yProps(0)} 
              sx={{ 
                minWidth: isMobile ? 'auto' : 140, 
                px: { xs: 2, sm: 3 },
                fontWeight: 600,
                fontSize: '1rem',
              }}
            />
            <Tab 
              label="Snowboard Lessons"
              {...a11yProps(1)} 
              sx={{ 
                minWidth: isMobile ? 'auto' : 180, 
                px: { xs: 2, sm: 3 },
                fontWeight: 600,
                fontSize: '1rem',
              }}
            />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {lessons.map((category, index) => (
          <TabPanel key={category.id} value={tabValue} index={index}>
            <Box sx={{ mb: 4, maxWidth: '800px' }}>
              {category.description.split('\n\n').map((paragraph, idx) => (
                <Typography 
                  key={idx} 
                  variant={idx === 0 ? 'h5' : 'body1'} 
                  component={idx === 0 ? 'h2' : 'p'}
                  color="text.primary"
                  sx={{ 
                    mb: 2.5,
                    fontWeight: idx === 0 ? 800 : 400,
                    fontSize: idx === 0 ? { xs: '1.5rem', md: '2rem' } : '1rem',
                    lineHeight: 1.2,
                    color: idx === 0 ? '#2c3e50' : '#64748b',
                    letterSpacing: idx === 0 ? '-0.5px' : 'normal',
                    fontFamily: idx === 0 ? '"Druk Wide Heavy Italic", sans-serif' : 'inherit',
                    fontStyle: idx === 0 ? 'italic' : 'normal',
                    textTransform: idx === 0 ? 'uppercase' : 'none',
                    '&:last-child': {
                      mb: 0
                    },
                    '@media (min-width: 900px)': {
                      fontSize: idx === 0 ? '2rem' : '1rem',
                    },
                    '@media (max-width: 600px)': {
                      fontSize: idx === 0 ? '1.5rem' : '1rem',
                    }
                  }}
                >
                  {paragraph.replace('**', '').replace('**', '')}
                </Typography>
              ))}
            </Box>
            
            <Grid container spacing={3}>
              {category.types.map((lesson) => (
                <Grid item xs={12} sm={6} md={4} key={lesson.id}>
                  <StyledCard elevation={3}>
                    {lesson.isPopular && (
                      <PopularBadge
                        icon={<StarIcon />}
                        label="Most Popular"
                      />
                    )}
                    <StyledCardMedia>
                      <Image
                        src={category.imageSrc}
                        alt={category.imageAlt}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </StyledCardMedia>
                    <CardContent sx={{ 
                      flexGrow: 1, 
                      display: 'flex', 
                      flexDirection: 'column',
                      padding: '24px',
                      '&:last-child': { paddingBottom: '24px' }
                    }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{
                          fontSize: '1.4rem',
                          fontWeight: 700,
                          color: '#2c3e50',
                          mb: 1.5,
                          lineHeight: 1.3,
                          fontFamily: '"Poppins", sans-serif',
                        }}
                      >
                        {lesson.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#64748b',
                          mb: 2.5,
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {lesson.description}
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'flex-end', 
                        mb: 2,
                        flexWrap: 'wrap',
                        gap: 1,
                      }}>
                        <Price>{lesson.price}</Price>
                        {lesson.originalPrice && (
                          <OriginalPrice>
                            {lesson.originalPrice}
                          </OriginalPrice>
                        )}
                        {lesson.discount && (
                          <Chip
                            label={lesson.discount}
                            sx={{ 
                              backgroundColor: 'rgba(25, 118, 210, 0.1)',
                              color: '#1976d2',
                              height: '24px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              ml: 1,
                            }}
                          />
                        )}
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#64748b',
                          fontSize: '0.9rem',
                          mb: 2.5,
                          display: 'flex',
                          alignItems: 'center',
                          '&:before': {
                            content: '"⏱️"',
                            mr: 1,
                            fontSize: '1rem',
                          }
                        }}
                      >
                        {lesson.duration}
                      </Typography>
                      
                      <Divider sx={{ my: 2, borderColor: 'rgba(0, 0, 0, 0.04)' }} />
                      
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 700,
                          color: '#2c3e50',
                          mb: 1.5,
                          fontSize: '0.9rem',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          opacity: 0.8,
                        }}
                      >
                        What's included:
                      </Typography>
                      <Box 
                        component="ul" 
                        sx={{ 
                          pl: 0, 
                          mb: 3, 
                          mt: 0,
                          '& li': {
                            mb: 1.5,
                            '&:last-child': {
                              mb: 0
                            }
                          }
                        }}
                      >
                        {lesson.features.map((feature: string, index: number) => (
                          <FeatureItem key={index}>
                            {feature}
                          </FeatureItem>
                        ))}
                      </Box>
                      
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        onClick={() => handleBookNow(`${category.title} - ${lesson.title}`)}
                        sx={{ 
                          mt: 'auto',
                          py: 1.5,
                          fontWeight: 600,
                          textTransform: 'none',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          letterSpacing: '0.5px',
                          background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
                            background: 'linear-gradient(45deg, #1565c0 30%, #00B0FF 90%)',
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        ))}
        
        <Box sx={{ 
          textAlign: 'center', 
          mt: 8,
          p: 6,
          borderRadius: '12px',
          backgroundColor: 'rgba(25, 118, 210, 0.05)',
          border: '1px dashed rgba(25, 118, 210, 0.2)'
        }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Not sure which lesson is right for you?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', mb: 3 }}>
            Our instructors can help you choose the perfect lesson based on your skill level and goals.
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            Get a Free Consultation
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Lessons;
