import { LandingTemplate, landingMetadata } from "@/components/LandingTemplate";

export const metadata = landingMetadata("seo");

export default function Page() {
  return <LandingTemplate slug="seo" />;
}
