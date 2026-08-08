"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Activity, Loader2 } from "lucide-react";
import { AppointmentCTA } from "@/components/home/AppointmentCTA";
import { createClient } from "@/utils/supabase/client";

export default function AboutPage() {
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMilestones() {
      const supabase = createClient();
      const { data } = await supabase.from("professional_journey").select("*").order("year", { ascending: false });
      if (data) setMilestones(data);
      setLoading(false);
    }
    loadMilestones();
  }, []);

  return (
    <div className="pt-24 pb-10">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-[var(--color-primary)] text-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6"
            >
              Meet <span className="text-blue-200">Dr. Isteyaque</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-blue-100"
            >
              Dedicated to restoring mobility and enhancing the quality of life for every patient through advanced orthopedic care.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[3/4] max-w-[500px] mx-auto lg:mx-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop"
                alt="Dr. Isteyaque Siddique"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-[var(--color-heading)] mb-6">
                A Legacy of Excellence in Orthopedic Surgery
              </h2>
              <div className="space-y-6 text-[var(--color-paragraph)] leading-relaxed">
                <p>
                  Dr. Isteyaque Siddique is a board-certified orthopedic surgeon with over 15 years of specialized experience in joint replacement and sports medicine. His journey began with a passion for helping athletes recover, which evolved into a comprehensive practice serving patients of all ages.
                </p>
                <p>
                  He is renowned for his pioneering work in minimally invasive robotic-assisted knee and hip replacements. These advanced techniques offer his patients faster recovery times, less pain, and long-lasting results compared to traditional surgical methods.
                </p>
                <p>
                  "My philosophy is simple: treat every patient like family. I believe in exhaustive diagnosis and exhausting all conservative treatments before ever recommending surgery. When surgery is necessary, we use the absolute best technology available."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)]">
                  <Award className="w-8 h-8 text-[var(--color-primary)] mb-3" />
                  <h4 className="font-heading font-bold text-xl mb-1">Board Certified</h4>
                  <p className="text-sm text-[var(--color-paragraph)]">American Board of Orthopaedic Surgery</p>
                </div>
                <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)]">
                  <BookOpen className="w-8 h-8 text-[var(--color-primary)] mb-3" />
                  <h4 className="font-heading font-bold text-xl mb-1">50+ Papers</h4>
                  <p className="text-sm text-[var(--color-paragraph)]">Published in international medical journals</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-[var(--color-background)]">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-[var(--color-heading)] mb-4">
              Professional Journey
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 md:-translate-x-1/2" />
            
            {loading ? (
              <div className="flex justify-center py-12 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : milestones.length === 0 ? (
              <p className="text-gray-500 text-center py-12 relative z-10 bg-[var(--color-background)]">No milestones available yet.</p>
            ) : (
              milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start mb-12 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-white shadow-sm md:-translate-x-1/2 mt-1.5 z-10" />
                  
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-[var(--color-primary)] font-bold rounded-full text-sm mb-3">
                      {milestone.year}
                    </span>
                    <h4 className="font-heading font-bold text-xl text-[var(--color-heading)] mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-[var(--color-paragraph)]">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
}
