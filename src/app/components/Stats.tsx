"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const stats = [
  { value: "30+", label: "Products Designed" },
  { value: "2+", label: "Years of Industry Experience" },
  { value: "20+", label: "Competitions Participated" },
  { value: "10+", label: "Professional Certifications" },
];

export function Stats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 45%"],
  });

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => {
            const start = index * 0.15;
            const end = start + 0.25;

            const opacity = useTransform(
              scrollYProgress,
              [start, end],
              [0, 1]
            );

            const y = useTransform(
              scrollYProgress,
              [start, end],
              [50, 0]
            );

            const scale = useTransform(
              scrollYProgress,
              [start, end],
              [0.85, 1]
            );

            return (
              <motion.div
                key={index}
                style={{ opacity, y, scale }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="will-change-transform"
              >
                <div className="text-4xl md:text-5xl font-extrabold mb-3">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-400 tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
