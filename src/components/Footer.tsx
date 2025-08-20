'use client';
import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-10 text-sm sm:grid-cols-2 lg:grid-cols-4"
        >
          <div>
            <h2 className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
              inextlabs
            </h2>
            <p className="text-muted-foreground mt-3">
              Empowering businesses with AI-driven insights, analytics and assistance.
            </p>
          </div>

          <div>
            <h3 className="text-foreground mb-3 font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="transition hover:text-purple-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers" className="transition hover:text-purple-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="/blog" className="transition hover:text-purple-400">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground mb-3 font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="transition hover:text-purple-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="transition hover:text-purple-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/support" className="transition hover:text-purple-400">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground mb-3 font-semibold">Contact</h3>
            <p className="text-muted-foreground">info@inextlabs.com</p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://twitter.com"
                className="text-muted-foreground transition hover:text-blue-400"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-muted-foreground transition hover:text-blue-500"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                className="text-muted-foreground transition hover:text-purple-400"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@inextlabs.com"
                className="text-muted-foreground transition hover:text-pink-400"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="my-8 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-xs sm:flex-row"
        >
          <p>© 2025 inextlabs — All Rights Reserved.</p>
          <p className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-semibold text-transparent">
            Built with ❤️ by Thoufeek
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
