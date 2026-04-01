interface LocationIconProps {
  className?: string;
  size?: number;
}

export default function LocationIcon({ className = "", size = 24 }: LocationIconProps) {
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
        d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.58172 6.58172 2 11 2C12.8506 2 14.5403 2.69281 15.8284 3.82843C17.0675 4.91873 18 6.58021 18 8.5C18 10.5 17 12.5 15.8284 13.8284C14.5403 15.0675 12.8506 16 11 16C9.14938 16 7.45967 15.0675 6.17157 13.8284C5 12.5 4 10.5 4 8.5C4 6.58021 4.9325 4.91873 6.17157 3.82843C7.45967 2.69281 9.14938 2 11 2H12C16.4183 2 21 5.58172 21 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
