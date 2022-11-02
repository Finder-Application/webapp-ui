import { AsyncImage, ButtonFinder } from '@/components';
import React, { useEffect, useState } from 'react';
import { cx } from './CreatePostPage';
import { CloseIcon, PlusIcon } from '@/components/Icons';
import { toast } from 'react-toastify';
import { usePostStore } from '@/store/post';
import shallow from 'zustand/shallow';
import { AxiosError } from 'axios';
import ModalScanImage from './components/ModalScanImage';
import { useFaceApi } from '@/hooks/faceApi/query';
import FileUtils from '@/utils/File.utils';

export const UploadImagesForm = () => {
  const faceDetect = useFaceApi();

  // Base64[]
  const [files, setFiles] = useState<string[]>([]);

  const inputImageFile = React.useRef<HTMLInputElement | null>(null);
  const [createPostFormData, setCreatePostFormData] = usePostStore(
    (state) => [state.createPostFormData, state.setCreatePostFormData],
    shallow
  );

  const isThereAFile = files.length > 0;

  const [isScanningFace, setIsScanningFace] = useState(false);
  const [currentScannedImage, setCurrentScannedImage] = useState<string[]>([]);

  const bytesToMegaBytes = (bytes: number) => {
    // 1MB = 1024^2 Bytes
    return bytes / Math.pow(1024, 2);
  };

  function isFileImage(base64: string) {
    return base64.split('/')[0].split(':')[1] === 'image';
  }

  useEffect(() => {}, [faceDetect]);

  useEffect(() => {
    return setCreatePostFormData({
      photos: [],
      descriptors: [],
    });
  }, []);

  const onAddFileClick = () => {
    inputImageFile?.current?.click();
  };

  const uploadSingleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e !== undefined && e.target.files) {
        let filesAmount = e.target.files.length;
        let images: string[] = [];
        let imageFiles: File[] = [];

        setIsScanningFace(true);

        const base64List = await Promise.all(
          [...e.target.files].map(
            async (file) => await FileUtils.toBase64(file)
          )
        );
        setCurrentScannedImage((state) => [...state, ...base64List]);

        await Promise.all(
          [...e.target.files].map(async (file, index) => {
            return await faceDetect
              .mutateAsync([file])
              .then((value) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                const fileSize = file.size;

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

                  if (!images.includes(base64)) {
                    images.push(base64);
                  }
                  if (file) {
                    imageFiles.push(file);
                  }
                  if (index === filesAmount - 1) {
                    if (
                      files.length > 4 ||
                      images.length > 5 ||
                      images.length + files.length > 5
                    ) {
                      toast.error('Maximum number of files is 5');
                    } else {
                      const descriptors = value.data.data;

                      setFiles([...files].concat(images));
                      setCreatePostFormData({
                        photos: [
                          ...(createPostFormData?.photos ?? []),
                          ...imageFiles,
                        ],
                        descriptors: [
                          ...(createPostFormData?.descriptors ?? []),
                          ...descriptors,
                        ],
                      });
                    }
                  }
                };
              })
              .catch((error: AxiosError) => {
                const message = (error.response?.data as any).message;
                toast.error(message);
              });
          })
        );
        setIsScanningFace(false);
        setCurrentScannedImage([]);
        e.target.value = '';
      }
    } catch (error) {
      toast.error(error as any);
      setIsScanningFace(false);
    }
  };

  function deleteFile(deletingIndex: number) {
    const newImages = files.filter((_, index) => index !== deletingIndex);
    const newFiles = createPostFormData?.photos?.filter(
      (_, index) => index !== deletingIndex
    );
    const newDescriptors = createPostFormData?.descriptors?.filter(
      (_, index) => index !== deletingIndex
    );
    setFiles(newImages);
    setCreatePostFormData({
      photos: newFiles,
      descriptors: newDescriptors,
    });
  }

  return (
    <div
      className={cx(
        'create-post__creating-form__uploading-image-container',
        'mt-4'
      )}
    >
      <ModalScanImage
        isScanning={isScanningFace}
        images={currentScannedImage}
      />
      <ButtonFinder
        className={cx(
          'create-post__creating-form__uploading-image-container__upload-btn'
        )}
        onClick={onAddFileClick}
      >
        Upload Image
        <input
          type='file'
          id='file-2'
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
          </div>
        </div>
      )}
    </div>
  );
};
