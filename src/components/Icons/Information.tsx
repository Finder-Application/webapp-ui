import React from 'react';

export const InformationIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='27'
      height='27'
      fill='none'
      viewBox='0 0 27 27'
      {...props}
    >
      <path
        fill='#000'
        fillRule='evenodd'
        d='M27 13.5a13.5 13.5 0 11-27 0 13.5 13.5 0 0127 0zM15.187 6.75a1.687 1.687 0 11-3.374 0 1.687 1.687 0 013.374 0zm-3.374 5.063a1.687 1.687 0 100 3.374v5.063a1.687 1.687 0 001.687 1.688h1.688a1.687 1.687 0 100-3.375V13.5a1.687 1.687 0 00-1.688-1.688h-1.688z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};
