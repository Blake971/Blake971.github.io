import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variant?: "auto" | "light" | "dark";
}

/**
 * Clean vector icon mark for VisezWorks (Orange Chevron + Stylized W).
 * Automatically switches between light theme (#1e2530) and dark theme (#ffffff).
 */
export function VisezWorksIcon({ className = "size-8", variant = "auto", ...props }: LogoProps) {
  const isExplicitDark = variant === "dark";
  const isExplicitLight = variant === "light";

  return (
    <svg
      viewBox="0 0 100 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-colors duration-300`}
      {...props}
    >
      {/* Top Orange Chevron */}
      <path d="M 50 8 L 72 23 L 61 23 L 50 15 L 39 23 L 28 23 Z" fill="var(--primary, #f95700)" />

      {/* Stylized W Mark */}
      <polygon
        points="22,29 37,29 47,72 32,72"
        fill={isExplicitDark ? "#ffffff" : isExplicitLight ? "#1e2530" : "currentColor"}
      />
      <polygon
        points="43,39 58,39 63,72 48,72"
        fill={isExplicitDark ? "#ffffff" : isExplicitLight ? "#1e2530" : "currentColor"}
      />
      <polygon
        points="60,39 77,29 64,61 48,72"
        fill={isExplicitDark ? "#ffffff" : isExplicitLight ? "#1e2530" : "currentColor"}
      />
    </svg>
  );
}

/**
 * Full VisezWorks Logo with Icon, VISEZWORKS Typography, and Tagline.
 * Dynamically switches theme colors for Light / Dark Mode readability.
 */
export function VisezWorksFullLogo({
  className = "h-12 w-auto",
  variant = "auto",
  ...props
}: LogoProps) {
  const isExplicitDark = variant === "dark";
  const isExplicitLight = variant === "light";
  const textFill = isExplicitDark ? "#ffffff" : isExplicitLight ? "#1e2530" : "currentColor";

  return (
    <svg
      viewBox="0 0 500 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-colors duration-300`}
      {...props}
    >
      {/* Icon Mark */}
      <g transform="translate(200, 10)">
        <path d="M 50 8 L 72 23 L 61 23 L 50 15 L 39 23 L 28 23 Z" fill="var(--primary, #f95700)" />
        <polygon points="22,29 37,29 47,72 32,72" fill={textFill} />
        <polygon points="43,39 58,39 63,72 48,72" fill={textFill} />
        <polygon points="60,39 77,29 64,61 48,72" fill={textFill} />
      </g>

      {/* Typography VISEZWORKS */}
      <text
        x="250"
        y="170"
        textAnchor="middle"
        fontFamily="var(--font-display, sans-serif)"
        fontWeight="900"
        fontSize="40"
        letterSpacing="0.2em"
      >
        <tspan fill={textFill}>VISE</tspan>
        <tspan fill="var(--primary, #f95700)">Z</tspan>
        <tspan fill={textFill}>WORKS</tspan>
      </text>

      {/* Accent lines and tagline */}
      <line x1="40" y1="205" x2="110" y2="205" stroke="var(--primary, #f95700)" strokeWidth="2" />
      <text
        x="250"
        y="210"
        textAnchor="middle"
        fontFamily="var(--font-mono, monospace)"
        fontWeight="700"
        fontSize="13"
        letterSpacing="0.26em"
        fill={textFill}
        opacity="0.85"
      >
        VISION <tspan fill="var(--primary, #f95700)">•</tspan> INNOVATE{" "}
        <tspan fill="var(--primary, #f95700)">•</tspan> CREATE
      </text>
      <line x1="390" y1="205" x2="460" y2="205" stroke="var(--primary, #f95700)" strokeWidth="2" />
    </svg>
  );
}

/**
 * Image-based Logo switcher utilizing existing Visez Works assets for Light and Dark modes.
 */
export function VisezWorksResponsiveLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Light Mode Logo Asset */}
      <img
        src="/__l5e/assets-v1/7880e77f-36a1-4c60-a1d1-f08a155c456d/visezworks-logo.png"
        alt="VisezWorks Logo Light"
        className="block dark:hidden h-full w-auto object-contain"
      />
      {/* Dark Mode Logo Asset (Inverted or Dark-Optimized SVG) */}
      <img
        src="/logo.svg"
        alt="VisezWorks Logo Dark"
        className="hidden dark:block h-full w-auto object-contain brightness-125 contrast-125 filter invert dark:invert-0"
      />
    </div>
  );
}
