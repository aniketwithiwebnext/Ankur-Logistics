import React, { useState } from "react";
import { ContactForm } from "../types";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Building2, Globe } from "lucide-react";

export default function ContactView() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      setErrorStatus("All fields are required. Please input correct parameters.");
      return;
    }

    // Quick regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorStatus("Please enter a valid corporate email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorStatus(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      
      if (res.ok) {
        setSuccessMessage(data.message || "Message successfully dispatched!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setErrorStatus(data.message || "Unable to send message to the terminal.");
      }
    } catch (e) {
      setErrorStatus("Handshake failure. Our server is offline, but you can dial 864-784-0187 for immediate dispatch.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 font-sans" id="contact-page-view">
      {/* Page Title */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
          SECURE CONNECTIVITY
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
          Get in Touch with Our Dispatchers
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Questions regarding an invoice, route, license, or spot capacity? Fill out our corporate submission slip below, or reach our Sunnyvale hub directly via phone.
        </p>
      </section>

      {/* Main split grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-grid">
        {/* Left column: Contact info cards + Business hours */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card-heavy p-7 rounded-2xl space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-900/10 rounded-bl-full pointer-events-none"></div>
            
            <h3 className="text-lg font-bold text-slate-200 border-b border-white/5 pb-3 flex items-center gap-2 font-display">
              <Building2 className="w-5 h-5 text-orange-400" />
              Corporate Registry
            </h3>

            <div className="space-y-4">
              {/* Map pin */}
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-orange-400 mt-1 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Headquarters Location</p>
                  <p className="font-bold text-slate-200 text-sm">Sunnyvale, California, USA</p>
                  <p className="text-slate-400 text-xs font-mono">Central Silicon Valley Dispatch Hub</p>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-orange-400 mt-1 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Hotline Registry</p>
                  <a href="tel:864-784-0187" className="font-extrabold text-orange-400 hover:text-orange-300 text-base block transition-colors font-mono">
                    864-784-0187
                  </a>
                  <p className="text-slate-400 text-xs font-mono">SMS Enabled • 24 Hours Availability</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-orange-400 mt-1 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Secure Email Address</p>
                  <a href="mailto:tanumalik0067@gmail.com" className="font-bold text-slate-200 hover:text-white text-sm block underline break-all transition font-mono">
                    tanumalik0067@gmail.com
                  </a>
                  <p className="text-slate-400 text-xs font-mono">Encryption TLS Guarded</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business hours card */}
          <div className="glass-card p-7 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2 font-display">
              <Clock className="w-5 h-5 text-orange-400" />
              HQ Operating Hours
            </h3>
            
            <div className="space-y-2 font-mono text-xs text-slate-400">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Monday - Friday:</span>
                <span className="text-slate-250 font-semibold">07:00 AM - 08:00 PM (PST)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Saturday:</span>
                <span className="text-slate-250 font-semibold">08:00 AM - 04:00 PM (PST)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Sunday Dispatch:</span>
                <span className="text-orange-400 font-bold">Closed (Emergency Only)</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 pt-1.5 leading-normal font-sans">
                <span>* Active drivers on-route are backed by 24/7 dedicated satellite hotlines outside standard building coordinates.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Contact Form */}
        <div className="lg:col-span-7 glass-card-heavy p-7 sm:p-9 rounded-2xl space-y-6 shadow-2xl">
          <h3 className="text-xl font-black text-slate-100 uppercase tracking-wide font-display">
            Corporate Inquiry Slip
          </h3>
          <p className="text-xs text-slate-400 leading-snug font-sans">
            All details inputted here are fully protected and delivered directly to the Sunnyvale logistics managers. For prompt spot capacity rates, use the Request a Quote page instead.
          </p>

          {/* Messages Alerts */}
          {errorStatus && (
            <div className="bg-rose-955/40 border border-rose-500/30 p-4 rounded-xl flex gap-3 text-rose-200 text-xs sm:text-sm animate-in fade-in" id="contact-error-banner">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorStatus}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl flex gap-3 text-emerald-200 text-xs sm:text-sm animate-in fade-in" id="contact-success-banner">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" id="contact-form-node">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="field-name">Your Full Name *</label>
                <input
                  type="text"
                  name="name"
                  id="field-name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Tan Malik"
                  required
                  className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="field-email">Corporate Email *</label>
                <input
                  type="email"
                  name="email"
                  id="field-email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="e.g. tanu@yourcorp.com"
                  required
                  className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="field-phone">Contact Telephone *</label>
              <input
                type="tel"
                name="phone"
                id="field-phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="e.g. 864-784-0187"
                required
                className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5" htmlFor="field-message">Detailed message *</label>
              <textarea
                name="message"
                id="field-message"
                rows={4}
                value={form.message}
                onChange={handleInputChange}
                placeholder="Explain carrier lanes, billing questions, or warehouse limits..."
                required
                className="w-full glass-input rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all font-sans"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:from-slate-800 disabled:to-slate-850 disabled:opacity-40 text-white font-bold rounded-xl shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm tracking-wider uppercase font-mono cursor-pointer"
            >
              {isSubmitting ? "Handshaking..." : "Submit Inquiry Slip"}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Interactive Google Map Placeholder Section */}
      <section className="space-y-6" id="interactive-map-block">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div>
            <h3 className="text-xl font-bold text-slate-100 font-display">Sunnyvale Headquarters Region</h3>
            <p className="text-xs text-slate-500 font-mono">Central Silicon Valley Depot Grid Area</p>
          </div>
          <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" /> Coordinates Locked
          </span>
        </div>

        {/* Customized aesthetic map simulation visualizer */}
        <div className="relative w-full h-80 glass-card-heavy rounded-3xl overflow-hidden flex flex-col justify-center items-center shadow-2xl">
          {/* Abstract map pattern (using CSS lines and dots grids to simulate an advanced routing dispatcher visual map) */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          
          {/* Mock glowing roads lines */}
          <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-orange-500/10 border-b border-dashed border-orange-500/20"></div>
          <div className="absolute bottom-1/3 left-0 right-0 h-0.5 bg-blue-500/10 border-b border-dashed border-blue-500/20"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-orange-500/10 border-r border-dashed border-orange-500/20"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-blue-500/10 border-r border-dashed border-blue-500/20"></div>

          {/* Central glowing coordinate locator */}
          <div className="relative z-10 flex flex-col items-center space-y-4 text-center max-w-sm px-6 glass-card p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-60"></div>
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white border border-orange-400 relative z-10 shadow-lg">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <h4 className="font-extrabold text-slate-100 text-sm font-display">Sunnyvale Depot Center</h4>
              <p className="text-slate-400 text-xs font-sans">Sunnyvale, California, United States</p>
              <p className="text-[10px] text-slate-500 font-mono">Latitude: 37.37118 N • Longitude: -122.03749 W</p>
            </div>

            <p className="text-[11px] text-orange-400 font-mono leading-normal pt-1.5 border-t border-white/5 w-full">
              📞 Dial support for physical terminal directions: 864-784-0187
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
