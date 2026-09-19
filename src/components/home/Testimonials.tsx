"use client";

import Script from "next/script";

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-[var(--color-background)]">
      <div className="container mx-auto max-w-[1280px] px-4 md:px-8 ">
        

        {/* Elfsight Google Reviews Widget */}
        <div className="relative -mx-4 px-4 pb-12 w-full flex justify-center">
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-85b26450-b088-4604-b330-8b25270155e8" data-elfsight-app-lazy style={{ width: "100%" }}></div>
        </div>
      </div>
    </section>
  );
}
