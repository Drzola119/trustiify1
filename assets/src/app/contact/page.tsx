import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#050810] text-white">
            <Navbar />
            <div className="pt-24">
                <ContactSection />
            </div>
            <Footer />
        </main>
    );
}
