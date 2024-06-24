"use client";

import ShimmerButton from "@/app/_ui/shiny-button";
import { SolarUploadSquareOutline } from "@/app/_ui/svg-components/solar-upload-square-outline";
import { useRef, useState } from "react";
import ReactImageUploading, { ImageListType } from "react-images-uploading";

const Uploader = () => {
  const bottomCanvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<ImageListType>([]);

  const handleImageUploadChange = (imageList: ImageListType) => {
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

          bottomCtx.beginPath();
          bottomCtx.arc(157, 157, 20, 0, Math.PI * 2, false);
          bottomCtx.closePath();
          bottomCtx.clip();
        
          bottomCtx.drawImage(topImage, 137, 137, 40, 40)

          // if (!topCtx) return;
          // topCtx.drawImage(topImage, 0, 0, _width, _height);

          // const gradient = topCtx.createLinearGradient(0, 0, _height, 0);
          // gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
          // gradient.addColorStop(0.618, "rgba(255, 255, 255, 0)");

          // topCtx.globalCompositeOperation = "destination-in";
          // topCtx.fillStyle = gradient;
          // topCtx.fillRect(0, 0, _width, _height);

          // bottomCtx.drawImage(topCanvas, 0, 0, _width, _height);
        };

        topImage.src = "/images/nation-flags/germany.png";
      };

      bottomImage.src = orignalImage.dataURL;
    }
  };

  const handleRemove = () => {
    setImages([]);

    const bottomCanvas = bottomCanvasRef.current;

    if (!bottomCanvas) return;

    const bottomCtx = bottomCanvas.getContext("2d");

    bottomCtx?.clearRect(0, 0, 200, 200);
  }
 
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <ReactImageUploading
          multiple
          value={images}
          onChange={handleImageUploadChange}
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
                  className={`w-[200px] h-[200px] relative rounded-full text-5xl cursor-pointer bg-white overflow-hidden shadow-slate-200 text-slate-800`}
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
      </div>

      <ShimmerButton className="shadow-2xl w-[200px]" background={"#fff"} shimmerColor={"#000"}
        onClick={handleRemove}
      >
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black dark:from-white dark:to-slate-900/10 lg:text-lg">
          Remove
        </span>
      </ShimmerButton>
    </div>
  );
};

export default Uploader;
