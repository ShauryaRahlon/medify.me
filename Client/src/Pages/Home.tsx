// import { motion } from "framer-motion";
// import { Activity, Microscope, ScanSearch, Brain, Menu, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import { Chatbot } from "../components/Chatbot";
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <Navbar />
        <Hero />
        <Features />
        <Testimonials />
        <Chatbot />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
