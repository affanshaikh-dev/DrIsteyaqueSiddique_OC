"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551076805-e18690c5e561?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=2000",
  }
];

export function HeroSection() {
  return (
    <section className="relative w-full pt-28 pb-8 px-4 md:px-8 xl:px-0 bg-[var(--color-background)]">
      <div className="container mx-auto max-w-[1280px]">
        <div className="relative w-full h-[60vh] min-h-[400px] lg:h-[80vh] rounded-[40px] overflow-hidden shadow-2xl">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            speed={1000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            className="w-full h-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id} className="relative w-full h-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    fill
                    priority={slide.id === 1}
                    className="object-cover"
                  />
                  {/* Subtle overlay for better visual balance */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      {/* Custom Styles for Swiper Pagination & Navigation */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #ffffff !important;
          width: 24px !important;
          border-radius: 4px !important;
          transition: width 0.3s ease;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: rgba(255, 255, 255, 0.8) !important;
          background-color: rgba(0, 0, 0, 0.2);
          width: 48px !important;
          height: 48px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          transition: all 0.2s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: rgba(0, 0, 0, 0.4);
          color: white !important;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px !important;
        }
      `}</style>
    </section>
  );
}
