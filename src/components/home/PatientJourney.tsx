"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, Stethoscope, Microscope, Scissors, Activity, HeartHandshake } from "lucide-react";

const steps = [
  { icon: CalendarCheck, title: "Book Appointment", desc: "Schedule your visit easily." },
  { icon: Stethoscope, title: "Consultation", desc: "Detailed discussion with the doctor." },
  { icon: Microscope, title: "Diagnosis", desc: "Advanced imaging and tests." },
  { icon: Scissors, title: "Treatment", desc: "Personalized medical or surgical care." },
  { icon: Activity, title: "Recovery", desc: "Guided rehabilitation program." },
  { icon: HeartHandshake, title: "Follow-up", desc: "Continuous monitoring." },
];

export function PatientJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[var(--color-heading)] mb-6">
            Your Journey to <span className="text-[var(--color-primary)]">Recovery</span>
          </h2>
          <p className="text-[var(--color-paragraph)] text-lg">
            We ensure a seamless, transparent, and supportive experience from your first contact to full recovery.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Connecting Line background for desktop */}
          <div className="hidden lg:block absolute top-8 left-0 w-full h-1 bg-blue-50 -translate-y-1/2 z-0 rounded-full" />
          
          {/* Animated fill line */}
          <motion.div 
            style={{ scaleX, transformOrigin: "left" }} 
            className="hidden lg:block absolute top-8 left-0 w-full h-1 bg-[var(--color-primary)] -translate-y-1/2 z-0 rounded-full" 
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-blue-100 flex items-center justify-center text-[var(--color-primary)] mb-4 shadow-sm group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)] group-hover:scale-110 transition-all duration-300 relative">
                    <Icon className="w-8 h-8" />
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-7 h-7 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h4 className="font-heading font-bold text-[var(--color-heading)] mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-[var(--color-paragraph)]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
