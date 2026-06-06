"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Users, LineChart, Trophy, ArrowRight, Grid, X } from "lucide-react";

interface ProjectsProps {
  dict: any;
}

export function Projects({ dict }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState(dict.filters[0]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Lọc dự án dựa theo tab
  const filteredProjects = activeFilter === dict.filters[0] 
    ? dict.items 
    : dict.items.filter((p: any) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-white text-slate-900">
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

        {/* Top Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {dict.top_stats.map((stat: any, idx: number) => {
            const Icons = [Rocket, Users, LineChart, Trophy];
            const Icon = Icons[idx % Icons.length];
            return (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-center hover:border-cyan-200 hover:bg-white hover:shadow-lg hover:shadow-cyan-500/5 transition-all">
                <Icon className="w-6 h-6 text-cyan-500 mx-auto mb-3" strokeWidth={1.5} />
                <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar justify-start lg:justify-center gap-2">
          {dict.filters.map((filter: string, idx: number) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={idx}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  isActive 
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20" 
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project: any) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/10 transition-all cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-200 group-hover:scale-105 transition-transform duration-500" />
                  )}
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-slate-700 uppercase shadow-sm">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 flex-1 whitespace-pre-line">
                    {project.short_desc || project.desc}
                  </p>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-200/60 mb-4">
                    {project.metrics.map((metric: any, i: number) => (
                      <div key={i} className="text-center">
                        <div className="text-sm font-bold text-slate-900">{metric.value}</div>
                        <div className="text-[9px] uppercase font-bold text-slate-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center gap-2 text-cyan-600 font-semibold text-sm">
                    {project.link_text} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Action */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-cyan-500 bg-white hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 font-bold px-8 py-4 rounded-full transition-all">
            <Grid className="w-5 h-5" />
            {dict.show_more}
          </button>
          <p className="text-sm text-slate-400 mt-4">{dict.more_desc}</p>
        </div>

      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="overflow-y-auto hide-scrollbar">
                {/* Modal Header / Image */}
                <div className="h-64 sm:h-80 bg-slate-200 relative overflow-hidden">
                  {selectedProject.image ? (
                    <Image 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 to-slate-800" />
                  )}
                  
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 pr-6 z-10">
                    <span className="inline-block px-3 py-1 mb-3 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider text-white uppercase border border-white/30">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left: Description */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">About The Project</h3>
                        <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">
                          {selectedProject.long_desc || selectedProject.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right: Metrics & Details */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Impact & Results</h3>
                        <div className="space-y-4">
                          {selectedProject.metrics.map((metric: any, i: number) => (
                            <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <span className="text-xs font-bold text-slate-500 uppercase">{metric.label}</span>
                              <span className="text-lg font-bold text-cyan-600">{metric.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
                        Visit Live Project <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
