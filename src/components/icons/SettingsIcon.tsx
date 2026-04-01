interface SettingsIconProps {
  className?: string;
  size?: number;
}

export default function SettingsIcon({ className = "", size = 24 }: SettingsIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 1V6M12 18V23M4.22 4.22L7.05 7.05M16.95 16.95L19.78 19.78M1 12H6M18 12H23M4.22 19.78L7.05 16.95M16.95 7.05L19.78 4.22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
