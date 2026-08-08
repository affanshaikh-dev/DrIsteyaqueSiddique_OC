"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  service: z.string().min(1, { message: "Please select a service." }),
  date: z.string().min(1, { message: "Please select a preferred date." }),
  message: z.string().optional(),
});

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Submit logic here
    alert("Appointment request submitted successfully!");
  };

  return (
    <div className="pt-24 pb-10 bg-[var(--color-background)]">
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[var(--color-heading)] mb-6">
              Get in <span className="text-[var(--color-primary)]">Touch</span>
            </h1>
            <p className="text-lg text-[var(--color-paragraph)]">
              Have questions or want to schedule an appointment? We are here to help you on your journey to recovery.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Details */}
            <div>
              <h3 className="text-3xl font-heading font-bold text-[var(--color-heading)] mb-8">
                Clinic Information
              </h3>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-[var(--color-heading)] mb-1">Our Location</h4>
                    <p className="text-[var(--color-paragraph)]">
                      123 Health Avenue, Medical District,<br />City, State 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-[var(--color-heading)] mb-1">Phone Number</h4>
                    <p className="text-[var(--color-paragraph)]">+91 98765 43210 (Appointments)</p>
                    <p className="text-[var(--color-paragraph)]">+91 98765 43211 (Emergency)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-[var(--color-heading)] mb-1">Email Address</h4>
                    <p className="text-[var(--color-paragraph)]">care@orthoclinic.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-[var(--color-heading)] mb-1">Working Hours</h4>
                    <p className="text-[var(--color-paragraph)]">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-[var(--color-paragraph)]">Sat: 9:00 AM - 2:00 PM</p>
                    <p className="text-[var(--color-error)] text-sm mt-1 font-medium">Sunday Closed</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="w-full rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.040321962085!2d72.9225695!3d19.061964700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f9686dfb75%3A0xc2130c718828da0f!2sDr.%20Isteyaque%20Siddique%20Orthopaedic%20Clinic!5e0!3m2!1sen!2sin!4v1786166996861!5m2!1sen!2sin"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Dr. Isteyaque Siddique Orthopaedic Clinic Location"
                />
              </div>
            </div>

            {/* Appointment Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-[var(--color-border)]"
            >
              <h3 className="text-2xl font-heading font-bold text-[var(--color-heading)] mb-2">
                Book an Appointment
              </h3>
              <p className="text-[var(--color-paragraph)] mb-8">
                Fill out the form below and our team will get back to you to confirm your slot.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-heading)]">Full Name *</label>
                    <input 
                      {...register("name")}
                      className="w-full h-12 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-heading)]">Phone Number *</label>
                    <input 
                      {...register("phone")}
                      className="w-full h-12 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-heading)]">Email Address *</label>
                    <input 
                      {...register("email")}
                      type="email"
                      className="w-full h-12 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-heading)]">Preferred Date *</label>
                    <input 
                      {...register("date")}
                      type="date"
                      className="w-full h-12 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
                    />
                    {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-heading)]">Select Service *</label>
                  <select 
                    {...register("service")}
                    className="w-full h-12 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
                  >
                    <option value="">Select a treatment</option>
                    <option value="knee">Knee Replacement</option>
                    <option value="hip">Hip Replacement</option>
                    <option value="arthroscopy">Arthroscopic Surgery</option>
                    <option value="sports">Sports Injury</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                  {errors.service && <p className="text-xs text-red-500">{errors.service.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-heading)]">Additional Message (Optional)</label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className="w-full p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all resize-none"
                    placeholder="Briefly describe your symptoms or reason for visit..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full h-14 text-base shadow-lg shadow-blue-900/20">
                  Submit Request <Send className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-xs text-center text-[var(--color-paragraph)]">
                  Your information is strictly confidential and protected by our privacy policy.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
