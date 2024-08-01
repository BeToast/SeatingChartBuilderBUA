import { useState, useEffect } from "react";
import { recordValue, useSelected } from "../../context/SelectedContext";
import { getLrtb, Lrtb } from "../Selectables/utils";

const NamePrinter: React.FC = () => {
   const [resizeCount, setResizeCount] = useState<number>(0);

   useEffect(() => {
      addEventListener("resize", () => setResizeCount(resizeCount + 1));
   }, [resizeCount, setResizeCount]);

   const { state } = useSelected();
   const assignedElements = createAssignedElementsRecord(state);

   const scrollTop: number =
      window.scrollY || document.documentElement.scrollTop;

   //stores the names for rendering
   const nameElements: Array<JSX.Element> = [];
   //the canvas used for drawing all the lines
   const canvasElements: Array<HTMLCanvasElement> = [];

   Object.entries(assignedElements).forEach(([assigned, elements]) => {
      const hasTable = elements.some((el) => el.id.startsWith("Table "));
      const hasKitchenSeats = elements.some((el) => el.id.match(/Seat k+\d/));
      const hasBathroomSeats = elements.some((el) => el.id.match(/Seat b+\d/));

      //get curr scroll for accurate absolute positioning

      switch (true) {
         case hasTable:
            nameElements.push(
               createNameTable(assigned, getLrtb(elements), scrollTop)
            );

            break;
         case hasKitchenSeats && !hasBathroomSeats:
            const lrtbKitchen: Lrtb = getLrtb(elements);
            nameElements.push(
               createNameKitchen(assigned, lrtbKitchen, scrollTop)
            );
            canvasElements.push(drawLinesKitchen(lrtbKitchen));
            break;
         case hasBathroomSeats && !hasKitchenSeats:
            nameElements.push(
               createNameBathroom(assigned, getLrtb(elements), scrollTop)
            );
            break;
         case hasKitchenSeats && hasBathroomSeats:
            nameElements.push(
               createNameKitchenBathroom(assigned, getLrtb(elements), scrollTop)
            );
            break;
         default:
            console.log(`No recognized seating elements`);
      }
   });

   return (
      <>
         {nameElements}
         {/* {canvasElements.map((canvas) => (
            <>{canvas}</>
         ))} */}
      </>
   );
};

function createAssignedElementsRecord(
   state: Record<string, recordValue>
): Record<string, Array<Element>> {
   // Step 1: Extract unique assigned values
   const uniqueAssigned = new Set<string>();
   Object.values(state).forEach((item) => {
      item.assigned.forEach((value) => uniqueAssigned.add(value));
   });

   // Step 2 & 3: Create new record with unique assigned values as keys
   // and corresponding HTML elements as values
   const result: Record<string, Array<Element>> = {};
   uniqueAssigned.forEach((assignedValue) => {
      const elements: Element[] = [];
      Object.entries(state).forEach(([id, item]) => {
         if (item.assigned.includes(assignedValue)) {
            const element = document.getElementById(id);
            if (element) {
               elements.push(element);
            }
         }
      });
      if (elements.length > 0) {
         result[assignedValue] = elements;
      }
   });

   return result;
}

// const printNameTable: (elements: Element[]) => JSX.Element = (elements) => {

//    const { left, right, top, bottom, center } = getExtremePoints(elements);
//    const helpMe = <></>;
// };
const createNameTable: (
   assigned: string,
   lrtb: Lrtb,
   scrollTop: number
) => JSX.Element = (assigned, lrtb, scrollTop) => {
   const { left, right, top, bottom } = lrtb;

   const centerX = (left + right) / 2;
   const centerY = scrollTop + (top + bottom) / 2;

   const nameElement = (
      <p
         style={{
            position: "absolute",
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: "translateX(-50%) translateY(-50%)",
            transformOrigin: "left",
            margin: 0,
            color: "black",
            zIndex: 10,
         }}
      >
         {assigned}
      </p>
   );

   return nameElement;
};

const createNameKitchen: (
   assigned: string,
   lrtb: Lrtb,
   scrollTop: number
) => JSX.Element = (assigned, lrtb, scrollTop) => {
   const { right, top, bottom } = lrtb;

   const centerY = scrollTop + (top + bottom) / 2;

   const nameElement = (
      <p
         style={{
            position: "absolute",
            left: `${right + 8}px`,
            top: `${centerY}px`,
            transform: "translateY(-50%) rotate(-30deg)",
            transformOrigin: "left",
            margin: 0,
            color: "black",
            zIndex: 10,
         }}
      >
         {assigned}
      </p>
   );

   return nameElement;
};

const drawLinesKitchen: (lrtbKitchen: Lrtb) => HTMLCanvasElement = (
   lrtbKitchen
) => {
   const { right, top, bottom } = lrtbKitchen;

   const centerY = (top + bottom) / 2;

   const canvas = document.createElement("canvas");
   canvas.width = 100;
   canvas.height = 100;
   const ctx = canvas.getContext("2d");

   if (ctx) {
      ctx.beginPath();
      ctx.moveTo(right, centerY);
      ctx.lineTo(right + 8, centerY);
      ctx.stroke();
   }

   return canvas;
};

const createNameBathroom: (
   assigned: string,
   lrtb: Lrtb,
   scrollTop: number
) => JSX.Element = (assigned, lrtb, scrollTop) => {
   const { left, right, top } = lrtb;

   const centerX = (left + right) / 2 - 4;

   const nameElement = (
      <p
         style={{
            position: "absolute",
            left: `${centerX}px`,
            top: `${top + scrollTop}px`,
            // bottom: `${bottom + scrollTop}px`,
            transform: "translateY(-100%) rotate(-30deg)",
            transformOrigin: "left",
            margin: 0,
            color: "black",
            zIndex: 10,
         }}
      >
         {assigned}
      </p>
   );

   const lines: Array<JSX.Element> = [];

   return (
      <>
         {nameElement}
         {lines}
      </>
   );
};

const createNameKitchenBathroom: (
   assigned: string,
   lrtb: Lrtb,
   scrollTop: number
) => JSX.Element = (assigned, lrtb, scrollTop) => {
   const { left, right, top, bottom } = lrtb;

   const centerX = (left + right) / 2;
   const centerY = scrollTop + (top + bottom) / 2;

   const nameElement = (
      <p
         style={{
            position: "absolute",
            left: `${centerX}px`,
            top: `${centerY}px`,
            // bottom: `${bottom + scrollTop}px`,
            transform: "translateY(-60%) rotate(-30deg)",
            transformOrigin: "left",
            margin: 0,
            color: "black",
            zIndex: 10,
         }}
      >
         {assigned}
      </p>
   );

   return nameElement;
};

export default NamePrinter;
