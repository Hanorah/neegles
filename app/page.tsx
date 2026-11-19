import Hero from "@/components/home/Hero";
import NReveal from "@/components/home/NReveal";
import WorkIndex from "@/components/home/WorkIndex";
import ServicesList from "@/components/home/ServicesList";
import WhyStack from "@/components/home/WhyStack";
import ProcessTrack from "@/components/home/ProcessTrack";
import Band from "@/components/home/Band";
import Voices from "@/components/home/Voices";
import IndustryRows from "@/components/home/IndustryRows";

export default function Home() {
  return (
    <>
      <Hero />
      <NReveal />
      <WorkIndex />
      <ServicesList />
      <WhyStack />
      <ProcessTrack />
      <Band />
      <Voices />
      <IndustryRows />
    </>
  );
}
