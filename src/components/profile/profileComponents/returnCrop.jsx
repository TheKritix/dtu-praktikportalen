// Source: https://codesandbox.io/s/react-image-crop-demo-with-react-hooks-forked-n7xcpl?file=/src/canvasPreview.ts
// Source: https://www.npmjs.com/package/react-image-crop#how-can-i-center-the-crop

export function returnCrop(image, canvas, crop) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2D context available");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const pixelRatio = 1;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();
  ctx.translate(-cropX, -cropY);

  ctx.translate(centerX, centerY);

  ctx.scale(1, 1);

  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();

  return getImageFromCanvas(canvas);
}

// Version 3.0 of this.
// Source for file stuff: https://developer.mozilla.org/en-US/docs/Web/API/File/File
const getImageFromCanvas = async (canvas) => {
  let blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, "image/jpeg");
  });

  return new File([blob], "croppedImage.jpg", { type: "image/jpeg" });
};
