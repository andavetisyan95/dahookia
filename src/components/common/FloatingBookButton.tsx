"use client";

import { Fab, Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useEffect, useState } from "react";

// Shaking animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(33, 150, 243, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }
`;

// Styled components
const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 1000,
  backgroundColor: "#2196f3",
  color: "white",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)",
  animation: `${pulse} 2s infinite`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  textTransform: "uppercase",
  fontWeight: 700,
  fontSize: "0.9rem",
  lineHeight: 1,
  "&:hover": {
    backgroundColor: "#1976d2",
    boxShadow: "0 6px 25px rgba(33, 150, 243, 0.6)",
    transform: "scale(1.05)",
  },
  transition: "all 0.3s ease",
}));

const FloatingBookButton: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Don't render anything during SSR
  }

  return (
    <Link href="/booking" style={{ textDecoration: "none" }}>
      <StyledFab aria-label="Book a Lesson">
        <Box component="span" sx={{ lineHeight: 1 }}>BOOK</Box>
        <Box component="span" sx={{ lineHeight: 1 }}>NOW</Box>
      </StyledFab>
    </Link>
  );
};

export default FloatingBookButton;
