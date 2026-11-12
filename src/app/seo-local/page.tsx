import { LandingTemplate, landingMetadata } from "@/components/LandingTemplate";

export const metadata = landingMetadata("seo-local");

export default function Page() {
  return <LandingTemplate slug="seo-local" />;
}
