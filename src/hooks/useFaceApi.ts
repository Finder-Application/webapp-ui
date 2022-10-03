import { useLoadedModelStore } from '@/store/faceApi';
import * as faceApi from 'face-api.js';
import { useMemo, useState } from 'react';

export const useFaceApi = () => {
  const modelPath: string = './models';

  const [isDetecting, setIsDetecting] = useState(false);
  const isLoadedModels = useLoadedModelStore((state) => state.isLoaded);
  const setLoadedModels = useLoadedModelStore((state) => state.setLoadedModels);

  useMemo(() => {
    !isLoadedModels &&
      Promise.all([
        faceApi.nets.faceRecognitionNet.loadFromUri(modelPath),
        faceApi.nets.faceLandmark68Net.loadFromUri(modelPath),
        faceApi.nets.ssdMobilenetv1.loadFromUri(modelPath),
        faceApi.nets.tinyFaceDetector.loadFromUri(modelPath),
      ]).then(() => setLoadedModels(true));
  }, [isLoadedModels]);

  const handleDetect = async (file: File) => {
    setIsDetecting(true);
    const img = new Image();
    img.src = URL.createObjectURL(file as Blob);
    const detections = await faceApi
      .detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceDescriptors();

    URL.revokeObjectURL(img.src);
    setIsDetecting(false);

    if (!detections.length) {
      throw new Error(`Couldn't find any faces`);
    }
    if (detections.length > 1) {
      throw new Error('Please provide an image containing only one face');
    }

    return Array.from(detections[0].descriptor);
  };

  return { isLoadedModels, handleDetect, isDetecting };
};
