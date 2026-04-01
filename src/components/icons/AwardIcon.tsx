interface AwardIconProps {
  className?: string;
  size?: number;
}

export default function AwardIcon({ className = "", size = 24 }: AwardIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 14L8 18L9 22L12 20L15 22L16 18L12 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2V4M12 12V14M20 8H18M6 8H4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
