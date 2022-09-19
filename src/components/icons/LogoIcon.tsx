import React from 'react';

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='22'
      height='26'
      viewBox='0 0 22 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M17.1147 25.2323V21.1809C9.2951 20.3402 4.9868 16.1317 4.13478 8.44067H0.0175438C-0.411049 16.5554 6.99034 25.4011 17.1147 25.2323Z'
        fill='url(#paint0_linear_1_5725)'
      />
      <path
        d='M17.1702 8.37467H21.4492V0.0151367H17.1702V8.37467Z'
        fill='url(#paint1_linear_1_5725)'
      />
      <path
        d='M8.55038 0V8.36122H12.8535V0H8.55038Z'
        fill='url(#paint2_linear_1_5725)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1_5725'
          x1='8.55729'
          y1='8.44067'
          x2='8.55729'
          y2='25.2347'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#7CDFFF'>
            <stop offset='0.46875' stopColor='#83E8E2'>
              <stop offset={1} stopColor='#92FE9E'></stop>
            </stop>
          </stop>
        </linearGradient>
        <linearGradient
          id='paint1_linear_1_5725'
          x1='19.3097'
          y1='0.0151367'
          x2='19.3097'
          y2='8.37467'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#7CDFFF'>
            <stop offset='0.46875' stopColor='#83E8E2'>
              <stop offset={1} stopColor='#92FE9E'></stop>
            </stop>
          </stop>
        </linearGradient>
        <linearGradient
          id='paint2_linear_1_5725'
          x1='10.7019'
          y1='0'
          x2='10.7019'
          y2='8.36122'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#7CDFFF'>
            <stop offset='0.46875' stopColor='#83E8E2'>
              <stop offset={1} stopColor='#92FE9E'></stop>
            </stop>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
