"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, CalendarCheck, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function TreatmentDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [treatment, setTreatment] = useState<any>(null);
  const [allTreatments, setAllTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: treatments } = await supabase.from("treatments").select("*");
      
      if (treatments) {
        setAllTreatments(treatments);
        const current = treatments.find((t: any) => t.id === slug);
        setTreatment(current);
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 pb-10">
        <div className="py-20 bg-gray-50">
           <div className="container mx-auto max-w-[1280px] px-4 md:px-8">
             <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full mb-6" />
             <div className="h-14 w-3/4 max-w-2xl bg-gray-200 animate-pulse rounded-xl mb-6" />
             <div className="h-24 w-full max-w-3xl bg-gray-200 animate-pulse rounded-xl" />
           </div>
        </div>
        <div className="py-16 md:py-24 bg-white">
           <div className="container mx-auto max-w-[1280px] px-4 md:px-8 flex flex-col lg:flex-row gap-16">
              <div className="lg:w-2/3 space-y-12">
                 <div className="w-full h-[400px] rounded-3xl bg-gray-100 animate-pulse" />
                 <div className="space-y-4">
                    <div className="h-8 w-48 bg-gray-100 animate-pulse rounded-lg" />
                    <div className="h-32 w-full bg-gray-100 animate-pulse rounded-xl" />
                 </div>
              </div>
              <div className="lg:w-1/3 space-y-6">
                 <div className="h-80 w-full bg-gray-100 animate-pulse rounded-3xl" />
                 <div className="h-64 w-full bg-gray-100 animate-pulse rounded-3xl" />
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (!treatment) {
    notFound();
  }

  return (
    <div className="pt-24 pb-10">
      {/* Hero */}
      <section className="py-20 bg-[var(--color-primary)] text-white relative overflow-hidden">
        {/* Grid background */}
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
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-100 text-sm font-semibold mb-6">
              {treatment.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              {treatment.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              {treatment.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-[var(--color-background)]">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Main Content */}
            <div className="lg:w-2/3 space-y-12">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-lg">
                <Image 
                  src={treatment.image} 
                  alt={treatment.title} 
                  fill 
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-3xl font-heading font-bold text-[var(--color-heading)] mb-6">
                  Overview
                </h2>
                <p className="text-lg text-[var(--color-paragraph)] leading-relaxed">
                  {treatment.content_overview}
                </p>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[var(--color-border)]">
                <h3 className="text-2xl font-heading font-bold text-[var(--color-heading)] mb-6">
                  Common Symptoms
                </h3>
                <ul className="space-y-4">
                  {treatment.content_symptoms?.map((symptom: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                      <span className="text-[var(--color-paragraph)]">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-heading font-bold text-[var(--color-heading)] mb-6">
                  Treatment Benefits
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {treatment.content_benefits?.map((benefit: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)]">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <span className="text-[var(--color-heading)] font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-heading font-bold text-[var(--color-heading)] mb-6">
                  Recovery Process
                </h2>
                <p className="text-lg text-[var(--color-paragraph)] leading-relaxed">
                  {treatment.content_recovery}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 space-y-6">
                
                {/* Contact Card */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-[var(--color-border)]">
                  <h3 className="text-2xl font-heading font-bold text-[var(--color-heading)] mb-4">
                    Need Consultation?
                  </h3>
                  <p className="text-[var(--color-paragraph)] mb-8">
                    Get an expert opinion and personalized treatment plan for your condition.
                  </p>
                  
                  <div className="space-y-4">
                    <Link 
                      href="/contact" 
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-blue-900 transition-colors group"
                    >
                      <CalendarCheck className="w-5 h-5" />
                      Book Appointment
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <a 
                      href="tel:+918879301365" 
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-background)] text-[var(--color-heading)] rounded-xl font-semibold hover:bg-gray-100 transition-colors border border-[var(--color-border)]"
                    >
                      <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                      Call +91-8879301365
                    </a>
                  </div>
                </div>

                {/* Other Treatments Card */}
                <div className="bg-[var(--color-surface)] p-8 rounded-3xl border border-[var(--color-border)]">
                  <h4 className="font-heading font-bold text-[var(--color-heading)] mb-6">
                    Other Treatments
                  </h4>
                  <div className="space-y-2">
                    {allTreatments.filter(t => t.id !== treatment.id && t.is_published).slice(0, 4).map((t) => (
                      <Link 
                        key={t.id} 
                        href={`/treatments/${t.id}`}
                        className="block px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm text-[var(--color-paragraph)] hover:text-[var(--color-primary)] font-medium transition-all"
                      >
                        {t.title}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
