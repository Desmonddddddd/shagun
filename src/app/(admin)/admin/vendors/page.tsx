"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
  Star,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Globe,
  Eye,
  Loader2,
} from "lucide-react";
import { cn, formatDate, getInitials } from "@/lib/utils";
import Skeleton from "@/components/ui/Skeleton";

type VendorStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

interface Vendor {
  id: string;
  businessName: string;
  category: { name: string; slug: string };
  city: { name: string };
  rating: number;
  reviewCount: number;
  status: VendorStatus;
  createdAt: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  description: string;
  experience: number | null;
  user: { name: string | null; email: string };
}

const statusConfig: Record<VendorStatus, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-gold/10 text-gold" },
  APPROVED: { label: "Approved", className: "bg-sage/10 text-sage" },
  REJECTED: { label: "Rejected", className: "bg-rose/10 text-rose" },
  SUSPENDED: { label: "Suspended", className: "bg-amber-50 text-amber-600" },
};

const tabs = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Suspended", value: "SUSPENDED" },
] as const;

function VendorsSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Skeleton width="240px" height="32px" variant="rectangular" />
          <div className="mt-2">
            <Skeleton width="320px" height="16px" />
          </div>
        </div>
        <Skeleton variant="rectangular" width="256px" height="42px" />
      </div>
      <div className="flex items-center gap-1.5 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" width="90px" height="36px" />
        ))}
      </div>
      <Skeleton variant="rectangular" height="500px" />
    </div>
  );
}

export default function AdminVendorsPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/vendors?limit=100");
        const data = await res.json();
        if (data.success) {
          setVendors(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch vendors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const filteredVendors = vendors
    .filter((v) => activeTab === "ALL" || v.status === activeTab)
    .filter(
      (v) =>
        v.businessName.toLowerCase().includes(search.toLowerCase()) ||
        v.category.name.toLowerCase().includes(search.toLowerCase()) ||
        v.city.name.toLowerCase().includes(search.toLowerCase())
    );

  const handleStatusChange = async (vendorId: string, newStatus: VendorStatus) => {
    setUpdatingId(vendorId);
    try {
      const res = await fetch("/api/admin/vendors", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setVendors((prev) =>
          prev.map((v) => (v.id === vendorId ? { ...v, status: newStatus } : v))
        );
        if (selectedVendor?.id === vendorId) {
          setSelectedVendor((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      } else {
        console.error("Failed to update vendor status:", data.error);
      }
    } catch (err) {
      console.error("Failed to update vendor status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <VendorsSkeleton />;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
            Vendor Management
          </h1>
          <p className="text-slate mt-1">Review, approve, and manage vendors on the platform.</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors..."
            aria-label="Search vendors"
            className="w-full sm:w-64 rounded-xl border border-ivory-dark bg-white pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose transition-colors"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1" role="tablist">
        {tabs.map((tab) => {
          const count =
            tab.value === "ALL"
              ? vendors.length
              : vendors.filter((v) => v.status === tab.value).length;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeTab === tab.value}
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

      {/* Table */}
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ivory-dark text-left bg-ivory/30">
                <th scope="col" className="px-5 py-3.5 text-slate font-medium">Business Name</th>
                <th scope="col" className="px-5 py-3.5 text-slate font-medium hidden md:table-cell">Category</th>
                <th scope="col" className="px-5 py-3.5 text-slate font-medium hidden sm:table-cell">City</th>
                <th scope="col" className="px-5 py-3.5 text-slate font-medium hidden lg:table-cell">Rating</th>
                <th scope="col" className="px-5 py-3.5 text-slate font-medium">Status</th>
                <th scope="col" className="px-5 py-3.5 text-slate font-medium hidden lg:table-cell">Date</th>
                <th scope="col" className="px-5 py-3.5 text-slate font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-ivory flex items-center justify-center text-xs font-semibold text-charcoal shrink-0">
                        {getInitials(vendor.businessName)}
                      </div>
                      <span className="font-medium text-charcoal truncate max-w-[180px]">
                        {vendor.businessName}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate hidden md:table-cell">{vendor.category.name}</td>
                  <td className="px-5 py-3.5 text-slate hidden sm:table-cell">{vendor.city.name}</td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    {vendor.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star size={13} className="fill-gold text-gold" />
                        <span className="text-charcoal font-medium">{vendor.rating}</span>
                        <span className="text-slate text-xs">({vendor.reviewCount})</span>
                      </div>
                    ) : (
                      <span className="text-slate text-xs">No reviews</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "text-[11px] font-medium px-2 py-0.5 rounded-full",
                        statusConfig[vendor.status]?.className || "bg-slate/10 text-slate"
                      )}
                    >
                      {statusConfig[vendor.status]?.label || vendor.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate text-xs hidden lg:table-cell">
                    {formatDate(vendor.createdAt)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {updatingId === vendor.id && (
                        <Loader2 size={14} className="animate-spin text-gold" />
                      )}
                      <button
                        onClick={() => setSelectedVendor(vendor)}
                        className="p-1.5 rounded-lg text-slate hover:text-charcoal hover:bg-ivory-dark transition-colors cursor-pointer"
                        aria-label="View Details"
                      >
                        <Eye size={15} />
                      </button>
                      {(vendor.status === "PENDING" || vendor.status === "SUSPENDED") && (
                        <button
                          onClick={() => handleStatusChange(vendor.id, "APPROVED")}
                          disabled={updatingId === vendor.id}
                          className="p-1.5 rounded-lg text-sage hover:bg-sage/10 transition-colors cursor-pointer disabled:opacity-60"
                          aria-label="Approve"
                        >
                          <CheckCircle size={15} />
                        </button>
                      )}
                      {(vendor.status === "PENDING" || vendor.status === "APPROVED") && (
                        <button
                          onClick={() => handleStatusChange(vendor.id, "REJECTED")}
                          disabled={updatingId === vendor.id}
                          className="p-1.5 rounded-lg text-rose hover:bg-rose/10 transition-colors cursor-pointer disabled:opacity-60"
                          aria-label="Reject"
                        >
                          <XCircle size={15} />
                        </button>
                      )}
                      {vendor.status === "APPROVED" && (
                        <button
                          onClick={() => handleStatusChange(vendor.id, "SUSPENDED")}
                          disabled={updatingId === vendor.id}
                          className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer disabled:opacity-60"
                          aria-label="Suspend"
                        >
                          <AlertTriangle size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <Store size={32} className="text-slate mx-auto mb-3" />
            <p className="text-slate text-sm">No vendors found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Vendor Detail Modal */}
      <AnimatePresence>
        {selectedVendor && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50"
              onClick={() => setSelectedVendor(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedVendor ? `${selectedVendor.businessName} details` : "Vendor details"}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-y-auto max-h-[90vh]"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-ivory flex items-center justify-center text-sm font-bold text-charcoal">
                      {getInitials(selectedVendor.businessName)}
                    </div>
                    <div>
                      <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal">
                        {selectedVendor.businessName}
                      </h2>
                      <span
                        className={cn(
                          "text-[11px] font-medium px-2 py-0.5 rounded-full",
                          statusConfig[selectedVendor.status]?.className || "bg-slate/10 text-slate"
                        )}
                      >
                        {statusConfig[selectedVendor.status]?.label || selectedVendor.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVendor(null)}
                    className="p-1.5 rounded-lg text-slate hover:text-charcoal hover:bg-ivory-dark transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-sm text-slate mb-5">{selectedVendor.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Store size={15} className="text-gold shrink-0" />
                    <span className="text-slate">Category:</span>
                    <span className="text-charcoal font-medium">{selectedVendor.category.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <MapPin size={15} className="text-gold shrink-0" />
                    <span className="text-slate">City:</span>
                    <span className="text-charcoal font-medium">{selectedVendor.city.name}</span>
                  </div>
                  {selectedVendor.experience != null && selectedVendor.experience > 0 && (
                    <div className="flex items-center gap-2.5 text-sm">
                      <Calendar size={15} className="text-gold shrink-0" />
                      <span className="text-slate">Experience:</span>
                      <span className="text-charcoal font-medium">{selectedVendor.experience} years</span>
                    </div>
                  )}
                  {selectedVendor.rating > 0 && (
                    <div className="flex items-center gap-2.5 text-sm">
                      <Star size={15} className="text-gold fill-gold shrink-0" />
                      <span className="text-slate">Rating:</span>
                      <span className="text-charcoal font-medium">
                        {selectedVendor.rating} ({selectedVendor.reviewCount} reviews)
                      </span>
                    </div>
                  )}
                  {selectedVendor.phone && (
                    <div className="flex items-center gap-2.5 text-sm">
                      <Phone size={15} className="text-gold shrink-0" />
                      <span className="text-charcoal">{selectedVendor.phone}</span>
                    </div>
                  )}
                  {selectedVendor.email && (
                    <div className="flex items-center gap-2.5 text-sm">
                      <Mail size={15} className="text-gold shrink-0" />
                      <span className="text-charcoal">{selectedVendor.email}</span>
                    </div>
                  )}
                  {selectedVendor.website && (
                    <div className="flex items-center gap-2.5 text-sm">
                      <Globe size={15} className="text-gold shrink-0" />
                      <span className="text-charcoal">{selectedVendor.website}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5 text-sm">
                    <Calendar size={15} className="text-gold shrink-0" />
                    <span className="text-slate">Registered:</span>
                    <span className="text-charcoal font-medium">{formatDate(selectedVendor.createdAt)}</span>
                  </div>
                  {selectedVendor.user && (
                    <div className="flex items-center gap-2.5 text-sm">
                      <Mail size={15} className="text-gold shrink-0" />
                      <span className="text-slate">Owner:</span>
                      <span className="text-charcoal font-medium">
                        {selectedVendor.user.name || selectedVendor.user.email}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-ivory-dark">
                  {updatingId === selectedVendor.id && (
                    <div className="flex items-center gap-1.5 text-sm text-gold">
                      <Loader2 size={14} className="animate-spin" />
                      Updating...
                    </div>
                  )}
                  {(selectedVendor.status === "PENDING" || selectedVendor.status === "SUSPENDED") && (
                    <button
                      onClick={() => handleStatusChange(selectedVendor.id, "APPROVED")}
                      disabled={updatingId === selectedVendor.id}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-sage hover:bg-sage/90 text-white py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                  )}
                  {(selectedVendor.status === "PENDING" || selectedVendor.status === "APPROVED") && (
                    <button
                      onClick={() => handleStatusChange(selectedVendor.id, "REJECTED")}
                      disabled={updatingId === selectedVendor.id}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-rose hover:bg-rose-dark text-white py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  )}
                  {selectedVendor.status === "APPROVED" && (
                    <button
                      onClick={() => handleStatusChange(selectedVendor.id, "SUSPENDED")}
                      disabled={updatingId === selectedVendor.id}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <AlertTriangle size={16} />
                      Suspend
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
