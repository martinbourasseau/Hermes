import { LandingTemplate, landingMetadata } from "@/components/LandingTemplate";

export const metadata = landingMetadata("audit-seo");

export default function Page() {
  return <LandingTemplate slug="audit-seo" />;
}
