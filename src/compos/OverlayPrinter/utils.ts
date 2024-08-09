import { recordValue } from "../../context/SelectedContext";

export interface Lrtb {
   left: number;
   right: number;
   top: number;
   bottom: number;
}

export function getLrtb(elements: Element[]): Lrtb {
   const rects = elements.map((el) => el.getBoundingClientRect());
   return {
      left: Math.min(...rects.map((r) => r.left)),
      right: Math.max(...rects.map((r) => r.right)),
      top: Math.min(...rects.map((r) => r.top)),
      bottom: Math.max(...rects.map((r) => r.bottom)),
   };
}

export function createAssignedElementsRecord(
   state: Record<string, recordValue>
): Record<string, Array<Element>> {
   const uniqueAssigned = new Set<string>();
   Object.values(state).forEach((item) => {
      item.assigned.forEach((value) => uniqueAssigned.add(value));
   });

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