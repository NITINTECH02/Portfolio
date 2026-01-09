import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function Hero() {
  // Scroll effects
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);

  // Scroll to section
  const scrollToSection = useCallback((id: string) => {
    if (typeof document === "undefined") return;
    const el = document.querySelector(id) || document.getElementById(id.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Subtitle typewriter loop
  const subtitles = [
    "Electrical Engineer",
    "Product Developer",
    "Embedded Systems & Design",
    "Turning Ideas into Real Products",
  ];
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((i) => (i + 1) % subtitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Intro state
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black dark:bg-gray-900"
      aria-label="Hero Section"
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        poster="/images/hero-fallback.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      >
        <source src="/video/hero-bg-short.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/80 z-0" />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none"
        style={{ backgroundImage: "url(/textures/noise.png)" }}
      />

      {/* Floating parallax lights */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-16 right-10 w-32 h-32 bg-blue-300/10 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Fullscreen cinematic name */}
      {!introComplete && (
        <motion.h1
          initial={{ scale: 12, opacity: 0, filter: "blur(8px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-[12vw] md:text-[8vw] lg:text-[6vw] text-center leading-tight z-20"
          onAnimationComplete={() => setIntroComplete(true)}
        >
          Nitin Dudhane
        </motion.h1>
      )}

      {/* Hero content after intro */}
      {introComplete && (
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          {/* Name in final position */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl leading-tight"
            style={{ scale, y, opacity }}
          >
            Nitin Dudhane
          </motion.h1>

          {/* Subtitle / typewriter loop */}
          <motion.p
            key={subtitleIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-3xl text-gray-200 h-10 mt-4"
          >
            {subtitles[subtitleIndex]}
          </motion.p>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-400 mt-2"
          >
            Pune, India
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("#projects")}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full shadow-xl"
            >
              View Projects
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:nitindudhane321@gmail.com"
              className="px-8 py-4 border-2 border-white text-white rounded-full shadow-xl"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            onClick={() => scrollToSection("#about")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              duration: 1.2,
              delay: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-300"
          >
            <ArrowDown size={36} />
          </motion.button>
        </div>
      )}
    </section>
  );
}
