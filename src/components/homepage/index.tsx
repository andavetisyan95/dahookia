"use client";

import { Box, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";

// Клиент-только виджеты
const ExperienceSection = dynamic(() => import("./ExperienceSection"), { ssr: false });

const VideoBackground = dynamic<
  {
    videoSrc: string;
    imageSrc: string;
    priority?: boolean;
    children?: React.ReactNode;
    onEnded?: () => void;
    onCanPlay?: () => void;
  }
>(() => import("../video/VideoBackground").then((m) => m.default), {
  ssr: false,
  // Важно: плейсхолдер тоже под suppressHydrationWarning
  loading: () => (
    <Box
      suppressHydrationWarning
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "#000",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src="/images/logo/logo.JPG"
        alt="Loading"
        sx={{
          width: 120,
          height: 60,
          borderRadius: 1,
          animation: "pulse 1.5s infinite",
          "@keyframes pulse": {
            "0%": { opacity: 0.6 },
            "50%": { opacity: 1 },
            "100%": { opacity: 0.6 },
          },
        }}
      />
    </Box>
  ),
});

const VIDEOS = ["/videos/vid1.mp4", "/videos/vid2.mp4", "/videos/vid3.mp4", "/videos/vid4.mp4", "/videos/vid5.mp4"];

// Хук «смонтировано?»
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const HomePage: React.FC = () => {
  const mounted = useMounted();
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleVideoEnd = () => setCurrentVideo((p) => (p + 1) % VIDEOS.length);
  const handleVideoReady = () => setIsVideoReady(true);

  // SSR: отдаём только статичную картинку, игнорируя любые расхождения атрибутов/классов
  if (!mounted) {
    return (
      <Box
        suppressHydrationWarning
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: "url(/heroSection/homeMain.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  // Клиент: полноценный интерфейс
  return (
    <Box suppressHydrationWarning sx={{ width: "100%", overflowX: "hidden" }}>
      <Box sx={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            opacity: isVideoReady ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <Suspense fallback={null}>
            <VideoBackground
              key={currentVideo}
              videoSrc={VIDEOS[currentVideo]}
              imageSrc="/heroSection/homeMain.jpg"
              onEnded={handleVideoEnd}
              onCanPlay={handleVideoReady}
            />
          </Suspense>
        </Box>

        {/* overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 2,
          }}
        />

        {/* текст */}
        <Box
          sx={{
            position: "relative",
            zIndex: 3,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <Stack
            sx={{
              zIndex: 2,
              maxWidth: { xs: "90%", md: "70%", lg: "50%" },
              flexWrap: "wrap",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
            spacing={2.5}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#fff",
                textTransform: "uppercase",
                fontSize: { xs: 12, sm: 14, md: 16 },
                letterSpacing: 2,
                lineHeight: 1.2,
                fontWeight: 500,
              }}
            >
              Welcome to Dahookia
            </Typography>

            <Box
              sx={{
                borderBottom: "1px solid rgba(255,255,255,0.8)",
                width: "3rem",
                alignSelf: "center",
                height: "2px",
              }}
            />

            <Typography
              variant="h1"
              sx={{
                color: "#fff",
                textTransform: "uppercase",
                fontSize: { xs: 22, sm: 28, md: 36, lg: 48 },
                letterSpacing: { xs: "0.05em", sm: "0.1em" },
                lineHeight: { xs: 1.1, sm: 1.2, md: 1.3 },
                fontWeight: 700,
                textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                px: { xs: 1, sm: 2 },
                my: 1,
              }}
            >
              YOUR MOUNTAIN ADVENTURE STARTS HERE
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Suspense fallback={null}>
        <ExperienceSection />
      </Suspense>
    </Box>
  );
};

export default HomePage;
