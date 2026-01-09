"use client";

import { useEffect } from "react";

import { ScrollModel } from "./components/ScrollModel";
import { MouseFire } from "./components/MouseFire";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Stats } from "./components/Stats";
import { Experience } from "./components/Experience";
import { Internships } from "./components/Internship";  
import { TechStack } from "./components/TechStack";
import { Skills } from "./components/Skills";
import { ProjectsHorizontal as Projects } from "./components/Projects";
import { CompanyProjects } from "./components/CompanyProjects";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CookieConsent } from "./components/CookieConsent";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  /* ✅ FORCE START FROM HOME ON EVERY REFRESH */
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Always start at top
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <>
      {/* ================= 3D BACKGROUND ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ScrollModel />
      </div>

      {/* ================= GLOBAL FX ================= */}
      <MouseFire />
      <Preloader />

      {/* ================= UI LAYER ================= */}
      <div className="relative z-20 min-h-screen bg-transparent">
        <Navbar />

        <main>
          {/* HOME */}
          <section id="home">
            <Hero />
          </section>

          {/* ABOUT */}
          <section id="about">
            <About />
          </section>

          {/* STATS */}
          <section id="stats">
            <Stats />
          </section>

          {/* EXPERIENCE */}
          <section id="experience">
            <Experience />
          </section>

          {/*Internships*/}
          <section id="internship">
            <Internships/>
          </section>

          {/* TECH STACK */}
          <section id="tech">
            <TechStack />
          </section>

          {/* SKILLS */}
          <section id="skills">
            <Skills />
          </section>

          {/* PROJECTS */}
          <section id="projects">
            <Projects />
          </section>

          {/* COMPANY PROJECTS */}
          <section id="company-projects">
            <CompanyProjects />
          </section>

          {/* EDUCATION */}
          <section id="education">
            <Education />
          </section>

          {/* CONTACT */}
          <section id="contact">
            <Contact />
          </section>
        </main>

        <Footer />
        <CookieConsent />
        <ScrollToTop />
      </div>
    </>
  );
}
