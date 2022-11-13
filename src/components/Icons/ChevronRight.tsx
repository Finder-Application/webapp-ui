import React from 'react';

export const ChevronRightIcon = ({
  color = '#676767',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='7'
      height='10'
      fill='none'
      viewBox='0 0 7 10'
      {...props}
    >
      <path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M1.5 1l4 4-4 4'
      ></path>
    </svg>
  );
};
