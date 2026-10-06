export function ContactIcon({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {label === "Email" ? (
        <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>
      ) : label === "Phone" ? (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z" />
      ) : label === "LinkedIn" ? (
        <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10v7M11.5 17v-7m0 3a3 3 0 0 1 6 0v4" /><circle cx="7.5" cy="7" r="1" fill="currentColor" stroke="none" /></>
      ) : label === "GitHub" ? (
        <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.9a3.4 3.4 0 0 0-.94-2.65c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.7 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.7a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.4 3.4 0 0 0 8 18.1V22" />
      ) : label === "Résumé / CV" ? (
        <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h6" /></>
      ) : label === "Location" ? (
        <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>
      ) : (
        <><circle cx="12" cy="12" r="9" /><path d="M8 12h8m-4-4 4 4-4 4" /></>
      )}
    </svg>
  );
}
