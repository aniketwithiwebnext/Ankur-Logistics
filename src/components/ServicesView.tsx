import React, { useState } from "react";
import { PageId } from "../types";
import { servicesData } from "../data";
import { Truck, ShieldCheck, Clock, Layers, Coins, Globe, Workflow, Warehouse, Zap, CheckCircle2, ChevronRight, Phone } from "lucide-react";

interface ServicesViewProps {
  setCurrentPage: (page: PageId) => void;
}

export default function ServicesView({ setCurrentPage }: ServicesViewProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Match icon name to a specific react element for presentation
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Truck":
        return <Truck className="w-6 h-6 text-orange-500 animate-pulse" />;
      case "Workflow":
        return <Workflow className="w-6 h-6 text-orange-500" />;
      case "Warehouse":
        return <Warehouse className="w-6 h-6 text-orange-500" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-orange-500" />;
      default:
        return <Layers className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 font-sans" id="services-page-view">
      {/* 1. Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
          LOGISTICS OFFERINGS
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
          A Fleet of Engineered Solutions
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Explore our certified transport modalities. We manage and protect cargo from single-pallet cross-docks to enterprise multi-truck allocations. All supported by 24/7 telemetry updates.
        </p>
      </section>

      {/* 2. Interactive Service Selector Tab Container */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="interactive-services-container">
        {/* Navigation Sidebar Tabs */}
        <div className="lg:col-span-4 space-y-2.5">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3">Modalities Catalog</p>
          {servicesData.map((s, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all ${
                  isActive
                    ? "bg-orange-500/10 border-orange-500/35 text-orange-400 shadow shadow-orange-500/5"
                    : "bg-white/3 border-white/5 text-slate-300 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${isActive ? "bg-orange-500/10 text-orange-400" : "bg-white/5 text-slate-500"}`}>
                    {getIcon(s.icon)}
                  </div>
                  <span className="text-sm font-bold tracking-wide">{s.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-90 text-orange-400" : "text-slate-600"}`} />
              </button>
            );
          })}
        </div>

        {/* Detailed Service Display Screen */}
        <div className="lg:col-span-8 glass-card-heavy rounded-2xl p-6 sm:p-9 space-y-8 relative overflow-hidden shadow-2xl">
          {/* Subtle decoration vector */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-bl-full pointer-events-none"></div>

          {/* Core Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-400">
                {getIcon(servicesData[activeTab].icon)}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tight">{servicesData[activeTab].title}</h3>
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Active Dispatch Modality</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {servicesData[activeTab].description}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-500" />
              Core Strategic Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {servicesData[activeTab].benefits.map((b, bIdx) => (
                <div key={bIdx} className="glass-card p-3 rounded-xl flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <span className="text-slate-200 text-xs sm:text-sm leading-snug">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Industries Served Block */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              Recommended Verticals Served
            </h4>
            <div className="flex flex-wrap gap-2">
              {servicesData[activeTab].industries.map((ind, indIdx) => (
                <span
                  key={indIdx}
                  className="bg-blue-950/60 border border-blue-900/30 text-blue-300 text-[11px] sm:text-xs font-medium px-3.5 py-1.5 rounded-full"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Footer inside panel */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-slate-400 font-medium">Need immediate space reserving for {servicesData[activeTab].title}?</p>
              <p className="text-[11px] text-slate-500 font-mono">Quotes are processed and submitted in 15 minutes.</p>
            </div>
            
            <button
              onClick={() => setCurrentPage("quote")}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow shadow-orange-500/10 hover:scale-105 active:scale-95"
            >
              Configure Cargo Quote
            </button>
          </div>
        </div>
      </section>

      {/* 3. Operational Standards & Compliance highlights */}
      <section className="glass-card-heavy p-8 sm:p-12 rounded-3xl space-y-8" id="compliance-block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider">
              ROAD COMPLIANCE & SAFETY ASSURED
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Uncompromising Safety Matrix
            </h3>
            <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
              Ankur Logistics complies with each and every federal regulation including FMCSA parameters, Department of Transportation indices, and state weight limits. By requiring safety diagnostic inspections on every rig before terminal departure, we guarantee 99.8% safe and pristine line hauls.
            </p>
            
            <div className="space-y-2 border-l-2 border-orange-500 pl-4">
              <p className="text-xs text-slate-400 font-mono italic">
                "Our logistics parameters prevent cargo shifts and optimize fuel indices dynamically."
              </p>
              <p className="text-slate-300 font-bold text-xs">— Dispatch Council, Ankur Logistics</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4 font-mono text-[11px] text-slate-300">
            <h4 className="font-bold text-orange-400 uppercase tracking-wider text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              Safety Protocols & Equipment Checksheet
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>1. Pre-Trip Diagnostics:</span>
                <span className="text-emerald-400 font-bold">Passed</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>2. FMCSA Driver Hours Compliance:</span>
                <span className="text-emerald-400 font-bold">100% Locked</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>3. Hazmat Cargo Segregation Check:</span>
                <span className="text-emerald-400 font-bold">Compliant</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>4. Weight Terminal Clearances:</span>
                <span className="text-emerald-400 font-bold">Pre-Cleared</span>
              </div>
              <div className="flex justify-between">
                <span>5. Dial Dispatch Hotline:</span>
                <span className="text-orange-400 font-bold">864-784-0187</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
