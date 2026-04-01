interface BusinessIconProps {
  className?: string;
  size?: number;
}

export default function BusinessIcon({ className = "", size = 24 }: BusinessIconProps) {
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
        d="M3 21H21M5 17V21M19 17V21M6 9V13M10 9V13M14 9V13M18 9V13M3 5L12 2L21 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 5V17H21V5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
