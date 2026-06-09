import React from "react";
import { PageId } from "../types";
import { ShieldCheck, Target, Heart, Scale, ShieldAlert, Award } from "lucide-react";

interface AboutViewProps {
  setCurrentPage: (page: PageId) => void;
}

export default function AboutView({ setCurrentPage }: AboutViewProps) {
  const coreValues = [
    {
      title: "Reliability & Safety First",
      description: "We verify equipment metrics and route variables before dispatching to keep freight locked and drivers highly secure on the road.",
      icon: <ShieldCheck className="w-6 h-6 text-orange-500" />
    },
    {
      title: "Unyielding Integrity",
      description: "Our contracts and spot rates are index-bound and fully transparent. We promise clean invoicing without unexpected surcharge boundaries.",
      icon: <Scale className="w-6 h-6 text-orange-500" />
    },
    {
      title: "Client-Centric Dispatch",
      description: "We are committed to absolute client satisfaction. Every inquiry is met with human assistance, dial-in hotlines, and instant routing tools.",
      icon: <Heart className="w-6 h-6 text-orange-500" />
    },
    {
      title: "Silicon Valley Innovation",
      description: "By integrating real-time telemetry, automated load boards, and secure AI coordinate systems, we bypass manual, archaic dispatch pauses.",
      icon: <Award className="w-6 h-6 text-orange-500" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 font-sans" id="about-us-view">
      {/* 1. Header Hero Panel */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-widest bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
          WHO WE ARE
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight font-display font-display">
          Bridging American Ports & Highways
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Based out of Sunnyvale, California, Ankur Logistics handles heavy freight, distribution lanes, and temperature-controlled storage with uncompromising fidelity.
        </p>
      </section>

      {/* 2. Professional Company Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center glass-card-heavy p-8 sm:p-12 rounded-3xl" id="story-block">
        <div className="lg:col-span-7 space-y-5">
          <h3 className="text-xs font-mono font-bold text-orange-400 uppercase">THE ANKUR ORIGIN STORY</h3>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-200">
            A Legacy of Premium Dispatch & Heavy Carrier Fleet
          </h2>
          
          <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
            <p>
              Ankur Logistics was founded with a singular, clear objective: to systematically purge delay factors from the domestic shipping index. Recognizing that the American supply chain was burdened by legacy scheduling tools and disjointed broker channels, our founders established our headquarters in <strong>Sunnyvale, California</strong>. This Silicon Valley alignment allowed us to weave real-time route optimization tech into heavy transportation assets.
            </p>
            <p>
              Fast forward to 2026, and we are a nationwide provider managing a premium fleet of commercial vehicles, dry vans, flatbeds, and climate-controlled storage depots. We oversee logistics pipelines for electronic components, retail distributions, manufacturing components, and biological medicine arrays.
            </p>
            <p>
              Our operations are spearheaded by Tanu Malik and a dedicated tier of dispatch managers. We are licensed under strict Federal Motor Carrier Safety Administration (FMCSA) licenses and are fully bonded and secured, protecting your enterprise shipments across every state line, from coast to coast.
            </p>
          </div>
        </div>

        {/* Story visual card */}
        <div className="lg:col-span-5 glass-card-heavy p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between h-80 shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full filter blur-xl pointer-events-none"></div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-mono text-orange-400">CORPORATE DIRECT DIAL</h4>
            <p className="text-xl font-bold text-slate-100 font-display">864-784-0187</p>
            <p className="text-xs text-slate-450 text-slate-300">Available 24 hours a day for immediate hot-shot load broker assignments, container dispatch, and rate pricing.</p>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400 space-y-1">
            <div>Owner/Dispatch Contact: Tanu Malik</div>
            <div>Sunnyvale Service Center, CA</div>
            <div>Email: tanumalik0067@gmail.com</div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Commitment */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8" id="mission-commitment-block">
        <div className="glass-card p-8 rounded-2xl space-y-4 shadow-xl">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-200">Our Strategic Mission</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            To deliver unmatched peace of mind to our shippers by combining class-A road operators, strict regulatory compliance, and clean cargo operations. We establish ourselves not just as a contractor, but as a strategic asset in your enterprise supply chain hierarchy.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl space-y-4 shadow-xl">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-200">Our Client Commitment</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            We are committed to absolute customer satisfaction. To verify this, we provide transparent real-time tracking portals, direct human telephone coordinators at 864-784-0187, and immediate delivery sign-offs. If a delay variable rises, we absorb the friction to keep your operations unaffected.
          </p>
        </div>
      </section>

      {/* 4. Core Corporate Values */}
      <section className="space-y-10" id="values-grid-block">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 font-display">
            The Values That Guide Our Fleet
          </h2>
          <p className="text-slate-400 text-sm font-mono">STANDARDS • TRANSPARENCY • QUALITY</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((v, idx) => (
            <div 
              key={idx}
              className="glass-card p-6 rounded-2xl flex gap-4 items-start shadow-md"
            >
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                {v.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-200">{v.title}</h3>
                <p className="text-slate-404 text-slate-400 text-xs sm:text-sm leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About CTA with glass-card-heavy */}
      <section className="glass-card-heavy p-8 rounded-2xl text-center space-y-4 shadow-xl">
        <h3 className="text-lg sm:text-xl font-bold text-slate-200">Partner with America's Elite Fleet Today</h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Let our dispatch coordinators review your route profiles. You will receive optimized routing suggestions and rate worksheets.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setCurrentPage("quote")}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-650 hover:to-amber-700 font-bold text-white text-xs font-mono uppercase rounded-xl transition shadow-lg shadow-orange-550/15"
          >
            Request Instant Quote
          </button>
          
          <button
            onClick={() => setCurrentPage("contact")}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-slate-250 hover:text-white font-bold text-xs font-mono uppercase rounded-xl border border-white/10 transition"
          >
            Get Contact Details
          </button>
        </div>
      </section>
    </div>
  );
}
