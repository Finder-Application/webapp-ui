import React from 'react';

export const ThreeDotsIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='13'
      fill='none'
      viewBox='0 0 75 13'
      {...props}
    >
      <path
        fill='#000'
        d='M12.516 6.5a5.765 5.765 0 11-11.53 0 5.765 5.765 0 0111.53 0zM68.25.734a5.766 5.766 0 100 11.531 5.766 5.766 0 000-11.53zm-30.75 0a5.766 5.766 0 100 11.531 5.766 5.766 0 000-11.53z'
      ></path>
    </svg>
  );
};
