"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Samee Industries Pvt. Ltd.",
    role: "Product Development Engineer",
    period: "July 2025 – Present",
    location: "Pune, India",
    roleType: "Full-Cycle Product Development",
    metrics: [
      { label: "Products Developed", value: "10+" },
      { label: "BOM Accuracy", value: "99%" },
      { label: "Vendors Managed", value: "12+" },
      { label: "Proto Cycles", value: "20+" },
    ],
    description: [
      "Client handling and requirement analysis for custom product development",
      "Creating detailed BOM, BOQ, and ECM documentation",
      "Prototype design, testing, and validation",
      "ISO quality control and manufacturing coordination",
      "ANSYS simulations and assembly manual preparation",
      "Production floor coordination and vendor management",
    ],
    deepDive: [
      "DFM & DFA optimization for scalable manufacturing",
      "Tolerance stack-up and fitment validation",
      "Pilot batch approval and vendor technical audits",
      "Engineering change management (ECM lifecycle)",
    ],
    tools: [
      { name: "SolidWorks", level: 95 },
      { name: "AutoCAD", level: 85 },
      { name: "ANSYS", level: 80 },
      { name: "MS Office", level: 90 },
    ],
  },
  {
    company: "Fevino Industries LLP",
    role: "New Product Development Engineer",
    period: "March 2024 – June 2025",
    location: "Pune, India",
    roleType: "Embedded + Mechanical Systems",
    achievement: "Gold Medal Employee Recognition",
    metrics: [
      { label: "Products Designed", value: "30+" },
      { label: "Cost Reduction", value: "18%" },
      { label: "Lighting Simulations", value: "100+" },
      { label: "Units Deployed", value: "5000+" },
    ],
    description: [
      "Designed 30+ lighting fixtures and solar structure systems",
      "LED PCB and controller circuit design for smart lighting",
      "DIALux lighting simulations and optimization",
      "Creating detailed BOM, BOQ, and ECM documentation",
      "Battery system integration and wire harness design",
      "ERP system management (Odoo) and vendor audits",
      "Product certifications and compliance documentation",
    ],
    deepDive: [
      "LED driver topology selection & efficiency tuning",
      "Battery chemistry selection and protection logic",
      "Lux-level optimization using DIALux EVO",
      "Pre-compliance checks for lighting standards",
    ],
    tools: [
      { name: "SolidWorks", level: 95 },
      { name: "KiCad", level: 85 },
      { name: "DIALux", level: 90 },
      { name: "Odoo", level: 75 },
      { name: "AutoCAD", level: 85 },
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const cardVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: i % 2 === 0 ? -80 : 80,
      scale: 0.95,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Experience
          </h2>
          <p className="text-xl text-gray-600">
            Building reliable, manufacturable, real-world products
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-16">
          {experiences.map((exp, index) => {
            const [open, setOpen] = useState(false);

            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  type: "spring",
                  stiffness: 120,
                }}
                whileHover={{
                  scale: 1.02,
                  rotateX: 2,
                  rotateY: -2,
                }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transform-gpu"
              >
                {/* Top */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
                  <div>
                    <span className="inline-block mb-3 px-4 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                      {exp.roleType}
                    </span>

                    <h3 className="text-2xl font-bold text-gray-900">
                      {exp.role}
                    </h3>
                    <p className="text-xl text-gray-700 mb-4">
                      {exp.company}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {exp.achievement && (
                    <span className="mt-4 md:mt-0 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                      🏆 {exp.achievement}
                    </span>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {exp.metrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {m.value}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <ul className="space-y-3 mb-6">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <span className="mt-1 text-gray-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Deep Dive */}
                <button
                  onClick={() => setOpen(!open)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {open ? "Hide engineering details" : "View engineering details"}
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-2 text-sm text-gray-600"
                    >
                      {exp.deepDive.map((d, i) => (
                        <p key={i}>• {d}</p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tools */}
                <div className="mt-8 space-y-3">
                  {exp.tools.map((tool, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>{tool.name}</span>
                        <span>{tool.level}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-200 rounded">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tool.level}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-1 bg-gray-900 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Narrative */}
        <p className="text-center text-gray-500 mt-24 max-w-2xl mx-auto text-sm">
          From concept design to manufacturing scale, my experience focuses on
          building cost-optimized, reliable, and production-ready engineering
          solutions.
        </p>
      </div>
    </section>
  );
}
