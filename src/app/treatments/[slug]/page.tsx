import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, CalendarCheck } from "lucide-react";
import treatmentsData from "@/data/treatments.json";

export async function generateStaticParams() {
  return treatmentsData.map((t) => ({
    slug: t.id,
  }));
}

export default async function TreatmentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const treatment = treatmentsData.find((t) => t.id === resolvedParams.slug);

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
                  {treatment.content.overview}
                </p>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[var(--color-border)]">
                <h3 className="text-2xl font-heading font-bold text-[var(--color-heading)] mb-6">
                  Common Symptoms
                </h3>
                <ul className="space-y-4">
                  {treatment.content.symptoms.map((symptom, idx) => (
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
                  {treatment.content.benefits.map((benefit, idx) => (
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
                  {treatment.content.recovery}
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
                      href="tel:+919876543210" 
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-background)] text-[var(--color-heading)] rounded-xl font-semibold hover:bg-gray-100 transition-colors border border-[var(--color-border)]"
                    >
                      <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                      Call +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Other Treatments Card */}
                <div className="bg-[var(--color-surface)] p-8 rounded-3xl border border-[var(--color-border)]">
                  <h4 className="font-heading font-bold text-[var(--color-heading)] mb-6">
                    Other Treatments
                  </h4>
                  <div className="space-y-2">
                    {treatmentsData.filter(t => t.id !== treatment.id).slice(0, 4).map((t) => (
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
