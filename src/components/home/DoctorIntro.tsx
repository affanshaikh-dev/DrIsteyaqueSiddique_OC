"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DoctorIntro() {
  return (
    <section className="py-20 lg:py-32 bg-[var(--color-background)] overflow-hidden">
      <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute top-[-5%] left-[-5%] w-full h-full rounded-[30px] border-2 border-[var(--color-primary)]/20 -z-10" />
            <div className="relative w-full aspect-[4/5] max-w-[500px] rounded-[30px] overflow-hidden shadow-xl mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10" />
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop"
                alt="Dr. Isteyaque Siddique"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 -right-4 lg:-right-8 bg-white p-6 rounded-2xl shadow-xl w-64"
            >
              <h4 className="font-heading font-bold text-[var(--color-primary)] text-3xl mb-1">
                5000+
              </h4>
              <p className="text-[var(--color-heading)] font-medium text-sm">
                Successful Surgeries Performed
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto lg:mx-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-6">
              About The Doctor
            </div>

            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[var(--color-heading)] mb-6">
              Dr. Isteyaque Siddique
            </h2>
            <p className="text-xl text-[var(--color-primary)] font-medium mb-6">
              M.S. Orthopedics, Fellowship in Joint Replacement
            </p>

            <p className="text-[var(--color-paragraph)] leading-relaxed mb-8">
              With over 15 years of dedicated experience in orthopedics, Dr. Isteyaque specializes in complex joint replacements, arthroscopic surgeries, and sports injuries. His patient-first approach ensures that every individual receives a tailored treatment plan for optimal recovery.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Pioneer in Minimally Invasive Knee Surgery",
                "Advanced Training in Sports Medicine",
                "Consultant at Top Tier Hospitals",
                "Dedicated to Rapid Recovery Protocols",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-[var(--color-heading)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <Button asChild size="lg" className="rounded-full shadow-lg shadow-blue-900/20">
                <Link href="/about">Read Full Profile</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
