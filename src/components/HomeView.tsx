import React, { useRef } from "react";
import { PageId } from "../types";
import { whyChooseUs, servicesData, testimonials } from "../data";
import { ArrowRight, Truck, Clock, ShieldCheck, TrendingUp, Users, Star, Quote, ArrowUpRight } from "lucide-react";
import ThreeLogisticsScene from "./ThreeLogisticsScene";

interface HomeViewProps {
  setCurrentPage: (page: PageId) => void;
  scrollPercent: number;
}

export default function HomeView({ setCurrentPage, scrollPercent }: HomeViewProps) {
  // Map standard icon strings to Lucide-React icons for UI rendering
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "ShieldAlert":
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-orange-500" />;
      case "Clock":
        return <Clock className="w-6 h-6 text-orange-500" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-orange-500" />;
      case "Users":
        return <Users className="w-6 h-6 text-orange-500" />;
      default:
        return <Truck className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-20 pb-16 font-sans" id="home-view-container">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24 pb-12" id="hero-section">
        {/* Abstract glowing background blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-600/10 rounded-full filter blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-900/20 rounded-full filter blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
              ⚡ NATIONWIDE RELIABLE DISPATCH
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-none">
              Reliable Logistics <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                Solutions Across America
              </span>
            </h2>

            <p className="text-slate-300 text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Efficient transportation, freight management, and logistics services you can trust. Headquartered in Sunnyvale, California, built to keep your supply chain in motion.
            </p>

            {/* Micro Call-to-actions list */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3 max-w-md mx-auto lg:mx-0 text-left font-mono text-xs text-slate-350 border-t border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-sm"></span>
                99.8% On-Time rate
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-sm"></span>
                Sunnyvale CA Hub
              </div>
              <div className="flex items-center gap-1.5 col-span-2 md:col-span-1">
                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-sm"></span>
                24/7 Hot Dispatch
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={() => setCurrentPage("quote")}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 font-sans text-sm tracking-wide transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setCurrentPage("contact")}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-100 font-bold rounded-2xl border border-white/15 transition-all font-sans text-sm tracking-wide active:scale-95 flex items-center justify-center gap-2"
              >
                Contact Us
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Right: Integrated Three.js 3D Section */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-center lg:text-left mb-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                Interactive 3D Portal
              </span>
            </div>
            
            <ThreeLogisticsScene scrollPercent={scrollPercent} />
            
            <div className="text-center">
              <button 
                onClick={() => setCurrentPage("tracker")}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-400 hover:text-orange-300 transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm"
              >
                🔍 Enter Live Tracker System (ANK-98231)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Statistics Ribbon with Glassmorphism */}
      <section className="bg-white/3 backdrop-blur-md border-t border-b border-white/10 py-8 relative" id="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-orange-400 tracking-tight font-display">10M+</p>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Miles Secured Annually</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-orange-400 tracking-tight font-display">99.8%</p>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">On-Time Terminal Closes</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight font-display">24/7/365</p>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Road Support</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight font-display">100%</p>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Vetted Truck Fleet</p>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="why-choose-us-section">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-widest">
            THE ANKUR SECURITY METRIC
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Why Modern Supply Chains Run on Us
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Enterprise shipping warrants absolute precision. We maintain our fleet, drivers, and tracking networks to dynamic precision standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((w, i) => (
            <div 
              key={i}
              className="glass-card p-6 rounded-2xl space-y-4 hover:border-orange-500/40 transition-all hover:-translate-y-1 duration-300 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
              
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:bg-orange-500/20 transition-all">
                {getIconComponent(w.icon)}
              </div>
              <h3 className="text-lg font-bold text-slate-200">{w.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{w.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Services Overview */}
      <section className="bg-transparent py-14 border-t border-b border-white/5" id="services-overview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-widest">
                CORE LOGISTIC PORTFOLIO
              </h3>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 font-display">
                Optimized Freight Operations
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                From single shipments in Sunnyvale, CA to sophisticated nationwide logistics grids, we provide dynamic custom road-mapping.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage("services")}
              className="inline-flex items-center gap-1.5 px-5 py-3 bg-white/5 hover:bg-white/10 text-orange-400 font-bold rounded-xl border border-white/10 transition-all font-sans text-xs tracking-wider uppercase shrink-0 self-start md:self-end"
            >
              Browse Detailed Services
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesData.slice(0, 3).map((s, idx) => (
              <div 
                key={idx}
                className="glass-card-heavy p-7 rounded-2xl space-y-4 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-400 font-bold">
                      0{idx + 1}
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 border border-white/10 px-2 py-0.5 rounded">
                      Standard Carrier
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">{s.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{s.description}</p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-mono">Status: Live Ops</span>
                  <button 
                    onClick={() => setCurrentPage("services")} 
                    className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
                  >
                    View Benefits <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="testimonials-section">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-widest">
            AUTHENTIC REVIEWS
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Trusted by Business Leaders
          </h2>
          <p className="text-slate-400 text-sm">
            Discover how corporate manufacturers and retail departments keep their shipping routes secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div 
              key={t.id}
              className="glass-card p-7 rounded-2xl relative space-y-4 hover:border-orange-500/30 transition shadow-lg"
            >
              <Quote className="w-10 h-10 text-orange-500/10 absolute top-4 right-4" />
              <div className="flex gap-1 text-amber-500">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                "{t.comment}"
              </p>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">{t.name}</h4>
                  <p className="text-slate-500 text-[11px] font-mono">{t.company}</p>
                </div>
                <span className="text-slate-600 text-[10px] font-mono">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Dynamic Bottom CALL-TO-ACTION (Lead Generator) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="cta-bottom-block">
        <div className="bg-gradient-to-br from-orange-600 to-amber-700 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-orange-500/45">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
          
          <div className="max-w-2xl space-y-6 relative z-10 text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold text-orange-100 uppercase tracking-widest bg-orange-850/40 px-3 py-1 rounded-full border border-orange-400/20">
              Immediate Capacity Available
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Ready to Optimize Your Logistics Budget?
            </h2>
            <p className="text-orange-50 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              File your cargo dimensions and pickup schedules dynamically. Let our team engineer structural routing options that guarantee complete compliance and on-time terminal closures.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setCurrentPage("quote")}
                className="bg-white hover:bg-slate-100 text-orange-600 font-bold px-8 py-3.5 rounded-xl text-center text-sm shadow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                Get a Fast Quote
              </button>
              
              <a
                href="tel:864-784-0187"
                className="inline-flex items-center justify-center gap-2 bg-slate-950/60 hover:bg-slate-950/80 text-white font-bold px-8 py-3.5 rounded-xl text-sm border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                📞 Dial Dispatch 864-784-0187
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
