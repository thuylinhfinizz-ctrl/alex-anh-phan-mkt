"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface SkillsProps {
  dict: any;
}

export function Skills({ dict }: SkillsProps) {
  const [activeGroupId, setActiveGroupId] = useState(dict.groups[0].id);

  const activeGroup = dict.groups.find((g: any) => g.id === activeGroupId);
  const activeIndex = dict.groups.findIndex((g: any) => g.id === activeGroupId);

  return (
    <section id="skills" className="py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-xs font-semibold tracking-widest text-cyan-600 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            {dict.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            {dict.title_hl} <span className="text-cyan-500">{dict.title_sub}</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            {dict.desc}
          </p>
        </div>

        {/* 2-Column Master-Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (5/12): Skill Groups Accordion */}
          <div className="lg:col-span-5 space-y-4">
            {dict.groups.map((group: any, idx: number) => {
              const isActive = activeGroupId === group.id;
              
              return (
                <div 
                  key={group.id}
                  onClick={() => setActiveGroupId(group.id)}
                  className={`cursor-pointer border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isActive 
                      ? "bg-slate-50 border-cyan-200 shadow-sm shadow-cyan-500/10 ring-1 ring-cyan-100" 
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {/* Group Header */}
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`text-xl font-black ${isActive ? "text-cyan-200" : "text-slate-200"}`}>
                        0{idx + 1}
                      </span>
                      <h3 className={`font-bold text-lg transition-colors ${isActive ? "text-cyan-700" : "text-slate-800"}`}>
                        {group.name}
                      </h3>
                    </div>
                  </div>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-slate-600 text-sm mb-4">
                            {group.short_desc}
                          </p>
                           <div className="flex flex-wrap gap-2">
                            {(group.tools || []).map((tool: any, i: number) => {
                              const toolName = typeof tool === "string" ? tool : (tool.name || "");
                              return (
                                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-600">
                                  {toolName}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column (7/12): Detail Pane */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-8 lg:p-10 h-full flex flex-col"
              >
                {/* Header */}
                <div className="relative mb-8">
                  <div className="text-7xl lg:text-9xl font-black text-cyan-50 absolute -top-6 -right-4 -z-10 select-none pointer-events-none">
                    0{activeIndex + 1}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{activeGroup.name}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                    {activeGroup.core_desc}
                  </p>
                </div>

                {/* What I Do */}
                <div className="mb-10">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">What I Do</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {activeGroup.what_i_do.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools & Technologies */}
                <div className="border-t border-slate-200 pt-8 mt-auto">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Tools & Technologies</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {(activeGroup.tools || []).map((tool: any, i: number) => {
                      const toolName = typeof tool === "string" ? tool : (tool.name || "");
                      const toolLogo = typeof tool === "string" ? "" : (tool.logo || "");
                      return (
                        <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                          {toolLogo ? (
                            <div className="w-6 h-6 relative shrink-0">
                              <Image 
                                src={toolLogo} 
                                alt={toolName} 
                                fill 
                                className="object-contain" 
                              />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-400 text-[10px] shrink-0 uppercase">
                              {toolName ? toolName.charAt(0) : "T"}
                            </div>
                          )}
                          <span className="text-sm font-semibold text-slate-700 truncate">{toolName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
