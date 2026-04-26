"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Check,
  Star,
  Package,
  Loader2,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface Service {
  id: number;
  name: string;
  price: number;
  unit: string;
}

interface ServicePackage {
  id: number;
  name: string;
  price: number;
  features: string[];
  popular: boolean;
}

const initialServices: Service[] = [
  { id: 1, name: "Pre-Wedding Shoot", price: 25000, unit: "per session" },
  { id: 2, name: "Wedding Day Photography", price: 75000, unit: "per day" },
  { id: 3, name: "Cinematic Video", price: 100000, unit: "per event" },
  { id: 4, name: "Drone Coverage", price: 15000, unit: "per day" },
  { id: 5, name: "Photo Album (50 pages)", price: 12000, unit: "per album" },
];

const initialPackages: ServicePackage[] = [
  {
    id: 1,
    name: "Silver Package",
    price: 125000,
    features: [
      "Wedding Day Photography",
      "200+ Edited Photos",
      "Online Gallery",
      "1 Photographer",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Gold Package",
    price: 250000,
    features: [
      "Pre-Wedding + Wedding Day",
      "500+ Edited Photos",
      "Cinematic Highlight Reel",
      "2 Photographers + Videographer",
      "Photo Album (30 pages)",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Platinum Package",
    price: 450000,
    features: [
      "Full Event Coverage (2 days)",
      "1000+ Edited Photos",
      "Full Cinematic Film",
      "Drone Coverage",
      "3 Photographers + 2 Videographers",
      "Premium Photo Album (60 pages)",
      "Same-Day Edit",
    ],
    popular: false,
  },
];

const unitOptions = ["per session", "per day", "per event", "per hour", "per album", "per person", "fixed"];

export default function VendorServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [packages, setPackages] = useState<ServicePackage[]>(initialPackages);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [editingService, setEditingService] = useState<number | null>(null);

  // Service form state
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceUnit, setServiceUnit] = useState("per session");

  // Package form state
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageFeatures, setPackageFeatures] = useState("");
  const [packagePopular, setPackagePopular] = useState(false);

  const resetServiceForm = () => {
    setServiceName("");
    setServicePrice("");
    setServiceUnit("per session");
    setEditingService(null);
    setShowServiceForm(false);
  };

  const handleAddService = () => {
    if (!serviceName || !servicePrice) return;
    if (editingService !== null) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService
            ? { ...s, name: serviceName, price: Number(servicePrice), unit: serviceUnit }
            : s
        )
      );
    } else {
      setServices((prev) => [
        ...prev,
        { id: Date.now(), name: serviceName, price: Number(servicePrice), unit: serviceUnit },
      ]);
    }
    resetServiceForm();
  };

  const handleEditService = (service: Service) => {
    setServiceName(service.name);
    setServicePrice(String(service.price));
    setServiceUnit(service.unit);
    setEditingService(service.id);
    setShowServiceForm(true);
  };

  const handleDeleteService = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddPackage = () => {
    if (!packageName || !packagePrice) return;
    setPackages((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: packageName,
        price: Number(packagePrice),
        features: packageFeatures.split(",").map((f) => f.trim()).filter(Boolean),
        popular: packagePopular,
      },
    ]);
    setPackageName("");
    setPackagePrice("");
    setPackageFeatures("");
    setPackagePopular(false);
    setShowPackageForm(false);
  };

  const handleDeletePackage = (id: number) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
          Services & Packages
        </h1>
        <p className="text-slate mt-1">Manage your offerings to attract the right couples.</p>
      </div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl card-shadow mb-8"
      >
        <div className="flex items-center justify-between p-5 border-b border-ivory-dark">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal">
            Services
          </h2>
          <button
            onClick={() => {
              resetServiceForm();
              setShowServiceForm(true);
            }}
            className="flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-white px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>

        {/* Inline Add/Edit Form */}
        <AnimatePresence>
          {showServiceForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 bg-ivory/50 border-b border-ivory-dark">
                <div className="grid sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="Service name"
                    aria-label="Service name"
                    className="rounded-xl border border-ivory-dark bg-white px-3.5 py-2 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold sm:col-span-1"
                  />
                  <input
                    type="number"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    placeholder="Price (₹)"
                    aria-label="Service price"
                    className="rounded-xl border border-ivory-dark bg-white px-3.5 py-2 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                  />
                  <select
                    value={serviceUnit}
                    onChange={(e) => setServiceUnit(e.target.value)}
                    aria-label="Pricing unit"
                    className="rounded-xl border border-ivory-dark bg-white px-3.5 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold cursor-pointer"
                  >
                    {unitOptions.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddService}
                      aria-label={editingService ? "Update service" : "Add service"}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-sage hover:bg-sage/90 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer py-2"
                    >
                      <Check size={16} />
                      {editingService ? "Update" : "Add"}
                    </button>
                    <button
                      onClick={resetServiceForm}
                      aria-label="Cancel"
                      className="px-3 py-2 rounded-xl border border-ivory-dark text-slate hover:bg-ivory-dark transition-colors cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Services Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ivory-dark text-left">
                <th className="px-5 py-3 text-slate font-medium">Service Name</th>
                <th className="px-5 py-3 text-slate font-medium">Price</th>
                <th className="px-5 py-3 text-slate font-medium hidden sm:table-cell">Unit</th>
                <th className="px-5 py-3 text-slate font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-ivory/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-charcoal">{service.name}</td>
                  <td className="px-5 py-3.5 text-charcoal">{formatPrice(service.price)}</td>
                  <td className="px-5 py-3.5 text-slate hidden sm:table-cell">{service.unit}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleEditService(service)}
                        className="p-1.5 rounded-lg text-slate hover:text-gold hover:bg-gold/10 transition-colors cursor-pointer"
                        aria-label="Edit"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="p-1.5 rounded-lg text-slate hover:text-rose hover:bg-rose/10 transition-colors cursor-pointer"
                        aria-label="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Packages Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal">
            Packages
          </h2>
          <button
            onClick={() => setShowPackageForm(true)}
            className="flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-white px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Add Package
          </button>
        </div>

        {/* Package Form */}
        <AnimatePresence>
          {showPackageForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl p-5 card-shadow mb-6"
            >
              <h3 className="text-sm font-semibold text-charcoal mb-4">New Package</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="Package name"
                  aria-label="Package name"
                  className="rounded-xl border border-ivory-dark bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                />
                <input
                  type="number"
                  value={packagePrice}
                  onChange={(e) => setPackagePrice(e.target.value)}
                  placeholder="Price (₹)"
                  aria-label="Package price"
                  className="rounded-xl border border-ivory-dark bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                />
              </div>
              <textarea
                value={packageFeatures}
                onChange={(e) => setPackageFeatures(e.target.value)}
                placeholder="Features (comma-separated, e.g. Wedding Photos, Drone, Album)"
                aria-label="Package features"
                rows={3}
                className="w-full rounded-xl border border-ivory-dark bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none mb-4"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={packagePopular}
                    onChange={(e) => setPackagePopular(e.target.checked)}
                    className="w-4 h-4 rounded border-ivory-dark text-gold focus:ring-gold/30 cursor-pointer accent-gold"
                  />
                  <span className="text-sm text-charcoal">Mark as Popular</span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPackageForm(false)}
                    className="px-4 py-2 rounded-xl border border-ivory-dark text-slate text-sm hover:bg-ivory-dark transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPackage}
                    className="flex items-center gap-1.5 bg-sage hover:bg-sage/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                  >
                    <Check size={16} />
                    Add Package
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              layout
              className={cn(
                "relative bg-white rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-shadow",
                pkg.popular && "ring-2 ring-gold"
              )}
            >
              {pkg.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gold text-white text-[11px] font-semibold px-3 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={10} className="fill-current" />
                  Popular
                </span>
              )}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal">
                    {pkg.name}
                  </h3>
                  <p className="text-2xl font-bold text-gold mt-1">{formatPrice(pkg.price)}</p>
                </div>
                <button
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="p-1.5 rounded-lg text-slate hover:text-rose hover:bg-rose/10 transition-colors cursor-pointer"
                  aria-label="Delete package"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <ul className="space-y-2 mt-4">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate">
                    <Check size={14} className="text-sage shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
