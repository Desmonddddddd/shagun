"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Save,
  Loader2,
  CheckCircle,
  Building,
  Phone,
  Mail,
  Globe,
  MapPin,
  Briefcase,
  Users,
  IndianRupee,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/ui/Skeleton";

interface ProfileForm {
  businessName: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  category: string;
  city: string;
  experience: string;
  teamSize: string;
  startingPrice: string;
}

function InputField({
  label,
  name,
  type = "text",
  icon: Icon,
  placeholder,
  value,
  onChange,
  disabled,
}: {
  label: string;
  name: keyof ProfileForm;
  type?: string;
  icon?: React.ElementType;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  const inputId = `profile-${name}`;
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-charcoal mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate" />
        )}
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full rounded-xl border border-ivory-dark bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
            Icon && "pl-10",
            disabled && "opacity-60 cursor-not-allowed"
          )}
        />
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Skeleton width="200px" height="32px" variant="rectangular" />
        <div className="mt-2">
          <Skeleton width="360px" height="16px" />
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton variant="rectangular" height="280px" />
        <Skeleton variant="rectangular" height="200px" />
        <Skeleton variant="rectangular" height="160px" />
      </div>
    </div>
  );
}

export default function VendorProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProfileForm>({
    businessName: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    category: "",
    city: "",
    experience: "",
    teamSize: "",
    startingPrice: "",
  });

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/vendors/profile");
        const data = await res.json();

        if (data.success && data.data) {
          const v = data.data;
          setForm({
            businessName: v.businessName || "",
            description: v.description || "",
            phone: v.phone || "",
            email: v.email || "",
            website: v.website || "",
            address: v.address || "",
            category: v.category?.name || "",
            city: v.city?.name || "",
            experience: v.experience?.toString() || "",
            teamSize: v.teamSize?.toString() || "",
            startingPrice: v.startingPrice?.toString() || "0",
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session?.user?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/vendors/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.businessName,
          description: form.description,
          phone: form.phone,
          email: form.email,
          website: form.website,
          address: form.address,
          experience: form.experience,
          teamSize: form.teamSize,
          startingPrice: form.startingPrice,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.error || "Failed to save profile");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !session) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
          Edit Profile
        </h1>
        <p className="text-slate mt-1">
          Keep your business profile up-to-date to attract more couples.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 bg-rose/10 text-rose px-4 py-3 rounded-xl text-sm"
        >
          <AlertCircle size={16} />
          {error}
        </motion.div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSave}
        className="space-y-6"
      >
        {/* Business Details */}
        <div className="bg-white rounded-2xl p-6 card-shadow">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-5">
            Business Details
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <InputField
                label="Business Name"
                name="businessName"
                icon={Building}
                placeholder="Your business name"
                value={form.businessName}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="profile-description" className="block text-sm font-medium text-charcoal mb-1.5">
                Description
              </label>
              <textarea
                id="profile-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-ivory-dark bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors resize-none"
                placeholder="Tell couples about your business..."
              />
            </div>
            <div>
              <label htmlFor="profile-category" className="block text-sm font-medium text-charcoal mb-1.5">Category</label>
              <input
                id="profile-category"
                name="category"
                value={form.category}
                disabled
                className="w-full rounded-xl border border-ivory-dark bg-ivory/50 px-4 py-2.5 text-sm text-slate cursor-not-allowed"
              />
              <p className="text-xs text-slate mt-1">Contact support to change your category.</p>
            </div>
            <div>
              <label htmlFor="profile-city" className="block text-sm font-medium text-charcoal mb-1.5">City</label>
              <input
                id="profile-city"
                name="city"
                value={form.city}
                disabled
                className="w-full rounded-xl border border-ivory-dark bg-ivory/50 px-4 py-2.5 text-sm text-slate cursor-not-allowed"
              />
              <p className="text-xs text-slate mt-1">Contact support to change your city.</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-6 card-shadow">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-5">
            Contact Information
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <InputField label="Phone" name="phone" type="tel" icon={Phone} placeholder="+91 ..." value={form.phone} onChange={handleChange} />
            <InputField label="Email" name="email" type="email" icon={Mail} placeholder="you@example.com" value={form.email} onChange={handleChange} />
            <InputField label="Website" name="website" icon={Globe} placeholder="https://..." value={form.website} onChange={handleChange} />
            <div className="md:col-span-2">
              <InputField label="Address" name="address" icon={MapPin} placeholder="Full address" value={form.address} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Business Stats */}
        <div className="bg-white rounded-2xl p-6 card-shadow">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-5">
            Business Information
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <InputField
              label="Experience (years)"
              name="experience"
              type="number"
              icon={Briefcase}
              placeholder="e.g. 5"
              value={form.experience}
              onChange={handleChange}
            />
            <InputField
              label="Team Size"
              name="teamSize"
              type="number"
              icon={Users}
              placeholder="e.g. 10"
              value={form.teamSize}
              onChange={handleChange}
            />
            <InputField
              label="Starting Price (₹)"
              name="startingPrice"
              type="number"
              icon={IndianRupee}
              placeholder="e.g. 50000"
              value={form.startingPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4">
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              aria-live="polite"
              className="flex items-center gap-1.5 text-sage text-sm font-medium"
            >
              <CheckCircle size={16} />
              Profile saved successfully!
            </motion.span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-60 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Profile
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
