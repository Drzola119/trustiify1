import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-[#050810] text-white">
            <Navbar />
            <div className="pt-40 max-w-7xl mx-auto px-6 min-h-[70vh]">
                <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight mb-8">Blog</h1>
                <p className="text-text-secondary text-lg">SEO tips content repurposed from Instagram coming soon.</p>
            </div>
            <Footer />
        </main>
    );
}
