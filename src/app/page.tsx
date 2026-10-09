import AllProducts from "@/components/homepage/AllProducts";
import Banner from "@/components/homepage/Banner";
import Marquee from "@/components/homepage/Marquee";
import PriceDecreased from "@/components/homepage/priceDecreased";
import PriceIncreased from "@/components/homepage/priceIncreased";







export default function Home() {
  return (
    <div>
      <Marquee></Marquee>
      <div className="px-3 md:px-0">
        <Banner></Banner>
        <PriceIncreased></PriceIncreased>
        <PriceDecreased></PriceDecreased>
        <AllProducts></AllProducts>
      </div>
      
    </div>
  );
}
