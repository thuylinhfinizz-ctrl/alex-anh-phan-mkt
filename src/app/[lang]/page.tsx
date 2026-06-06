import { getDictionary } from "@/i18n/getDictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Experiences } from "@/components/sections/Experiences";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/layout/Footer";
import { ContactPopup } from "@/components/ui/ContactPopup";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <>
      <Navbar dict={dict.navbar} lang={lang} />
      <main className="flex min-h-screen flex-col bg-black">
        <Hero dict={dict.hero} />
        <Experiences dict={dict.experiences} />
        <Projects dict={dict.projects} />
        <Skills dict={dict.skills} />
        <Testimonials dict={dict.testimonials} />
      </main>
      <Footer dict={dict.footer} />
      <ContactPopup lang={lang} />
    </>
  );
}
