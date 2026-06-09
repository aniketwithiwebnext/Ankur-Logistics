import React, { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { MessageSquare, X, Send, Truck, ArrowRight, Phone, Mail } from "lucide-react";

interface ChatbotWidgetProps {
  onSearchTrack?: (num: string) => void;
}

export default function ChatbotWidget({ onSearchTrack }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Hello! Welcome to **Ankur Logistics**. I am your automated AI Logistics Assistant. How can I help secure your enterprise transport route or trace a shipment cargo today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggestions that users can easily click
  const suggestions = [
    { text: "FTL Services", query: "Can you explain your Full Truckload (FTL) services and their benefits?" },
    { text: "Contact Details", query: "What is your main office phone number and email address?" },
    { text: "Track ANK-98231", query: "Locate shipment tracking ANK-98231" },
    { text: "Get Quote", query: "How do I request a formal logistics freight rate quote sheet?" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      
      const assistantMsg: Message = {
        role: "model",
        content: data.text || "I was unable to secure a connection to the dispatch grid. Please contact us directly at 864-784-0187 or email tanumalik0067@gmail.com for solid routing sheets.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      const errorMsg: Message = {
        role: "model",
        content: "**Network Interrupt:** Could not establish handshake with our Sunnyvale AI center. However, we are live and standing by! You can dial us at **864-784-0187** or write to us at **tanumalik0067@gmail.com**.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="chatbot-widget-container">
      {/* 1. Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-orange-400 group relative"
          id="chatbot-toggle-button"
          aria-label="Open AI Assistant"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500"></span>
          </span>
          <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap text-sm tracking-wide">
            Ask AI Coordinator
          </span>
        </button>
      )}

      {/* 2. Chat Window */}
      {isOpen && (
        <div
          className="w-[350px] sm:w-[400px] h-[520px] glass-card-heavy rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
          id="chatbot-window"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950/80 to-slate-900/80 px-4 py-3.5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md border border-orange-400">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5 font-display">
                  Ankur AI Coordinator
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">HQ Station • Sunnyvale, CA</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1 hover:bg-white/5 rounded-lg"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Contacts Banner */}
          <div className="bg-black/25 px-4 py-1.5 border-b border-white/5 font-mono text-[10px] text-slate-400 flex justify-between">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-orange-500" /> 864-784-0187
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-orange-500" /> tanumalik0067@gmail.com
            </span>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent scrollbar-thin scrollbar-thumb-white/5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-tr-none shadow-md border border-orange-400/20"
                      : "glass-card text-slate-200 rounded-tl-none border border-white/5"
                  }`}
                >
                  {/* Clean Markdown parsing */}
                  <p className="whitespace-pre-line text-[13px] sm:text-sm font-sans">
                    {msg.content.split("**").map((part, index) => 
                      index % 2 === 1 ? <strong key={index} className="text-orange-400 font-bold">{part}</strong> : part
                    )}
                  </p>
                </div>
                <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="glass-card text-slate-200 rounded-2xl rounded-tl-none px-4 py-3 border border-white/5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Layer */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-black/10 border-t border-white/5">
              <p className="text-[11px] text-slate-400 font-semibold mb-1.5 uppercase font-mono tracking-wider">Suggested Questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (s.query.toLowerCase().includes("locate shipment") && onSearchTrack) {
                        onSearchTrack("ANK-98231");
                        setMessages((prev) => [
                          ...prev,
                          {
                            role: "user",
                            content: "Track shipment ANK-98231",
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          },
                          {
                            role: "model",
                            content: "Yes! I've loaded the shipment tracking records for **ANK-98231** in the dynamic live tracking widget above. Check out its route history from Sunnyvale, CA to Dallas, TX!",
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          }
                        ]);
                      } else {
                        handleSend(s.query);
                      }
                    }}
                    className="text-[11px] bg-white/5 hover:bg-orange-500/20 text-slate-300 hover:text-orange-400 px-2.5 py-1 rounded-full border border-white/10 hover:border-orange-500/40 transition-all font-medium flex items-center gap-1 cursor-pointer"
                  >
                    {s.text}
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-3 border-t border-white/5 bg-black/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about rates, routing, tracking, or support..."
              className="flex-1 glass-input rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-all"
              id="chatbot-input"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:bg-slate-800 text-white p-2 rounded-xl transition-all font-medium min-h-[38px] flex items-center justify-center shrink-0 border border-orange-400/20 hover:scale-105 cursor-pointer"
              id="chatbot-send-button"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
