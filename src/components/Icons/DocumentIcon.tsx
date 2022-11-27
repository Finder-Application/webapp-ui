import React from 'react';

export const DocumentIcon = ({
  color,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='25'
      fill='none'
      viewBox='0 0 21 27'
      {...props}
    >
      <path
        fill={color ?? '#90CAF9'}
        d='M13.083.583H2.75A2.58 2.58 0 00.18 3.167L.167 23.833a2.58 2.58 0 002.57 2.584H18.25a2.59 2.59 0 002.583-2.584v-15.5l-7.75-7.75zm2.584 20.667H5.333v-2.583h10.334v2.583zm0-5.167H5.333V13.5h10.334v2.583zm-3.875-6.458V2.52l7.104 7.104h-7.104z'
      ></path>
    </svg>
  );
};
