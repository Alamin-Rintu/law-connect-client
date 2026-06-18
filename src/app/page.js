import AttorneyCTA from "@/components/AttorneyCTA";
import Banner from "@/components/Banner";
import { FAQSection } from "@/components/FAQSection";
import PracticeAreas from "@/components/PracticeAreas";
import Testimonials from "@/components/Testimonials";
import TopCounsel from "@/components/TopCounsel";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <TopCounsel/>
      <PracticeAreas />
      <Testimonials/>
      <FAQSection/>
      <AttorneyCTA/>
    </div>
  );
}
