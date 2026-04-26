"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Vendors", href: "/search" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Click-outside handler for user dropdown
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-user-menu]')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  const navBg =
    scrolled || !isHomepage
      ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-ivory-dark/50"
      : "bg-transparent";

  const textColor = scrolled || !isHomepage ? "text-charcoal" : "text-white";

  const getDashboardLink = () => {
    const role = (user as { role?: string })?.role;
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "VENDOR") return "/vendor/dashboard";
    return "/dashboard";
  };

  return (
    <>
      <motion.header
        initial={false}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          navBg
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 shrink-0">
              <span className="text-2xl md:text-3xl font-heading font-bold text-gradient-gold">
                Shagun
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium font-body rounded-lg transition-colors",
                      isActive
                        ? "text-gold"
                        : cn(textColor, "hover:text-gold")
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-gold rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <Link
                href="/search"
                className={cn(
                  "p-2.5 rounded-xl transition-colors",
                  textColor,
                  "hover:bg-ivory-dark/50"
                )}
                aria-label="Search vendors"
              >
                <Search size={18} />
              </Link>

              {/* Auth Buttons (Desktop) */}
              <div className="hidden md:flex items-center gap-2">
                {user ? (
                  <div className="relative" data-user-menu>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      aria-expanded={userMenuOpen}
                      aria-haspopup="true"
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium font-body transition-colors cursor-pointer",
                        textColor,
                        "hover:bg-ivory-dark/50"
                      )}
                    >
                      <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center">
                        <User size={14} className="text-gold-dark" />
                      </div>
                      <span>{user?.name}</span>
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform",
                          userMenuOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl card-shadow border border-ivory-dark py-1.5 overflow-hidden"
                        >
                          <Link
                            href={getDashboardLink()}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal hover:bg-ivory-dark transition-colors font-body"
                          >
                            <User size={15} />
                            Dashboard
                          </Link>
                          <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose hover:bg-rose/5 transition-colors font-body cursor-pointer"
                          >
                            <LogOut size={15} />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={cn(
                        "px-4 py-2 text-sm font-medium font-body rounded-xl transition-colors",
                        textColor,
                        "hover:bg-ivory-dark/50"
                      )}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 text-sm font-medium font-body rounded-xl bg-gold text-white hover:bg-gold-dark transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "md:hidden p-2.5 rounded-xl transition-colors cursor-pointer",
                  textColor,
                  "hover:bg-ivory-dark/50"
                )}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 md:hidden shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Drawer header */}
                <div className="flex items-center justify-between px-5 h-16 border-b border-ivory-dark">
                  <span className="text-xl font-heading font-bold text-gradient-gold">
                    Shagun
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-slate hover:text-charcoal hover:bg-ivory-dark transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Nav links */}
                <div className="flex-1 overflow-y-auto py-4 px-3">
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-sm font-medium font-body rounded-xl mb-1 transition-colors",
                          isActive
                            ? "bg-gold/10 text-gold"
                            : "text-charcoal hover:bg-ivory-dark"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Auth section */}
                <div className="p-4 border-t border-ivory-dark space-y-2">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                          <User size={16} className="text-gold-dark" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal font-body">
                            {user?.name}
                          </p>
                          <p className="text-xs text-slate font-body">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-rose border border-rose/20 rounded-xl hover:bg-rose/5 transition-colors font-body cursor-pointer"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block text-center px-4 py-2.5 text-sm font-medium text-charcoal border border-ivory-dark rounded-xl hover:bg-ivory-dark transition-colors font-body"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block text-center px-4 py-2.5 text-sm font-medium text-white bg-gold rounded-xl hover:bg-gold-dark transition-colors font-body"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
