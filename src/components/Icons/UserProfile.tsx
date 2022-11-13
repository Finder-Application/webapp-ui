import React from 'react';

export const UserProfileIcon = ({
  color = '#969696',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='10'
      height='12'
      fill='none'
      viewBox='0 0 10 12'
      {...props}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.936 8.17c-2.522 0-4.675.382-4.675 1.909C.261 11.604 2.401 12 4.936 12c2.522 0 4.674-.382 4.674-1.908 0-1.526-2.139-1.922-4.674-1.922zM4.936 5.993a2.996 2.996 0 10-2.997-2.997 2.986 2.986 0 002.976 2.997h.021z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};
