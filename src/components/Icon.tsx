import type { IconName } from "@/data/site";

type Extra = "arrow" | "phone" | "mail" | "pin" | "linkedin" | "check" | "menu" | "close" | "plus" | "clock";

const paths: Record<IconName | Extra, React.ReactNode> = {
  erp: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M17.5 14v7M14 17.5h7" />
    </>
  ),
  apps: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
      <path d="M9.5 8.5l-2 2 2 2M14.5 8.5l2 2-2 2" />
    </>
  ),
  web: (
    <>
      <rect x="2.5" y="4" width="19" height="14" rx="2" />
      <path d="M2.5 8h19M8 21h8M12 18v3" />
      <circle cx="5.5" cy="6" r=".4" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A6 6 0 0 1 18 8.5a4.75 4.75 0 0 1-.5 9.5H7z" />
      <path d="M12 11v5M9.5 13.5L12 11l2.5 2.5" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5v4.5M12 12l-5.3 4.9M12 12l5.3 4.9" />
    </>
  ),
  hardware: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx=".8" />
      <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
    </>
  ),
  finance: (
    <>
      <rect x="2.5" y="6" width="19" height="13" rx="2" />
      <path d="M2.5 10h19" />
      <path d="M16 15h2.5" />
      <path d="M6 3.5h12" />
    </>
  ),
  hr: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
    </>
  ),
  currency: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 8.5h-4.25a2 2 0 0 0 0 4h2.5a2 2 0 0 1 0 4H9M12 6.5v2M12 16.5v2" />
    </>
  ),
  expertise: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14l-1.5 7.5L12 19l5 2.5-1.5-7.5" />
      <path d="M10 9l1.5 1.5L14.5 7.5" />
    </>
  ),
  industry: (
    <>
      <path d="M2.5 21V11l6 3.5V11l6 3.5V5h3l1 3h3v13z" />
      <path d="M6.5 17.5h1.5M11 17.5h1.5M15.5 17.5H17" />
    </>
  ),
  custom: (
    <>
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="10" cy="12" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  deploy: (
    <>
      <path d="M12 15c-2-2-3-5.5-1.5-10 3.5 1.5 6 4.5 5.5 9.5z" />
      <path d="M10.5 14.5L7 13l2-3.5M13.5 15.5L15 19l2.5-2M9 18c-1 .5-2.5 1-3.5 3 2-.5 3-1.5 3.5-2.5" />
      <circle cx="13" cy="9" r="1" />
    </>
  ),
  support: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
      <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
      <path d="M19.5 19a3 3 0 0 1-3 2.5H13" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
      <path d="M12 12l7-7M16 5h3v3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: (
    <path d="M5 3.5h3.5l1.5 4.5-2.25 1.5a11 11 0 0 0 6.75 6.75L16 14l4.5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5.5a2 2 0 0 1 2-2z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.25v.01M12 17v-6.5M12 13.5c0-1.75 1-3 2.6-3 1.5 0 2.4 1 2.4 3V17" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />,
  plus: <path d="M12 5v14M5 12h14" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

export default function Icon({
  name,
  size = 24,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName | Extra;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
