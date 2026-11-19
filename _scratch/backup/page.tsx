import SmoothScroll from "@/components/SmoothScroll";
import Motion from "@/components/Motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Industries from "@/components/Industries";
import Process from "@/components/Process";
import Why from "@/components/Why";
import Voices from "@/components/Voices";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Motion />
      <Header />
      <main id="main">
        <Hero />
        <Statement />
        <Services />
        <Work />
        <Industries />
        <Process />
        <Why />
        <Voices />
        <Footer />
      </main>
    </>
  );
}
