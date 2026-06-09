import React, { useState, useEffect } from "react";
import { PageId } from "./types";
import PageHeader from "./components/PageHeader";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ServicesView from "./components/ServicesView";
import ContactView from "./components/ContactView";
import QuoteView from "./components/QuoteView";
import TrackerView from "./components/TrackerView";
import ChatbotWidget from "./components/ChatbotWidget";
import { ArrowUp, Phone, Mail, Globe, MapPin, ShieldAlert, FileCheck } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [initialSearchText, setInitialSearchText] = useState("");

  // Target jump tracker helper function from chatbot triggers
  const handleSearchTrackFromChatbot = (num: string) => {
    setInitialSearchText(num);
    setCurrentPage("tracker");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll Telemetry Tracker
  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate scroll percentage for 3D coordinate motion
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(pct);

      // 2. Control float visibility
      if (scrollTop > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render the requested page layout view
  const renderActiveView = () => {
    switch (currentPage) {
      case "about":
        return <AboutView setCurrentPage={setCurrentPage} />;
      case "services":
        return <ServicesView setCurrentPage={setCurrentPage} />;
      case "contact":
        return <ContactView />;
      case "quote":
        return <QuoteView />;
      case "tracker":
        return (
          <TrackerView 
            initialSearchText={initialSearchText} 
            onClearInitialSearch={() => setInitialSearchText("")} 
          />
        );
      case "home":
      default:
        return <HomeView setCurrentPage={setCurrentPage} scrollPercent={scrollPercent} />;
    }
  };

  // Ensure scroll is returned to top upon page navigation trigger
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white antialiased font-sans" id="app-master-container">
      {/* Immersive background glows for frosted glass reflection */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),rgba(11,15,25,0)_50%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),rgba(11,15,25,0)_60%)] pointer-events-none -z-10"></div>
      
      <div>
        {/* Navigation Header */}
        <PageHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {/* Global Emergency Status Banner */}
        <div className="bg-white/5 backdrop-blur-md border-b border-white/10 py-2 px-4 text-center">
          <p className="text-[10px] sm:text-xs font-mono text-orange-400 font-bold flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            Active Route Operations: Full Capacity Vetted Owner-Operators Ready in California Depot. Tel: 864-784-0187
          </p>
        </div>

        {/* Dynamic App Content Block */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-300">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Corporate Premium Footer with Glassmorphism */}
      <footer className="bg-white/3 backdrop-blur-lg border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 mt-12 text-center" id="main-footer">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Logo brand & Contact coordinates row */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              <span className="text-sm font-extrabold text-slate-300 tracking-wider font-mono">ANKUR LOGISTICS</span>
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-md font-sans">
              Reliable logistics, FTL dry van dispatch, brokerage, and warehouse networks managed directly out of Sunnyvale, California. Standard rate calculations provided under FMCSA licenses.
            </p>

            {/* Micro Links row */}
            <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-slate-500">
              <button onClick={() => setCurrentPage("home")} className="hover:text-slate-300">Home</button>
              <button onClick={() => setCurrentPage("services")} className="hover:text-slate-300">Services</button>
              <button onClick={() => setCurrentPage("about")} className="hover:text-slate-300">About Us</button>
              <button onClick={() => setCurrentPage("tracker")} className="hover:text-slate-300">Trace Load</button>
              <button onClick={() => setCurrentPage("quote")} className="hover:text-slate-300">Get Quote</button>
              <button onClick={() => setCurrentPage("contact")} className="hover:text-slate-300">Support Desk</button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 text-xs text-slate-500 space-y-3 font-mono">
            {/* Direct Coordinates */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
              <span className="flex items-center gap-1">📞 Dispatch: 864-784-0187</span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-1">📧 Info: tanumalik0067@gmail.com</span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-1">📍 Sunnyvale, CA</span>
            </div>
            
            {/* Required Developer Link and Center Align */}
            <p className="text-[11px]">
              © {new Date().getFullYear()} Ankur Logistics. All rights reserved.
            </p>
            <p className="text-[11px] text-orange-500 font-bold">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noreferrer" className="underline hover:text-orange-400 transition-colors">iWebNext</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating 1: Secure Server-Side Coordinate AI Chatbot Widget */}
      <ChatbotWidget onSearchTrack={handleSearchTrackFromChatbot} />

      {/* Floating 2: Interactive Back-to-top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-slate-900/90 hover:bg-orange-500 text-slate-100 hover:text-white p-3.5 rounded-full border border-slate-800 hover:border-orange-400 shadow-2xl transition-all duration-300 active:scale-90 hover:scale-115 cursor-pointer group"
          id="scroll-to-top-button"
          aria-label="Back to Top"
          title="Scroll up"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}
