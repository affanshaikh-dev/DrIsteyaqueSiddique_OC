"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Activity, Loader2, Target, Eye, CheckCircle2, Stethoscope, Bone, Shield, Users } from "lucide-react";
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
    <div className="pt-24 pb-10 bg-[var(--color-background)]">
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
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8  relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6"
            >
              About <span className="text-blue-200">Dr. Isteyaque Siddique</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-blue-100 font-medium leading-relaxed"
            >
              Expert Orthopaedic Care Focused on Your Mobility, Recovery & Quality of Life
            </motion.p>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 ">
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
                Dedicated Orthopaedic Surgeon
              </h2>
              <div className="space-y-6 text-[var(--color-paragraph)] leading-relaxed text-lg">
                <p>
                  Dr. Isteyaque Siddique is an Orthopaedic Surgeon with a focused practice in Trauma, Joint Replacement and Sports Medicine. His approach combines clinical expertise, careful diagnosis, and individualized treatment planning to help patients make informed decisions about their musculoskeletal health.
                </p>
                <p>
                  With qualifications including DNB in Orthopaedics, Fellowship in Joint Replacement, Fellowship in Arthroscopy and Sports Medicine, and Diploma in Football Medicine (FIFA), Dr. Siddique has developed a special interest in the management of joint, sports-related, and orthopaedic conditions.
                </p>
                <p>
                  His clinical areas include the evaluation and treatment of knee, shoulder and other joint conditions, sports injuries, traumatic orthopaedic problems, arthritis-related conditions, and joint replacement needs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm col-span-2 md:col-span-1">
                  <Award className="w-8 h-8 text-[var(--color-primary)] mb-3" />
                  <h4 className="font-heading font-bold text-xl mb-1">Qualifications & Training</h4>
                  <ul className="text-sm text-[var(--color-paragraph)] space-y-1 mt-2">
                    <li>• DNB – Orthopaedics</li>
                    <li>• Fellowship in Joint Replacement</li>
                    <li>• Fellowship in Arthroscopy & Sports Medicine</li>
                    <li>• Diploma in Football Medicine (FIFA)</li>
                  </ul>
                </div>
                <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm col-span-2 md:col-span-1">
                  <Activity className="w-8 h-8 text-[var(--color-primary)] mb-3" />
                  <h4 className="font-heading font-bold text-xl mb-1">Associations</h4>
                  <p className="text-sm text-[var(--color-paragraph)] mt-2">
                    Associated with Saifee Hospital, providing exceptional clinical and surgical care through both clinic and online consultations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Approach & Philosophy */}
      <section className="py-20 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 ">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-heading font-bold text-[var(--color-heading)] mb-6 flex items-center gap-3">
                <Users className="text-[var(--color-primary)] w-8 h-8 shrink-0" />
                Our Approach to Patient Care
              </h3>
              <p className="text-[var(--color-paragraph)] text-lg mb-6 leading-relaxed">
                We believe that every patient is different. A successful treatment plan begins with understanding the patient's symptoms, lifestyle, medical history and individual goals.
              </p>
              <ul className="space-y-4">
                {[
                  "Accurate clinical assessment and diagnosis",
                  "Personalized treatment planning",
                  "Evidence-based orthopaedic care",
                  "Sports injury and arthroscopy management",
                  "Joint preservation and replacement solutions",
                  "Clear communication with patients and families",
                  "Recovery and rehabilitation-focused care"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-[var(--color-heading)] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[var(--color-paragraph)] text-lg mt-6 leading-relaxed italic">
                "The goal is not simply to treat an injury or condition, but to help patients restore movement, reduce limitations and return to the activities that matter to them."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-heading font-bold text-[var(--color-heading)] mb-6 flex items-center gap-3">
                <Heart className="text-[var(--color-primary)] w-8 h-8 shrink-0" />
                A Patient-Centred Philosophy
              </h3>
              <div className="bg-[var(--color-background)] p-8 rounded-[32px] shadow-lg border border-[var(--color-border)] h-full">
                <p className="text-[var(--color-paragraph)] text-lg mb-6 leading-relaxed">
                  At our practice, we understand that pain and restricted movement can affect much more than physical health—they can impact work, sports, family life and everyday independence.
                </p>
                <p className="text-[var(--color-paragraph)] text-lg mb-6 leading-relaxed">
                  That is why we aim to provide care that is professional, transparent and patient-centred, helping every patient understand their condition and the available treatment options.
                </p>
                <div className="bg-blue-50/50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                  <h4 className="font-heading font-bold text-xl text-[var(--color-primary)] mb-2">Our Commitment is Simple:</h4>
                  <p className="text-[var(--color-heading)] font-medium text-lg">
                    Better understanding, appropriate treatment, and a stronger path toward recovery.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialities & Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 ">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-[var(--color-heading)] mb-4">
              Clinical Specialities
            </h2>
            <p className="text-lg text-[var(--color-paragraph)]">
              Comprehensive orthopaedic care tailored to your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {[
              {
                title: "Trauma & Orthopaedics",
                desc: "Assessment and management of musculoskeletal injuries and orthopaedic trauma.",
                icon: Shield
              },
              {
                title: "Joint Replacement",
                desc: "Evaluation and treatment planning for patients who may require joint replacement, with an emphasis on individualized care.",
                icon: Bone
              },
              {
                title: "Sports Medicine",
                desc: "Diagnosis and management of sports-related injuries with a focus on safe recovery and return to activity.",
                icon: Activity
              },
              {
                title: "Arthroscopy",
                desc: "Minimally invasive assessment and surgical treatment of selected joint and sports-related conditions.",
                icon: Stethoscope
              },
              {
                title: "Knee & Shoulder Care",
                desc: "Comprehensive evaluation of common and complex knee and shoulder problems.",
                icon: Target
              }
            ].map((spec, i) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[var(--color-surface)] p-8 rounded-3xl shadow-sm border border-[var(--color-border)] hover:shadow-xl hover:border-blue-200 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[var(--color-heading)] mb-3">
                    {spec.title}
                  </h3>
                  <p className="text-[var(--color-paragraph)]">
                    {spec.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <div className="bg-[var(--color-primary)] rounded-[40px] p-8 md:p-12 lg:p-16 text-white overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
                  Why Choose Dr. Isteyaque Siddique?
                </h2>
                <ul className="space-y-4">
                  {[
                    "Orthopaedic Surgeon with specialized training",
                    "Expertise in Trauma, Joint Replacement & Sports Medicine",
                    "Fellowship training in Joint Replacement",
                    "Fellowship training in Arthroscopy & Sports Medicine",
                    "FIFA Diploma in Football Medicine",
                    "Individualized treatment approach",
                    "Focus on functional recovery and mobility",
                    "Patient-focused consultation and communication"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-300 shrink-0 mt-0.5" />
                      <span className="font-medium text-lg text-blue-50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-6">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                  <Target className="w-10 h-10 text-blue-300 mb-4" />
                  <h3 className="text-2xl font-heading font-bold mb-3">Our Mission</h3>
                  <p className="text-blue-50 leading-relaxed text-lg">
                    To provide ethical, evidence-based and personalized orthopaedic care that helps patients move better, recover confidently and live more active lives.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                  <Eye className="w-10 h-10 text-blue-300 mb-4" />
                  <h3 className="text-2xl font-heading font-bold mb-3">Our Vision</h3>
                  <p className="text-blue-50 leading-relaxed text-lg">
                    To be a trusted destination for comprehensive orthopaedic, joint replacement and sports medicine care, combining modern medical knowledge with compassionate patient care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 ">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-[var(--color-heading)] mb-4">
              Professional Journey
            </h2>
            <p className="text-lg text-[var(--color-paragraph)]">
              A track record of continuous learning and clinical excellence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 md:-translate-x-1/2" />
            
            {loading ? (
              <div className="flex justify-center py-12 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : milestones.length === 0 ? (
              <p className="text-gray-500 text-center py-12 relative z-10 bg-[var(--color-surface)]">No milestones available yet.</p>
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
