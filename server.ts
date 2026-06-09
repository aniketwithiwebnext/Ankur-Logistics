import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up server parsing
app.use(express.json());

// In-Memory storage for submissions (simulating database for contact & quotes)
const contactSubmissions: any[] = [];
const quoteSubmissions: any[] = [];

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || "";
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// 1. Shipment Tracking Simulation API
const mockShipments: Record<string, any> = {
  "ANK-98231": {
    trackingNumber: "ANK-98231",
    status: "In Transit",
    recipient: "Apex Technologies Corp",
    origin: "Sunnyvale, California (HQ)",
    destination: "Dallas, Texas",
    estDelivery: "2026-06-12",
    carrier: "Ankur Logistics - Premium Team 4",
    lastUpdated: "2026-06-09 14:32 (Local Time)",
    freightType: "Full Truckload (FTL)",
    history: [
      { date: "2026-06-09 14:32", location: "Phoenix, AZ Hub", description: "In transit, on schedule" },
      { date: "2026-06-09 08:15", location: "Los Angeles, CA Depot", description: "Departed hub" },
      { date: "2026-06-08 17:40", location: "Sunnyvale, CA HQ", description: "Pickup locked, freight secured" },
      { date: "2026-06-08 11:00", location: "System", description: "Shipment details entered" }
    ]
  },
  "ANK-47210": {
    trackingNumber: "ANK-47210",
    status: "Delivered",
    recipient: "Golden State Wholesalers",
    origin: "Chicago, Illinois Hub",
    destination: "Sunnyvale, California",
    estDelivery: "2026-06-09",
    carrier: "Ankur Logistics - Regional Express",
    lastUpdated: "2026-06-09 09:20 (Local Time)",
    freightType: "Less Than Truckload (LTL)",
    history: [
      { date: "2026-06-09 09:20", location: "Sunnyvale, CA Recipient", description: "Delivered & signed by T. Malik" },
      { date: "2026-06-09 06:10", location: "San Jose, CA Hub", description: "Out for final delivery" },
      { date: "2026-06-08 22:50", location: "San Jose, CA Hub", description: "Arrived at destination facility" },
      { date: "2026-06-07 10:00", location: "Chicago, IL Hub", description: "In transit across state lines" }
    ]
  },
  "ANK-10492": {
    trackingNumber: "ANK-10492",
    status: "Pending Pickup",
    recipient: "Cascade Manufacturing",
    origin: "Sunnyvale, California (HQ)",
    destination: "Seattle, Washington",
    estDelivery: "2026-06-14",
    carrier: "Ankur Logistics - Expedited",
    lastUpdated: "2026-06-09 18:00 (Local Time)",
    freightType: "Expedited Freight",
    history: [
      { date: "2026-06-09 15:30", location: "Sunnyvale, CA HQ", description: "Container assigned & scheduled for morning pickup" },
      { date: "2026-06-09 11:15", location: "System", description: "Route planned and toll clearances approved" }
    ]
  }
};

app.get("/api/tracking/:num", (req, res) => {
  const num = req.params.num.toUpperCase().trim();
  const shipment = mockShipments[num];
  if (shipment) {
    res.json({ success: true, data: shipment });
  } else {
    // Return a dynamic mock shipment for any realistic-looking string to make the site highly functional!
    if (/^[a-zA-Z0-9-]{5,12}$/.test(num)) {
      const customShipment = {
        trackingNumber: num,
        status: "In Transit",
        recipient: "Client Partner (Dynamic Lookup)",
        origin: "Sunnyvale, California (HQ)",
        destination: "New York, NY",
        estDelivery: "2026-06-16",
        carrier: "Ankur Logistics - NorthAmerican Hub",
        lastUpdated: "Just Now",
        freightType: "General Freight Transport",
        history: [
          { date: "2026-06-09 19:40", location: "Sunnyvale, CA HQ", description: "Departed headquarters, on route" },
          { date: "2026-06-09 14:00", location: "System", description: "Dispatch manifests generated dynamically" }
        ]
      };
      res.json({ success: true, data: customShipment });
    } else {
      res.status(404).json({ success: false, message: "Tracking number not found. Try 'ANK-98231', 'ANK-47210', or 'ANK-10492'." });
    }
  }
});

// 2. Lead Contact Form API with server-side validation
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: "Please fill out all required fields." });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address format." });
  }

  const submission = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    message,
    submittedAt: new Date().toISOString()
  };
  contactSubmissions.push(submission);
  console.log("New Corporate Contact Submission:", submission);

  res.json({
    success: true,
    message: "Thank you! Your message has been received. Our team based in Sunnyvale, CA will contact you within 2 business hours."
  });
});

// 3. Lead Quote Request API with server-side validation
app.post("/api/quote", (req, res) => {
  const { name, company, email, phone, pickup, delivery, freightType, details, notes } = req.body;
  if (!name || !email || !phone || !pickup || !delivery || !freightType) {
    return res.status(400).json({ success: false, message: "Please fill out all marked required fields." });
  }

  const submission = {
    id: "Q-" + Math.floor(100000 + Math.random() * 900000),
    name,
    company: company || "N/A",
    email,
    phone,
    pickup,
    delivery,
    freightType,
    details: details || "",
    notes: notes || "",
    submittedAt: new Date().toISOString()
  };
  quoteSubmissions.push(submission);
  console.log("New FTL/LTL Freight Quote Request:", submission);

  res.json({
    success: true,
    quoteId: submission.id,
    message: `Quote request successfully filed under Reference ID: ${submission.id}. A logistics specialist from the Sunnyvale division is reviewing your route and will deliver a finalized price-sheet containing optimal rates within 15 minutes.`
  });
});

// 4. Secure Server-Side Gemini Chatbot API
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ status: "error", message: "Message is required." });
  }

  if (!ai) {
    return res.json({
      status: "mock",
      text: "Hello! I am the automated virtual customer assistant for **Ankur Logistics**. Currently, the secure AI integration is initializing. I can tell you that we are based in Sunnyvale, CA at Phone: 864-784-0187, Email: tanumalik0067@gmail.com. We provide top-tier freight services (FTL, LTL, Expedited, and Warehousing). Feel free to submit questions, quotes, or tracking requests (try inputting tracking number 'ANK-98231' above!)."
    });
  }

  try {
    // Format previous messages into standard system structure or prompt
    const systemPrompt = `You are a sophisticated, friendly, and extremely helpful AI Logistics Coordinator representing Ankur Logistics (based in Sunnyvale, California).
Company Info:
- Address: Sunnyvale, California, USA.
- Phone: 864-784-0187
- Email: tanumalik0067@gmail.com
- Domain: ankurlogisticscom.com
- Main Contact/Manager: Tanu Malik (connected to tanumalik0067@gmail.com)

Services Offered:
- Full Truckload (FTL): Dedicated high-volume routes with on-time dispatch.
- Less Than Truckload (LTL): Cost-effective shared freight solution with real-time temperature/hazard checks.
- Freight Brokerage: Connecting trusted owner-operators across America with secure routes.
- Supply Chain Management: Enterprise route optimization.
- Warehousing & Distribution Services: Secure climate-controlled facilities.
- Expedited Shipping: Time-critical door-to-door deliveries with twin-team truckers.

Instructions:
1. Always present yourself as part of the Ankur Logistics Team.
2. Maintain an extremely professional, courteous, fast, and secure logistics persona.
3. Encourage users to use the website's Interactive Shipment Tracker for live progress (provide demo numbers: ANK-98231, ANK-47210, ANK-10492).
4. For rate sheets, request them to use corporate "Request a Quote" link.
5. Keep your response relatively compact (under 3 paragraphs) to fit in a neat floating chatbot UI.
6. Use Markdown formatting elegantly. Do not mention API keys, backend server structure, or the developer.`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    // Send history context if available, or just send general chat messages
    // To make it fully compatible with gemini-api chat capabilities, we can send current message
    // We can reconstruct previous turns if we want, or do a direct chat sendMessage
    if (history && Array.isArray(history) && history.length > 0) {
      // In @google/genai, chat.sendMessage supports carrying state. We can feed messages sequentially
      // Or we can just build a unified prompt to keep it extremely stable and quick.
      let promptWithHistory = "Previous Conversation history:\n";
      history.forEach((turn: any) => {
        const marker = turn.role === "user" ? "Client" : "Assistant";
        promptWithHistory += `${marker}: ${turn.content}\n`;
      });
      promptWithHistory += `Client Latest Inquiry: ${message}\nAssistant response:`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptWithHistory,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });
      
      return res.json({ success: true, text: response.text });
    } else {
      const response = await chat.sendMessage({ message: message });
      return res.json({ success: true, text: response.text });
    }
  } catch (error: any) {
    console.error("Gemini Assistant Failure:", error);
    res.json({
      status: "fallback",
      text: "I read your message, but I encountered a processing wave. We provide stellar freight dispatch across America! Reach us at our phone: 864-784-0187 or tanumalik0067@gmail.com for prompt routing sheets."
    });
  }
});

// 5. Mount Vite middleware in development, and serve static build files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ankur Logistics Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
