import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';

let detectorPromise: Promise<FaceDetector> | null = null;
let lastVideoTime = -1;

export type FaceDetectionResult = {
  hasFace: boolean;
  faceCount: number;
};

export async function createCameraStream() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('Browser tidak mendukung akses kamera.');
  }

  return navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'user',
      width: { ideal: 640 },
      height: { ideal: 480 },
    },
    audio: false,
  });
}

export function stopCameraStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

export async function getFaceDetector() {
  if (!detectorPromise) {
    detectorPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm'
      );
      const baseOptions = {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite',
      };
      const options = {
        baseOptions,
        runningMode: 'VIDEO' as const,
        minDetectionConfidence: 0.35,
      };

      try {
        return await FaceDetector.createFromOptions(vision, {
          ...options,
          baseOptions: { ...baseOptions, delegate: 'GPU' },
        });
      } catch {
        return FaceDetector.createFromOptions(vision, {
          ...options,
          baseOptions: { ...baseOptions, delegate: 'CPU' },
        });
      }
    })();
  }

  return detectorPromise;
}

export async function detectFace(video: HTMLVideoElement): Promise<FaceDetectionResult> {
  if (!video.videoWidth || !video.videoHeight) {
    return { hasFace: false, faceCount: 0 };
  }

  const detector = await getFaceDetector();
  const timestamp = video.currentTime * 1000;
  const result = detector.detectForVideo(video, timestamp > lastVideoTime ? timestamp : performance.now());
  lastVideoTime = Math.max(timestamp, lastVideoTime + 1);
  const faceCount = result.detections.length;

  return {
    hasFace: faceCount > 0,
    faceCount,
  };
}
