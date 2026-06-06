import { Quote, Star } from "lucide-react";
import Image from "next/image";

interface TestimonialsProps {
  dict: any;
}

export function Testimonials({ dict }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-black to-slate-900 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-xs font-semibold tracking-widest text-cyan-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            {dict.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {dict.title_hl} <span className="text-cyan-500">{dict.title_sub}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {dict.desc}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dict.items.map((item: any, idx: number) => (
            <div 
              key={idx} 
              className="flex flex-col h-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-colors group"
            >
              <div className="relative w-full aspect-[4/5] bg-slate-800/50 shrink-0 overflow-hidden">
                {item.avatar ? (
                  <Image 
                    src={item.avatar.startsWith("/") || item.avatar.startsWith("http") ? item.avatar : `/${item.avatar}`} 
                    alt={item.author} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white/5">
                    {item.author.charAt(0)}
                  </div>
                )}
                {/* Gradient overlay for smooth transition to content */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              </div>

              {/* Content Area */}
              <div className="p-6 relative flex-1 flex flex-col bg-slate-900/40">
                {/* Floating Quote Icon */}
                <div className="absolute -top-6 right-6 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <Quote className="w-5 h-5 text-slate-900 fill-slate-900" />
                </div>

                <div className="flex items-center gap-1 mb-4 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan-500 text-cyan-500" />
                  ))}
                </div>

                <p className="text-slate-300 leading-relaxed mb-6 flex-1 text-sm">
                  "{item.content}"
                </p>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-bold text-white text-lg">{item.author}</h4>
                  <p className="text-sm text-cyan-400 font-medium">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
