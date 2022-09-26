import React from 'react';

export const CalendarIcon = ({
  color,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='19'
      fill='none'
      viewBox='0 0 16 19'
      {...props}
    >
      <path
        fill={color ?? '#777'}
        d='M14.063 2.5h-1.688V.672c0-.211-.21-.422-.422-.422h-1.406a.428.428 0 00-.422.422V2.5h-4.5V.672c0-.211-.21-.422-.422-.422H3.797a.427.427 0 00-.422.422V2.5H1.687C.739 2.5 0 3.273 0 4.188v12.375c0 .949.738 1.687 1.688 1.687h12.374c.915 0 1.688-.738 1.688-1.688V4.188c0-.914-.773-1.687-1.688-1.687zm-.211 14.063H1.898c-.14 0-.21-.07-.21-.211V5.875h12.374v10.477c0 .14-.105.21-.21.21z'
      ></path>
    </svg>
  );
};
