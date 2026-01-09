"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ================= TERMS CONTENT ================= */
function TermsContent() {
  return (
    <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
      <p>
        This website is a personal portfolio created to showcase professional
        projects, skills, and experience.
      </p>

      <p>
        All information is provided for informational purposes only. Project
        descriptions and visuals are shared at a high level and do not disclose
        confidential or proprietary information.
      </p>

      <p>
        Cookies are used only to improve basic user experience and website
        functionality. No personal data is sold, shared, or tracked for
        advertising purposes.
      </p>

      <p>
        By using this website, you agree that the site owner is not responsible
        for how the information presented is interpreted or used.
      </p>

      <p className="font-medium">
        If you do not agree with these terms, please discontinue use of this
        website.
      </p>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  /* CHECK CONSENT */
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <>
      {/* ================= COOKIE BANNER ================= */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl bg-white shadow-2xl rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <p className="text-sm text-gray-700 flex-1">
                This website uses cookies to enhance basic functionality and
                user experience. By continuing, you agree to our terms.
              </p>

              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={() => setShowTerms(true)}
                  className="px-4 py-2 text-sm underline text-gray-700"
                >
                  Terms
                </button>

                <button
                  onClick={declineCookies}
                  className="px-4 py-2 text-sm border rounded-lg"
                >
                  Decline
                </button>

                <button
                  onClick={acceptCookies}
                  className="px-4 py-2 text-sm bg-black text-white rounded-lg"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TERMS MODAL ================= */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTerms(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-xl w-full mx-4 relative"
            >
              <button
                onClick={() => setShowTerms(false)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h3 className="text-2xl font-bold mb-4">
                Terms & Conditions
              </h3>

              <TermsContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
