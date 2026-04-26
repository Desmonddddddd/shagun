"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  Edit3,
  Check,
  X,
  Save,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  vendorCount: number;
  displayOrder: number;
}

const initialCategories: Category[] = [
  { id: 1, name: "Venues", slug: "venues", description: "Wedding halls, banquet spaces, resorts and destination venues", vendorCount: 234, displayOrder: 1 },
  { id: 2, name: "Photographers", slug: "photographers", description: "Wedding photography, candid shoots, and pre-wedding shoots", vendorCount: 189, displayOrder: 2 },
  { id: 3, name: "Videographers", slug: "videographers", description: "Cinematic wedding films, highlight reels, and live streaming", vendorCount: 145, displayOrder: 3 },
  { id: 4, name: "Caterers", slug: "caterers", description: "Multi-cuisine catering, live counters, and dessert bars", vendorCount: 167, displayOrder: 4 },
  { id: 5, name: "Decorators", slug: "decorators", description: "Floral decoration, mandap design, and event styling", vendorCount: 156, displayOrder: 5 },
  { id: 6, name: "Makeup Artists", slug: "makeup-artists", description: "Bridal makeup, hair styling, and beauty services", vendorCount: 198, displayOrder: 6 },
  { id: 7, name: "Mehendi Artists", slug: "mehendi-artists", description: "Bridal mehendi, Arabic designs, and custom patterns", vendorCount: 112, displayOrder: 7 },
  { id: 8, name: "DJs & Music", slug: "djs-music", description: "DJs, live bands, sangeet choreography, and sound systems", vendorCount: 89, displayOrder: 8 },
  { id: 9, name: "Wedding Planners", slug: "wedding-planners", description: "Full-service wedding planning and day-of coordination", vendorCount: 78, displayOrder: 9 },
  { id: 10, name: "Pandits", slug: "pandits", description: "Vedic ceremonies, wedding rituals, and pooja services", vendorCount: 65, displayOrder: 10 },
  { id: 11, name: "Bridal Wear", slug: "bridal-wear", description: "Designer lehengas, sarees, and custom bridal outfits", vendorCount: 134, displayOrder: 11 },
  { id: 12, name: "Groom Wear", slug: "groom-wear", description: "Sherwanis, suits, and custom groom outfits", vendorCount: 98, displayOrder: 12 },
  { id: 13, name: "Jewellery", slug: "jewellery", description: "Bridal jewellery, kundan sets, and rental options", vendorCount: 87, displayOrder: 13 },
  { id: 14, name: "Invitations", slug: "invitations", description: "Wedding cards, digital invites, and video invitations", vendorCount: 56, displayOrder: 14 },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const moveUp = (id: number) => {
    setCategories((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx <= 0) return prev;
      const next = [...prev];
      const tempOrder = next[idx].displayOrder;
      next[idx].displayOrder = next[idx - 1].displayOrder;
      next[idx - 1].displayOrder = tempOrder;
      [next[idx], next[idx - 1]] = [next[idx - 1], next[idx]];
      return next;
    });
  };

  const moveDown = (id: number) => {
    setCategories((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      const tempOrder = next[idx].displayOrder;
      next[idx].displayOrder = next[idx + 1].displayOrder;
      next[idx + 1].displayOrder = tempOrder;
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditDescription(category.description);
  };

  const saveEdit = async (id: number) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, description: editDescription } : c))
    );
    setEditingId(null);
    setSaving(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDescription("");
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
          Category Management
        </h1>
        <p className="text-slate mt-1">
          Organize and manage wedding service categories. {categories.length} categories total.
        </p>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl card-shadow overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ivory-dark text-left bg-ivory/30">
                <th className="px-5 py-3.5 text-slate font-medium w-12">#</th>
                <th className="px-5 py-3.5 text-slate font-medium">Name</th>
                <th className="px-5 py-3.5 text-slate font-medium hidden md:table-cell">Slug</th>
                <th className="px-5 py-3.5 text-slate font-medium hidden lg:table-cell">Description</th>
                <th className="px-5 py-3.5 text-slate font-medium text-center">Vendors</th>
                <th className="px-5 py-3.5 text-slate font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-5 py-3.5 text-slate font-medium">
                    {category.displayOrder}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-charcoal">{category.name}</span>
                  </td>
                  <td className="px-5 py-3.5 text-slate hidden md:table-cell">
                    <code className="text-xs bg-ivory-dark px-2 py-0.5 rounded">
                      {category.slug}
                    </code>
                  </td>
                  <td className="px-5 py-3.5 text-slate hidden lg:table-cell max-w-[250px]">
                    {editingId === category.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="flex-1 rounded-lg border border-ivory-dark bg-white px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(category.id)}
                          disabled={saving}
                          className="p-1 rounded-lg text-sage hover:bg-sage/10 transition-colors cursor-pointer"
                        >
                          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 rounded-lg text-slate hover:bg-ivory-dark transition-colors cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs truncate block">{category.description}</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="inline-flex items-center justify-center bg-ivory-dark text-charcoal text-xs font-medium px-2 py-0.5 rounded-full min-w-[36px]">
                      {category.vendorCount}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => moveUp(category.id)}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg text-slate hover:text-charcoal hover:bg-ivory-dark transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ChevronUp size={15} />
                      </button>
                      <button
                        onClick={() => moveDown(category.id)}
                        disabled={index === categories.length - 1}
                        className="p-1.5 rounded-lg text-slate hover:text-charcoal hover:bg-ivory-dark transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ChevronDown size={15} />
                      </button>
                      <button
                        onClick={() => startEdit(category)}
                        className="p-1.5 rounded-lg text-slate hover:text-rose hover:bg-rose/10 transition-colors cursor-pointer"
                        title="Edit description"
                      >
                        <Edit3 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
