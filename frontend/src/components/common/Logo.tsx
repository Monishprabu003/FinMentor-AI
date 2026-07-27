import React from 'react';

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
export type LogoVariant = 'default' | 'light' | 'dark' | 'monochrome' | 'app-icon' | 'blue';

interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  iconOnly?: boolean;
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

/* ═══════════════════════════════════════════════════════════════
   FINMENTOR GEOMETRIC LOGO ICON (Image 2 exact replica)
   - Abstract letter 'F' frame
   - Upward trending financial growth chart with Arrowhead
   - 3 Ascending vertical bars
   ═══════════════════════════════════════════════════════════════ */
export const LogoIcon: React.FC<{ sizePx: number; variant?: LogoVariant; className?: string }> = ({
  sizePx,
  variant = 'default',
  className = '',
}) => {
  // Determine fill/stroke color based on variant
  let mainColor = '#0F172A'; // Deep Navy default
  if (variant === 'blue') mainColor = '#2563EB';
  if (variant === 'light') mainColor = '#FFFFFF';
  if (variant === 'monochrome') mainColor = 'currentColor';

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: sizePx, height: sizePx }}
    >
      <svg
        width={sizePx}
        height={sizePx}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Outer 'F' Stem & Top Bar */}
        <path
          d="M 28 70 C 28 73 26 76 23 76 C 21 76 20 74 20 71 L 20 32 C 20 18 30 10 46 10 H 70"
          stroke={mainColor}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Upward Growth Trend Line */}
        <path
          d="M 20 48 C 29 48 35 36 43 36 C 50 36 54 44 60 44 C 65 44 68 36 74 28"
          stroke={mainColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Trend Line Arrow Head */}
        <path
          d="M 80 22 L 67 23 L 78 34 Z"
          fill={mainColor}
          stroke={mainColor}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 3 Ascending Bars */}
        <path
          d="M 44 72 V 62 M 57 72 V 54 M 70 72 V 46"
          stroke={mainColor}
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   FINMENTOR BRAND LOGO (Horizontal Lockup / App Icon / Wordmark)
   ═══════════════════════════════════════════════════════════════ */
export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'default',
  iconOnly = false,
  showTagline = false,
  className = '',
  onClick,
}) => {
  // Convert size prop to pixel values
  const sizePx =
    typeof size === 'number'
      ? size
      : {
          sm: 24,
          md: 36,
          lg: 44,
          xl: 52,
          '2xl': 68,
        }[size] || 36;

  // Text color based on variant
  const textColorClass =
    variant === 'light'
      ? 'text-white'
      : variant === 'monochrome'
      ? 'text-current'
      : 'text-[#0F172A]';

  // App Icon variant (standalone tile)
  if (variant === 'app-icon') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-md ${
          onClick ? 'cursor-pointer hover:scale-[1.02] transition-transform' : ''
        } ${className}`}
      >
        <LogoIcon sizePx={sizePx} variant="light" />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Icon */}
      <LogoIcon sizePx={sizePx} variant={variant} />

      {/* Wordmark */}
      {!iconOnly && (
        <div className="leading-none">
          <div
            className={`tracking-tight ${textColorClass} flex items-center font-sans`}
            style={{ fontSize: Math.max(16, sizePx * 0.72) }}
          >
            <span className="font-bold tracking-tight">Fin</span>
            <span className="font-normal tracking-tight ml-[1px]">Mentor</span>
          </div>
          {showTagline && (
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-1">
              AI Financial OS
            </span>
          )}
        </div>
      )}
    </div>
  );
};
