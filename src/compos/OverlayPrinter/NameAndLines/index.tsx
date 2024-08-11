import React from "react";
import { getLrtb, Lrtb } from "../utils";
import LineDiv from "./LineDiv";
import "./style.css";
import TableHandler from "./TableHandler";

interface NameProps {
   assigned: string;
   elements: Element[];
   scrollTop: number;
   paperRect: DOMRect | null;
   flexieMargin: number;
}

const NameAndLines: React.FC<NameProps> = ({
   assigned,
   elements,
   scrollTop,
   paperRect,
   flexieMargin,
}) => {
   const _DEBUG = false;

   var linesJsx: JSX.Element = <></>;

   const lrtb: Lrtb = getLrtb(elements);
   const { left, right, top, bottom } = lrtb;

   const hasTables = elements.some((el) => el.id.startsWith("Table "));
   const hasKitchenSeats = elements.some((el) => el.id.match(/Seat k+\d/));
   const hasBathroomSeats = elements.some((el) => el.id.match(/Seat b+\d/));
   const tableCount = elements.filter((el) =>
      el.id.startsWith("Table ")
   ).length;

   let style: React.CSSProperties = {
      position: "absolute",
      margin: 0,
      color: "black",
      zIndex: 10,
   };

   if (paperRect) {
      const relativeLeft = left - paperRect.left;
      const relativeRight = right - paperRect.left;

      const setTop = top + scrollTop - flexieMargin;
      const setBottom = bottom + scrollTop - flexieMargin;

      let centerX: number;
      let centerY: number;

      if (tableCount == 1 && !hasKitchenSeats && !hasBathroomSeats) {
         if (_DEBUG) console.log("one table");
         //only one table

         // Calculate centerX and centerY
         const tableLrtb = getLrtb(elements);

         const tableLeft = tableLrtb.left - paperRect.left;
         const tableRight = tableLrtb.right - paperRect.left;
         const tableTop = tableLrtb.top + scrollTop - flexieMargin;
         const tableBottom = tableLrtb.bottom + scrollTop - flexieMargin;

         centerX = (tableLeft + tableRight) / 2;
         centerY = (tableTop + tableBottom) / 2;

         style = {
            ...style,
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: "translateX(-50%) translateY(-50%)",
         };
      }

      if (tableCount > 1 && !hasKitchenSeats && !hasBathroomSeats) {
         return (
            <TableHandler
               style={style}
               assigned={assigned}
               elements={elements}
               scrollTop={scrollTop}
               paperRect={paperRect}
               flexieMargin={flexieMargin}
            />
         );
      } else if (tableCount == 1 && hasKitchenSeats && !hasBathroomSeats) {
         if (_DEBUG) console.log("one table and kitchen seats");
         const tables = elements.filter((el) => el.id.startsWith("Table "));
         const tableLrtb = getLrtb(tables);

         const tableLeft = tableLrtb.left - paperRect.left;
         const tableRight = tableLrtb.right - paperRect.left;
         const tableTop = tableLrtb.top + scrollTop - flexieMargin;
         const tableBottom = tableLrtb.bottom + scrollTop - flexieMargin;

         centerX = (tableLeft + tableRight) / 2;
         centerY = (tableTop + tableBottom) / 2;

         style = {
            ...style,
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: "translateX(-50%) translateY(-50%)",
         };
      } else if (tableCount == 1 && hasBathroomSeats && !hasKitchenSeats) {
         if (_DEBUG) console.log("one table and bathroom seats");
         const tables = elements.filter((el) => el.id.startsWith("Table "));
         const tableLrtb = getLrtb(tables);

         const tableLeft = tableLrtb.left - paperRect.left;
         const tableRight = tableLrtb.right - paperRect.left;
         const tableTop = tableLrtb.top + scrollTop - flexieMargin;
         const tableBottom = tableLrtb.bottom + scrollTop - flexieMargin;

         centerX = (tableLeft + tableRight) / 2;
         centerY = (tableTop + tableBottom) / 2;

         style = {
            ...style,
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: "translateX(-50%) translateY(-50%)",
         };
      } else if (hasKitchenSeats && !hasBathroomSeats && tableCount == 0) {
         if (_DEBUG) console.log("kitchen seats");
         // Kitchen seats, no bathroom seats
         centerX = (relativeLeft + relativeRight) / 2;
         centerY = (setTop + setBottom) / 2;
         console.log(setTop);
         style = {
            ...style,
            left: `${relativeRight + 8}px`,
            top: `${centerY}px`,
            transform: "translateY(-50%) rotate(-30deg)",
            transformOrigin: "left",
         };
      } else if (hasBathroomSeats && !hasKitchenSeats) {
         if (_DEBUG) console.log("bathroom seats");
         centerX = (relativeLeft + relativeRight) / 2;
         centerY = (setTop + setBottom) / 2;
         style = {
            ...style,
            left: `${centerX - 4}px`,
            top: `${setTop}px`,
            transform: "translateY(-100%) rotate(-30deg)",
            transformOrigin: "left",
         };
      } else if (hasKitchenSeats && hasBathroomSeats && !hasTables) {
         if (_DEBUG) console.log("kitchen and bathroom seats");
         //corner seats
         centerX = (relativeLeft + relativeRight) / 2;
         centerY = (setTop + setBottom) / 2;

         style = {
            ...style,
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: "translateY(-60%) rotate(-30deg)",
            transformOrigin: "left",
         };
      }

      return getReturnJsx({ style, assigned, linesJsx });
   }
};
export default NameAndLines;

export type StyleAssignedLines = {
   style: React.CSSProperties;
   assigned: string;
   linesJsx: JSX.Element;
};

export const getReturnJsx = ({
   style,
   assigned,
   linesJsx,
}: StyleAssignedLines) => {
   return (
      <React.Fragment>
         <div className="party-name" style={style}>
            {assigned}
         </div>
         ;{linesJsx}
      </React.Fragment>
   );
};
