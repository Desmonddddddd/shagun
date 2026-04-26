import VendorSidebar from "@/components/layout/VendorSidebar";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ivory">
      <VendorSidebar />
      <main className="flex-1 min-w-0 pt-0 md:pt-0">
        {children}
      </main>
    </div>
  );
}
