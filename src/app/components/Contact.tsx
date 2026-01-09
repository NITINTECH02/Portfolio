"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export function Contact() {
  /* ---------------- REFS ---------------- */
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  /* ---------------- VIEW ANIMATION ---------------- */
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  /* ---------------- STATE ---------------- */
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- EMAILJS INIT ---------------- */
  useEffect(() => {
    emailjs.init("J0Nrs5A-PYokL8jpS");
  }, []);

  /* ---------------- FOCUS AFTER SUCCESS ---------------- */
  useEffect(() => {
    if (submitted) {
      closeBtnRef.current?.focus();
    }
  }, [submitted]);

  /* ---------------- SUBMIT HANDLER ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formRef.current) {
      setError("Form not found. Please refresh.");
      setLoading(false);
      return;
    }

    try {
      await emailjs.sendForm(
        "service_ab12cd3",   // SERVICE ID
        "template_j1w3kyr",  // MAIN TEMPLATE (auto-reply is LINKED)
        formRef.current,
        "J0Nrs5A-PYokL8jpS"  // PUBLIC KEY
      );

      setSubmitted(true);
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 bg-gray-50 relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ---------------- HEADER ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Let’s Connect
          </h2>
          <p className="text-xl text-gray-600">
            Ready to build something impactful together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ---------------- LEFT INFO ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=nitindudhane321@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-md"
            >
              <Mail />
              <span>nitindudhane321@gmail.com</span>
              <ExternalLink size={16} />
            </a>


            <a
              href="https://linkedin.com/in/nitindudhane2002"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-md"
            >
              <Linkedin />
              <span>LinkedIn</span>
              <ExternalLink />
            </a>

            <a
              href="https://github.com/TechCir2002"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-md"
            >
              <Github />
              <span>GitHub</span>
              <ExternalLink />
            </a>
          </motion.div>

          {/* ---------------- FORM ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* IMPORTANT: name attributes MUST MATCH TEMPLATE */}
              <input
                name="name"
                required
                placeholder="Name"
                className="w-full border p-3 rounded"
              />

              <input
                name="email"
                required
                type="email"
                placeholder="Email"
                className="w-full border p-3 rounded"
              />

              <input
                name="company"
                placeholder="Company"
                className="w-full border p-3 rounded"
              />

              <input
                name="subject"
                placeholder="Subject"
                className="w-full border p-3 rounded"
              />

              <textarea
                name="message"
                required
                rows={4}
                placeholder="Message"
                className="w-full border p-3 rounded"
              />

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Inquiry
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ---------------- SUCCESS POPUP ---------------- */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              className="bg-white p-8 rounded-xl text-center"
            >
              <CheckCircle
                className="mx-auto mb-4 text-green-600"
                size={48}
              />
              <p className="text-lg font-medium">
                Message sent successfully!
              </p>
              <p className="text-sm text-gray-600 mt-2">
                You will receive a confirmation email shortly.
              </p>

              <button
                ref={closeBtnRef}
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2 bg-black text-white rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
