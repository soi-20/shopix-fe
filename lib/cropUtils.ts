import { Area } from 'react-easy-crop';

export const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export const getCroppedImg = async (
  imageSrc: string,
  cropArea: Area
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2D context');
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 4) / Math.sqrt(2));

  // Calculate the area to crop
  const cropX = Math.round(Math.max(Math.min(window.innerWidth, cropArea.x * maxSize), 0));
  const cropY = Math.round(Math.max(Math.min(window.innerHeight, cropArea.y * maxSize), 0));
  const cropWidth = Math.round(Math.min(window.innerWidth * safeArea - cropX, cropArea.width * maxSize));
  const cropHeight = Math.round(Math.min(window.innerHeight * safeArea - cropY, cropArea.height * maxSize));

  // Draw the cropped image on the canvas
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  ctx.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  // Convert the canvas to a Blob
  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Canvas is empty');
      }
      resolve(blob);
    }, 'image/jpeg');
  });
};