"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Calendar,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Users,
  IndianRupee,
  Search,
  Filter,
} from "lucide-react";
import { cn, formatDate, formatPrice, timeAgo, getInitials } from "@/lib/utils";

type LeadStatus = "NEW" | "CONTACTED" | "NEGOTIATING" | "BOOKED" | "CLOSED";

interface Lead {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vendorName: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budget: number;
  status: LeadStatus;
  message: string;
  createdAt: string;
}

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  NEW: { label: "New", className: "bg-gold/10 text-gold" },
  CONTACTED: { label: "Contacted", className: "bg-blue-50 text-blue-600" },
  NEGOTIATING: { label: "Negotiating", className: "bg-purple-50 text-purple-600" },
  BOOKED: { label: "Booked", className: "bg-sage/10 text-sage" },
  CLOSED: { label: "Closed", className: "bg-slate/10 text-slate" },
};

const sampleLeads: Lead[] = [
  { id: 1, customerName: "Priya Sharma", customerEmail: "priya@email.com", customerPhone: "+91 98765 43210", vendorName: "Royal Celebrations Studio", eventType: "Wedding", eventDate: "2026-12-15", guestCount: "200 - 500", budget: 500000, status: "NEW", message: "Looking for wedding photography coverage for our December wedding.", createdAt: "2026-04-27T10:30:00" },
  { id: 2, customerName: "Rahul Gupta", customerEmail: "rahul@email.com", customerPhone: "+91 87654 32109", vendorName: "Dream Venues", eventType: "Engagement", eventDate: "2026-06-20", guestCount: "100 - 200", budget: 300000, status: "CONTACTED", message: "Need a venue for engagement ceremony in South Delhi.", createdAt: "2026-04-26T14:20:00" },
  { id: 3, customerName: "Ananya Reddy", customerEmail: "ananya@email.com", customerPhone: "+91 76543 21098", vendorName: "Royal Celebrations Studio", eventType: "Wedding", eventDate: "2026-11-08", guestCount: "500 - 1000", budget: 800000, status: "NEGOTIATING", message: "Grand wedding at a palace venue. Need full coverage.", createdAt: "2026-04-25T09:15:00" },
  { id: 4, customerName: "Vikram Singh", customerEmail: "vikram@email.com", customerPhone: "+91 65432 10987", vendorName: "Elegant Decors", eventType: "Wedding", eventDate: "2026-10-22", guestCount: "200 - 500", budget: 450000, status: "BOOKED", message: "Destination wedding decoration in Udaipur.", createdAt: "2026-04-24T16:45:00" },
  { id: 5, customerName: "Meera Patel", customerEmail: "meera@email.com", customerPhone: "+91 54321 09876", vendorName: "Glamour Makeover Studio", eventType: "Wedding", eventDate: "2026-09-05", guestCount: "100 - 200", budget: 150000, status: "NEW", message: "Looking for bridal makeup and hair styling.", createdAt: "2026-04-23T11:00:00" },
  { id: 6, customerName: "Karan Malhotra", customerEmail: "karan@email.com", customerPhone: "+91 43210 98765", vendorName: "Melody DJs", eventType: "Sangeet", eventDate: "2026-08-18", guestCount: "200 - 500", budget: 200000, status: "CONTACTED", message: "Need a DJ and sound system for our sangeet night.", createdAt: "2026-04-22T08:30:00" },
  { id: 7, customerName: "Ishita Kapoor", customerEmail: "ishita@email.com", customerPhone: "+91 32109 87654", vendorName: "Bliss Wedding Planners", eventType: "Wedding", eventDate: "2026-12-01", guestCount: "200 - 500", budget: 1500000, status: "NEGOTIATING", message: "Full destination wedding planning for Goa wedding.", createdAt: "2026-04-21T13:20:00" },
  { id: 8, customerName: "Roshni Joshi", customerEmail: "roshni@email.com", customerPhone: "+91 21098 76543", vendorName: "Shubh Vivah Caterers", eventType: "Wedding", eventDate: "2026-12-28", guestCount: "500 - 1000", budget: 600000, status: "NEW", message: "Rajasthani cuisine for 700+ guest wedding.", createdAt: "2026-04-20T17:10:00" },
  { id: 9, customerName: "Arjun Nair", customerEmail: "arjun@email.com", customerPhone: "+91 10987 65432", vendorName: "Mehndi Magic", eventType: "Mehendi", eventDate: "2026-09-12", guestCount: "50 - 100", budget: 75000, status: "BOOKED", message: "Bridal mehendi for the bride and 20 guests.", createdAt: "2026-04-19T10:00:00" },
  { id: 10, customerName: "Tanya Bhatia", customerEmail: "tanya@email.com", customerPhone: "+91 09876 54321", vendorName: "Dream Venues", eventType: "Reception", eventDate: "2026-10-05", guestCount: "500 - 1000", budget: 800000, status: "CLOSED", message: "Venue booking for grand reception. Customer chose another vendor.", createdAt: "2026-04-18T15:30:00" },
];

const tabs = [
  { label: "All", value: "ALL" },
  { label: "New", value: "NEW" },
  { label: "Contacted", value: "CONTACTED" },
  { label: "Negotiating", value: "NEGOTIATING" },
  { label: "Booked", value: "BOOKED" },
  { label: "Closed", value: "CLOSED" },
] as const;

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredLeads = sampleLeads
    .filter((l) => activeTab === "ALL" || l.status === activeTab)
    .filter(
      (l) =>
        l.customerName.toLowerCase().includes(search.toLowerCase()) ||
        l.vendorName.toLowerCase().includes(search.toLowerCase()) ||
        l.eventType.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
            All Leads
          </h1>
          <p className="text-slate mt-1">
            Monitor all lead activity across the platform.
          </p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full sm:w-64 rounded-xl border border-ivory-dark bg-white pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const count =
            tab.value === "ALL"
              ? sampleLeads.length
              : sampleLeads.filter((l) => l.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors cursor-pointer",
                activeTab === tab.value
                  ? "bg-rose text-white"
                  : "bg-white text-slate hover:bg-ivory-dark hover:text-charcoal"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "text-[11px] px-1.5 py-0.5 rounded-full",
                  activeTab === tab.value
                    ? "bg-white/20 text-white"
                    : "bg-ivory-dark text-slate"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ivory-dark text-left bg-ivory/30">
                <th className="px-5 py-3.5 text-slate font-medium">Customer</th>
                <th className="px-5 py-3.5 text-slate font-medium hidden md:table-cell">Vendor</th>
                <th className="px-5 py-3.5 text-slate font-medium hidden sm:table-cell">Event</th>
                <th className="px-5 py-3.5 text-slate font-medium">Status</th>
                <th className="px-5 py-3.5 text-slate font-medium hidden lg:table-cell">Date</th>
                <th className="px-5 py-3.5 text-slate font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {filteredLeads.map((lead) => {
                const expanded = expandedId === lead.id;
                return (
                  <motion.tr
                    key={lead.id}
                    layout
                    className="hover:bg-ivory/30 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expanded ? null : lead.id)}
                  >
                    <td className="px-5 py-3.5" colSpan={expanded ? 6 : 1}>
                      {expanded ? (
                        <div>
                          {/* Expanded header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center text-sm font-semibold text-charcoal">
                                {getInitials(lead.customerName)}
                              </div>
                              <div>
                                <p className="font-semibold text-charcoal">{lead.customerName}</p>
                                <p className="text-xs text-slate">
                                  to {lead.vendorName} · {lead.eventType}
                                </p>
                              </div>
                            </div>
                            <span
                              className={cn(
                                "text-[11px] font-medium px-2 py-0.5 rounded-full",
                                statusConfig[lead.status].className
                              )}
                            >
                              {statusConfig[lead.status].label}
                            </span>
                          </div>

                          {/* Details grid */}
                          <div className="grid sm:grid-cols-4 gap-4 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar size={14} className="text-rose shrink-0" />
                              <div>
                                <p className="text-[11px] text-slate uppercase tracking-wider">Event Date</p>
                                <p className="text-charcoal font-medium">{formatDate(lead.eventDate)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users size={14} className="text-rose shrink-0" />
                              <div>
                                <p className="text-[11px] text-slate uppercase tracking-wider">Guests</p>
                                <p className="text-charcoal font-medium">{lead.guestCount}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <IndianRupee size={14} className="text-rose shrink-0" />
                              <div>
                                <p className="text-[11px] text-slate uppercase tracking-wider">Budget</p>
                                <p className="text-charcoal font-medium">{formatPrice(lead.budget)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar size={14} className="text-rose shrink-0" />
                              <div>
                                <p className="text-[11px] text-slate uppercase tracking-wider">Created</p>
                                <p className="text-charcoal font-medium">{timeAgo(lead.createdAt)}</p>
                              </div>
                            </div>
                          </div>

                          {/* Message */}
                          <div className="bg-ivory/50 rounded-xl p-3 mb-3">
                            <p className="text-sm text-charcoal">{lead.message}</p>
                          </div>

                          {/* Contact */}
                          <div className="flex items-center gap-4 text-sm">
                            <a
                              href={`tel:${lead.customerPhone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 text-rose hover:text-rose-dark transition-colors"
                            >
                              <Phone size={14} />
                              {lead.customerPhone}
                            </a>
                            <a
                              href={`mailto:${lead.customerEmail}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 text-rose hover:text-rose-dark transition-colors"
                            >
                              <Mail size={14} />
                              {lead.customerEmail}
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-xs font-semibold text-charcoal shrink-0">
                            {getInitials(lead.customerName)}
                          </div>
                          <span className="font-medium text-charcoal truncate">{lead.customerName}</span>
                        </div>
                      )}
                    </td>
                    {!expanded && (
                      <>
                        <td className="px-5 py-3.5 text-slate hidden md:table-cell truncate max-w-[150px]">
                          {lead.vendorName}
                        </td>
                        <td className="px-5 py-3.5 text-slate hidden sm:table-cell">{lead.eventType}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className={cn(
                              "text-[11px] font-medium px-2 py-0.5 rounded-full",
                              statusConfig[lead.status].className
                            )}
                          >
                            {statusConfig[lead.status].label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate text-xs hidden lg:table-cell">
                          {timeAgo(lead.createdAt)}
                        </td>
                        <td className="px-5 py-3.5">
                          <ChevronDown size={14} className="text-slate" />
                        </td>
                      </>
                    )}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare size={32} className="text-slate mx-auto mb-3" />
            <p className="text-slate text-sm">No leads found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
