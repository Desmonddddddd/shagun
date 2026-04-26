"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Calendar,
  Users,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
import { cn, formatDate, formatPrice, timeAgo } from "@/lib/utils";
import Skeleton from "@/components/ui/Skeleton";

type LeadStatus = "NEW" | "CONTACTED" | "NEGOTIATING" | "BOOKED" | "CLOSED";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string | null;
  eventDate: string | null;
  guestCount: string | null;
  budget: string | null;
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

const allStatuses: LeadStatus[] = ["NEW", "CONTACTED", "NEGOTIATING", "BOOKED", "CLOSED"];

const tabs = [
  { label: "All", value: "ALL" },
  { label: "New", value: "NEW" },
  { label: "Contacted", value: "CONTACTED" },
  { label: "Negotiating", value: "NEGOTIATING" },
  { label: "Booked", value: "BOOKED" },
  { label: "Closed", value: "CLOSED" },
] as const;

function LeadsSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Skeleton width="120px" height="32px" variant="rectangular" />
        <div className="mt-2">
          <Skeleton width="340px" height="16px" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" width="80px" height="36px" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height="72px" />
        ))}
      </div>
    </div>
  );
}

export default function VendorLeadsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchLeads = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/leads?userId=${session.user.id}&limit=100`);
        const data = await res.json();
        if (data.success) {
          setLeads(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [session?.user?.id]);

  const filteredLeads =
    activeTab === "ALL" ? leads : leads.filter((l) => l.status === activeTab);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      } else {
        console.error("Failed to update lead status:", data.error);
      }
    } catch (err) {
      console.error("Failed to update lead status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading || !session) {
    return <LeadsSkeleton />;
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
          Leads
        </h1>
        <p className="text-slate mt-1">
          Manage your inquiries and convert them into bookings.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1 scrollbar-none" role="tablist">
        {tabs.map((tab) => {
          const count =
            tab.value === "ALL"
              ? leads.length
              : leads.filter((l) => l.status === tab.value).length;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors cursor-pointer",
                activeTab === tab.value
                  ? "bg-gold text-white"
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

      {/* Leads List */}
      <div className="space-y-3">
        {filteredLeads.map((lead) => {
          const expanded = expandedId === lead.id;
          return (
            <motion.div
              key={lead.id}
              layout
              className="bg-white rounded-2xl card-shadow overflow-hidden"
            >
              {/* Lead Row */}
              <button
                onClick={() => setExpandedId(expanded ? null : lead.id)}
                aria-expanded={expanded}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left cursor-pointer hover:bg-ivory/30 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center text-sm font-semibold text-charcoal shrink-0">
                    {lead.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-charcoal truncate">{lead.name}</p>
                      <span
                        className={cn(
                          "text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0",
                          statusConfig[lead.status]?.className || "bg-slate/10 text-slate"
                        )}
                      >
                        {statusConfig[lead.status]?.label || lead.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-slate">
                      <span>{lead.eventType || "General"}</span>
                      {lead.eventDate && (
                        <>
                          <span className="hidden sm:inline">·</span>
                          <span className="hidden sm:inline">{formatDate(lead.eventDate)}</span>
                        </>
                      )}
                      {lead.budget && (
                        <>
                          <span className="hidden md:inline">·</span>
                          <span className="hidden md:inline">{formatPrice(parseInt(lead.budget) || 0)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate hidden lg:block">{timeAgo(lead.createdAt)}</span>
                  {expanded ? (
                    <ChevronUp size={16} className="text-slate" />
                  ) : (
                    <ChevronDown size={16} className="text-slate" />
                  )}
                </div>
              </button>

              {/* Expanded Details */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-ivory-dark pt-4">
                      {/* Details grid */}
                      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={14} className="text-gold shrink-0" />
                          <div>
                            <p className="text-[11px] text-slate uppercase tracking-wider">Event Date</p>
                            <p className="text-charcoal font-medium">{lead.eventDate ? formatDate(lead.eventDate) : "Not specified"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users size={14} className="text-gold shrink-0" />
                          <div>
                            <p className="text-[11px] text-slate uppercase tracking-wider">Guests</p>
                            <p className="text-charcoal font-medium">{lead.guestCount || "Not specified"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <IndianRupee size={14} className="text-gold shrink-0" />
                          <div>
                            <p className="text-[11px] text-slate uppercase tracking-wider">Budget</p>
                            <p className="text-charcoal font-medium">{lead.budget ? formatPrice(parseInt(lead.budget) || 0) : "Not specified"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MessageSquare size={14} className="text-gold shrink-0" />
                          <div>
                            <p className="text-[11px] text-slate uppercase tracking-wider">Event</p>
                            <p className="text-charcoal font-medium">{lead.eventType || "General"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="bg-ivory/50 rounded-xl p-4 mb-4">
                        <p className="text-sm text-charcoal">{lead.message}</p>
                      </div>

                      {/* Contact + Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-4 text-sm">
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1.5 text-gold hover:text-gold-dark transition-colors"
                          >
                            <Phone size={14} />
                            {lead.phone}
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1.5 text-gold hover:text-gold-dark transition-colors"
                          >
                            <Mail size={14} />
                            {lead.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          {updatingId === lead.id && (
                            <Loader2 size={14} className="animate-spin text-gold" />
                          )}
                          <span className="text-xs text-slate">Status:</span>
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as LeadStatus)
                            }
                            disabled={updatingId === lead.id}
                            className="rounded-lg border border-ivory-dark bg-white px-2.5 py-1.5 text-xs font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 cursor-pointer disabled:opacity-60"
                          >
                            {allStatuses.map((s) => (
                              <option key={s} value={s}>
                                {statusConfig[s].label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-ivory-dark rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={28} className="text-slate" />
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-1">
            No leads found
          </h3>
          <p className="text-slate text-sm">
            {leads.length === 0
              ? "You haven't received any leads yet. They'll appear here once customers reach out."
              : "No leads match the selected filter."}
          </p>
        </div>
      )}
    </div>
  );
}
