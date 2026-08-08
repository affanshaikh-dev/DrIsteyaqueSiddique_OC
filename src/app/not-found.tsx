"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-10 bg-[var(--color-background)] px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-heading font-bold text-[var(--color-primary)] opacity-20 mb-4">
            404
          </h1>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-heading)] mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-[var(--color-paragraph)] mb-10">
            We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-full font-semibold hover:bg-blue-900 transition-colors shadow-lg hover:shadow-xl group"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--color-heading)] border border-[var(--color-border)] rounded-full font-semibold hover:bg-gray-50 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
