import { ContactSection } from "@/components/site/ContactSection";
import { HeroSection } from "@/components/site/HeroSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { CONTACT_CONFIG, SITE_CONFIG } from "@/lib/content/site-content";

const LINKEDIN_URL =
  process.env.LINKEDIN_URL ?? process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_CONFIG.brandName,
  image: "https://prairiebusinessai.ca/og.jpg",
  url: "https://prairiebusinessai.ca",
  telephone: CONTACT_CONFIG.contactPhone,
  email: CONTACT_CONFIG.contactEmail,
  areaServed: ["Regina", "Canada"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Regina",
    addressRegion: "SK",
    addressCountry: "CA",
  },
  founder: {
    "@type": "Person",
    name: "Josh",
  },
  sameAs: LINKEDIN_URL ? [LINKEDIN_URL] : [],
};

export default function Home() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
