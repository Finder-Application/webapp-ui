import React from 'react';

export const TwitterIcon = ({
  color = '#55ACEE',
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
        fill={color}
        d='M32 3.166a13.18 13.18 0 01-3.77 1.029A6.558 6.558 0 0031.115.58a13.186 13.186 0 01-4.169 1.586A6.572 6.572 0 0022.155.102c-3.626 0-6.566 2.926-6.566 6.534 0 .512.059 1.01.17 1.489A18.669 18.669 0 012.228 1.298a6.523 6.523 0 002.032 8.723 6.564 6.564 0 01-2.974-.817v.082c0 3.166 2.262 5.807 5.266 6.407-.967.262-1.981.3-2.965.112a6.568 6.568 0 006.133 4.538 13.214 13.214 0 01-8.154 2.796c-.53 0-1.052-.03-1.566-.09a18.647 18.647 0 0010.064 2.935c12.076 0 18.679-9.956 18.679-18.59 0-.284-.006-.566-.019-.846A13.309 13.309 0 0032 3.166'
      ></path>
    </svg>
  );
};
