import React from 'react';

export const ViewDetailIcon = ({
  color = '#969696',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='18'
      fill='none'
      viewBox='0 0 41 59'
      {...props}
    >
      <path fill='#fff' d='M34.065 34.916V1.979H1.937v49.76h16.061'></path>
      <path
        fill='#D0CFCE'
        d='M26.167 54.296c6.146 0 11.13-4.983 11.13-11.129s-4.983-11.129-11.13-11.129c-6.146 0-11.129 4.983-11.129 11.13 0 6.145 4.983 11.128 11.13 11.128z'
      ></path>
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        d='M34.065 34.916V1.979H1.937v49.76h16.061M6.668 7.02h8.332M6.667 15.5h22m-22 3.771h22m-22 3.77h22m-22 3.771h22m-22 3.771h22m-9.288 3.767H6.67m9.58 3.77H6.67m8.45 3.77H6.67'
      ></path>
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        d='M26.166 54.296c6.146 0 11.13-4.983 11.13-11.129s-4.983-11.129-11.13-11.129c-6.146 0-11.129 4.983-11.129 11.13 0 6.145 4.983 11.128 11.13 11.128zM34.065 51.74l5.467 5.466M16.439 39.453h13.436M15.172 44.84h14.703'
      ></path>
    </svg>
  );
};
