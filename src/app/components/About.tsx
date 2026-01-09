"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isInView = useInView(sectionRef, { amount: 0.4 });

  /* smooth section entrance */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0 1", "1 0"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 0.15], [120, 0]);

  /* autoplay only when visible */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  /* magnetic tilt */
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleTilt(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: -(e.clientY - rect.top - rect.height / 2) / 20,
    });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  /* split text animation */
  function SplitText({ text }: { text: string }) {
    return (
      <>
        {text.split(" ").map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.035, duration: 0.28 }}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </>
    );
  }

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="relative py-32 bg-white overflow-hidden"
      aria-label="About Nitin Dudhane"
    >
      {/* depth glow */}
      <motion.div
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-violet-400/20 blur-3xl"
        animate={{ y: [0, 40, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-blue-300/20 blur-3xl"
        animate={{ y: [0, -35, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* floating particles */}
      <AnimatePresence>
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gray-300/70"
            animate={{ opacity: [0.3, 0.9, 0.3], y: [-25, 25] }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* 🎥 video card */}
          <motion.div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="order-2 lg:order-1"
          >
            <motion.div
              style={{ rotateX: tilt.y, rotateY: tilt.x }}
              transition={{ type: "spring", stiffness: 130, damping: 18 }}
              className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-black relative backdrop-blur-xl"
            >
              {/* shimmer loader */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              />

              <video
                ref={videoRef}
                src="/video/intro.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />

              {/* glass sweep */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                animate={{
                  background: [
                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                    "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.18) 60%, transparent 120%)",
                  ],
                  opacity: [0.2, 0.45, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* 🧠 text */}
          <div className="order-1 lg:order-2 space-y-6">
            <motion.h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              <SplitText text="About Me" />
            </motion.h2>

            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                <SplitText text="I am a multidisciplinary product engineer operating at the intersection of electrical engineering, embedded systems, industrial design, and automation." />
              </p>

              <p>
                <SplitText text="I transform complex ideas into manufacturable, cost-optimized products by combining system architecture, simulation, prototyping, and industrial execution." />
              </p>

              <p>
                <SplitText text="I hold a B.Tech in Electrical Engineering from DKTE’s Society’s Textile and Engineering Institute and gained advanced experience with Microchip, MathWorks, Skolar, and Blue Prism." />
              </p>

              <p>
                <SplitText text="I have delivered production-grade solutions at Fevino Industries and Samee Industries across solar structures, LED systems, battery packs, automation machinery, and power electronics." />
              </p>

              <p className="font-semibold text-gray-900 pt-3">
                <SplitText text="My mission is to operate among the top 0.5% of engineers — building systems that scale, survive manufacturing, and create real-world impact." />
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
