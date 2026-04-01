interface BriefcaseIconProps {
  className?: string;
  size?: number;
}

export default function BriefcaseIcon({ className = "", size = 24 }: BriefcaseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 7V5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5V7" stroke="currentColor" strokeWidth="2" />
      <path d="M8 21V16H16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
