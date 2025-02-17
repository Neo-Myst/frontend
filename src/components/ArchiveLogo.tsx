import React from "react";

interface ArchiveLogoProps {
  width?: string;
  height?: string;
  className?: string;
}

const ArchiveLogo: React.FC<ArchiveLogoProps> = ({
  width = "600",
  height = "400",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 400"
      width={width}
      height={height}
      className={className}
    >
      {/* Background */}
      <rect width="600" height="400" fill="#0a0a0a" />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#6666FF" }} />
          <stop offset="100%" style={{ stopColor: "#9966FF" }} />
        </linearGradient>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main text */}
      <text
        x="100"
        y="200"
        fontFamily="Arial, sans-serif"
        fontSize="80"
        fill="url(#textGradient)"
        style={{ fontStyle: "italic" }}
        filter="url(#glow)"
      >
        Archive 1.1
      </text>

      {/* Decorative line */}
      <path
        d="M100 220 L500 220 L480 280"
        stroke="url(#textGradient)"
        strokeWidth="4"
        fill="none"
        opacity="0.3"
      />

      {/* Glow effect for line */}
      <path
        d="M100 220 L500 220 L480 280"
        stroke="#6666FF"
        strokeWidth="2"
        fill="none"
        opacity="0.1"
        filter="url(#glow)"
      />
    </svg>
  );
};

export default ArchiveLogo;
