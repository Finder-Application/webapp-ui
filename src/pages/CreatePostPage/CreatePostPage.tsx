import { AsyncImage } from '@/components';
import { useFaceApi } from '@/hooks/useFaceApi';
import FileUtils from '@/utils/File.utils';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './CreatePostPage.module.scss';

const cx = classNames.bind(styles);
const CreatePostPage = () => {
  const { handleDetect, isDetecting } = useFaceApi();
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState('');
  // const handleSubmit = async (files: FileList) => {
  //   const detections = await handleDetect(files[0]);

  //   await PostService.createPost(detections);
  // };

  React.useEffect(() => {
    file && FileUtils.toBase64(file).then((base64) => setBase64(base64));
  }, [file]);
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

      <img src={base64}></img>
    </div>
  );
};

export default CreatePostPage;
