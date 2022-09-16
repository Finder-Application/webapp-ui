import { constants } from '@/configs';

export const setDocumentTitle = (title: string): void => {
  document.title = constants.TITLE_APP + ' : ' + title.trim();
};
