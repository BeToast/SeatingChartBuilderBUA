import React from "react";
import "./style.css";
import TableHandler from "./TableHandler";
import TableRailHandler from "./TableRailHandler";
import RailHandler from "./RailHandler.tsx";

const NameAndLines: React.FC<{
   assigned?: string;
   elements?: Element[];
   assignedLink?: Array<string>;
   elementsLink?: Array<Array<Element>>;
   scrollTop: number;
   paperRect: DOMRect | null;
   flexieMargin: number;
}> = ({
   assigned,
   elements,
   assignedLink,
   elementsLink,
   scrollTop,
   paperRect,
   flexieMargin,
}) => {
   const _DEBUG = false;

   // handle singles
   if (assigned && elements) {
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
   }
   //handle link groups
   else if (assignedLink && elementsLink) {
      //handle linked group
   }
};
export default NameAndLines;

export const getReturnJsx = ({
   style = undefined,
   assigned = undefined,
   linesJsx = <></>,
}: {
   style?: React.CSSProperties;
   assigned?: string;
   linesJsx?: JSX.Element;
}) => {
   return (
      <React.Fragment>
         ;{" "}
         {/* THIS SEMICOLON IS THE REASON EVERYTHING IS 20px OFFSET ON Y AXIS!!!  */}
         {assigned ? (
            <div className="party-name" style={style}>
               {assigned}
            </div>
         ) : (
            <></>
         )}
         {linesJsx}
      </React.Fragment>
      // <React.Fragment>
      //    <div className="party-name" style={style}>
      //       {assigned}
      //    </div>
      //    ;{linesJsx}
      // </React.Fragment>
   );
};
