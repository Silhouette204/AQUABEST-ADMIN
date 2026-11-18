export type ConversationRole = "customer" | "rider";
export type MessageStatus = "sent" | "read";

export interface Conversation {
  id: string;
  role: ConversationRole;
  name: string;
  preview: string;
  time: string;       // "10:43 AM"
  unread: number;
  isVip?: boolean;
  orderRef?: string;  // "#AB-1048"
}

export interface Message {
  id: string;
  from: "them" | "admin";
  text: string;
  time: string;
  status?: MessageStatus; // admin messages lang
}

export interface OrderSummary {
  id: string;
  summary: string;
  amount: number;
  payment: string;
}

export interface Review {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  orderId: string;
}

export interface RatingSummary {
  average: number;
  reviewCount: number;
}

export interface Audience {
  value: string;
  label: string;
  recipients: number;
}

// Hardcoded muna. Palitan ng API pag ready na ang backend.
export const DEFAULT_CONVERSATION_ID = "c1";
export const DEFAULT_AUDIENCE = "all";
export const THREAD_DATE_LABEL = "Today, November 5";
export const ANNOUNCEMENT_PLACEHOLDER =
  "Holiday advisory: Our station will be open from 8 AM to 5 PM on November 30. Place your orders early!";

export const CONVERSATIONS: Conversation[] = [
  { id: "c1", role: "customer", name: "Maria Santos", preview: "Can I receive it before noon?", time: "10:43 AM", unread: 2, isVip: true, orderRef: "#AB-1048" },
  { id: "c2", role: "customer", name: "Jose Dela Cruz", preview: "Thank you, received!", time: "10:32 AM", unread: 0 },
  { id: "c3", role: "customer", name: "Grace Aquino", preview: "Sorry, I was out earlier.", time: "10:10 AM", unread: 1 },
  { id: "c4", role: "customer", name: "Liza Mendoza", preview: "The water tastes great!", time: "9:48 AM", unread: 0 },
  { id: "r1", role: "rider", name: "Mark Villanueva", preview: "Customer for #AB-1042 is unavailable. Returning the gallon to the station.", time: "9:42 AM", unread: 1, orderRef: "#AB-1042" },
];

export const THREADS: Record<string, Message[]> = {
  c1: [
    { id: "m1", from: "them", text: "Hi! I just ordered 2 gallons of purified water. Can I receive it before noon?", time: "10:42 AM" },
    { id: "m2", from: "admin", text: "Good morning, Ma'am Maria! Yes, your order is scheduled for 11 AM–12 PM. We're assigning your rider now.", time: "10:43 AM", status: "read" },
    { id: "m3", from: "them", text: "Thank you! Please ask the rider to ring the doorbell. I have 2 empty gallons ready.", time: "10:43 AM" },
  ],
  c2: [{ id: "m4", from: "them", text: "Thank you, received!", time: "10:32 AM" }],
  c3: [{ id: "m5", from: "them", text: "Sorry, I was out earlier.", time: "10:10 AM" }],
  c4: [{ id: "m6", from: "them", text: "The water tastes great!", time: "9:48 AM" }],
  r1: [{ id: "m7", from: "them", text: "Customer for #AB-1042 is unavailable. Returning the gallon to the station.", time: "9:42 AM" }],
};

export const ORDER_SUMMARIES: Record<string, OrderSummary> = {
  "#AB-1048": { id: "#AB-1048", summary: "2 × Purified water", amount: 70, payment: "Cash on delivery" },
};

export const RATING_SUMMARY: RatingSummary = { average: 4.8, reviewCount: 126 };

export const REVIEWS: Review[] = [
  { id: "v1", customer: "Liza Mendoza", rating: 5, comment: "Fast delivery and very polite rider. Thank you!", date: "Today", orderId: "#AB-1044" },
  { id: "v2", customer: "Miguel Torres", rating: 5, comment: "Clean gallons, always on time. Highly recommended!", date: "Today", orderId: "#AB-1041" },
];

export const AUDIENCES: Audience[] = [
  { value: "all", label: "All customers", recipients: 248 },
  { value: "vip", label: "VIP members", recipients: 36 },
];

export const ROLE_LABEL: Record<ConversationRole, string> = { customer: "Customer", rider: "Rider" };
export const STATUS_LABEL: Record<MessageStatus, string> = { sent: "Sent", read: "Read" };

export const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

export const firstName = (name: string) => name.split(" ")[0] ?? name;
export const shortTime = (time: string) => time.replace(/\s?(AM|PM)$/i, ""); // "10:43 AM" → "10:43"

export const formatNumber = (n: number) => n.toLocaleString("en-US");
export const formatDecimal = (n: number) =>
  `₱${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;