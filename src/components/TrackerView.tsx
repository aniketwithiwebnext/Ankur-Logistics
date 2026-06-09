import React, { useState, useEffect } from "react";
import { Shipment } from "../types";
import { Search, MapPin, Truck, Calendar, Clock, ClipboardType, UserCheck, CheckCircle2, History, AlertTriangle } from "lucide-react";

interface TrackerViewProps {
  initialSearchText?: string;
  onClearInitialSearch?: () => void;
}

export default function TrackerView({ initialSearchText, onClearInitialSearch }: TrackerViewProps) {
  const [trackingNum, setTrackingNum] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const demoNumbers = ["ANK-98231", "ANK-47210", "ANK-10492"];

  const handleTrackingQuery = async (num: string) => {
    if (!num.trim()) return;
    setLoading(true);
    setErrorText(null);
    setShipment(null);

    try {
      const trimmed = num.toUpperCase().trim();
      const res = await fetch(`/api/tracking/${trimmed}`);
      const result = await res.json();

      if (res.ok && result.success) {
        setShipment(result.data);
      } else {
        setErrorText(result.message || "Tracking ID not found in dispatch files. Try 'ANK-98231' or input standard alphanumeric combination.");
      }
    } catch (e) {
      setErrorText("Could not handshake with central tracking database. For immediate tracking coordinates, dial 864-784-0187.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialSearchText) {
      setTrackingNum(initialSearchText);
      handleTrackingQuery(initialSearchText);
      if (onClearInitialSearch) {
        onClearInitialSearch();
      }
    }
  }, [initialSearchText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackingQuery(trackingNum);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "In Transit":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Pending Pickup":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-sans" id="shipment-tracking-view">
      {/* 1. Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
          LOGISTICS TELEMETRY
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Interactive Shipment Tracker
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Unlock live satellite and carrier coordinates. Simply enter your bill-of-lading container tracking number below to audit route status and progress timelines.
        </p>
      </section>

      {/* 2. Central Search Node */}
      <section className="max-w-xl mx-auto glass-card-heavy p-6 rounded-2xl space-y-4 shadow-2xl" id="tracker-search-panel">
        <form onSubmit={handleSubmit} className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={trackingNum}
              onChange={(e) => setTrackingNum(e.target.value)}
              placeholder="Enter ID e.g. ANK-98231..."
              className="w-full glass-input rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-all font-mono"
              id="tracker-input-field"
            />
          </div>
          <button
            type="submit"
            disabled={!trackingNum.trim() || loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:bg-white/5 px-6 py-3.5 min-h-[46px] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-orange-500/20 shrink-0 font-mono active:scale-95 cursor-pointer"
            id="tracker-submit-btn"
          >
            {loading ? "Searching..." : "Trace Load"}
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-[10px] text-slate-500 border-t border-white/5 font-mono">
          <span>Active Test Shipments:</span>
          <div className="flex gap-2">
            {demoNumbers.map((num) => (
              <button
                key={num}
                onClick={() => {
                  setTrackingNum(num);
                  handleTrackingQuery(num);
                }}
                className="text-orange-400 hover:text-orange-300 font-bold bg-white/5 px-2.5 py-1 rounded border border-white/10 transition hover:border-orange-500/30 cursor-pointer"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Loader Overlay */}
      {loading && (
        <div className="py-20 text-center space-y-4" id="tracker-loader">
          <div className="w-10 h-10 border-4 border-orange-550 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-mono text-xs">Accessing orbital tracking database...</p>
        </div>
      )}

      {/* 4. Error state */}
      {errorText && !loading && (
        <div className="max-w-2xl mx-auto bg-rose-955/20 border border-rose-500/20 p-5 rounded-xl flex gap-3 text-rose-200 text-xs sm:text-sm animate-in fade-in" id="tracker-error-banner">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-extrabold text-rose-300 uppercase">Dispatch File Lookup Failed</h5>
            <p className="text-slate-300">{errorText}</p>
          </div>
        </div>
      )}

      {/* 5. Tracking Results Output */}
      {shipment && !loading && (
        <section className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300" id="tracker-results-panel">
          {/* Main Info Card */}
          <div className="glass-card-heavy rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            <div className={`absolute top-6 right-6 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border ${getStatusColor(shipment.status)}`}>
              ● {shipment.status}
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Cargo ID Lock Manifest</span>
              <h3 className="text-2xl font-black text-slate-100 font-mono tracking-tight font-display">{shipment.trackingNumber}</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
                Carrier: <strong className="text-slate-200">{shipment.carrier}</strong> | Modality: <strong className="text-slate-200">{shipment.freightType}</strong>
              </p>
            </div>

            {/* Grid particulars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs sm:text-sm font-mono text-slate-420">
              <div className="glass-card p-4 rounded-xl space-y-1 border border-white/5 shadow-sm">
                <span className="text-slate-520 text-slate-400 text-[10px] uppercase font-bold">Point of Origin</span>
                <p className="font-bold text-slate-200">{shipment.origin}</p>
              </div>

              <div className="glass-card p-4 rounded-xl space-y-1 border border-white/5 shadow-sm">
                <span className="text-slate-520 text-slate-400 text-[10px] uppercase font-bold">Route Recipient</span>
                <p className="font-bold text-slate-200">{shipment.recipient}</p>
                <p className="text-slate-400 text-[10px]">{shipment.destination}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 text-xs sm:text-sm font-mono text-slate-400">
              <div className="glass-card p-4 rounded-xl space-y-1 border border-white/5 shadow-sm">
                <span className="text-slate-520 text-slate-400 text-[10px] uppercase font-bold">Est. Completion of Delivery</span>
                <p className="font-bold text-orange-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {shipment.estDelivery}
                </p>
              </div>

              <div className="glass-card p-4 rounded-xl space-y-1 border border-white/5 shadow-sm">
                <span className="text-slate-520 text-slate-400 text-[10px] uppercase font-bold">Telemetry Timestamp</span>
                <p className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {shipment.lastUpdated}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline History log */}
          <div className="glass-card p-6 sm:p-8 space-y-6 shadow-xl">
            <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-orange-500" />
              Manifest Timeline Logs
            </h4>

            <div className="relative pl-6 border-l-2 border-white/10 space-y-8 ml-3" id="timeline-flow">
              {shipment.history.map((h, i) => {
                const isFirst = i === 0;
                return (
                  <div key={i} className="relative">
                    {/* Node Dot */}
                    <span className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full border-4 flex items-center justify-center ${
                      isFirst 
                        ? "bg-orange-500 border-[#0c111d] ring-2 ring-orange-500/25 animate-pulse" 
                        : "bg-slate-800 border-[#0c111d]"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isFirst ? "bg-white" : "bg-slate-500"}`}></span>
                    </span>

                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-500 gap-1">
                        <span>{h.date}</span>
                        <span className="text-orange-400/80 font-bold uppercase tracking-wider">{h.location}</span>
                      </div>
                      <p className={`text-sm ${isFirst ? "text-slate-100 font-extrabold" : "text-slate-450 text-slate-400 font-medium"}`}>
                        {h.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Support Notice */}
          <div className="glass-card-heavy p-6 rounded-2xl text-center space-y-2 shadow-xl border border-white/10">
            <h5 className="font-bold text-slate-200 text-sm">Need immediate satellite dispatcher voice checks?</h5>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              If your container cargo requires specialized terminal alterations or priority unloading hooks:
            </p>
            <div className="font-mono text-xs font-bold text-orange-400 pt-1">
              📞 Direct Radio Operator Link: <a href="tel:864-784-0187" className="underline hover:text-orange-300">864-784-0187</a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
