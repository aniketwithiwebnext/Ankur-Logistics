import { Testimonial, ServiceDetail } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Vance",
    company: "West Coast Micro-Electronics",
    rating: 5,
    comment: "Ankur Logistics has been our exclusive carrier out of Sunnyvale for the past three years. Their FTL team is outstanding—always on time, clean rigs, and flawless dispatch. They understand time-critical hardware shipments.",
    date: "2026-05-14"
  },
  {
    id: 2,
    name: "Tanya Malik",
    company: "Global Retail Distribution Inc.",
    rating: 5,
    comment: "Excellent LTL freight customer service. Their logistics dashboard and secure tracking systems give us real-time peace of mind. Highly recommended logistics partner!",
    date: "2026-05-28"
  },
  {
    id: 3,
    name: "Arjan Deol",
    company: "Silicon Valley Solar Solutions",
    rating: 5,
    comment: "Whenever we need expedited shipping for high-value clean energy equipment, Ankur Logistics is our first call. Competitive pricing, professional operators, and 864-784-0187 support line is always answered immediately.",
    date: "2026-06-02"
  },
  {
    id: 4,
    name: "Elena Rostova",
    company: "Apex Organic Wholesalers",
    rating: 5,
    comment: "The temperature-controlled warehousing in Sunnyvale is top-tier. Coupled with their regional distribution services, they managed to shave 14% off our supply-chain overhead this quarter alone.",
    date: "2026-06-08"
  }
];

export const servicesData: ServiceDetail[] = [
  {
    title: "Full Truckload (FTL)",
    description: "Our core Full Truckload solutions provide dedicated high-volume shipping lines across the United States. With absolute route control, we optimize cargo space, maximize safety, and promise continuous direct hauling from origin to recipient without cross-docking pauses.",
    benefits: [
      "Dedicated single-container transport directly to destination",
      "Reduced transit times & minimal handling risks",
      "Dynamic door-to-door GPS route optimization",
      "Team driver options for expedited priority freight"
    ],
    industries: [
      "Electronics & Microchips",
      "Automotive & Heavy Industry",
      "Consumer Packaged Goods (CPG)",
      "High-Value Luxury Goods"
    ],
    icon: "Truck"
  },
  {
    title: "Less Than Truckload (LTL)",
    description: "Ankur Logistics delivers cost-effective Less Than Truckload logistics, allowing you to combine shipments into a shared freight network. Using advanced scheduling models, we keep shipping rates highly competitive and shipments structurally secure.",
    benefits: [
      "High cost-efficiency through volume-graded pricing",
      "Strict cargo-segregation protocols to minimize wear",
      "Frequent departures from our Sunnyvale depot hubs",
      "Flexible lift-gate and indoor delivery services"
    ],
    industries: [
      "E-commerce Retailers",
      "Agricultural Distributors",
      "Medical Supplies & Instruments",
      "Construction & Contracting"
    ],
    icon: "PackageOpen"
  },
  {
    title: "Freight Brokerage",
    description: "We bridge the gap between heavy enterprise freight demands and elite owner-operators. Backed by extensive licensing, surety protection, and vetted safety histories, our brokerage team provides instant capacity matching even during peak seasonal bounds.",
    benefits: [
      "Access to a qualified network of thousands of vetted carriers",
      "Fast spot-rate index matching and bidding",
      "Full digital compliance and insurance validation checks",
      "24/7 dedicated dispatch manager support"
    ],
    industries: [
      "Raw Materials & Steel",
      "Cold-chain Perishables",
      "Paper & Forestry Products",
      "Defense & Aerospace Contracting"
    ],
    icon: "Network"
  },
  {
    title: "Supply Chain & Route Optimization",
    description: "Our consultation department transforms complex industrial networks. We design modern supply-chain topologies, analyze fuel indices, integrate telemetry trackers, and establish automated warehouse loops that systematically dry out logistical inefficiencies.",
    benefits: [
      "Comprehensive network diagnostic and carbon audits",
      "Consolidated multi-hub route maps",
      "Inventory cycle optimization coaching",
      "Dynamic toll and weather alternate routing"
    ],
    industries: [
      "Multi-state Retail Networks",
      "Global Electronics Assembly",
      "Pharmaceutical Manufacturers",
      "Chemical & Energy Production"
    ],
    icon: "Workflow"
  },
  {
    title: "Warehousing & Temperature Controls",
    description: "Secure, fully automated, climate-regulated warehouse options based in Sunnyvale, California, and integrated regional ports. We offer state-of-the-art cold-storage, clean-room fulfillment setups, and rapid pallet-in/pallet-out transloading.",
    benefits: [
      "24/7 armed visual security and localized fire mitigation",
      "Dynamic temperature & moisture sensor telemetry",
      "FIFO/LIFO optimized barcode tracking software",
      "Direct cross-docking access for instant FTL hookups"
    ],
    industries: [
      "Medical & Biologics",
      "High-Volume Food & Beverage",
      "Heavy Machinery Storage",
      "E-commerce Returns Management"
    ],
    icon: "Warehouse"
  },
  {
    title: "Expedited shipping",
    description: "Time-critical solutions engineered for emergency assembly lines, urgent retail drops, or specialized tech infrastructure. Our expedited dispatch assigns twin team drivers to keep the vehicle in motion round-the-clock.",
    benefits: [
      "Absolute guaranteed delivery times with penal clauses",
      "Exclusive cargo van & dedicated flatbed options",
      "Hourly dispatch phone-alerts: Dial 864-784-0187 anytime",
      "Priority lane clearance and pre-registered terminal entries"
    ],
    industries: [
      "Silicon Foundry Tech Assembly",
      "Hospital Infrastructure",
      "Emergency Industrial Repair Parts",
      "Just-In-Time (JIT) Supply Networks"
    ],
    icon: "Zap"
  }
];

export const whyChooseUs = [
  {
    title: "Reliable Service",
    description: "Rigorous maintenance on our rigs and pristine terminal clearances guarantee consistent schedules with 99.8% incident-free hauls.",
    icon: "ShieldAlert"
  },
  {
    title: "On-Time Deliveries",
    description: "Supported by dynamic route mapping, weather telemetry, and coordinated team setups to bypass gridlocks completely.",
    icon: "Clock"
  },
  {
    title: "Competitive Pricing",
    description: "Tailored FTL/LTL tier arrangements and smart cargo consolidation translate to direct transportation savings for your business.",
    icon: "TrendingUp"
  },
  {
    title: "Experienced Team",
    description: "Vetted Class-A commercial drivers, tech-enabled dispatchers, and helpful Silicon Valley based support operators based in Sunnyvale.",
    icon: "Users"
  }
];
