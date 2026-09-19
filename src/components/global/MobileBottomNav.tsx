"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Stethoscope, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const BOTTOM_LINKS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Treatments", href: "/treatments", icon: Stethoscope },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Phone },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] z-50 rounded-t-3xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-between items-center h-16 px-4">
        {BOTTOM_LINKS.map((link) => {
          const isActive = pathname === link.href || (link.name === "Treatments" && pathname.startsWith("/treatments") && link.href !== "/");
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1"
            >
              <div
                className={cn(
                  "p-1.5 rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-blue-50 text-[var(--color-primary)] scale-110" 
                    : "text-gray-500"
                )}
              >
                <link.icon className="w-[22px] h-[22px]" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors tracking-wide",
                  isActive ? "text-[var(--color-primary)] font-bold" : "text-gray-500"
                )}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
