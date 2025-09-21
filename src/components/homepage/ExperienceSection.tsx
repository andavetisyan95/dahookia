"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";

const ExperienceSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, students: 0, safety: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Only run in browser
    if (typeof window === 'undefined') return;

    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate numbers
          const duration = 2000; // 2 seconds
          const steps = 60;
          const stepDuration = duration / steps;

          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            setCounts({
              years: Math.floor(10 * progress),
              students: Math.floor(1000 * progress),
              safety: Math.floor(100 * progress)
            });

            if (currentStep >= steps) {
              clearInterval(interval);
              setCounts({ years: 10, students: 1000, safety: 100 });
            }
          }, stepDuration);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, []);

  // Return a placeholder with the same dimensions during SSR
  if (!isMounted) {
    return (
      <Box
        ref={sectionRef}
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: 'center',
            marginBottom: '3rem',
            fontWeight: 700,
            color: '#333',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          Our Experience in Numbers
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        '&:before': {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
        },
      }}
    >
      <Box sx={{ 
        position: "relative", 
        zIndex: 2, 
        textAlign: "center",
        maxWidth: 800,
        px: 4
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            mb: 4, 
            color: "white",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease"
          }}
        >
          Who we are?
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: "white", 
            mb: 6,
            fontSize: { xs: "1rem", sm: "1.25rem" },
            lineHeight: 1.6,
            opacity: isVisible ? 0.9 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s"
          }}
        >
          We have a long history of providing high-quality education to our students.
        </Typography>
        <Box sx={{ 
          display: "flex", 
          gap: 3, 
          justifyContent: "center", 
          flexWrap: "wrap",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s"
        }}>
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {counts.years}+
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Years of experience in education
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {counts.students}+
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Students taught successfully
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {counts.safety}%
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Focus on student security
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ExperienceSection;
