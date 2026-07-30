import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import FlashSale from "../components/home/FlashSale";
import BestSellers from "../components/home/BestSellers";
import Features from "../components/home/Features";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <FlashSale />
      <BestSellers />
      <Features />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;