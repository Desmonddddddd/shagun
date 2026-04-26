"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Store,
  Grid3X3,
  MessageSquare,
  Star,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Vendors", href: "/admin/vendors", icon: Store },
  { label: "Categories", href: "/admin/categories", icon: Grid3X3 },
  { label: "Leads", href: "/admin/leads", icon: MessageSquare },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

const bottomItems: NavItem[] = [
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center border-b border-ivory-dark shrink-0",
          collapsed && !mobile
            ? "justify-center px-3 h-16"
            : "justify-between px-5 h-16"
        )}
      >
        {(!collapsed || mobile) && (
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-heading font-bold text-gradient-gold">
              Shagun
            </span>
            <span className="text-[10px] font-body text-white bg-rose px-1.5 py-0.5 rounded-md uppercase tracking-wider">
              Admin
            </span>
          </Link>
        )}

        {!mobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate hover:text-charcoal hover:bg-ivory-dark transition-colors cursor-pointer"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              size={16}
              className={cn(
                "transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </button>
        )}

        {mobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate hover:text-charcoal hover:bg-ivory-dark transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobile && setMobileOpen(false)}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl text-sm font-medium font-body transition-all",
                collapsed && !mobile
                  ? "justify-center p-3"
                  : "px-3.5 py-2.5",
                active
                  ? "bg-rose/10 text-rose"
                  : "text-slate hover:bg-ivory-dark hover:text-charcoal"
              )}
            >
              <Icon
                size={19}
                className={cn(
                  "shrink-0 transition-colors",
                  active ? "text-rose" : "text-slate group-hover:text-charcoal"
                )}
              />
              {(!collapsed || mobile) && (
                <span className="flex-1">{item.label}</span>
              )}

              {/* Badge */}
              {item.badge && (!collapsed || mobile) && (
                <span className="text-[10px] font-bold bg-rose text-white px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}

              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId={mobile ? "admin-nav-mobile" : "admin-nav"}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-rose rounded-r-full"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              {/* Tooltip for collapsed mode */}
              {collapsed && !mobile && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-charcoal text-white text-xs font-body rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="border-t border-ivory-dark px-3 py-3 space-y-1 shrink-0">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobile && setMobileOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-xl text-sm font-medium font-body transition-all",
                collapsed && !mobile
                  ? "justify-center p-3"
                  : "px-3.5 py-2.5",
                active
                  ? "bg-rose/10 text-rose"
                  : "text-slate hover:bg-ivory-dark hover:text-charcoal"
              )}
            >
              <Icon size={19} className="shrink-0" />
              {(!collapsed || mobile) && <span>{item.label}</span>}
            </Link>
          );
        })}

        <button
          className={cn(
            "group w-full flex items-center gap-3 rounded-xl text-sm font-medium font-body transition-all text-rose hover:bg-rose/5 cursor-pointer",
            collapsed && !mobile ? "justify-center p-3" : "px-3.5 py-2.5"
          )}
        >
          <LogOut size={19} className="shrink-0" />
          {(!collapsed || mobile) && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-white border-r border-ivory-dark h-screen sticky top-0 shrink-0 transition-all duration-300",
          collapsed ? "w-[68px]" : "w-60"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile bottom trigger */}
      <div className="md:hidden fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-12 h-12 bg-rose text-white rounded-full card-shadow flex items-center justify-center hover:bg-rose-dark transition-colors cursor-pointer"
          aria-label="Open admin menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 md:hidden shadow-2xl"
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
