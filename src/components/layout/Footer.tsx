import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  dict: any;
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="bg-slate-900 border-t border-white/10 text-white relative overflow-hidden">
      
      {/* Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        
        {/* Main CTA Area */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            {dict.title_hl} <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {dict.title_sub}
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            {dict.desc}
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-lg px-8 py-5 rounded-full transition-all hover:scale-105 shadow-lg shadow-cyan-500/25"
          >
            {dict.cta} <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-medium">
            {dict.copyright}
          </p>
          
          <div className="flex items-center gap-4">
            <Link href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-300 hover:text-cyan-400 transition-colors" title={dict.socials.linkedin}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </Link>
            <Link href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-300 hover:text-cyan-400 transition-colors" title={dict.socials.github}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </Link>
            <Link href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-300 hover:text-cyan-400 transition-colors" title={dict.socials.email}>
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
