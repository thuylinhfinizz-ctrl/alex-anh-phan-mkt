"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  dict: any;
  lang: string;
}

export function Navbar({ dict, lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "vi" : "en";
    const newPath = pathname.replace(`/${lang}`, `/${nextLang}`);
    router.push(newPath);
  };

  const navLinks = [
    { name: dict.home || "Home", href: "#home" },
    { name: dict.experiences || dict.about || "Experiences", href: "#experiences" },
    { name: dict.projects || "Projects", href: "#projects" },
    { name: dict.skills || dict.services || "Skills", href: "#skills" },
    { name: dict.testimonials || "Testimonials", href: "#testimonials" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="text-cyan-400 font-bold text-2xl tracking-tighter">AP</span>
            <span className="text-white font-medium text-lg hidden sm:block">Alex Anh Phan</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-cyan-400 transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors text-sm font-medium px-2 py-1 rounded-md"
            >
              <Globe className="w-4 h-4" />
              <span>{lang.toUpperCase()}</span>
            </button>
            <Link
              href="#contact"
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] text-sm"
            >
              {dict.contact}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-cyan-400 p-2"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-cyan-400 hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-5 py-3 rounded-full transition-all"
              >
                {dict.contact}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
