import React, { useState } from "react";
import { PageId } from "../types";
import { Truck, Phone, Menu, X, Globe, Mail, Search } from "lucide-react";

interface PageHeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

export default function PageHeader({ currentPage, setCurrentPage }: PageHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About Us" },
    { id: "tracker", label: "Shipment Tracking" },
    { id: "quote", label: "Request a Quote" },
    { id: "contact", label: "Contact" }
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav" id="main-header">
      {/* Upper info ribbon for professional premium corporate feel */}
      <div className="hidden sm:flex bg-white/3 px-6 py-2 border-b border-white/5 justify-between items-center text-[11px] font-mono text-slate-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Globe className="w-3.5 h-3.5 text-orange-500" />
            Sunnyvale, CA Dispatch HQ
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <Mail className="w-3.5 h-3.5 text-orange-500" />
            tanumalik0067@gmail.com
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-bold">24/7 Hot-Dispatch line:</span>
          <a href="tel:864-784-0187" className="text-orange-400 hover:text-orange-300 font-bold transition-colors">
            864-784-0187
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo and Brand Title */}
        <button 
          onClick={() => {
            setCurrentPage("home");
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 active:scale-95 transition-transform text-left cursor-pointer"
          id="header-brand-logo"
        >
          <div className="relative w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shadow-lg shadow-orange-500/10 border border-white/20">
            <Truck className="w-5.5 h-5.5 text-orange-500 transform -rotate-6" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100 flex items-center gap-1 font-display">
              ANKUR <span className="text-orange-500 font-extrabold text-sm sm:text-base">LOGISTICS</span>
            </h1>
            <p className="text-[10px] text-slate-400 tracking-wider font-mono uppercase">ankurlogisticscom.com</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5" id="desktop-nav">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium tracking-wide transition-all ${
                  isActive
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/35 shadow-lg shadow-orange-550/10 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobil Quick CTA + Menu toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentPage("quote")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-505 hover:to-amber-805 text-white font-medium text-xs font-mono uppercase rounded-xl border border-white/10 transition-all shadow-lg shadow-orange-600/20 hover:scale-105 active:scale-95"
          >
            Instant Quote
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 hover:bg-white/5 rounded-xl transition-all border border-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/70 backdrop-blur-xl px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-orange-500/20 text-orange-405 border border-orange-500/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 bg-white/3 p-3 rounded-xl space-y-2 text-xs font-mono">
            <div className="text-slate-400">Dispatch Support Hotline:</div>
            <a href="tel:864-784-0187" className="block text-sm text-orange-400 font-bold">
              📞 864-784-0187
            </a>
            <div className="text-slate-400">Dispatch Support Email:</div>
            <a href="mailto:tanumalik0067@gmail.com" className="block text-xs text-slate-300 underline font-semibold">
              tanumalik0067@gmail.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
