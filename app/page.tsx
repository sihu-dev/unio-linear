// app/page.tsx
// UNIO Landing Page - v7.4 Business Plan Based
import {
  Navigation,
  HeroSection,
  ProblemSection,
  SolutionSection,
  ProductCards,
  ProofSection,
  ROICalculator,
  CTASection,
  Footer,
} from '@/components/landing';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProductCards />
      <ProofSection />
      <div id="roi">
        <ROICalculator />
      </div>
      <CTASection />
      <Footer />
    </main>
  );
}
