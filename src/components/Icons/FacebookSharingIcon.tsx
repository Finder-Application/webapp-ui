import React from 'react';

export const FacebookSharingIcon = ({
  color = '#1877F2',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='31'
      fill='none'
      viewBox='0 0 32 31'
      {...props}
    >
      <path
        fill={color}
        d='M32 15.595C32 6.982 24.837 0 16 0S0 6.982 0 15.595C0 23.378 5.851 29.83 13.5 31V20.103H9.437v-4.508H13.5v-3.436c0-3.908 2.389-6.067 6.043-6.067 1.751 0 3.582.304 3.582.304v3.838h-2.017c-1.988 0-2.608 1.202-2.608 2.435v2.926h4.438l-.71 4.508H18.5V31C26.149 29.83 32 23.379 32 15.595z'
      ></path>
    </svg>
  );
};
