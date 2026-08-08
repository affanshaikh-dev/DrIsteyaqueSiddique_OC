"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import Link from "next/link";

export function AppointmentCTA() {
  return (
    <section className="py-16 bg-[var(--color-background)]">
      <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
        <div className="bg-[var(--color-primary)] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-xl">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)]/90 to-[var(--color-primary)]/80" />

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400 opacity-10 rounded-full -translate-x-1/2 translate-y-1/3 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-white leading-tight drop-shadow-md"
            >
              Ready for a Pain-Free Life?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-blue-50 text-lg md:text-xl mb-10 drop-shadow-sm max-w-xl mx-auto"
            >
              Take the first step today. Let our expert team design a personalized treatment plan for your optimal recovery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="bg-white text-[var(--color-primary)] hover:bg-gray-100 h-14 px-8 w-full sm:w-auto text-base border-0 shadow-lg font-semibold">
                <Link href="/contact">
                  <Calendar className="mr-2 w-5 h-5" /> Schedule Consultation
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 h-14 px-8 w-full sm:w-auto text-base backdrop-blur-sm transition-all font-semibold">
                <a href="tel:+919876543210">
                  <Phone className="mr-2 w-5 h-5" /> Call +91 98765 43210
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
