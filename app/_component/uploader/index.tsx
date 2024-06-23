"use client";

import { SolarUploadSquareOutline } from "@/app/_ui/svg-components/solar-upload-square-outline";
import { useRef, useState } from "react";
import ReactImageUploading, { ImageListType } from "react-images-uploading";

const Uploader = () => {
  const bottomCanvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<ImageListType>([]);

  const onChange = (imageList: ImageListType) => {
    const bottomCanvas = bottomCanvasRef.current;
    const topCanvas = document.createElement("canvas");

    setImages(imageList);

    if (imageList.length && bottomCanvas) {
      const orignalImage = imageList[0];

      if (!orignalImage.dataURL) return;

      const bottomImage = new Image();

      bottomImage.onload = () => {
        const _width = 200;
        const _height = 200;
        bottomCanvas.width = _width || bottomImage.width;
        bottomCanvas.height = _height || bottomImage.height;
        

        const bottomCtx = bottomCanvas.getContext("2d");

        if (!bottomCtx) return;

        if (!topCanvas) return;

        const topCtx = topCanvas.getContext("2d");

        // draw botton layer image
        bottomCtx.drawImage(bottomImage, 0, 0, _width, _height);

        const topImage = new Image();

        topImage.onload = () => {
          topCanvas.width = _width || topImage.width;
          topCanvas.height = _height || topImage.height;

          if (!topCtx) return;
          topCtx.drawImage(topImage, 0, 0, _width, _height);

          const gradient = topCtx.createLinearGradient(0, 0, _height, 0);
          gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
          gradient.addColorStop(0.618, "rgba(255, 255, 255, 0)");

          topCtx.globalCompositeOperation = "destination-in";
          topCtx.fillStyle = gradient;
          topCtx.fillRect(0, 0, _width, _height);

          bottomCtx.drawImage(topCanvas, 0, 0, _width, _height);
        };

        topImage.src = "/images/nation-flags/switzerland.png";
      };

      bottomImage.src = orignalImage.dataURL;
    }
  };

  return (
    <section className="flex items-center">
      <ReactImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <>
            {!imageList.length && (
              <div
                className={`w-[200px] h-[200px] relative rounded-full text-5xl cursor-pointer bg-white overflow-hidden shadow-neutral-900`}
                onClick={onImageUpload}
              >
                <SolarUploadSquareOutline className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10" />
              </div>
            )}
          </>
        )}
      </ReactImageUploading>

      <div
        className={`w-[200px] h-[200px] overflow-hidden bg-inherit rounded-full border-black shadow-neutral-900`}
      >
        <canvas ref={bottomCanvasRef} />
      </div>
    </section>
  );
};

export default Uploader;
