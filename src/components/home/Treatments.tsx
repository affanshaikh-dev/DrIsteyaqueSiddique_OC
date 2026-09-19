"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bone, ActivitySquare, Microscope, Activity, Stethoscope, HeartPulse, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

// Map string icon names from JSON to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Microscope,
  Bone,
  ActivitySquare,
  Stethoscope,
  HeartPulse,
  Activity,
};

export function Treatments() {
  const [treatmentsData, setTreatmentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTreatments() {
      const supabase = createClient();
      const { data } = await supabase
        .from("treatments")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (data) setTreatmentsData(data);
      setLoading(false);
    }
    loadTreatments();
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto max-w-[1280px] px-4 md:px-8 ">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-12">
          <div className="lg:w-1/3">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[var(--color-heading)] mb-6">
              World-Class <span className="text-[var(--color-primary)]">Treatments</span>
            </h2>
            <p className="text-[var(--color-paragraph)] text-lg mb-8">
              We offer comprehensive orthopedic care utilizing the latest medical technology to ensure the best possible outcomes for our patients. Explore our specialized procedures.
            </p>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base hidden lg:inline-flex">
              <Link href="/treatments">View All Treatments</Link>
            </Button>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {loading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] h-[120px] flex items-center justify-between">
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-14 h-14 rounded-xl bg-gray-200 animate-pulse shrink-0" />
                      <div className="space-y-3 w-full">
                        <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                        <div className="h-5 bg-gray-200 rounded w-4/5 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : treatmentsData.length === 0 ? (
              <p className="col-span-2 text-center text-gray-500 py-12">No treatments available.</p>
            ) : treatmentsData.map((treatment, index) => {
              const Icon = iconMap[treatment.icon] || Activity;
              return (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="h-full"
                >
                  <Link
                    href={`/treatments/${treatment.id}`}
                    className="group flex items-center justify-between p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-lg transition-all bg-[var(--color-surface)] w-full h-full"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[var(--color-accent)] mb-1 uppercase tracking-wider">
                          {treatment.category}
                        </p>
                        <h4 className="font-heading font-semibold text-lg text-[var(--color-heading)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                          {treatment.title}
                        </h4>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors shrink-0 ml-4">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <div className="text-center lg:hidden mt-8">
          <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base w-full sm:w-auto">
            <Link href="/treatments">View All Treatments</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
