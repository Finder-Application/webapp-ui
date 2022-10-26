import { AsyncImage, ButtonFinder } from '@/components';
import React, { useState } from 'react';
import { cx } from './CreatePostPage';
import PostImages from '@/assets/images/post';
import { CloseIcon, PlusIcon } from '@/components/Icons';
import { toast } from 'react-toastify';
import { useFaceApi } from '@/hooks/query/useFaceApi';

export const UploadImagesForm = () => {
  const [files, setFiles] = useState<string[]>([]);
  const faceDetect = useFaceApi();

  const inputImageFile = React.useRef<HTMLInputElement | null>(null);

  const isThereAFile = files.length > 0;

  const bytesToMegaBytes = (bytes: number) => {
    // 1MB = 1024^2 Bytes
    return bytes / Math.pow(1024, 2);
  };

  function isFileImage(base64: string) {
    return base64.split('/')[0].split(':')[1] === 'image';
  }

  const onAddFileClick = () => {
    inputImageFile?.current?.click();
  };
  const uploadSingleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        let filesAmount = e.target.files.length;
        let images: string[] = [];

        for (let i = 0; i < filesAmount; i++) {
          // Get the instance of the FileReader
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[i]);
          const fileSize = e.target.files[i].size;
          faceDetect.mutate([e.target.files[i]]);
          // Once loaded, do something with the string
          reader.onload = (event) => {
            const base64 = event.target?.result as string;

            if (!isFileImage(base64)) {
              toast.error('Invalid or unsupported file format');
              return;
            }

            // If file size > 10MB
            if (bytesToMegaBytes(fileSize) > 10) {
              toast.error('File size must be <= 10MB');
              return;
            }

            !images.includes(base64) && images.push(base64);
            if (i === filesAmount - 1) {
              if (
                files.length > 4 ||
                images.length > 5 ||
                images.length + files.length > 5
              ) {
                toast.error('Maximum number of files is 5');
              } else {
                setFiles([...files].concat(images));
              }
            }
          };
        }
        e.target.value = '';
      }
    } catch (error) {
      toast.error((error as any).message);
    }
  };

  function deleteFile(deletingIndex: number) {
    const newFiles = files.filter((item, index) => index !== deletingIndex);
    setFiles(newFiles);
  }

  return (
    <div
      className={cx(
        'create-post__creating-form__uploading-image-container',
        'mt-4'
      )}
    >
      <ButtonFinder
        className={cx(
          'create-post__creating-form__uploading-image-container__upload-btn'
        )}
        onClick={onAddFileClick}
      >
        Upload Image
        <input
          type='file'
          id='file-1'
          ref={inputImageFile}
          style={{ display: 'none' }}
          accept='image/*'
          multiple
          onChange={uploadSingleFile}
        />
      </ButtonFinder>

      {isThereAFile && (
        <div
          className={cx(
            'create-post__creating-form__uploading-image-container__images-count'
          )}
        >
          {files.length} images
        </div>
      )}
      {isThereAFile && (
        <div className='d-flex flex-wrap'>
          {files.length > 0 &&
            files.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cx(
                    'create-post__creating-form__uploading-image-container__image-container'
                  )}
                >
                  <AsyncImage width='11em' height='11em' src={item} />
                  <div
                    className={cx(
                      'create-post__creating-form__uploading-image-container__image-container__close-button'
                    )}
                    onClick={() => deleteFile(index)}
                  >
                    <CloseIcon width={8} height={8} />
                  </div>
                </div>
              );
            })}

          <div
            className={cx(
              'create-post__creating-form__uploading-image-container__upload-more-image-btn'
            )}
            onClick={onAddFileClick}
          >
            <PlusIcon />
            <input
              type='file'
              id='file-1'
              ref={inputImageFile}
              style={{ display: 'none' }}
              accept='image/*'
              multiple
              onChange={uploadSingleFile}
            />
          </div>
        </div>
      )}
    </div>
  );
};
