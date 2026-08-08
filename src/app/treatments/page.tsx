"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, ActivitySquare, Bone, Microscope, Stethoscope, HeartPulse } from "lucide-react";
import { AppointmentCTA } from "@/components/home/AppointmentCTA";
import treatmentsData from "@/data/treatments.json";

// Map string icon names from JSON to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Microscope,
  Bone,
  ActivitySquare,
  Stethoscope,
  HeartPulse,
  Activity,
};

export default function TreatmentsCatalog() {
  return (
    <div className="pt-24 pb-10 bg-[var(--color-background)]">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-[var(--color-primary)] text-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6"
            >
              Comprehensive <span className="text-blue-200">Orthopedic Treatments</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-blue-100"
            >
              Explore our range of specialized procedures designed to alleviate pain, restore function, and get you back to the activities you love.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatmentsData.map((treatment, index) => {
              const Icon = iconMap[treatment.icon] || Activity;
              return (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-[var(--color-surface)] rounded-[32px] overflow-hidden shadow-md border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="p-8 flex flex-col justify-center h-full">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-[var(--color-heading)] mb-4">
                      {treatment.title}
                    </h3>
                    <p className="text-[var(--color-paragraph)] mb-8 flex-grow">
                      {treatment.desc}
                    </p>
                    <Link
                      href={`/treatments/${treatment.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-background)] text-[var(--color-heading)] font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-all w-fit group/btn"
                    >
                      View Details <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
}
