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
import { Descriptor } from '@/hooks/interfaces';

type UploadImagesFormProps = {
  isUpdatingPost: boolean;
};

export const UploadImagesForm = (props: UploadImagesFormProps) => {
  const { isUpdatingPost } = props;

  const faceDetect = useFaceApi();

  // Base64[]
  const [files, setFiles] = useState<string[]>([]);

  const inputImageFile = React.useRef<HTMLInputElement | null>(null);
  const [
    createPostFormData,
    setCreatePostFormData,
    selectedPost,
    setSelectedPost,
  ] = usePostStore(
    (state) => [
      state.createPostFormData,
      state.setCreatePostFormData,
      state.selectedPost,
      state.setSelectedPost,
    ],
    shallow
  );

  const isThereAFile =
    files.length > 0 || (selectedPost && selectedPost?.photos.length > 0);

  const [isScanningFace, setIsScanningFace] = useState(false);
  const [currentScannedImage, setCurrentScannedImage] = useState<string[]>([]);

  const bytesToMegaBytes = (bytes: number) => {
    // 1MB = 1024^2 Bytes
    return bytes / Math.pow(1024, 2);
  };

  function isFileImage(base64: string) {
    return base64.split('/')[0].split(':')[1] === 'image';
  }

  useEffect(() => {
    if (selectedPost && files.length === 0) {
      setFiles(selectedPost.photos);
    }
  }, [selectedPost]);

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
        let descriptors: Descriptor[] = [];

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
                  if (
                    files.length > 4 ||
                    images.length > 5 ||
                    images.length + files.length > 5
                  ) {
                    toast.error('Maximum number of files is 5');
                  } else {
                    const descriptor = value[0];

                    descriptors.push(descriptor);

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

  function deleteFile(deletedIndex: number) {
    const newFiles = files.filter((_, index) => index !== deletedIndex);

    const deletedIndexInCaseUpdating = files.length - 1 - deletedIndex;

    const newPhotos = createPostFormData?.photos?.filter((_, index) =>
      // If we are editing post, and selectedPost have 3 photos => files has 3 photos
      // But when we add 1 photo (files now has 4 photos) and when we delete it => deletedIndex = 3
      // So we will have 'files.length - 1 - deletedIndex' = 4 - 3 - 1 = 0 (the deletedIndex for createPostFormData?.photos)
      // **** We have to to this because in editing the length of 'files' and 'createPostFormData?.photos?' is not equal
      isUpdatingPost ? deletedIndexInCaseUpdating : index !== deletedIndex
    );
    const newDescriptors = createPostFormData?.descriptors?.filter((_, index) =>
      isUpdatingPost ? deletedIndexInCaseUpdating : index !== deletedIndex
    );

    setFiles(newFiles);
    setCreatePostFormData({
      photos: newPhotos,
      descriptors: newDescriptors,
    });

    if (selectedPost && deletedIndex < selectedPost.photos.length) {
      const newImagesFromSelectedPost = selectedPost?.photos?.filter(
        (_, index) => index !== deletedIndex
      );
      selectedPost &&
        setSelectedPost({
          ...selectedPost,
          photos: newImagesFromSelectedPost ?? [],
        });
    }
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
