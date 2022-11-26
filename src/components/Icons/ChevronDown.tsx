import React from 'react';

export const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='9'
      height='6'
      fill='none'
      viewBox='0 0 9 6'
      {...props}
    >
      <path
        fill='#000'
        d='M1 2.316L3.68 5.338a.949.949 0 001.457 0l2.678-3.022C8.465 1.581 8 .321 7.08.321H1.725C.805.321.35 1.581 1 2.316z'
      ></path>
    </svg>
  );
};
