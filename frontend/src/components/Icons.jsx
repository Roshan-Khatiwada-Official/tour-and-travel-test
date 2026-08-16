// Real, recognizable SVG logos (drawn as simple flat marks) — no external image
// requests, no copyrighted brand artwork reproduced pixel-for-pixel.

export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"/>
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.93L2 22l5.31-1.39a9.87 9.87 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.51 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.82-.11-.42-.14-.96-.32-1.65-.62-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .9 2.14.07.15.12.32.02.51-.09.2-.14.32-.27.49-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.29.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.29.14.46.12.63-.07.17-.2.72-.84.92-1.13.19-.29.38-.24.64-.14.27.09 1.68.79 1.97.94.29.14.48.21.55.33.07.12.07.7-.17 1.38Z"/>
    </svg>
  );
}

export function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M22 12s0-3.34-.43-4.94a2.78 2.78 0 0 0-1.96-1.97C18.03 4.66 12 4.66 12 4.66s-6.03 0-7.61.43A2.78 2.78 0 0 0 2.43 7.06C2 8.66 2 12 2 12s0 3.34.43 4.94a2.78 2.78 0 0 0 1.96 1.97c1.58.43 7.61.43 7.61.43s6.03 0 7.61-.43a2.78 2.78 0 0 0 1.96-1.97C22 15.34 22 12 22 12Z" opacity=".18"/>
      <path d="M22 12s0-3.34-.43-4.94a2.78 2.78 0 0 0-1.96-1.97C18.03 4.66 12 4.66 12 4.66s-6.03 0-7.61.43A2.78 2.78 0 0 0 2.43 7.06C2 8.66 2 12 2 12s0 3.34.43 4.94a2.78 2.78 0 0 0 1.96 1.97c1.58.43 7.61.43 7.61.43s6.03 0 7.61-.43a2.78 2.78 0 0 0 1.96-1.97C22 15.34 22 12 22 12ZM10 15.02V8.98L15.27 12 10 15.02Z"/>
    </svg>
  );
}

// Mountain placeholder — used everywhere a real trip photo hasn't been supplied yet.
export function MountainPlaceholder({ sky = "#3A9BDC", ground = "#0B2545", className }) {
  return (
    <svg className={className} viewBox="0 0 300 190" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="300" height="190" fill={sky} />
      <circle cx="240" cy="45" r="26" fill="#fff" opacity=".25" />
      <path d="M0 130 L60 70 L110 115 L160 55 L210 110 L260 65 L300 120 L300 190 L0 190 Z" fill={ground} opacity=".9" />
      <path d="M60 70 L75 88 L45 88 Z" fill="#fff" opacity=".85" />
      <path d="M160 55 L178 76 L142 76 Z" fill="#fff" opacity=".9" />
      <path d="M260 65 L275 84 L245 84 Z" fill="#fff" opacity=".8" />
      <path d="M0 160 L70 120 L140 155 L210 110 L300 150 L300 190 L0 190 Z" fill={ground} />
    </svg>
  );
}

export function AvatarPlaceholder({ color = "#FF6B35", className }) {
  return (
    <svg className={className} viewBox="0 0 46 46" aria-hidden="true">
      <circle cx="23" cy="23" r="23" fill={color} />
      <circle cx="23" cy="18" r="8" fill="#fff" />
      <path d="M6 42c2-10 10-15 17-15s15 5 17 15" fill="#fff" />
    </svg>
  );
}

export function EyeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

export function EyeOffIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c7 0 10.5 7 10.5 7a13.2 13.2 0 0 1-3.1 3.9M6.6 6.6C3.4 8.6 1.5 12 1.5 12s3.5 7 10.5 7a10.4 10.4 0 0 0 4.1-.83" />
      <path d="M9.5 9.9a3.2 3.2 0 0 0 4.5 4.5" />
    </svg>
  );
}
