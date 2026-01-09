"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";
import { useRef } from "react";

/* ---------------- DATA ---------------- */

const companyProjects = [
  {
    company: "Samee Industries Pvt. Ltd.",
    role: "Product Development / Mechanical Design Engineer",
    projects: [
      {
        title: "Industrial Pallet Design",
        description:
          "Designed heavy-duty industrial pallets based on customer-specific load requirements, including CAD modeling, fabrication drawings, and BOM preparation.",
        domain: "Manufacturing",
      },
      {
        title: "SPM (Special Purpose Machine) – Mechanical Design",
        description:
          "Performed mechanical design and detailing for industrial SPM applications with focus on manufacturability and assembly feasibility.",
        domain: "Automation",
      },
      {
        title: "Architectural Decorative Structures",
        description:
          "Developed outdoor architectural decorative product designs balancing structural strength, durability, and aesthetics.",
        domain: "Design Engineering",
      },
      {
        title: "Decorative Pole Design",
        description:
          "Designed customized decorative poles considering wind loads, installation conditions, and outdoor performance requirements.",
        domain: "Structural Design",
      },
      {
        title: "Solar Structure Design",
        description:
          "Designed solar mounting structures for power plants, street lights, and high-mast lighting systems.",
        domain: "Renewable Energy",
      },
      {
        title: "Customer-Specific Product Development",
        description:
          "Executed concept-to-prototype development of customized products based on client requirements.",
        domain: "Product Engineering",
      },
      {
        title: "Control Panel (Sheet Metal) Design",
        description:
          "Designed sheet metal enclosures and layouts for industrial electrical control panels.",
        domain: "Electrical Enclosures",
      },
      {
        title: "Metal Sheet Enclosure Design",
        description:
          "Developed customized sheet metal enclosures for electrical and industrial applications.",
        domain: "Sheet Metal",
      },
      {
        title: "Fixture Design (30+ Fixtures)",
        description:
          "Designed manufacturing, assembly, and testing fixtures to improve production accuracy and repeatability.",
        domain: "Manufacturing Support",
      },
    ],
  },
  {
    company: "Fevino Industries LLP",
    role: "New Product Development Engineer",
    projects: [
      {
        title: "Solar Square Tube Decorative Pole",
        description:
          "Designed solar-integrated square tube decorative poles for outdoor lighting applications.",
        domain: "Product Development",
      },
      {
        title: "Solar Bench",
        description:
          "Developed solar-powered bench designs with integrated lighting and mobile charging features.",
        domain: "Product Development",
      },
      {
        title: "Solar High Mast (SHM) System",
        description:
          "Designed structural and civil foundations for solar high-mast lighting systems.",
        domain: "Structural Engineering",
      },
      {
        title: "Solar Street Light System",
        description:
          "Designed complete solar street lighting systems with illumination optimization using DIALux.",
        domain: "Product Design",
      },
      {
        title: "Decorative Lighting Arm",
        description:
          "Developed new decorative lighting arm designs for outdoor lighting infrastructure.",
        domain: "Product Design",
      },
      {
        title: "Customer-Specific New Product Development",
        description:
          "Executed new product design and development based on market needs and customer requirements.",
        domain: "Product Development",
      },
      {
        title: "Controller Design",
        description:
          "Designed lighting controllers and prepared technical documentation for integration.",
        domain: "Embedded Systems",
      },
      {
        title: "LED PCB Design",
        description:
          "Designed LED PCBs including schematic development and Gerber file generation.",
        domain: "Electronics Design",
      },
      {
        title: "Lithium Battery Pack Design",
        description:
          "Designed Lithium-Ion and LiFePO₄ battery packs with manufacturing documentation support.",
        domain: "Energy Storage",
      },
    ],
  },
];

/* -------------- COMPONENT ------------- */

export function CompanyProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, y }}
      className="py-32 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Company Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selected professional projects executed in industrial and
            manufacturing environments. Detailed drawings and client-specific
            data are omitted due to confidentiality.
          </p>
        </motion.div>

        {/* Company Blocks */}
        <div className="space-y-24">
          {companyProjects.map((company, cIndex) => (
            <div key={cIndex}>
              {/* Company Header */}
              <div className="mb-10">
                <h3 className="text-3xl font-bold text-gray-900">
                  {company.company}
                </h3>
                <p className="text-gray-600 mt-1">{company.role}</p>
              </div>

              {/* Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {company.projects.map((project, pIndex) => (
                  <motion.div
                    key={pIndex}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: pIndex * 0.05 }}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                  >
                    <span className="text-xs font-semibold uppercase text-gray-500">
                      {project.domain}
                    </span>

                    <h4 className="text-lg font-bold text-gray-900 mt-2 mb-2">
                      {project.title}
                    </h4>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
