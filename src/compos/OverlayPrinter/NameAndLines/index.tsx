import React from "react";
import "./style.css";
import TableHandler from "./TableHandler";
import TableRailHandler from "./TableRailHandler";
import RailHandler from "./RailHandler.tsx";

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

   const hasKitchenSeats = elements.some((el) => el.id.match(/Seat k+\d/));
   const hasBathroomSeats = elements.some((el) => el.id.match(/Seat b+\d/));
   const tableCount = elements.filter((el) =>
      el.id.startsWith("Table ")
   ).length;

   if (_DEBUG) {
      console.log("tableCount: ", tableCount);
      console.log("hasKitchenSeats: ", hasKitchenSeats);
      console.log("hasBathroomSeats: ", hasBathroomSeats);
   }

   let style: React.CSSProperties = {
      position: "absolute",
      margin: 0,
      color: "black",
      zIndex: 10,
      backgroundColor: "transparent",
   };

   if (paperRect) {
      if (_DEBUG) console.log("paperRect: true");

      if (tableCount == 1 && !hasKitchenSeats && !hasBathroomSeats) {
         if (_DEBUG) console.log("one table");
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
      } else if (tableCount > 0 && (hasKitchenSeats || hasBathroomSeats)) {
         if (_DEBUG) console.log("tables and rail");
         return (
            <TableRailHandler
               style={style}
               assigned={assigned}
               elements={elements}
               scrollTop={scrollTop}
               paperRect={paperRect}
               flexieMargin={flexieMargin}
            />
         );
      } else if (tableCount == 0 && (hasKitchenSeats || hasBathroomSeats)) {
         return (
            <RailHandler
               style={style}
               assigned={assigned}
               elements={elements}
               scrollTop={scrollTop}
               paperRect={paperRect}
               flexieMargin={flexieMargin}
               hasKitchenSeats={hasKitchenSeats}
               hasBathroomSeats={hasBathroomSeats}
            />
         );
      }
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
