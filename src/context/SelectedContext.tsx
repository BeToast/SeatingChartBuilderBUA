import React, { createContext, useContext, useState, useCallback } from "react";
import { readLastColour, returnColour } from "../utils/colours";
export const enum State {
   Vacant,
   Selected,
   Assigned,
}

interface recordValue {
   //todo add selected as boolean.
   state: State;
   assigned: Array<string>;
   colour: string | undefined;
}

interface SelectedContextType {
   state: Record<string, recordValue>;
   setVacant: (id: string) => void;
   setSelected: (id: string) => void;
   setAssigned: (id: string, party: Array<string>, colour?: string) => void;
   removeAssigned: (id: string, party: string) => void;
}

const SelectedContext = createContext<SelectedContextType>({
   state: {},
   setVacant: () => {},
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

   const setVacant = useCallback((id: string) => {
      setState((prev) => ({
         ...prev,
         [id]: { state: State.Vacant, assigned: [], colour: undefined },
      }));
   }, []);

   const setSelected = useCallback((id: string) => {
      setState((prev) => {
         const chungus = document.getElementsByClassName("selected-id");
         var bingus: any = undefined;
         if (chungus.length > 0) {
            bingus = prev[chungus[0].innerHTML];
            console.log(bingus);
         }

         console.log(bingus);
         return {
            ...prev,
            [id]: {
               state: bingus?.state || State.Selected,
               assigned: bingus?.assigned || [],
               colour: bingus?.colour || undefined,
            },
         };
      });
   }, []);

   const setAssigned = useCallback(
      (id: string, party: Array<string>, newColour?: string) => {
         setState((prev) => ({
            ...prev,
            [id]: {
               state: State.Assigned,
               assigned: [...party],
               colour: newColour ? newColour : prev[id].colour,
            },
         }));
      },
      []
   );

   const removeAssigned = useCallback((id: string, partyToRemove: string) => {
      setState((prevState) => {
         const currentItem = prevState[id];
         const remainingAssigned = currentItem.assigned.filter(
            (party) => party !== partyToRemove
         );

         // Determine new state and color based on remaining assigned parties
         const isStillAssigned = remainingAssigned.length > 0;
         const newState = isStillAssigned ? State.Assigned : State.Selected;
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
            ...prevState,
            [id]: {
               state: newState,
               assigned: remainingAssigned,
               colour: newColour,
            },
         };
      });
   }, []);

   const value: SelectedContextType = {
      state,
      setVacant,
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
