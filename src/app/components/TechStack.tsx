import { motion, useAnimation } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useEffect } from "react";

const techStack = [
  { name: "SolidWorks", category: "CAD" },
  { name: "AutoCAD", category: "CAD" },
  { name: "ANSYS", category: "Simulation" },
  { name: "KiCad", category: "PCB Design" },
  { name: "DIALux", category: "Lighting" },
  { name: "MATLAB", category: "Simulation" },
  { name: "Python", category: "Programming" },
  { name: "C/C++", category: "Programming" },
  { name: "ESP32", category: "Hardware" },
  { name: "Arduino", category: "Hardware" },
  { name: "ROS2", category: "Robotics" },
  { name: "Odoo ERP", category: "Software" },
];

export function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 }); // not once, we want scroll out
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Animate items popping in with stagger
      controls.start((i) => ({
        opacity: 1,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        y: 0,
        transition: { type: "spring", stiffness: 120, delay: i * 0.05 },
      }));
    } else {
      // Animate items popping out as user scrolls past
      controls.start((i) => ({
        opacity: 0,
        scale: 0.5,
        rotateX: 15,
        rotateY: 15,
        y: 40,
        transition: { duration: 0.3, delay: i * 0.02 },
      }));
    }
  }, [isInView, controls]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 perspective-1000">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technology Stack
          </h3>
          <p className="text-lg text-gray-400">
            Tools & platforms I work with daily
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              custom={index}
              initial={{ opacity: 0, scale: 0.5, rotateX: 15, rotateY: 15, y: 40 }}
              animate={controls}
              style={{ transformStyle: "preserve-3d" }}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <span className="font-medium">{tech.name}</span>
              <span className="ml-2 text-xs text-gray-400">· {tech.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
