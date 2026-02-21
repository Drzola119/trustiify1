import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SocialProof from "@/components/SocialProof";
import Process from "@/components/Process";
import InstagramSection from "@/components/InstagramSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary selection:bg-brand-cyan/30 text-text-primary overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <SocialProof />
      <Process />
      <InstagramSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
