"use client";

import { Testimonials } from "@/components/home/Testimonials";
import { AppointmentCTA } from "@/components/home/AppointmentCTA";

export default function TestimonialsPage() {
  return (
    <div className="pt-24 pb-10">
      <section className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8  relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[var(--color-heading)] mb-6">
              Patient <span className="text-[var(--color-primary)]">Success Stories</span>
            </h1>
            <p className="text-lg text-[var(--color-paragraph)]">
              Real stories from real patients. Discover how we've helped hundreds of people return to the activities they love.
            </p>
          </div>
        </div>
      </section>

      {/* Main testimonials block (Elfsight Google Reviews) */}
      <Testimonials />

      <AppointmentCTA />
    </div>
  );
}
