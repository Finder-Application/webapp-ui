import { axiosClient } from '@/apis';
import * as faceapi from 'face-api.js';
class PostService {
  private static baseURL: string = 'post';

  static createPost(
    descriptor: faceapi.WithFaceDescriptor<
      faceapi.WithFaceLandmarks<
        {
          detection: faceapi.FaceDetection;
        },
        faceapi.FaceLandmarks68
      >
    >
  ) {
    axiosClient.post(this.baseURL, descriptor, {
      headers: {
        contentType: 'application/json',
      },
    });
  }
}
export default PostService;
