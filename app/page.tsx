import HeroSection          from '../components/sections/HeroSection'
import ImageRevealSection   from '../components/sections/ImageRevealSection'
import DiferenciaisSection  from '../components/sections/DiferenciaisSection'
import TaxasSection         from '../components/sections/TaxasSection'
import ComparacaoSection    from '../components/sections/ComparacaoSection'
import AlertasSection       from '../components/sections/AlertasSection'
import FAQSection           from '../components/sections/FAQSection'
import Footer               from '../components/Footer'

export default function Page() {
  return (
    <main>
      <HeroSection />
      <ImageRevealSection />
      <DiferenciaisSection />
      <TaxasSection />
      <ComparacaoSection />
      <AlertasSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
