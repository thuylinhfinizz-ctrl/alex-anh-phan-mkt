"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, GraduationCap, Building2, Cpu, Download, ArrowRight, X, Target, Zap, ExternalLink } from "lucide-react";

interface ExperienceProps {
  dict: any;
}

export function Experiences({ dict }: ExperienceProps) {
  const [activeCompany, setActiveCompany] = useState(dict.companies[0].id);

  const activeData = dict.companies.find((c: any) => c.id === activeCompany);

  return (
    <section id="experiences" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold tracking-widest text-slate-500 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            {dict.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {dict.title_hl} <span className="text-cyan-500">{dict.title_sub}</span>
          </h2>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column (3/12): Intro & Stats */}
          <div className="lg:col-span-3 space-y-8">
            <p className="text-slate-600 leading-relaxed">
              {dict.left_desc}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {dict.stats.map((stat: any, idx: number) => {
                const Icons = [Trophy, GraduationCap, Building2, Cpu];
                const Icon = Icons[idx % Icons.length];
                return (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2 hover:border-cyan-200 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-500" />
                    <div>
                      <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full group flex items-center justify-between bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-700 font-semibold px-6 py-4 rounded-2xl transition-all">
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                {dict.download_cv}
              </span>
              <div className="bg-cyan-500 text-white p-1.5 rounded-full group-hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            {/* Signature Placeholder */}
            <div className="pt-4 opacity-50">
              <p className="font-serif text-3xl italic text-slate-800">Alex Anh Phan</p>
            </div>
          </div>

          {/* Middle Column (4/12): Timeline */}
          <div className="lg:col-span-4 relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-200 hidden lg:block" />

            <div className="space-y-4">
              {dict.companies.map((company: any) => {
                const isActive = activeCompany === company.id;
                return (
                  <button
                    key={company.id}
                    onClick={() => setActiveCompany(company.id)}
                    className={`w-full text-left relative pl-14 pr-6 py-6 rounded-2xl transition-all border ${isActive
                        ? "bg-white border-cyan-200 shadow-[0_8px_30px_rgba(6,182,212,0.12)]"
                        : "bg-slate-50 border-transparent hover:bg-slate-100 hover:border-slate-200"
                      }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center hidden lg:flex">
                      <div className={`w-3 h-3 rounded-full z-10 transition-colors ${isActive ? "bg-cyan-500 ring-4 ring-cyan-100" : "bg-slate-300"}`} />
                    </div>

                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-bold text-lg ${isActive ? "text-cyan-600" : "text-slate-900"}`}>
                        {company.role}
                      </h3>
                      {isActive && <ArrowRight className="w-5 h-5 text-cyan-500 hidden lg:block" />}
                    </div>
                    <p className="text-slate-600 font-medium mb-1">{company.name}</p>
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-cyan-500 hover:text-cyan-600 hover:underline mb-3 block w-fit"
                      >
                        {company.website.replace('https://', '')}
                      </a>
                    )}
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${isActive ? "bg-cyan-50 text-cyan-700" : "bg-slate-200 text-slate-600"
                      }`}>
                      {company.period}
                    </span>

                    {/* Mobile Detail Expand */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="lg:hidden mt-6 pt-6 border-t border-slate-100 overflow-hidden"
                        >
                          <MobileDetail company={activeData} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (5/12): Desktop Detail Pane */}
          <div className="hidden lg:block lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCompany}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-8 h-full shadow-sm"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{activeData.role}</h3>
                    <div className="flex flex-col">
                      <p className="text-slate-700 font-medium text-lg">{activeData.name}</p>
                      {activeData.website && (
                        <a
                          href={activeData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-500 hover:text-cyan-600 hover:underline mt-1"
                        >
                          <ExternalLink className="w-4 h-4" /> {activeData.website.replace('https://', '')}
                        </a>
                      )}
                    </div>
                  </div>
                  {/* Company Logo */}
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm shrink-0 overflow-hidden p-1.5">
                    {activeData.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={activeData.logo}
                        alt={activeData.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <span
                      className="text-cyan-500 font-bold text-sm w-full h-full items-center justify-center"
                      style={{ display: activeData.logo ? "none" : "flex" }}
                    >
                      {activeData.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-cyan-500" />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-3">
                      {activeData.responsibilities.map((req: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Key Achievements
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {activeData.achievements.map((ach: any, i: number) => (
                        <div key={i} className={`p-4 rounded-xl border ${i === 0 ? "bg-cyan-50 border-cyan-100" : "bg-emerald-50 border-emerald-100"}`}>
                          <div className={`text-2xl font-bold mb-1 ${i === 0 ? "text-cyan-700" : "text-emerald-700"}`}>{ach.value}</div>
                          <div className={`text-xs font-medium ${i === 0 ? "text-cyan-600" : "text-emerald-600"}`}>{ach.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {activeData.skills.map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Marquee Bottom */}
      <div className="mt-24 border-t border-slate-200 bg-slate-50 py-8 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">{dict.marquee}</p>
        </div>
        <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-16 px-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Dynamic Logos from dict.companies */}
          {(() => {
            const marqueeItems = dict.companies || [];
            const repeats = Math.max(2, Math.ceil(10 / (marqueeItems.length || 1)));
            const repeatedItems = Array.from({ length: repeats }).flatMap(() => marqueeItems);

            return (
              <>
                {repeatedItems.map((company: any, idx: number) => (
                  <div key={`${company.id}-${idx}`} className="flex items-center shrink-0">
                    {company.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-8 max-w-[140px] object-contain"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "block";
                        }}
                      />
                    ) : null}
                    <span
                      className="text-2xl font-black text-slate-400 whitespace-nowrap"
                      style={{ display: company.logo ? "none" : "block" }}
                    >
                      {company.name}
                    </span>
                  </div>
                ))}
                {/* Duplicate for infinite effect */}
                {repeatedItems.map((company: any, idx: number) => (
                  <div key={`dup-${company.id}-${idx}`} className="flex items-center shrink-0">
                    {company.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-8 max-w-[140px] object-contain"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "block";
                        }}
                      />
                    ) : null}
                    <span
                      className="text-2xl font-black text-slate-400 whitespace-nowrap"
                      style={{ display: company.logo ? "none" : "block" }}
                    >
                      {company.name}
                    </span>
                  </div>
                ))}
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

function MobileDetail({ company }: { company: any }) {
  return (
    <div className="space-y-6 text-left">
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex justify-between items-center">
          Key Responsibilities
          {company.website && (
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-cyan-600 flex items-center gap-1 normal-case font-medium">
              Visit Site <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </h4>
        <ul className="space-y-2">
          {company.responsibilities.map((req: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="w-1 h-1 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {company.achievements.map((ach: any, i: number) => (
          <div key={i} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <div className="text-lg font-bold text-cyan-600">{ach.value}</div>
            <div className="text-[10px] uppercase font-bold text-slate-500">{ach.label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {company.skills.map((skill: string, i: number) => (
          <span key={i} className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-medium text-slate-600">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
