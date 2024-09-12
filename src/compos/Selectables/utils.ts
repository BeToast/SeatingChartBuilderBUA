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

export enum SelectState {
   VACANT,
   SELECTED,
   ASSIGNED,
   SELECTEDASSIGNED,
}
export const getElementSelectState = (
   elementState: recordValue | undefined
): SelectState => {
   if (elementState) {
      if (elementState.selected) {
         if (elementState.assigned.length > 0) {
            return SelectState.SELECTEDASSIGNED;
         } else {
            return SelectState.SELECTED;
         }
      } else if (elementState.assigned.length > 0) {
         return SelectState.ASSIGNED;
      }
   }
   return SelectState.VACANT;
};

export const handleElementClick = (
   elementSelectState: SelectState,
   id: string,
   thisAssignments: string[],
   selectedAssignments: string[],
   setSelected: (id: string, selected: boolean) => void,
   selectGroup: (id: string) => void,
   deselectAll: () => void,
   setAssigned: (id: string, party: Array<string>) => void,
   updateInfoBoxParties: (parties: Array<string>) => void,
   setPartyOveride: (partyOveride: boolean) => void
) => {
   if (elementSelectState === SelectState.VACANT) {
      if (selectedAssignments.length > 0) {
         //set assigned to other selected elemnts assignment
         setAssigned(id, selectedAssignments);
      } else {
         //if none selected. then ovveride with InfoBox party state
         setPartyOveride(true);
      }
      //update state to selected
      setSelected(id, true);
   } else if (elementSelectState === SelectState.SELECTED) {
      setSelected(id, false);
      setAssigned(id, selectedAssignments);
   } else if (elementSelectState === SelectState.ASSIGNED) {
      deselectAll();
      // updateInfoBoxParties([]);]

      updateInfoBoxParties(thisAssignments);
      selectGroup(id);
   } else if (elementSelectState === SelectState.SELECTEDASSIGNED) {
      setSelected(id, false);
      setAssigned(id, []);
   }
};

export const getAssignments = (
   id: string,
   state: Record<string, recordValue>
): string[] => {
   return state[id].assigned;
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
