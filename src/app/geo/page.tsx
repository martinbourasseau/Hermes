import { LandingTemplate, landingMetadata } from "@/components/LandingTemplate";

export const metadata = landingMetadata("geo");

export default function Page() {
  return <LandingTemplate slug="geo" />;
}
