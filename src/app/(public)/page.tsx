import { HeroSection } from "@/components/home/HeroSection";
import { DoctorIntro } from "@/components/home/DoctorIntro";
import { Treatments } from "@/components/home/Treatments";
import { PatientJourney } from "@/components/home/PatientJourney";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { AppointmentCTA } from "@/components/home/AppointmentCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DoctorIntro />
      <Treatments />
      <PatientJourney />
      <Testimonials />
      <FAQ />
      <AppointmentCTA />
    </>
  );
}
