import { HERMES_H, HERMES_MARK_PATH, HERMES_PATH, HERMES_W } from "@/lib/hermes-paths";

/** Silhouette d'Hermès — version simplifiée pour le logo, ou complète. */
export function HermesMark({
  className,
  detailed = false,
  title,
}: {
  className?: string;
  detailed?: boolean;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${HERMES_W} ${HERMES_H}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path d={detailed ? HERMES_PATH : HERMES_MARK_PATH} />
    </svg>
  );
}

/** Logotype : silhouette + HERMÈS espacé. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`logo ${className ?? ""}`}>
      <span className="logo-mark" data-logo-target>
        <HermesMark />
      </span>
      <span className="logo-word">HERMÈS</span>
    </span>
  );
}
