import { motion, useInView } from "motion/react";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Electrical Engineering",
    skills: ["Power Electronics", "Control Systems", "PLC Programming", "Motor Control", "Circuit Design", "PCB Design"],
  },
  {
    title: "Product Development",
    skills: ["CAD Modeling", "BOM/BOQ/ECM", "Prototyping", "Quality Control", "Cost Optimization", "Manufacturing Coordination"],
  },
  {
    title: "Embedded Systems",
    skills: ["ESP32", "ATmega", "IoT Development", "Firmware Programming", "Sensor Integration", "Wireless Communication"],
  },
  {
    title: "Software & Tools",
    skills: ["SolidWorks", "AutoCAD", "KiCad", "ANSYS", "MATLAB", "DIALux", "Python", "C/C++"],
  },
  {
    title: "Professional Skills",
    skills: ["Client Handling", "Technical Documentation", "Vendor Coordination", "Project Management", "Team Leadership", "Problem Solving"],
  },
  {
    title: "Emerging Technologies",
    skills: ["AI/ML", "ROS2", "Automation", "ERP Systems", "Industry 4.0", "Robotics"],
  },
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const categoryVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8, rotateX: 15 },
    visible: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  return (
    <section id="skills" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-600">Multidisciplinary engineering capabilities</p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={categoryVariants}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 120 }}
              className="bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-colors shadow-md hover:shadow-xl transform-gpu perspective-1000"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill, i) => (
                  <motion.li
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={skillVariants}
                    transition={{ delay: 0.1 * i, duration: 0.4, type: "spring", stiffness: 120 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-1"></span>
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
