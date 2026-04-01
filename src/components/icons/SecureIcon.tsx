interface SecureIconProps {
  className?: string;
  size?: number;
}

export default function SecureIcon({ className = "", size = 24 }: SecureIconProps) {
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
        d="M12 2C11.45 2 10.9 2.11 10.41 2.33C9.92 2.55 9.48 2.87 9.12 3.27C8.76 3.67 8.49 4.14 8.33 4.65C8.17 5.16 8.12 5.7 8.19 6.23V8H6C5.45 8 4.92 8.21 4.54 8.59C4.16 8.97 4 9.45 4 10V18C4 18.55 4.16 19.03 4.54 19.41C4.92 19.79 5.45 20 6 20H18C18.55 20 19.08 19.79 19.46 19.41C19.84 19.03 20 18.55 20 18V10C20 9.45 19.84 8.97 19.46 8.59C19.08 8.21 18.55 8 18 8H16V6.23C16.12 5.17 15.78 4.13 15.06 3.33C14.34 2.53 13.31 2.08 12.23 2H12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 8V6C8 5.2 8.32 4.44 8.88 3.88C9.44 3.32 10.2 3 11 3H13C13.8 3 14.56 3.32 15.12 3.88C15.68 4.44 16 5.2 16 6V8" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}
