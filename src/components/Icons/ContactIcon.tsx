import React from 'react';

export const ContactIcon = ({
  color,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='20'
      fill='none'
      viewBox='0 0 32 24'
      {...props}
    >
      <path
        fill={color ?? 'var(--cyan)'}
        d='M29.333 0H2.667A2.675 2.675 0 000 2.667v18.666C0 22.8 1.2 24 2.667 24h26.666c1.467 0 2.654-1.2 2.654-2.667L32 2.667C32 1.2 30.8 0 29.333 0zM10.667 4c2.213 0 4 1.787 4 4s-1.787 4-4 4c-2.214 0-4-1.787-4-4s1.786-4 4-4zm8 16h-16v-1.333c0-2.667 5.333-4.134 8-4.134 2.666 0 8 1.467 8 4.134V20zm5.133-5.333h2.187L28 17.333l-2.653 2.654a10.016 10.016 0 01-3.64-5.32A9.834 9.834 0 0121.333 12c0-.92.134-1.813.374-2.667a9.965 9.965 0 013.64-5.32L28 6.667l-2.013 2.666H23.8A8.066 8.066 0 0023.333 12c0 .933.174 1.827.467 2.667z'
      ></path>
    </svg>
  );
};
