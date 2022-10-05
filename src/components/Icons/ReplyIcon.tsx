import React from 'react';

export const ReplyIcon = ({
  color,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='15'
      fill='none'
      viewBox='0 0 18 15'
      {...props}
    >
      <path
        fill={color ?? '#000'}
        d='M18 14.685S15.775 4.953 7 4.953V.969L0 7.542l7 6.69V9.875c4.763-.001 8.516.421 11 4.81z'
      ></path>
    </svg>
  );
};
