import { constants } from '@/configs';

export const setDocumentTitle = (title: string): void => {
  document.title = constants.APP_TITLE + ' : ' + title.trim();
};
