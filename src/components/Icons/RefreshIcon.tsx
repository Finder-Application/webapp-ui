import React from 'react';

const RefreshIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='11'
      height='12'
      viewBox='0 0 11 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M9.09333 1.7625C8.12667 0.675 6.8 0 5.32667 0C2.38 0 0 2.685 0 6C0 9.315 2.38 12 5.32667 12C7.81333 12 9.88667 10.0875 10.48 7.5H9.09333C8.54667 9.2475 7.06667 10.5 5.32667 10.5C3.12 10.5 1.32667 8.4825 1.32667 6C1.32667 3.5175 3.12 1.5 5.32667 1.5C6.43333 1.5 7.42 2.0175 8.14 2.835L5.99333 5.25H10.66V0L9.09333 1.7625Z'
        fill='white'
      />
    </svg>
  );
};

export default RefreshIcon;
