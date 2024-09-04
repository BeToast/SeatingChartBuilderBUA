import { recordValue } from "../../context/SelectedContext";

export const getElementClass = (
   elementState: recordValue | undefined
): string => {
   if (elementState) {
      if (elementState.selected) {
         return "selected";
      } else if (elementState.assigned.length > 0) {
         return "assigned";
      }
   }
   return "vacant";
};

export const handleElementClick = (
   elementClass: string,
   id: string,
   assignedParties: string[],
   setSelected: (id: string, selected: boolean) => void,
   selectGroup: (id: string) => void,
   deselectAll: () => void,
   setAssigned: (id: string, party: Array<string>) => void
) => {
   if (elementClass === "vacant") {
      setSelected(id, true);
      if (assignedParties.length > 0) {
         setAssigned(id, assignedParties);
      }
   } else if (elementClass === "selected") {
      setSelected(id, false);
      setAssigned(id, assignedParties);
   } else if (elementClass === "assigned") {
      deselectAll();
      selectGroup(id);
   }
};

export const getOtherSelectedAssignments = (
   state: Record<string, recordValue>
): string[] => {
   const selectedId = Object.keys(state).find((id) => state[id].selected);
   //return assigned if another variable is selected
   return selectedId ? state[selectedId].assigned : [];
};

export type Lrtb = {
   left: number;
   right: number;
   top: number;
   bottom: number;
};

export const getLrtb: (elements: Element[]) => Lrtb = (elements: Element[]) => {
   let leftmost = Infinity;
   let rightmost = -Infinity;
   let topmost = Infinity;
   let bottommost = -Infinity;

   for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const rect = element.getBoundingClientRect();

      if (rect.left < leftmost) {
         leftmost = rect.left;
      }

      if (rect.right > rightmost) {
         rightmost = rect.right;
      }

      if (rect.top < topmost) {
         topmost = rect.top;
      }

      if (rect.bottom > bottommost) {
         bottommost = rect.bottom;
      }
   }

   return {
      left: leftmost,
      right: rightmost,
      top: topmost,
      bottom: bottommost,
   };
};
