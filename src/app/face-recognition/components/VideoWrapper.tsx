"use client";
import { useCallback, useRef, useState } from "react";

function VideoWrapper() {
  const cameraPreviewRef = useRef<HTMLVideoElement>(null);
  const [capture, setCapture] = useState(false);

  const handleCapture = useCallback(async () => {
    if (!cameraPreviewRef.current) {
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraPreviewRef.current.srcObject = stream;
    cameraPreviewRef.current.play();
    setCapture(true);
  }, [cameraPreviewRef]);

  const handlePhotoCapture = useCallback(() => {
    if (!cameraPreviewRef.current) {
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.drawImage(cameraPreviewRef.current, 0, 0, canvas.width, canvas.height); // draw an image
    const dataUrl = canvas.toDataURL("image/jpeg");
    // transform canvas image to image source which we can assign to html element
    console.log(dataUrl, "data url");
    const image: HTMLImageElement = document.getElementById("frame");
    image.src = dataUrl;
  }, []);

  return (
    <div>
      <h1>What celebrity do you look like?</h1>
      <button onClick={handleCapture}>Click here to find out</button>
      <video ref={cameraPreviewRef} />
      {capture && (
        <div>
          <button onClick={handlePhotoCapture}>Take a photo</button>
        </div>
      )}

      {capture && (
        <div>
          You have saved the photo:
          <img id="frame" width={800} height={600} />
        </div>
      )}
    </div>
  );
}

export default VideoWrapper;
