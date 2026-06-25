import AttorneyCTA from "@/components/AttorneyCTA";
import Banner from "@/components/Banner";
import { FAQSection } from "@/components/FAQSection";
import LatestLawyer from "@/components/LatestLawyer";
import PracticeAreas from "@/components/PracticeAreas";
import Testimonials from "@/components/Testimonials";
import TopCounsel from "@/components/TopCounsel";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <LatestLawyer/>
      <TopCounsel/>
      <PracticeAreas />
      <Testimonials/>
      <FAQSection/>
      <AttorneyCTA/>
    </div>
  );
}
