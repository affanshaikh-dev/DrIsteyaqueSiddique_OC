"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AppointmentCTA } from "@/components/home/AppointmentCTA";
import { createClient } from "@/utils/supabase/client";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadImages() {
      const supabase = createClient();
      const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
      if (data) setGalleryImages(data);
      setLoading(false);
    }
    loadImages();
  }, []);

  const dbCategories = Array.from(new Set(galleryImages.map(img => img.category)));
  const defaultCategories = ["Clinic", "Surgery", "Patients", "Events"];
  // Merge default categories with any dynamic ones from the DB, ensuring "All" is first
  const categories = ["All", ...Array.from(new Set([...defaultCategories, ...dbCategories]))];

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const selectedImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  function handleNext(e: React.MouseEvent) {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1);
    }
  }

  function handlePrev(e: React.MouseEvent) {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1);
    }
  }

  return (
    <div className="pt-24 pb-10">
      <section className="py-16 md:py-24 bg-[var(--color-background)]">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 ">
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
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full border transition-colors ${
                  activeCategory === cat 
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    : "border-[var(--color-border)] bg-white text-[var(--color-heading)] hover:bg-gray-50"
                } font-medium`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-3xl" />
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No images found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedIndex(index)}
                  className="relative aspect-square rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          )}
        </div>
      </section>

      <AppointmentCTA />

      {/* Lightbox / Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 p-2 rounded-full hover:bg-black transition-all z-50"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[85vh] aspect-video rounded-2xl overflow-hidden" 
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                fill 
                className="object-contain" 
                sizes="100vw"
                priority
              />
            </motion.div>
            
            {filteredImages.length > 1 && (
              <>
                <button 
                  className="absolute left-4 sm:left-12 text-white/70 hover:text-white bg-black/50 p-3 rounded-full hover:bg-black transition-all z-50"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                  className="absolute right-4 sm:right-12 text-white/70 hover:text-white bg-black/50 p-3 rounded-full hover:bg-black transition-all z-50"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
            
            {selectedImage.alt && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="absolute bottom-8 left-0 right-0 text-center"
              >
                <span className="text-white text-lg font-medium bg-black/50 px-6 py-2 rounded-full backdrop-blur-md">
                  {selectedImage.alt}
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
