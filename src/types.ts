export interface Shipment {
  trackingNumber: string;
  status: "In Transit" | "Delivered" | "Pending Pickup" | "Exception";
  recipient: string;
  origin: string;
  destination: string;
  estDelivery: string;
  carrier: string;
  lastUpdated: string;
  freightType: string;
  history: ShipmentHistory[];
}

export interface ShipmentHistory {
  date: string;
  location: string;
  description: string;
}

export interface Message {
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export type PageId = "home" | "about" | "services" | "contact" | "quote" | "tracker";

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  rating: number;
  comment: string;
  date: string;
}

export interface QuoteForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  pickup: string;
  delivery: string;
  freightType: string;
  details: string;
  notes: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ServiceDetail {
  title: string;
  description: string;
  benefits: string[];
  industries: string[];
  icon: string;
}
