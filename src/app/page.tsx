import Hero from '@/components/Hero';
import ProductsSection from '@/components/ProductCard';
import RecognitionSection from '@/components/RecognitionSection';
import Solutions from '@/components/Solutions';
import TrustedBy from '@/components/TrustedBy';
import WhyChooseUs from '@/components/WhyChooseUs';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto">
        <ProductsSection />
        {/* <RecognitionSection /> */}
        <WhyChooseUs />
        <TrustedBy />
        <Solutions />
      </div>
    </>
  );
}
