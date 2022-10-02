import { constants } from '@/configs';

class DocumentUtils {
  static setTitle = (title: string): void => {
    document.title = constants.APP_TITLE + ' : ' + title.trim();
  };
}

export default DocumentUtils;
