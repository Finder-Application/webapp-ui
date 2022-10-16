import React from 'react';

export const TickIcon = ({
  color = '#2DDF40',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='19'
      height='14'
      fill='none'
      viewBox='0 0 19 14'
      {...props}
    >
      <path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M1 7.5l5.688 5.688L18.063 1'
      ></path>
    </svg>
  );
};
