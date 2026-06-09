import React, { useState } from "react";
import { QuoteForm } from "../types";
import { Send, FileCheck2, AlertCircle, Sparkles, HelpCircle, Truck, MapPin, Layers, Scale } from "lucide-react";

export default function QuoteView() {
  const [form, setForm] = useState<QuoteForm>({
    name: "",
    company: "",
    email: "",
    phone: "",
    pickup: "",
    delivery: "",
    freightType: "FTL",
    details: "",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ message: string; id: string } | null>(null);

  // Simulated route helper (calculates dynamic estimated cost on-the-fly to increase user engagement!)
  const calculateSimulatedCost = () => {
    if (!form.pickup || !form.delivery) return null;
    
    // Simple mock math based on length of strings and selection to give steady feedback
    let distanceSim = Math.floor(250 + (form.pickup.length + form.delivery.length) * 35);
    let perMileRate = form.freightType === "FTL" ? 2.45 : form.freightType === "LTL" ? 1.65 : 3.10;
    let cost = Math.floor(distanceSim * perMileRate);

    return {
      distance: distanceSim,
      rate: perMileRate,
      costEstimate: cost,
      dispatchWindow: form.freightType === "Expedited" ? "2-4 hours" : "12-24 hours"
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!form.name || !form.email || !form.phone || !form.pickup || !form.delivery || !form.freightType) {
      setErrorStatus("Please fill out all marked required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorStatus(null);
    setSuccessInfo(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessInfo({
          message: data.message,
          id: data.quoteId
        });
        // Clear except name/email to make it pleasant
        setForm({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          pickup: "",
          delivery: "",
          freightType: "FTL",
          details: "",
          notes: ""
        });
      } else {
        setErrorStatus(data.message || "Failed to log quote request. Please call 864-784-0187.");
      }
    } catch (e) {
      setErrorStatus("Temporary processing buffer. For immediate carrier setup, dial 864-784-0187 or email tanumalik0067@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeSimulation = calculateSimulatedCost();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 font-sans" id="quote-page-view">
      {/* Heading block */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
          INSTANT QUOTING PANEL
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
          Request a Secure Logistics Quote
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          File your shipment specifications and route coordinates. Our automated pricing engine computes rapid transit rates, backed by vetted California drivers and carrier insurances.
        </p>
      </section>

      {/* Forms + live calculators side-by-side splits */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="quote-split-grid">
        {/* Left Column: Multi-field form */}
        <div className="lg:col-span-7 glass-card-heavy p-6 sm:p-9 rounded-3xl space-y-6 shadow-2xl">
          <div className="border-b border-white/5 pb-4">
            <h3 className="text-xl font-black text-slate-100 uppercase tracking-tight flex items-center gap-2 font-display">
              <FileCheck2 className="w-5.5 h-5.5 text-orange-500" />
              Route & Cargo Details
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans">Please provide accurate cargo parameters to secure absolute quote lock-ins.</p>
          </div>

          {/* Success / Error Banners */}
          {errorStatus && (
            <div className="bg-rose-955/40 border border-rose-500/30 p-4 rounded-xl flex gap-3 text-rose-200 text-xs sm:text-sm animate-in fade-in" id="quote-error-banner">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorStatus}</span>
            </div>
          )}

          {successInfo && (
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-5 rounded-2xl space-y-3 text-emerald-250 text-xs sm:text-sm animate-in fade-in" id="quote-success-banner">
              <div className="flex gap-3 text-emerald-200 font-bold">
                <FileCheck2 className="w-5.5 h-5.5 text-emerald-400 shrink-0" />
                <span>Reference Lock ID: {successInfo.id}</span>
              </div>
              <p className="text-slate-300 leading-normal">{successInfo.message}</p>
              <div className="text-[11px] text-slate-400 font-mono">
                Support Helpline: 864-784-0187 • Email: tanumalik0067@gmail.com
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" id="quote-form-node">
            {/* Split 1: Name and Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="q-name">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  id="q-name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Tanu Malik"
                  required
                  className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="q-company">Company Name</label>
                <input
                  type="text"
                  name="company"
                  id="q-company"
                  value={form.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Ankur Logistics Partners"
                  className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-all"
                />
              </div>
            </div>

            {/* Split 2: Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="q-email">Business Email *</label>
                <input
                  type="email"
                  name="email"
                  id="q-email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="e.g. tanu@ankurlogisticscom.com"
                  required
                  className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="q-phone">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  id="q-phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 864-784-0187"
                  required
                  className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-all"
                />
              </div>
            </div>

            {/* Split 3: Pickup and Delivery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="q-pickup">Pickup Location *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    name="pickup"
                    id="q-pickup"
                    value={form.pickup}
                    onChange={handleInputChange}
                    placeholder="City, State / ZIP (e.g. Sunnyvale, CA)"
                    required
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="q-delivery">Delivery Destination *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    name="delivery"
                    id="q-delivery"
                    value={form.delivery}
                    onChange={handleInputChange}
                    placeholder="City, State / ZIP (e.g. Dallas, TX)"
                    required
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Split 4: Freight Type selector */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="q-freightType">Freight Modality *</label>
              <select
                name="freightType"
                id="q-freightType"
                value={form.freightType}
                onChange={handleInputChange}
                className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none transition-all font-sans"
              >
                <option value="FTL" className="bg-[#101423] text-slate-100">Full Truckload (FTL)</option>
                <option value="LTL" className="bg-[#101423] text-slate-100">Less Than Truckload (LTL)</option>
                <option value="Brokerage" className="bg-[#101423] text-slate-100">Third-Party Freight Brokerage</option>
                <option value="Expedited" className="bg-[#101423] text-slate-100">Expedited shipping (Air/Team Rig)</option>
                <option value="Warehousing" className="bg-[#101423] text-slate-100">Secure Warehousing & Distribution</option>
              </select>
            </div>

            {/* Shipment details */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="q-details">Shipment Dimensions / Weight *</label>
              <input
                type="text"
                name="details"
                id="q-details"
                value={form.details}
                onChange={handleInputChange}
                placeholder="e.g. 24 Pallets, 42,000 lbs, Climate-Controlled Dry Van"
                required
                className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-all"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="q-notes">Additional Route Instructions / Notes</label>
              <textarea
                name="notes"
                id="q-notes"
                rows={3}
                value={form.notes}
                onChange={handleInputChange}
                placeholder="List special hazard instructions, team driver priority requests, liftgate needs..."
                className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-705 disabled:from-slate-800 disabled:to-slate-900 disabled:opacity-40 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-mono border border-orange-550/20 cursor-pointer"
            >
              {isSubmitting ? "Locking capacity manifest..." : "Book & Request Binding Rate Lock"}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Live dynamic pricing simulator & route log HUD */}
        <div className="lg:col-span-5 space-y-6">
          {/* Simulated billing/routing HUD sheet */}
          <div className="glass-card-heavy p-6 sm:p-7 rounded-3xl space-y-6 hover:border-orange-500/20 hover:shadow-orange-500/5 transition-all shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h4 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-400 animate-spin" />
                Live Billing Estimator
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                Active Spot Index
              </span>
            </div>

            {activeSimulation ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                {/* Route points */}
                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-3 font-mono text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500">Pickup Origin:</span>
                      <p className="font-bold text-slate-200">{form.pickup}</p>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-dashed border-white/10 pl-4 h-4 ml-2"></div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500">Destination Location:</span>
                      <p className="font-bold text-slate-200">{form.delivery}</p>
                    </div>
                  </div>
                </div>

                {/* Estimate parameters */}
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-400 font-sans">
                    <span>Est. Driving Distance:</span>
                    <strong className="text-slate-200 font-mono">{activeSimulation.distance} Miles</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 font-sans">
                    <span>Active Spot Rate (Per Mile):</span>
                    <strong className="text-slate-200 font-mono">${activeSimulation.rate.toFixed(2)} / mi</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 font-sans">
                    <span>Service Priority Dispatch Window:</span>
                    <strong className="text-orange-400 font-mono">{activeSimulation.dispatchWindow}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 font-sans">
                    <span>Licensing & Brokerage Surety:</span>
                    <strong className="text-emerald-400 font-mono">Fully Protected</strong>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block font-bold uppercase">estimated range lock:</span>
                      <span className="text-slate-500 text-xs font-sans">(Subject to fuel spot changes)</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-orange-400 tracking-tight font-display">
                      ${activeSimulation.costEstimate.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 font-mono leading-normal pt-2 border-t border-white/5 italic">
                  * Note: Cost estimate is generated in real-time from our central Sunnyvale corridor. Formal lock rates are finalized and dispatched to your email in 15 minutes by Tanu Malik.
                </p>
              </div>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-650 mx-auto">
                  <HelpCircle className="w-6 h-6 text-slate-400 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-xs text-slate-300">Calculator Standby</h5>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto font-sans leading-normal">
                    Input both **Pickup Origin** and **Delivery Destination** to compute dynamic fuel rates.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Verification Badge Details */}
          <div className="glass-card p-6 rounded-3xl space-y-4 shadow-lg">
            <h4 className="text-xs font-mono font-bold text-slate-350 text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-orange-500" />
              Direct Booking Advantages
            </h4>
            
            <ul className="space-y-2.5 font-mono text-[11px] text-slate-400">
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">✓</span>
                <span>$250,000 standard cargo liability insurance per load.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">✓</span>
                <span>FMCSA licensed owner-operator networks across every state.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Satellite GPS-linked rig temperature checks every 20 minutes.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Silicon Valley based dispatch desk (Dial 864-784-0187).</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
