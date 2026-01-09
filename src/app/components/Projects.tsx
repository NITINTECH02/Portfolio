"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";

/* ================= PROJECT DATA ================= */
const projects = [
  {
    title: "Home Automation System (ESP8266)",
    type: "Academic",
    description: "IoT-based home automation with remote and voice control",
    long:
      "Developed an ESP8266-based home automation system with mobile and voice control. Implemented temperature monitoring, automatic regulation, sensor integration, real-time data visualization, and complete electrical schematics.",
    category: "Embedded Systems",
    technologies: ["ESP8266", "IoT", "Sensors", "Automation"],
  },
  {
    title: "Automatic Car Wash System (ATmega32)",
    type: "Academic",
    description: "Automated car wash control system with sensor-based logic",
    long:
      "Designed an automated car wash system using ATmega32. Implemented proximity and water-level sensors with multi-stage sequential control logic.",
    category: "Embedded Control",
    technologies: ["ATmega32", "Embedded C", "Sensors", "Control Logic"],
  },
  {
    title: "Pure Sine Wave Inverter",
    type: "Personal",
    description: "High-efficiency pure sine wave inverter design",
    long:
      "Designed and built a pure sine wave inverter using MOSFETs and PWM control. Achieved stable 230V AC output with protection circuits.",
    category: "Power Electronics",
    technologies: ["MOSFET", "PWM", "Power Electronics"],
  },
  {
    title: "Wireless Power Transfer (Tesla Coil)",
    type: "Academic",
    description: "Wireless power transmission using resonant coupling",
    long:
      "Designed and constructed a Tesla coil system using electromagnetic induction and resonant coupling.",
    category: "Electronics",
    technologies: ["Tesla Coil", "Resonance", "High Voltage"],
  },
  {
    title: "EV Powertrain Simulation",
    type: "Personal",
    description: "Electric vehicle drivetrain modeling and analysis",
    long:
      "Modeled EV powertrain using MATLAB & Simulink with SOC estimation and efficiency analysis.",
    category: "Simulation",
    technologies: ["MATLAB", "Simulink", "EV Systems"],
  },
  {
    title: "Micro-PLC Using ESP32",
    type: "Personal",
    description: "Compact PLC-style controller for automation",
    long:
      "Developed a micro-PLC using ESP32 with ladder-logic style algorithms and HMI.",
    category: "Industrial Automation",
    technologies: ["ESP32", "PLC Logic", "HMI"],
  },
];

type Project = (typeof projects)[number];
const categories = ["All", ...new Set(projects.map(p => p.category))];

/* ================= PROJECT CARD ================= */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={() => onOpen(project)}
      className="min-w-[320px] p-6 rounded-2xl bg-white shadow cursor-pointer"
    >
      <span className="text-xs opacity-60">
        {index + 1} • {project.type}
      </span>

      <h3 className="text-xl font-bold mt-2">{project.title}</h3>
      <p className="text-gray-600 mt-2">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {project.technologies.map((t) => (
          <span
            key={t}
            className="px-2 py-1 bg-gray-100 rounded text-xs"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="text-sm underline mt-4">Details</div>
    </motion.div>
  );
}

/* ================= MAIN ================= */
export function ProjectsHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, { once: true });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [paused, setPaused] = useState(false);
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All"
      ? projects
      : projects.filter(p => p.category === category);

  const shouldLoop = filtered.length >= 6;

  /* ---------- MOTION ENGINE ---------- */
  useEffect(() => {
    if (!trackRef.current || !inView) return;

    const track = trackRef.current;
    let x = 0;
    let dir = -1;
    let raf: number;

    const speed = shouldLoop ? 0.35 : 0.15;

    const animate = () => {
      if (!paused) {
        x += speed * dir;

        if (shouldLoop) {
          const half = track.scrollWidth / 2;
          if (Math.abs(x) >= half) x = 0;
        } else {
          if (x < -40 || x > 40) dir *= -1;
        }

        track.style.transform = `translateX(${x}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [paused, inView, category, shouldLoop]);

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-4">
          College & Personal Projects
        </h2>

        <p className="text-center text-sm opacity-70 mb-8">
          Academic and self-driven engineering projects
        </p>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full border text-sm ${
                category === c ? "bg-black text-white" : "bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* TRACK */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative w-full overflow-hidden"
      >
        <div
          ref={trackRef}
          className={`flex gap-6 will-change-transform ${
            filtered.length < 6 ? "justify-center" : ""
          }`}
        >
          {(shouldLoop ? [...filtered, ...filtered] : filtered).map((p, i) => (
            <ProjectCard
              key={`${p.title}-${i}`}
              project={p}
              index={i % filtered.length}
              onOpen={setActiveProject}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-xl mx-4 relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h3 className="text-3xl font-bold">{activeProject.title}</h3>
              <p className="mt-4 text-gray-600">{activeProject.long}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
