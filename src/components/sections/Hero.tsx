"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, ArrowDown } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  dict: any;
}

export function Hero({ dict }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* Background Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Intro */}
          <motion.div variants={itemVariants} className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div>
              <p className="text-cyan-400 font-medium tracking-wide uppercase text-sm mb-2">
                {dict.greeting}
              </p>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                {dict.name1} <br className="hidden lg:block" />
                {dict.name2}
              </h1>
            </div>
            <div className="w-16 h-1 bg-cyan-500 rounded-full" />
            <p className="text-white text-lg leading-relaxed max-w-md">
              {dict.left_desc}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a
                href="#projects"
                className="group flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
              >
                <span>{dict.cta_projects}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Middle Column: Visual (Portrait) */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2 flex justify-center relative">
            {/* Local Glow behind image */}
            <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-[80px] scale-90" />
            
            <div className="relative w-80 h-96 lg:w-[400px] lg:h-[500px]">
              <Image 
                src="/images/alex-portrait.png" 
                alt="Alex Anh Phan Portrait" 
                fill 
                className="object-contain object-bottom drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                priority
              />
            </div>
          </motion.div>

          {/* Right Column: Value Props */}
          <motion.div variants={itemVariants} className="order-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div>
              <p className="text-cyan-400 font-medium tracking-wide uppercase text-sm mb-2">
                {dict.right_subtitle}
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                <span className="text-cyan-400">{dict.right_title_hl}</span> <br className="hidden lg:block" />
                {dict.right_title_sub}
              </h2>
            </div>
            <div className="w-16 h-1 bg-cyan-500 rounded-full" />
            <p className="text-white text-lg leading-relaxed max-w-md">
              {dict.right_desc}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a
                href="#contact"
                className="group flex items-center gap-3 border border-white/20 hover:border-cyan-400/50 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-4 rounded-full transition-all cursor-pointer"
              >
                <div className="bg-cyan-500/20 p-2 rounded-full group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <span>{dict.cta_video}</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.2em] text-white uppercase">
          {dict.scroll_down}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-12 border border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-cyan-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
