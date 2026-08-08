import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white pt-20 pb-10">
      <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] font-bold text-xl">
                O
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-tight text-white">
                  Dr. Isteyaque
                </span>
                <span className="text-xs text-blue-200 font-medium">
                  Orthopedic Clinic
                </span>
              </div>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed">
              Premium orthopedic care focusing on advanced treatments, surgeries, and comprehensive rehabilitation for a pain-free life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors text-sm">
                  About the Doctor
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Our Treatments
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Patient Success Stories
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Clinic Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Key Treatments</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/treatments/knee-replacement" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Total Knee Replacement
                </Link>
              </li>
              <li>
                <Link href="/treatments/hip-replacement" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Total Hip Replacement
                </Link>
              </li>
              <li>
                <Link href="/treatments/arthroscopic-surgery" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Arthroscopic Surgery
                </Link>
              </li>
              <li>
                <Link href="/treatments/sports-injuries" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Sports Injuries
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-blue-200 text-sm">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span>123 Health Avenue, Medical District, City, State 12345</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 text-sm">
                <Phone size={18} className="shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 text-sm">
                <Mail size={18} className="shrink-0" />
                <span>care@orthoclinic.com</span>
              </li>
            </ul>
            <div className="mt-8">
              <Button className="w-full justify-between bg-white text-[var(--color-primary)] hover:bg-gray-100">
                Book Appointment <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-200 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Dr. Isteyaque Orthopedic Clinic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-blue-200 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-blue-200 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
