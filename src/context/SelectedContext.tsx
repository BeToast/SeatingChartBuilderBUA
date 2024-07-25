import React, { createContext, useContext, useState, useCallback } from "react";
import { readLastColour, returnColour } from "../utils/colours";

export interface recordValue {
   //todo add selected as boolean.
   selected: boolean;
   assigned: Array<string>;
   colour: string | undefined;
}

interface SelectedContextType {
   state: Record<string, recordValue>;
   // setVacant: (id: string) => void;
   setSelected: (id: string, selected: boolean) => void;
   setAssigned: (id: string, party: Array<string>, colour?: string) => void;
   removeAssigned: (id: string, party: string) => void;
}

const SelectedContext = createContext<SelectedContextType>({
   state: {},
   // setVacant: () => {},
   setSelected: () => {},
   setAssigned: () => {},
   removeAssigned: () => {},
});

interface SelectedProviderProps {
   children: React.ReactNode;
}

export const SelectedProvider: React.FC<SelectedProviderProps> = ({
   children,
}) => {
   const [state, setState] = useState<Record<string, recordValue>>({});

   // const setVacant = useCallback((id: string) => {
   //    setState((prev) => ({
   //       ...prev,
   //       [id]: { state: State.Vacant, assigned: [], colour: undefined },
   //    }));
   // }, []);

   //copies the currently selected assignments to the newly selected.
   const setSelected = useCallback((id: string, selected: boolean) => {
      setState((prev) => {
         const selectedIds = document.getElementsByClassName("selected-id");
         var selectedRecord: recordValue | undefined = undefined;
         if (selectedIds.length > 0) {
            selectedRecord = prev[selectedIds[0].innerHTML];
         }
         console.log(selectedRecord);

         return {
            ...prev,
            [id]: {
               selected: selected,
               assigned: selectedRecord?.assigned || [],
               colour: selectedRecord?.colour || undefined,
            },
         };
      });
   }, []);

   //sets the assigned value to the party array. and maybe a colour
   const setAssigned = useCallback(
      (id: string, party: Array<string>, newColour?: string) => {
         const isAssigned: boolean = party.length > 0;

         setState((prev) => ({
            ...prev,
            [id]: {
               selected: prev[id].selected,
               assigned: [...party],
               colour: isAssigned
                  ? newColour
                     ? newColour
                     : prev[id].colour
                  : undefined,
            },
         }));
      },
      []
   );

   //remove party from the assigned array.
   const removeAssigned = useCallback((id: string, partyToRemove: string) => {
      setState((prev) => {
         const currentItem = prev[id];
         const remainingAssigned = currentItem.assigned.filter(
            (party) => party !== partyToRemove
         );

         // Determine new state and color based on remaining assigned parties
         const isStillAssigned: boolean = remainingAssigned.length > 0;
         const newColour = isStillAssigned ? currentItem.colour : undefined;

         // Handle color management
         if (
            !newColour &&
            currentItem.colour &&
            readLastColour() !== currentItem.colour
         ) {
            returnColour(currentItem.colour);
         }

         // Return updated state
         return {
            ...prev,
            [id]: {
               selected: prev[id].selected,
               assigned: remainingAssigned,
               colour: newColour,
            },
         };
      });
   }, []);

   const value: SelectedContextType = {
      state,
      // setVacant,
      setSelected,
      setAssigned,
      removeAssigned,
   };

   return (
      <SelectedContext.Provider value={value}>
         {children}
      </SelectedContext.Provider>
   );
};

export const useSelected = (): SelectedContextType => {
   const context = useContext(SelectedContext);
   if (context === undefined) {
      throw new Error("useSelected must be used within a SelectedProvider");
   }
   return context;
};
