"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  X,
  Image as ImageIcon,
  Video,
  GripVertical,
  Check,
  Link as LinkIcon,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: number;
  url: string;
  caption: string;
  type: "IMAGE" | "VIDEO";
}

const initialMedia: MediaItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    caption: "Grand Wedding Reception Setup",
    type: "IMAGE",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
    caption: "Bridal Portrait Session",
    type: "IMAGE",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop",
    caption: "Couple Pre-Wedding Shoot",
    type: "IMAGE",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
    caption: "Wedding Ceremony Highlights",
    type: "VIDEO",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop",
    caption: "Mehendi Ceremony",
    type: "IMAGE",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1600577916048-804c9191e36c?w=600&h=400&fit=crop",
    caption: "Sangeet Night Performance",
    type: "IMAGE",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop",
    caption: "Mandap Decoration",
    type: "IMAGE",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop",
    caption: "Full Wedding Film",
    type: "VIDEO",
  },
];

export default function VendorPortfolioPage() {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [showForm, setShowForm] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newType, setNewType] = useState<"IMAGE" | "VIDEO">("IMAGE");

  const handleAdd = () => {
    if (!newUrl) return;
    setMedia((prev) => [
      ...prev,
      {
        id: Date.now(),
        url: newUrl,
        caption: newCaption || "Untitled",
        type: newType,
      },
    ]);
    setNewUrl("");
    setNewCaption("");
    setNewType("IMAGE");
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
            Portfolio
          </h1>
          <p className="text-slate mt-1">
            Showcase your best work to attract couples. {media.length} items in your gallery.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer shrink-0"
        >
          <Plus size={16} />
          Add Media
        </button>
      </div>

      {/* Add Media Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl p-6 card-shadow mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-charcoal">Add New Media</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-lg text-slate hover:text-charcoal hover:bg-ivory-dark transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate" />
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Image or video URL"
                  className="w-full rounded-xl border border-ivory-dark bg-white pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                />
              </div>
              <div className="relative">
                <Type size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate" />
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Caption"
                  className="w-full rounded-xl border border-ivory-dark bg-white pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mediaType"
                    checked={newType === "IMAGE"}
                    onChange={() => setNewType("IMAGE")}
                    className="accent-gold cursor-pointer"
                  />
                  <ImageIcon size={14} className="text-slate" />
                  <span className="text-sm text-charcoal">Image</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mediaType"
                    checked={newType === "VIDEO"}
                    onChange={() => setNewType("VIDEO")}
                    className="accent-gold cursor-pointer"
                  />
                  <Video size={14} className="text-slate" />
                  <span className="text-sm text-charcoal">Video</span>
                </label>
              </div>
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 bg-sage hover:bg-sage/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                <Check size={16} />
                Add to Portfolio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag to reorder hint */}
      <div className="flex items-center gap-2 text-xs text-slate mb-4 bg-ivory-dark/50 px-4 py-2 rounded-xl">
        <GripVertical size={14} />
        <span>Drag and drop support coming soon — reorder your media to highlight your best work first.</span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-shadow"
          >
            {/* Image */}
            <div className="aspect-[4/3] relative overflow-hidden bg-ivory-dark">
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Type Badge */}
              <span
                className={cn(
                  "absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm",
                  item.type === "VIDEO"
                    ? "bg-rose/80 text-white"
                    : "bg-charcoal/60 text-white"
                )}
              >
                {item.type === "VIDEO" ? (
                  <span className="flex items-center gap-1">
                    <Video size={10} />
                    VIDEO
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <ImageIcon size={10} />
                    IMAGE
                  </span>
                )}
              </span>

              {/* Delete overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors flex items-center justify-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-2.5 bg-white/90 rounded-full text-rose hover:bg-white transition-all cursor-pointer shadow-lg"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Caption */}
            <div className="px-3 py-2.5">
              <p className="text-sm text-charcoal font-medium truncate">{item.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {media.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-ivory-dark rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon size={28} className="text-slate" />
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-1">
            No media yet
          </h3>
          <p className="text-slate text-sm mb-4">
            Add photos and videos to showcase your work.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Add Your First Media
          </button>
        </div>
      )}
    </div>
  );
}
