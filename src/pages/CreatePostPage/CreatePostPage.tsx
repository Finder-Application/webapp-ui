import { useFaceApi } from '@/hooks/query/useFaceApi';
import FileUtils from '@/utils/File.utils';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './CreatePostPage.module.scss';

const cx = classNames.bind(styles);
const CreatePostPage = () => {
  const [file, setFile] = useState<File | null>(null);
  // const mutation = useFaceApi();
  const [base64, setBase64] = useState('');
  // const handleSubmit = async (files: FileList) => {
  //   const detections = await handleDetect(files[0]);
  //   await PostService.createPost(detections);
  // };

  React.useEffect(() => {
    file &&
      FileUtils.toBase64(file)
        .then((base64) => {
          setBase64(base64);
        })
        .then(() => {});
  }, [file]);

  React.useEffect(() => {}, [file]);
  const classNameScan = cx('scan');
  return (
    <div>
      <input
        type='file'
        accept='image'
        onChange={(e) => {
          e.target.files && setFile(e.target.files[0]);
          e.target.value = '';
        }}
      ></input>
    </div>
  );
};

export default CreatePostPage;
