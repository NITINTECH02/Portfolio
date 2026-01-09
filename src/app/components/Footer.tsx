import { motion } from 'motion/react';
import { Linkedin, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Nitin Prakash Dudhane</h3>
            <p className="text-gray-400">Electrical Engineer | Product Development</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="mailto:nitindudhane321@gmail.com"
              className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <Mail size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/nitindudhane2002"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="https://github.com/TechCir2002"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {currentYear} Nitin Prakash Dudhane. All rights reserved.</p>
          <p className="mt-2">Pune, India</p>
        </div>
      </div>
    </footer>
  );
}
