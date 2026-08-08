"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Stethoscope, Image as ImageIcon, Phone, MessageSquare, Briefcase, Users, Calendar } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Treatments", href: "/admin/treatments", icon: Stethoscope },
  { name: "Prof. Journey", href: "/admin/journey", icon: Briefcase },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "FAQs", href: "/admin/faqs", icon: MessageSquare },
  { name: "Contact Info", href: "/admin/contact", icon: Phone },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-[100dvh] z-10">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-heading font-bold text-[var(--color-heading)]">
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white shadow-md"
                    : "text-gray-600 hover:bg-blue-50 hover:text-[var(--color-primary)]"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={async () => {
              const { createClient } = await import("@/utils/supabase/client");
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all text-red-600 hover:bg-red-50"
          >
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 overflow-auto">
        <main className="p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
