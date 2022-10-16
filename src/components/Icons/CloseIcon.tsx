import React from 'react';

export const CloseIcon = ({
  color = '#999',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='21'
      height='21'
      fill='none'
      viewBox='0 0 21 21'
      {...props}
    >
      <path
        fill={color}
        d='M20.708 2.348L18.652.292 10.5 8.444 2.348.292.292 2.348 8.444 10.5.292 18.652l2.056 2.056 8.152-8.152 8.152 8.152 2.056-2.056-8.152-8.152 8.152-8.152z'
      ></path>
    </svg>
  );
};
