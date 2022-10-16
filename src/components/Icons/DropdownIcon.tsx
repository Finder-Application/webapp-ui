import React from 'react';

export const DropdownIcon = ({
  color = '#8C8585',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='13'
      height='9'
      fill='none'
      viewBox='0 0 13 9'
      {...props}
    >
      <path
        fill={color}
        d='M1.528 0L6.5 5.563 11.473 0 13 1.713 6.5 9 0 1.713 1.528 0z'
      ></path>
    </svg>
  );
};
