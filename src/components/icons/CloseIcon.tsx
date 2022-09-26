import React from 'react';

export const CloseIcon = ({
  color,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='35'
      height='35'
      viewBox='0 0 35 35'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_24_3954)'>
        <path
          d='M27.7084 9.348L25.6522 7.29175L17.5001 15.4438L9.348 7.29175L7.29175 9.348L15.4438 17.5001L7.29175 25.6522L9.348 27.7084L17.5001 19.5563L25.6522 27.7084L27.7084 25.6522L19.5563 17.5001L27.7084 9.348Z'
          fill={color ?? '#999999'}
        />
      </g>
      <defs>
        <clipPath id='clip0_24_3954'>
          <rect width='35' height='35' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
