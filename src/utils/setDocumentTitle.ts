import { constants } from '@/configs';

export const setDocumentTitle = (title: string): void => {
  document.title = constants.PREFIX_APP + title;
};
