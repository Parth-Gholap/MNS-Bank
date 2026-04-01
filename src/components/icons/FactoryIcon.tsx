interface FactoryIconProps {
  className?: string;
  size?: number;
}

export default function FactoryIcon({ className = "", size = 24 }: FactoryIconProps) {
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
        d="M2 12L8 6V12M2 12L8 18M2 12H16M22 12L16 6V12M22 12L16 18M22 12H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H16V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H10C9.46957 22 8.96086 21.7893 8.58579 21.4142C8.21071 21.0391 8 20.5304 8 20V12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
