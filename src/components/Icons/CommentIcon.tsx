import React from 'react';

export const CommentIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M22.667 0.908142H3.91699C2.19336 0.908142 0.791992 2.30951 0.791992 4.03314V18.0956C0.791992 19.8193 2.19336 21.2206 3.91699 21.2206H8.60449V25.3222C8.60449 25.8007 9.15137 26.079 9.53711 25.7958L15.6357 21.2206H22.667C24.3906 21.2206 25.792 19.8193 25.792 18.0956V4.03314C25.792 2.30951 24.3906 0.908142 22.667 0.908142Z'
        fill='var(--info)'
      />
    </svg>
  );
};
