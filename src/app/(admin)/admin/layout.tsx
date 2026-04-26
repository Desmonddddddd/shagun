import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ivory">
      <AdminSidebar />
      <main className="flex-1 min-w-0 pt-0 md:pt-0">
        {children}
      </main>
    </div>
  );
}
