interface DigitalBankingIconProps {
  className?: string;
  size?: number;
}

export default function DigitalBankingIcon({ className = "", size = 24 }: DigitalBankingIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 14H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 11C8.5 9.5 10 8.5 12 8.5C14 8.5 15.5 9.5 16 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
