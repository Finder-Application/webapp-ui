import React from 'react';
import { FcOvertime } from 'react-icons/fc';

export const CalendarIcon = ({
  color,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return <FcOvertime width={16} height={19} {...props} />;
};
