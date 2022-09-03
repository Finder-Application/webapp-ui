import React from 'react';
import './GlobalStyles.scss';

interface GlobalStylesProps {
  children: JSX.Element;
}
export const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
  return children;
};
