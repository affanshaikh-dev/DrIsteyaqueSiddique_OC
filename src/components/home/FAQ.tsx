"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Do I really need surgery for my joint pain?",
    answer: "Not necessarily. We believe in a conservative approach first. Surgery is only recommended when physical therapy, medication, and lifestyle changes fail to provide relief. A thorough diagnosis is required to determine the best path.",
  },
  {
    question: "What is robotic-assisted joint replacement?",
    answer: "Robotic-assisted surgery allows for greater precision during joint replacement. It helps the surgeon plan the procedure accurately, leading to a better-fitting implant, less soft tissue damage, and potentially faster recovery.",
  },
  {
    question: "How long does recovery take after knee replacement?",
    answer: "Recovery varies by patient, but most individuals can start walking with assistance within a day after surgery. You can expect to return to most normal activities within 4 to 6 weeks, with full recovery taking a few months.",
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes, we accept a wide range of major health insurance plans. Please contact our front desk with your insurance details to verify coverage before your appointment.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer: "Please bring your ID, insurance card, any past medical records, X-rays or MRI reports related to your condition, and a list of current medications you are taking.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[var(--color-heading)] mb-6">
              Frequently Asked <span className="text-[var(--color-primary)]">Questions</span>
            </h2>
            <p className="text-[var(--color-paragraph)] text-lg mb-8">
              Find answers to common questions about our orthopedic services, surgeries, and what to expect during your visit.
            </p>
            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
              <h4 className="font-heading font-bold text-[var(--color-heading)] mb-2">
                Still have questions?
              </h4>
              <p className="text-[var(--color-paragraph)] mb-6">
                Can't find the answer you're looking for? Please chat to our friendly team.
              </p>
              <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-full font-medium hover:bg-blue-800 transition-colors">
                Contact Us
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={cn(
                      "border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300",
                      isOpen ? "shadow-md bg-white border-[var(--color-primary)]/30" : "bg-[var(--color-surface)] hover:bg-gray-50"
                    )}
                  >
                    <button
                      className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className={cn(
                        "font-heading font-semibold text-lg pr-8 transition-colors",
                        isOpen ? "text-[var(--color-primary)]" : "text-[var(--color-heading)]"
                      )}>
                        {faq.question}
                      </span>
                      <div className={cn(
                        "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                        isOpen ? "bg-[var(--color-primary)] text-white" : "bg-gray-100 text-gray-500"
                      )}>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 text-[var(--color-paragraph)] leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
