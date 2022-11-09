import React from 'react';

export const PostIcon = ({
  color = '#000',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='23'
      height='24'
      fill='none'
      viewBox='0 0 23 24'
      {...props}
    >
      <path
        fill={color}
        d='M20.444.5H2.556A2.563 2.563 0 000 3.056v17.888A2.563 2.563 0 002.556 23.5h17.888A2.563 2.563 0 0023 20.944V3.056A2.563 2.563 0 0020.444.5zm-6.388 17.889H5.11v-2.556h8.945v2.556zm3.833-5.111H5.11v-2.556H17.89v2.556zm0-5.111H5.11V5.61H17.89v2.556z'
      ></path>
    </svg>
  );
};
