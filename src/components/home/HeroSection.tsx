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
    image: "/all_orthopadic_treatment.jpeg",
  },
  {
    id: 2,
    image: "/total_nee_replacement.jpeg",
  },
  {
    id: 3,
    image: "/total_hip_replacement.jpeg",
  },
  {
    id: 4,
    image: "/sports_injury.jpeg",
  },
  {
    id: 5,
    image: "/arthoscopic.jpeg",
  }
];

export function HeroSection() {
  return (
    <section className="relative w-full pt-28 pb-8 px-4 md:px-8  bg-[var(--color-background)]">
      <div className="container mx-auto max-w-[1280px]">
        <div className="relative w-full rounded-[40px] overflow-hidden shadow-2xl">
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
            className="w-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id} className="relative w-full">
                <div className="relative w-full">
                  <Image
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    width={1920}
                    height={1080}
                    priority={slide.id === 1}
                    className="w-full h-auto object-cover"
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
