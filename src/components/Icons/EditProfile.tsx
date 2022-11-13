import React from 'react';

export const EditProfileIcon = ({
  color = '#969696',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='11'
      height='12'
      fill='none'
      viewBox='0 0 11 12'
      {...props}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M2.886 0h5.029C9.768 0 10.8 1.068 10.8 2.898v6.198C10.8 10.956 9.768 12 7.915 12H2.886C1.062 12 0 10.956 0 9.096V2.898C0 1.068 1.062 0 2.886 0zm.162 2.796V2.79h1.793a.47.47 0 010 .942H3.048a.468.468 0 010-.936zm0 3.647h4.704a.469.469 0 000-.936H3.048a.469.469 0 000 .936zm0 2.743h4.704a.47.47 0 00.42-.468.47.47 0 00-.42-.474H3.048a.477.477 0 00-.45.726c.096.15.27.24.45.216z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};
