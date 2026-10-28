import type { SVGProps } from 'react';

export function RazorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7.5 20.5 L3.5 16.5" />
      <path d="M5.5 18.5 L20.5 3.5 L21.5 2.5 L22.5 2.5 L22.5 3.5 L21.5 4.5 L6.5 19.5" />
      <path d="M20.5 8.5 L15.5 3.5" />
    </svg>
  );
}

export function CombIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 20 L4 4 L20 4 L20 8" />
      <path d="M6 8 L6 20" />
      <path d="M9 8 L9 20" />
      <path d="M12 8 L12 20" />
      <path d="M15 8 L15 20" />
      <path d="M18 8 L18 20" />
    </svg>
  );
}
