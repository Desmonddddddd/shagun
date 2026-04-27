"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, X, Search, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Venues", href: "/categories/venues" },
  { label: "Vendors", href: "/categories" },
  { label: "Real Weddings", href: "/real-weddings" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-cream-dark/50">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-gradient-magenta">
              Shagun
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-magenta transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-charcoal hover:text-magenta transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
            <Link href="/saved" className="p-2 text-charcoal hover:text-magenta transition-colors" aria-label="Saved vendors">
              <Heart size={20} />
            </Link>
            {session ? (
              <Link href={session.user.role === "VENDOR" ? "/vendor/dashboard" : session.user.role === "ADMIN" ? "/admin/dashboard" : "/profile"}>
                <Button variant="outline" size="sm">
                  <User size={16} className="mr-2" />
                  {session.user.name || "Account"}
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-cream-dark/50">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-charcoal hover:text-magenta transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-4 border-t border-cream-dark/50">
                {session ? (
                  <Link href="/profile" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">Account</Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">Log In</Button>
                    </Link>
                    <Link href="/register" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
