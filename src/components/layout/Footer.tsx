import Link from "next/link";
import { Globe, Mail, MessageCircle, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
];

const vendorLinks = [
  { label: "Register as Vendor", href: "/vendor/register" },
  { label: "Vendor Dashboard", href: "/vendor/dashboard" },
  { label: "Vendor Guidelines", href: "/vendor/guidelines" },
  { label: "Pricing Plans", href: "/vendor/pricing" },
];

const categoryLinks = [
  { label: "Wedding Venues", href: "/categories/wedding-venues" },
  { label: "Photographers", href: "/categories/photographers" },
  { label: "Bridal Makeup", href: "/categories/bridal-makeup" },
  { label: "Catering", href: "/categories/catering" },
  { label: "Decorators", href: "/categories/decorators" },
];

const cityLinks = [
  { label: "Delhi NCR", href: "/city/delhi" },
  { label: "Mumbai", href: "/city/mumbai" },
  { label: "Bangalore", href: "/city/bangalore" },
  { label: "Jaipur", href: "/city/jaipur" },
  { label: "Hyderabad", href: "/city/hyderabad" },
  { label: "Kolkata", href: "/city/kolkata" },
];

const socialLinks = [
  { icon: Globe, label: "Website", href: "https://shagun.in" },
  { icon: Mail, label: "Email", href: "mailto:hello@shagun.in" },
  { icon: MessageCircle, label: "Chat", href: "/contact" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-body mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-light hover:text-gold transition-colors font-body"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-heading font-bold text-gradient-gold">
                Shagun
              </span>
            </Link>
            <p className="mt-3 text-base font-heading italic text-gold-light/80 leading-relaxed">
              &ldquo;Aapki shaadi, humari zimmedari&rdquo;
            </p>
            <p className="mt-4 text-sm text-slate-light leading-relaxed font-body max-w-xs">
              India&apos;s premier wedding services marketplace. Connecting
              couples with the finest wedding professionals across the country.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="w-9 h-9 rounded-full border border-slate/30 flex items-center justify-center text-slate-light hover:text-gold hover:border-gold/50 transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="For Vendors" links={vendorLinks} />
          <FooterColumn title="Popular" links={categoryLinks} />
          <FooterColumn title="Cities" links={cityLinks} />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-light font-body">
            &copy; {currentYear} Shagun. All rights reserved.
          </p>
          <p className="text-xs text-slate-light font-body flex items-center gap-1">
            Made with{" "}
            <Heart size={12} className="text-rose fill-rose" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
