// Small inline icon set. Avoids pulling an icon-font CDN into the page.
const paths = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  twitter: <path d="M4 4l7.2 9.1L4.4 20h2.1l5.6-5.7L16.6 20H20l-7.5-9.5L19.6 4h-2.1l-5.2 5.3L8 4H4z" fill="currentColor" stroke="none" />,
  facebook: <path d="M14.5 21v-7h2.4l.4-2.9h-2.8V9.3c0-.85.24-1.42 1.45-1.42H17.4V5.28A19 19 0 0 0 15.15 5.16c-2.23 0-3.75 1.36-3.75 3.86v2.15H9v2.9h2.4V21z" fill="currentColor" stroke="none" />,
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  phone: <path d="M5 3h3.2l1.6 4-2 1.4a12 12 0 0 0 5.8 5.8l1.4-2 4 1.6V17a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.2 2 2 0 0 1 5 3z" />,
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  arrowRight: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowDown: <path d="M12 4v15m-6-6 6 6 6-6" />,
  menu: <path d="M3 7h18M3 12h18M3 17h18" />,
  close: <path d="M5 5l14 14M19 5 5 19" />,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.2M12 16.2v.1" />
    </>
  ),
  cue: <path d="M3 21 21 3M7.5 16.5 4 20l-1 1 1-1zM16 8l5-5" />,
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.5, ...rest }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {d}
    </svg>
  )
}
