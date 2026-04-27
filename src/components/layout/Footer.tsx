import Link from "next/link";

const footerLinks = {
  "Discover": [
    { label: "Vendors", href: "/vendors" },
    { label: "Real Weddings", href: "/real-weddings" },
    { label: "Blog", href: "/blog" },
  ],
  "Company": [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  "For Vendors": [
    { label: "List Your Business", href: "/register" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border-light">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="font-heading text-xl font-semibold text-text">
              Shaadisetu
            </Link>
            <p className="mt-3 text-text-muted text-sm leading-relaxed">
              The bridge to your perfect wedding. Find vendors, get inspired, celebrate.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-text mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-text transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-light text-xs">
            &copy; {new Date().getFullYear()} Shaadisetu. All rights reserved.
          </p>
          <p className="text-text-light text-xs">
            Made with care in India
          </p>
        </div>
      </div>
    </footer>
  );
}
