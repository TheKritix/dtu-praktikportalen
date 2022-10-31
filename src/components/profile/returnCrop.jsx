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

// const getImageFromCanvas = (canvas) => {
//   var imageFile = null;

//   canvas.toBlob(
//     (blob) => {
//       var formData = new FormData();
//       formData.append("file", blob, "image.jpg");
//       for (const pair of formData.entries()) {
//         imageFile = pair[1];
//         console.log(imageFile)
//       }
//     },
//     "image/jpeg",
//     0.8
//   );

//   console.log(canvas.toImage)
//   console.log(imageFile)
//   return imageFile;
// };

//It works, but would much rather save it as a file object.
const getImageFromCanvas = (canvas) => {
  var imageFile = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  return imageFile;
};

