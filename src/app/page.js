import Banner from "@/components/Banner";
import PracticeAreas from "@/components/PracticeAreas";
import TopCounsel from "@/components/TopCounsel";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <TopCounsel/>
      <PracticeAreas />
    </div>
  );
}
