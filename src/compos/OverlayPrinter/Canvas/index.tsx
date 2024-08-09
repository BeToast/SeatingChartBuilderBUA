import React, { useEffect, useRef, useMemo, CSSProperties } from "react";
import { getLrtb } from "../utils";

interface CanvasProps {
   elements: Element[];
   style?: CSSProperties;
   scrollTop: number;
   paperRect: DOMRect | null;
   flexieMargin: number;
}

const Canvas: React.FC<CanvasProps> = ({
   elements,
   scrollTop,
   paperRect,
   flexieMargin,
}) => {
   const canvasRef = useRef<HTMLCanvasElement>(null);

   const { hasTables, hasKitchenSeats, hasBathroomSeats, tableCount } = useMemo(
      () => ({
         hasTables: elements.some((el) => el.id.startsWith("Table ")),
         hasKitchenSeats: elements.some((el) => el.id.match(/Seat k+\d/)),
         hasBathroomSeats: elements.some((el) => el.id.match(/Seat b+\d/)),
         tableCount: elements.filter((el) => el.id.startsWith("Table ")).length,
      }),
      [elements]
   );

   useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
         const ctx = canvas.getContext("2d");
         canvas.style.width = `8.5in`;
         canvas.style.height = `11in`;
         if (ctx && paperRect) {
            // canvas.width = width;
            // canvas.height = height;
            // ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;

            //rltb
            const { left, right, top, bottom } = getLrtb(elements);
            // console.log(left);
            // console.log(right);
            // console.log(top);
            // console.log(bottom);
            const relativeLeft = left - paperRect.left;
            const relativeRight = right - paperRect.left;

            const setTop = top + scrollTop - flexieMargin;
            const setBottom = bottom + scrollTop - flexieMargin;

            if (tableCount > 1 && !hasKitchenSeats && !hasBathroomSeats) {
               // Multiple tables and no seats
               ctx.beginPath();
               // ctx.moveTo(0, height / 2);
               // ctx.lineTo(width, height / 2);
               ctx.stroke();
            } else if (hasTables && (hasKitchenSeats || hasBathroomSeats)) {
               // Tables and at least one seat
               ctx.beginPath();
               // ctx.moveTo(0, height / 3);
               // ctx.lineTo(width, height / 3);
               // ctx.lineTo(width, (2 * height) / 3);
               ctx.stroke();
            } else if (
               tableCount === 1 &&
               (hasKitchenSeats || hasBathroomSeats)
            ) {
               // One table and at least one seat
               ctx.beginPath();
               // ctx.arc(
               //    width / 2,
               //    height / 2,
               //    Math.min(width, height) / 4,
               //    0,
               //    2 * Math.PI
               // );
               ctx.stroke();
            } else if (hasKitchenSeats && !hasBathroomSeats) {
               // Only Kitchen seats
               console.log(setTop);
               ctx.beginPath();
               ctx.moveTo(100, setTop);
               ctx.lineTo(200, setTop);
               ctx.stroke();
            } else if (hasBathroomSeats && !hasKitchenSeats) {
               // Only Bathroom seats
               ctx.beginPath();
               // ctx.moveTo(width, 0);
               // ctx.lineTo(0, height);
               ctx.stroke();
            } else if (hasKitchenSeats && hasBathroomSeats && !hasTables) {
               // Kitchen and bathroom seats, no tables
               ctx.beginPath();
               ctx.moveTo(0, 0);
               // ctx.lineTo(width, 0);
               // ctx.lineTo(width, height);
               // ctx.lineTo(0, height);
               ctx.closePath();
               ctx.stroke();
            }
         }
      }
   }, [elements, hasTables, hasKitchenSeats, hasBathroomSeats, tableCount]);

   return (
      <canvas
         ref={canvasRef}
         style={{
            position: "absolute",
            left: `0px`,
            top: `0px`,
            zIndex: `10`,
            pointerEvents: `none`,
         }}
      />
   );
};

export default Canvas;
