interface BankIconProps {
  className?: string;
  size?: number;
}

export default function BankIcon({ className = "", size = 24 }: BankIconProps) {
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
        d="M2 21L22 21M3 10V21H21V10M5 6L12 2L19 6M8 10V14M12 10V14M16 10V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 21V14H17V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
