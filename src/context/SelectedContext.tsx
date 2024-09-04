import React, { createContext, useContext, useState, useCallback } from "react";
import { readLastColour, returnColour } from "../utils/colours";

export interface recordValue {
   selected: boolean;
   assigned: Array<string>;
}

interface SelectedContextType {
   state: Record<string, recordValue>;
   nameAndLinesBool: boolean;
   // setVacant: (id: string) => void;
   setSelected: (id: string, selected: boolean) => void;
   selectGroup: (id: string) => void;
   deselectAll: () => void;
   setAssigned: (
      id: string,
      assigned: Array<string>,
      colour?: string,
      selected?: boolean
   ) => void;
   removeAssigned: (id: string, party: string) => void;
   renderNameAndLines: () => void;
}

const SelectedContext = createContext<SelectedContextType>({
   state: {},
   nameAndLinesBool: false,
   // setVacant: () => {},
   setSelected: () => {},
   selectGroup: () => {},
   deselectAll: () => {},
   setAssigned: () => {},
   removeAssigned: () => {},
   renderNameAndLines: () => {},
});

interface SelectedProviderProps {
   children: React.ReactNode;
}

export const SelectedProvider: React.FC<SelectedProviderProps> = ({
   children,
}) => {
   const [state, setState] = useState<Record<string, recordValue>>({});
   const [nameAndLinesBool, setNameAndLinesBool] = useState<boolean>(false);

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

         return {
            ...prev,
            [id]: {
               selected: selected,
               assigned: selectedRecord?.assigned || [],
            },
         };
      });
   }, []);

   const selectGroup = useCallback((id: string) => {
      function arraysEqual(a: string[], b: string[]) {
         if (a === b) return true;
         if (a == null || b == null) return false;
         if (a.length !== b.length) return false;

         for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
         }
         return true;
      }

      setState((prev) => {
         const party = prev[id].assigned;
         console.log(party);
         const partyKeys: string[] = Object.keys(prev).filter(
            (currId: string) =>
               arraysEqual(prev[currId].assigned, prev[id].assigned)
         );

         return partyKeys.reduce(
            (newState, key) => {
               return {
                  ...newState,
                  [key]: {
                     ...prev[key],
                     selected: true,
                  },
               };
            },
            { ...prev }
         );
      });
   }, []);

   // setState((prev) => {
   //    const partyKeys: Array<string> = Object.keys(prev).filter(
   //       (currId: string) => prev[currId].assigned === prev[id].assigned
   //    );
   //    console.log(partyKeys);

   //    return partyKeys.reduce(
   //       (newState, key) => {
   //          return {
   //             ...newState,
   //             [key]: {
   //                ...prev[key],
   //                selected: true,
   //             },
   //          };
   //       },
   //       { ...prev }
   //    );
   // });

   const deselectAll = useCallback(() => {
      setState((prev) => {
         const newState = { ...prev };
         Object.keys(newState).forEach((key) => {
            newState[key].selected = false;
         });
         return newState;
      });
   }, []);

   //sets the assigned value to the party array. and maybe a colour
   const setAssigned = useCallback(
      (
         id: string,
         newAssigned: Array<string>,
         newColour?: string,
         newSelected?: boolean
      ) => {
         const isAssigned: boolean = newAssigned.length > 0;

         setState((prev) => ({
            ...prev,
            [id]: {
               selected:
                  newSelected !== undefined ? newSelected : prev[id].selected,
               assigned: [...newAssigned],
            },
         }));

         // setState((prev) => ({
         //    ...prev,
         //    [id]: {
         //       selected: newSelected
         //          ? newSelected
         //          : prev[id]
         //          ? prev[id].selected
         //          : false,
         //       assigned: [...newAssigned],
         //       colour: isAssigned
         //          ? newColour
         //             ? newColour
         //             : prev[id].colour
         //          : undefined,
         //    },
         // }));
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

         // Return updated state
         return {
            ...prev,
            [id]: {
               selected: prev[id].selected,
               assigned: remainingAssigned,
            },
         };
      });
   }, []);

   const renderNameAndLines = () => {
      setNameAndLinesBool((prev) => !prev);
   };

   const value: SelectedContextType = {
      state,
      nameAndLinesBool,
      // setVacant,
      setSelected,
      selectGroup,
      deselectAll,
      setAssigned,
      removeAssigned,
      renderNameAndLines,
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
