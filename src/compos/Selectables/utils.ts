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
   setSelected: (id: string, selected: boolean) => void,
   setAssigned: (id: string, party: Array<string>, colour?: string) => void
) => {
   if (elementClass === "vacant") {
      setSelected(id, true);
   } else if (elementClass === "selected") {
      setSelected(id, false);
      setAssigned(id, []);
   }
};

export const getElementStyle = (colour: string | undefined) => {
   return colour ? { backgroundColor: colour } : {};
};
