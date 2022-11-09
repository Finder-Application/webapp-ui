import React from 'react';

export const ArrowLeftIcon = ({
  color = '#130F26',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='26'
      fill='none'
      viewBox='0 0 32 26'
      {...props}
    >
      <path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M1 13.197h30M13.1 25.246L1 13.198l12.1-12.05'
      ></path>
    </svg>
  );
};
