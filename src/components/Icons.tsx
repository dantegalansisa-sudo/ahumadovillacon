/**
 * Inline SVG icons only — no icon package.
 * Line icons are 24px, stroke 1.5, currentColor. Every icon is decorative:
 * meaning always lives in adjacent text, so they stay aria-hidden.
 */

interface IconProps {
  size?: number;
  className?: string;
}

function Line({
  size = 24,
  className = '',
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function IconAward(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.4 7 21l5-2.6 5 2.6-1.5-7.6" />
    </Line>
  );
}

export function IconScale(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 4v16" />
      <path d="M6 20h12" />
      <path d="M3.5 9h17" />
      <path d="M3.5 9 6 15h-5z" />
      <path d="M20.5 9 23 15h-5z" />
    </Line>
  );
}

export function IconSnow(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 2v20" />
      <path d="m3.5 7 17 10" />
      <path d="m20.5 7-17 10" />
      <path d="m9 4 3 2.5L15 4" />
      <path d="m9 20 3-2.5 3 2.5" />
    </Line>
  );
}

export function IconChat(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M21 11.5a8 8 0 0 1-11.9 7L3 20.5l2-6.1A8 8 0 1 1 21 11.5Z" />
    </Line>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Line {...props}>
      <path d="m4 12.5 5 5L20 6.5" />
    </Line>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </Line>
  );
}

export function IconPin(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Line>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5l3.5 2" />
    </Line>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M6.5 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </Line>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
    </Line>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M3 7h18" />
      <path d="M3 12h18" />
      <path d="M3 17h18" />
    </Line>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </Line>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Line>
  );
}

export function IconMinus(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M5 12h14" />
    </Line>
  );
}

export function IconBag(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M4.5 8h15l-1.2 12H5.7Z" />
      <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
    </Line>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M4 7h16" />
      <path d="M9.5 7V5.5h5V7" />
      <path d="M6.5 7l1 13h9l1-13" />
    </Line>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <Line {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </Line>
  );
}

export function IconFacebook(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M14.5 8.5h2.5M14.5 21V9.8c0-1.8 1-2.8 2.8-2.8H19" />
      <path d="M11 12h6" />
      <path d="M14.5 21v-9" />
    </Line>
  );
}

/** Solid WhatsApp glyph — used on the floating button and inline links. */
export function IconWhatsApp({ size = 24, className = '' }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 5.82 2.42 8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
