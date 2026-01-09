"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [stage, setStage] = useState<"idle" | "expand" | "done">("idle");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setStage("expand"), 1800); // faster
    const t2 = setTimeout(() => {
      setStage("done");
      document.body.style.overflow = "auto";
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
        >
          {/* CONTAINER */}
          <motion.div
            animate={stage === "expand" ? { scale: 28 } : { scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative flex flex-col items-center"
          >
            {/* FACE */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "linear",
              }}
              className="w-28 h-28 rounded-full border-4 border-gray-300 border-t-gray-900 bg-white flex items-center justify-center relative"
            >
              {/* LEFT EYE */}
              <motion.div
                className="absolute left-1/2 -translate-x-7 top-9 w-2 h-2 bg-black rounded-full"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{
                  duration: 0.25,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />

              {/* RIGHT EYE */}
              <motion.div
                className="absolute left-1/2 translate-x-5 top-9 w-2 h-2 bg-black rounded-full"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{
                  duration: 0.25,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />

              {/* SMILE */}
              <div className="absolute bottom-8 w-8 h-2 border-b-2 border-black rounded-full" />
            </motion.div>

            {/* TEXT BELOW FACE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-sm font-semibold text-gray-900 tracking-wide"
            >
              <LoadingText />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Animated dots component */
function LoadingText() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return <span>NPD{dots} (Loading)</span>;
}
