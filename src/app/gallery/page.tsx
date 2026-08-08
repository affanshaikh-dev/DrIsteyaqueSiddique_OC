"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AppointmentCTA } from "@/components/home/AppointmentCTA";

const categories = ["All", "Clinic", "Surgery", "Patients", "Events"];

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop", category: "Clinic", alt: "Hospital Reception" },
  { id: 2, src: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop", category: "Clinic", alt: "Patient Room" },
  { id: 3, src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop", category: "Surgery", alt: "Operating Theater" },
  { id: 4, src: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?q=80&w=800&auto=format&fit=crop", category: "Patients", alt: "Patient Rehab" },
  { id: 5, src: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=800&auto=format&fit=crop", category: "Events", alt: "Medical Conference" },
  { id: 6, src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop", category: "Surgery", alt: "Doctor Consulting" },
];

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-10">
      <section className="py-16 md:py-24 bg-[var(--color-background)]">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-heading)] mb-6">
              Our <span className="text-[var(--color-primary)]">Gallery</span>
            </h1>
            <p className="text-lg text-[var(--color-paragraph)]">
              Take a visual tour of our state-of-the-art facilities, advanced equipment, and the people who make it all happen.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-6 py-2 rounded-full border border-[var(--color-border)] bg-white text-[var(--color-heading)] font-medium hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square rounded-3xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-heading font-semibold text-lg">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
}
