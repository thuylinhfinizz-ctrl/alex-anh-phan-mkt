"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MessageSquare, ExternalLink } from "lucide-react";

interface ContactPopupProps {
  lang: string;
}

export function ContactPopup({ lang }: ContactPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check hash on mount
    if (window.location.hash === "#contact") {
      setIsOpen(true);
    }

    // Global click handler to capture any links ending in #contact
    const handleGlobalClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        if (target.tagName === "A") {
          const href = target.getAttribute("href");
          if (href === "#contact" || href?.endsWith("#contact")) {
            e.preventDefault(); // Stop default scroll/jump/route
            setIsOpen(true);
            return;
          }
        }
        target = target.parentElement;
      }
    };

    // Listen to hash change events as a fallback
    const handleHashChange = () => {
      if (window.location.hash === "#contact") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    // Remove hash without reloading
    if (window.location.hash === "#contact") {
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  const isVi = lang === "vi";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 p-8 text-white"
          >
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center text-center">
              {/* Header Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl mb-6 shadow-lg shadow-cyan-500/20">
                💬
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {isVi ? "Liên hệ với tôi" : "Contact Me"}
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                {isVi ? "Hãy kết nối để thảo luận về dự án của bạn." : "Let's connect to discuss your project."}
              </p>

              {/* Info Block */}
              <div className="w-full bg-slate-950/50 border border-slate-800/80 rounded-2xl p-6 mb-6 flex flex-col gap-4 text-left">
                {/* Name */}
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold mb-0.5">
                    {isVi ? "Họ & Tên" : "Full Name"}
                  </span>
                  <span className="text-lg font-bold text-white block">Alex Anh Phan</span>
                </div>

                {/* Phone & Zalo */}
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold mb-0.5">
                      {isVi ? "Số điện thoại & Zalo" : "Phone & Zalo"}
                    </span>
                    <a
                      href="tel:0909922603"
                      className="text-base font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-4 h-4 text-cyan-500" />
                      0909 922 603
                    </a>
                  </div>
                  <a
                    href="https://zalo.me/0909922603"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>Zalo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Email */}
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold mb-0.5">
                    Email
                  </span>
                  <a
                    href="mailto:alexanhphanmkt@gmail.com"
                    className="text-base font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 break-all"
                  >
                    <Mail className="w-4 h-4 text-cyan-500" />
                    alexanhphanmkt@gmail.com
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-2.5">
                <a
                  href="https://zalo.me/0909922603"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-cyan-500/10"
                >
                  <MessageSquare className="w-5 h-5 fill-black" />
                  {isVi ? "Nhắn tin Zalo trực tiếp" : "Message on Zalo"}
                </a>
                <button
                  onClick={closePopup}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-xl transition-colors text-sm"
                >
                  {isVi ? "Đóng lại" : "Close"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
