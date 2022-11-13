import React from 'react';

export const SignOutIcon = ({
  color = '#969696',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='13'
      height='12'
      fill='none'
      viewBox='0 0 13 12'
      {...props}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.737 5.538a.462.462 0 00-.47.462c0 .252.208.462.47.462H8.4V9.33C8.4 10.8 7.185 12 5.683 12H2.71C1.215 12 0 10.806 0 9.336V2.67C0 1.194 1.22 0 2.717 0h2.979C7.186 0 8.4 1.194 8.4 2.664v2.874H4.737zm5.841-1.614L12.33 5.67a.458.458 0 010 .654L10.578 8.07a.465.465 0 01-.324.138.464.464 0 01-.33-.792l.96-.954H8.4v-.924h2.484l-.96-.954a.464.464 0 010-.654.458.458 0 01.654-.006z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};
