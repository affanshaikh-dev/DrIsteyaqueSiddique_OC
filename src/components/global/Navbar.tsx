"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import treatmentsData from "@/data/treatments.json";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Treatments", href: "/treatments" },
  { name: "Gallery", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center z-50">
              <Image
                src="/otherpedic_clinic.png"
                alt="Dr. Isteyaque Siddique Orthopedic Clinic"
                width={180}
                height={52}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.name === "Treatments" && pathname.startsWith("/treatments"));
                
                if (link.name === "Treatments") {
                  return (
                    <div key={link.name} className="relative group">
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-[var(--color-primary)] py-2",
                          isActive ? "text-[var(--color-primary)]" : "text-[var(--color-heading)]"
                        )}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        {isActive && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                      
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden py-2">
                        {treatmentsData.map((treatment) => (
                          <Link 
                            key={treatment.id} 
                            href={`/treatments/${treatment.id}`} 
                            className="px-5 py-3 hover:bg-blue-50 text-sm font-medium text-[var(--color-heading)] hover:text-[var(--color-primary)] transition-colors"
                          >
                            {treatment.title}
                          </Link>
                        ))}
                        <div className="h-px bg-gray-100 my-1 mx-4" />
                        <Link href="/treatments" className="px-5 py-3 hover:bg-blue-50 text-sm font-semibold text-[var(--color-primary)] transition-colors">View All Treatments →</Link>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-[var(--color-primary)] relative py-2",
                      isActive
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-heading)]"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4 z-50">
              <div className="hidden md:flex items-center gap-2 mr-4 text-sm font-medium text-[var(--color-heading)]">
                <div className="w-8 h-8 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-primary)]">
                  <Phone size={14} />
                </div>
                <span>+91-8879301365</span>
              </div>
              <Button asChild className="hidden md:inline-flex">
                <Link href="/contact">Book Appointment</Link>
              </Button>
              <button
                className="lg:hidden p-2 text-[var(--color-heading)]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden pt-24 px-4 pb-6 overflow-y-auto">
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-2xl font-heading font-semibold",
                  pathname === link.href
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-heading)]"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-lg font-medium text-[var(--color-heading)]">
                <div className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-primary)]">
                  <Phone size={18} />
                </div>
                <span>+91-8879301365</span>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/contact">Book Appointment</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
