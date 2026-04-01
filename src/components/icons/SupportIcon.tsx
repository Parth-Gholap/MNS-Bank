interface SupportIconProps {
  className?: string;
  size?: number;
}

export default function SupportIcon({ className = "", size = 24 }: SupportIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 12C3 12 5 4 12 4C19 4 21 12 21 12C21 12 19 20 12 20C5 20 3 12 3 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 1V6M12 18V23M21 12H16M8 12H3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
