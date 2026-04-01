interface CardIconProps {
  className?: string;
  size?: number;
}

export default function CardIcon({ className = "", size = 24 }: CardIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
      <path d="M7 14H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 14H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
