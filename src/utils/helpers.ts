export const getBase64 = (file: File) => {
  return new Promise<string>((resolve) => {
    let baseURL;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result as string;
      resolve(baseURL);
    };
  });
};
