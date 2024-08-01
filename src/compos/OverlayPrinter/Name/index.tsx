import React, { useEffect, useState, useCallback } from "react";
import { getLrtb, Lrtb } from "./../utils";

interface NameProps {
   assigned: string;
   elements: Element[];
   scrollTop: number;
}

const Name: React.FC<NameProps> = ({ assigned, elements, scrollTop }) => {
   const [paperRect, setPaperRect] = useState<DOMRect | null>(null);
   const lrtb: Lrtb = getLrtb(elements);
   const { left, right, top, bottom } = lrtb;

   const hasTable = elements.some((el) => el.id.startsWith("Table "));
   const hasKitchenSeats = elements.some((el) => el.id.match(/Seat k+\d/));
   const hasBathroomSeats = elements.some((el) => el.id.match(/Seat b+\d/));

   const updatePaperRect = useCallback(() => {
      const letterPaper = document.getElementById("letter-paper");
      if (letterPaper) {
         setPaperRect(letterPaper.getBoundingClientRect());
      }
   }, []);

   useEffect(() => {
      updatePaperRect();
      window.addEventListener("resize", updatePaperRect);
      return () => {
         window.removeEventListener("resize", updatePaperRect);
      };
   }, [updatePaperRect]);

   let style: React.CSSProperties = {
      position: "absolute",
      margin: 0,
      color: "black",
      zIndex: 10,
   };

   if (paperRect) {
      const relativeLeft = left - paperRect.left;
      const relativeRight = right - paperRect.left;
      const relativeTop = top - paperRect.top + scrollTop;
      const relativeBottom = bottom - paperRect.top + scrollTop;

      if (hasTable) {
         const centerX = (relativeLeft + relativeRight) / 2;
         const centerY = (relativeTop + relativeBottom) / 2;
         style = {
            ...style,
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: "translateX(-50%) translateY(-50%)",
         };
      } else if (hasKitchenSeats && !hasBathroomSeats) {
         const centerY = (relativeTop + relativeBottom) / 2;
         style = {
            ...style,
            left: `${relativeRight + 8}px`,
            top: `${centerY}px`,
            transform: "translateY(-50%) rotate(-30deg)",
            transformOrigin: "left",
         };
      } else if (hasBathroomSeats && !hasKitchenSeats) {
         const centerX = (relativeLeft + relativeRight) / 2 - 4;
         style = {
            ...style,
            left: `${centerX}px`,
            top: `${relativeTop}px`,
            transform: "translateY(-100%) rotate(-30deg)",
            transformOrigin: "left",
         };
      } else if (hasKitchenSeats && hasBathroomSeats) {
         const centerX = (relativeLeft + relativeRight) / 2;
         const centerY = (relativeTop + relativeBottom) / 2;
         style = {
            ...style,
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: "translateY(-60%) rotate(-30deg)",
            transformOrigin: "left",
         };
      }
   }

   return paperRect ? <p style={style}>{assigned}</p> : null;
};

export default Name;
