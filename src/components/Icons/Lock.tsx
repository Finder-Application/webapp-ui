import React from 'react';

export const LockIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='27'
      height='32'
      fill='none'
      viewBox='0 0 27 32'
      {...props}
    >
      <path
        fill='#000'
        d='M22.25 10.666h2.917a1.459 1.459 0 011.458 1.459v17.5a1.458 1.458 0 01-1.458 1.458H1.833a1.458 1.458 0 01-1.458-1.458v-17.5a1.458 1.458 0 011.458-1.459H4.75V9.208a8.75 8.75 0 1117.5 0v1.458zm-2.917 0V9.208a5.833 5.833 0 10-11.666 0v1.458h11.666zm-7.291 8.75v2.917h2.916v-2.917h-2.916zm-5.834 0v2.917h2.917v-2.917H6.208zm11.667 0v2.917h2.917v-2.917h-2.917z'
      ></path>
    </svg>
  );
};
