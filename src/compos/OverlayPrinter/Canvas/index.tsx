import React, { useEffect, useRef } from "react";

interface CanvasProps {
   width: number;
   height: number;
}

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
   const canvasRef = useRef<HTMLCanvasElement>(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
         const ctx = canvas.getContext("2d");
         if (ctx) {
            // Your drawing logic here
            // You can use width and height to set the canvas size
            canvas.width = width;
            canvas.height = height;
         }
      }
   }, [width, height]);

   return (
      <canvas
         ref={canvasRef}
         style={{ position: "absolute", top: 0, left: 0, zIndex: -10 }}
      />
   );
};

export default Canvas;
