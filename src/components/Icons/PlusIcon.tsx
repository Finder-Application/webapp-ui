import React from 'react';

export const PlusIcon = ({
  color = '#D9D9D9',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      fill='none'
      viewBox='0 0 28 28'
      {...props}
    >
      <path
        fill={color}
        d='M26 11h-9V2c0-1.063-.938-2-2-2h-2c-1.125 0-2 .938-2 2v9H2c-1.125 0-2 .938-2 2v2c0 1.125.875 2 2 2h9v9c0 1.125.875 2 2 2h2c1.063 0 2-.875 2-2v-9h9c1.063 0 2-.875 2-2v-2c0-1.063-.938-2-2-2z'
      ></path>
    </svg>
  );
};
