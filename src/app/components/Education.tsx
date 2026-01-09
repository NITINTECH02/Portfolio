"use client";

import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useState } from "react";
import { GraduationCap, Award, Wrench, X } from "lucide-react";

/* ---------------- DATA ---------------- */

const education = [
  {
    degree: "B.Tech in Electrical Engineering",
    institution: "DKTE's Society's Textile and Engineering Institute",
    period: "2020 – 2024",
    grade: "CGPA: 7.02",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Science Stream",
    period: "2018 – 2020",
    grade: "67.54%",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Board Examination",
    period: "2018",
    grade: "80.80%",
  },
];

const certifications = [
  {
    name: "SolidWorks – Eduonix",
    link: "https://example.com/solidworks",
  },
  {
    name: "Embedded Systems, IoT & Robotics – Skolar",
    link: "https://example.com/skolar",
  },
  {
    name: "Scientific Computing with Python – freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/your-id",
  },
  {
    name: "Networking Basics (NSDC_001) – Cisco Networking Academy",
  },
  {
    name: "Computer Hardware Essentials – Cisco Networking Academy",
  },
  {
    name: "Python with Advanced AI (2024) – GUVI",
    link: "https://example.com/guvi",
  },
  {
    name: "ROS2 for Beginners (Jazzy) - Udemy",
  },
  {
    name: "Electric Vehicle Battery Management System – Skill-Lync",
    link: "https://example.com/skilllync",
  },
];

const workshops = [
  "Product Management Workshop – Jobaaj Learning (Oct 2024)",
  "Solid-State Battery Design & Simulation Workshop – Skyy Skill Academy",
  "Power Python Workshop – Ludifu (Sep 2022)",
  "Solid-State Battery Design Workshop – Skyy Skill Academy",
];

/* -------------- COMPONENT ------------- */

export function Education() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [activeCert, setActiveCert] = useState<string | null>(null);

  return (
    <section id="education" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Education & Certifications
          </h2>
          <p className="text-xl text-gray-600">
            Academic foundation, certified skills, and continuous learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={32} />
              <h3 className="text-3xl font-bold text-gray-900">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {edu.degree}
                  </h4>
                  <p className="text-gray-700 mb-2">{edu.institution}</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{edu.period}</span>
                    <span className="font-medium">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications & Workshops */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Award size={28} />
                <h3 className="text-3xl font-bold text-gray-900">
                  Certifications
                </h3>
              </div>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2" />

                    <span className="flex items-center gap-2">
                      {cert.name}

                      {cert.link && (
                        <button
                          onClick={() => setActiveCert(cert.link)}
                          className="text-sm underline text-gray-900 hover:text-black"
                        >
                          View
                        </button>
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Workshops */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Wrench size={26} />
                <h3 className="text-2xl font-bold text-gray-900">
                  Workshops & Training
                </h3>
              </div>

              <div className="space-y-3">
                {workshops.map((workshop, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
                    <span>{workshop}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-10"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Achievements & Recognition
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-lg font-semibold">Gold Medal Employee</p>
              <p className="text-sm text-gray-600">Fevino Industries LLP</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-lg font-semibold">20+ Competitions</p>
              <p className="text-sm text-gray-600">National Level Events</p>
            </div>
            <div>
              <div className="text-4xl mb-2">👥</div>
              <p className="text-lg font-semibold">Event Coordinator</p>
              <p className="text-sm text-gray-600">
                Technical & Cultural Events
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CERTIFICATE MODAL */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4 relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 text-gray-700"
              >
                <X />
              </button>

              <iframe
                src={activeCert}
                className="w-full h-[500px] rounded-lg border"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
