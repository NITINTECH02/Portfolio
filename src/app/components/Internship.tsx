"use client";

import { motion } from "motion/react";
import { Calendar } from "lucide-react";

const internships = [
  {
    role: "Embedded System Developer – Virtual Internship",
    org: "AICTE | N.E.A.T | EduSkills | Microchip Technology",
    period: "January 2024 – March 2024",
    about:
      "Microchip Technology is a global leader in microcontrollers, embedded control solutions, and secure IoT systems.",
    points: [
      "Designed and developed embedded system applications using Microchip microcontrollers",
      "Worked on hardware–software co-design integrating sensors and peripheral devices",
      "Developed firmware for real-time embedded systems with performance optimization",
      "Implemented communication interfaces and peripheral configurations",
      "Gained exposure to industrial embedded workflows and debugging techniques",
      "Optimized embedded applications for power efficiency and reliability",
      "Applied embedded systems concepts to real-world use cases",
    ],
    skills: [
      "Embedded C",
      "Microcontroller Programming",
      "Sensor Integration",
      "Firmware Development",
      "Real-Time Systems",
      "Debugging",
    ],
  },
  {
    role: "Intelligent Automation (RPA) – Virtual Internship",
    org: "AICTE | EduSkills | SS&C Blue Prism",
    period: "September 2023 – November 2023",
    about:
      "Cohort-based virtual internship focused on SS&C Blue Prism Intelligent Automation platform.",
    points: [
      "Completed cohort-based training on Blue Prism RPA platform",
      "Designed and implemented rule-based automated workflows",
      "Learned full RPA lifecycle from analysis to deployment",
      "Worked on exception handling and control flow",
      "Explored enterprise-grade intelligent automation frameworks",
      "Applied automation to real-world business use cases",
    ],
    skills: [
      "RPA",
      "SS&C Blue Prism",
      "Workflow Automation",
      "Process Optimization",
      "Business Process Analysis",
    ],
  },
  {
    role: "Embedded Systems, IoT & Robotics – Virtual Internship",
    org: "Skolar",
    period: "May 2023 – July 2023",
    about:
      "Skolar is a skill development platform focused on industry-ready technical training.",
    points: [
      "Worked with Arduino, ESP8266, and servo motors",
      "Developed IoT-based projects with sensor integration",
      "Implemented wireless communication for IoT systems",
      "Performed virtual simulations using Tinkercad",
      "Designed basic robotics control systems",
      "Strengthened understanding of embedded and IoT workflows",
    ],
    skills: [
      "Arduino",
      "ESP8266",
      "IoT Systems",
      "Sensors",
      "Robotics Basics",
      "Embedded Programming",
    ],
  },
  {
    role: "AI & Machine Learning – Virtual Internship",
    org: "AICTE | N.E.A.T | MathWorks",
    period: "May 2023 – September 2023",
    about:
      "MathWorks develops MATLAB & Simulink, widely used for AI, ML, and engineering simulations.",
    points: [
      "Completed 'Get Started with AI' certification program",
      "Built and trained machine learning models using MATLAB",
      "Learned data preprocessing, feature extraction, and evaluation",
      "Applied AI concepts to engineering and analytical problems",
      "Explored deep learning fundamentals and simulation workflows",
    ],
    skills: [
      "MATLAB",
      "Machine Learning",
      "Data Preprocessing",
      "AI Modeling",
      "Simulation-Based Learning",
    ],
  },
  {
    role: "Electrical Engineering Internship (Transformer Manufacturing)",
    org: "Shri Datta Electrical Engineers & Contractors – Jaysingpur, India",
    period: "December 2022 (15 Days)",
    about:
      "Company specializes in distribution and furnace transformer manufacturing up to 125 kVA.",
    points: [
      "Assisted in maintenance and testing of 20+ distribution transformers",
      "Participated in assembly and manufacturing processes",
      "Supported testing procedures for electrical safety compliance",
      "Gained hands-on exposure to transformer core, winding, insulation, and testing",
      "Assisted assembly of 5+ transformers within deadlines",
    ],
    skills: [
      "Transformer Testing",
      "Electrical Maintenance",
      "Manufacturing Processes",
      "Quality Compliance",
      "Power Equipment Handling",
    ],
  },
];

export function Internships() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-5xl md:text-6xl font-bold text-center mb-24"
        >
          Internships
        </motion.h2>

        {/* Cards */}
        <div className="space-y-24 [perspective:1400px]">
          {internships.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -520 : 520,
                rotateY: index % 2 === 0 ? -60 : 60,
                z: -250,
                scale: 0.82,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                rotateY: 0,
                z: 0,
                scale: 1,
              }}
              transition={{
                duration: 1.25,
                ease: [0.22, 1, 0.36, 1], // cinematic easing
              }}
              viewport={{ once: false, amount: 0.25 }}
              whileHover={{
                scale: 1.04,
                rotateX: 3,
                rotateY: index % 2 === 0 ? 3 : -3,
              }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transform-gpu"
            >
              {/* Top */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {item.role}
              </h3>
              <p className="text-lg text-gray-700 mb-2">{item.org}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                <Calendar size={16} />
                {item.period}
              </div>

              {/* About */}
              <p className="text-gray-600 mb-6">{item.about}</p>

              {/* Points */}
              <ul className="space-y-3 text-gray-600 mb-8">
                {item.points.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gray-400 mt-1">•</span>
                    {p}
                  </li>
                ))}
              </ul>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Narrative */}
        <p className="text-center text-gray-500 text-sm mt-28 max-w-2xl mx-auto">
          These internships built a strong foundation across embedded systems,
          intelligent automation, AI, and core electrical engineering through
          real-world, application-driven learning.
        </p>
      </div>
    </section>
  );
}
