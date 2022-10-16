import Resizer from 'react-image-file-resizer';

export default class FileUtils {
  static async toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject('');
    });
  }
  static resizeFile = (file: File): Promise<File> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        'JPEG',
        100,
        0,
        (uri) => {
          return resolve(uri as File);
        },
        'file'
      );
    });
}
