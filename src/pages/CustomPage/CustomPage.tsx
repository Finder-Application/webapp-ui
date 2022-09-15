import { setDocumentTitle } from '@/utils';
import React, { useEffect } from 'react';

export const CustomPage = (props: RouteFinder) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  setDocumentTitle(props.title);
  const Page = props.page;
  return <Page />;
};
