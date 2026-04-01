interface PhoneIconProps {
  className?: string;
  size?: number;
}

export default function PhoneIcon({ className = "", size = 24 }: PhoneIconProps) {
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
        d="M22 16.92V19.92C22 20.52 21.39 21 20.78 21C15.89 21 11.28 19.18 7.55 15.45C3.82 11.72 2 7.11 2 2.22C2 1.61 2.48 1 3.08 1H6.08C6.68 1 7.08 1.61 7.08 2.22C7.08 3.22 7.18 4.22 7.38 5.22C7.48 5.72 7.28 6.22 6.88 6.62L5.08 8.42C6.88 12.22 9.78 15.12 13.58 16.92L15.38 15.12C15.78 14.72 16.28 14.52 16.78 14.62C17.78 14.82 18.78 14.92 19.78 14.92C20.39 14.92 21 15.32 21 15.92V16.92H22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
