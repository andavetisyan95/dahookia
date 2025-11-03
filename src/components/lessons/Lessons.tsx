'use client';

import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import Image from 'next/image';
import Breadcrumb from '@/components/common/Breadcrumb';

interface LessonCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  onBookNow: () => void;
}

const LessonCard = ({ title, description, imageSrc, imageAlt, onBookNow }: LessonCardProps) => (
  <Card 
    elevation={3} 
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6,
      },
    }}
  >
    <Box sx={{ position: 'relative', height: '300px', width: '100%' }}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </Box>
    <CardContent sx={{ flexGrow: 1, p: 4 }}>
      <Typography gutterBottom variant="h4" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
        {description}
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        onClick={onBookNow}
        sx={{ mt: 2 }}
      >
        Book Now
      </Button>
    </CardContent>
  </Card>
);

const Lessons = () => {
  const lessons = [
    {
      title: 'Private Ski Lessons',
      description: 'Experience personalized ski instruction tailored to your skill level. Our certified instructors will help you master the slopes with confidence, whether you\'re a beginner or looking to refine your technique.',
      imageSrc: '/services/skilesson.jpg',
      imageAlt: 'Private Ski Lessons',
    },
    {
      title: 'Private Snowboard Lessons',
      description: 'Take your snowboarding to the next level with our expert instructors. From your first turns to advanced freestyle tricks, we\'ll help you progress at your own pace in a fun and supportive environment.',
      imageSrc: '/services/boardlesson.jpg',
      imageAlt: 'Private Snowboard Lessons',
    },
  ];

  const handleBookNow = (lessonType: string) => {
    console.log(`Booking ${lessonType}`);
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

      {/* Lessons Grid Section */}
      <Box sx={{ 
        py: 8, 
        px: { xs: 2, sm: 3, md: 4 }, 
        bgcolor: 'background.paper',
        position: 'relative',
        zIndex: 1
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              textAlign: 'center', 
              mb: 6,
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem' }
            }}
          >
            Our Lesson Programs
          </Typography>
          
          <Grid container spacing={6} justifyContent="center">
            {lessons.map((lesson) => (
              <Grid item xs={12} md={6} key={lesson.title}>
                <LessonCard
                  title={lesson.title}
                  description={lesson.description}
                  imageSrc={lesson.imageSrc}
                  imageAlt={lesson.imageAlt}
                  onBookNow={() => handleBookNow(lesson.title)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Lessons;
