import { recordValue, useSelected } from "../../context/SelectedContext";
import { getExtremePoints } from "../Selectables/utils";

const NamePrinter: React.FC = () => {
   const { state } = useSelected();
   const assignedElements = createAssignedElementsRecord(state);

   const renderElements: JSX.Element[] = [];

   Object.entries(assignedElements).forEach(([assigned, elements]) => {
      const hasTable = elements.some((el) => el.id.startsWith("Table "));
      const hasKitchenSeats = elements.some((el) => el.id.match(/Seat k+\d/));
      const hasBathroomSeats = elements.some((el) => el.id.match(/Seat b+\d/));

      //get curr scroll for accurate absolute positioning
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      switch (true) {
         case hasTable:
            renderElements.push(createNameTable(assigned, elements, scrollTop));
            break;
         case hasKitchenSeats && !hasBathroomSeats:
            renderElements.push(
               createNameKitchen(assigned, elements, scrollTop)
            );
            break;
         case hasBathroomSeats && !hasKitchenSeats:
            renderElements.push(
               createNameBathroom(assigned, elements, scrollTop)
            );
            break;
         case hasKitchenSeats && hasBathroomSeats:
            renderElements.push(
               createNameKitchenBathroom(assigned, elements, scrollTop)
            );
            break;
         default:
            console.log(`No recognized seating elements`);
      }
   });

   return <>{renderElements}</>;
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
   elements: Element[],
   scrollTop: number
) => JSX.Element = (assigned, elements, scrollTop) => {
   const { left, right, top, bottom } = getExtremePoints(elements);

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
   elements: Element[],
   scrollTop: number
) => JSX.Element = (assigned, elements, scrollTop) => {
   const { right, top, bottom } = getExtremePoints(elements);

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

const createNameBathroom: (
   assigned: string,
   elements: Element[],
   scrollTop: number
) => JSX.Element = (assigned, elements, scrollTop) => {
   const { left, right, top } = getExtremePoints(elements);

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

   return nameElement;
};

const createNameKitchenBathroom: (
   assigned: string,
   elements: Element[],
   scrollTop: number
) => JSX.Element = (assigned, elements, scrollTop) => {
   const { left, right, top, bottom } = getExtremePoints(elements);

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
