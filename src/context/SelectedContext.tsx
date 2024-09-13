import React, {
   createContext,
   useContext,
   useState,
   useCallback,
   useEffect,
} from "react";
import { arraysEqual } from "../utils/generic";
export interface recordValue {
   selected: boolean;
   assigned: Array<string>;
}

interface SelectedContextType {
   state: Record<string, recordValue>;
   unlinkedPartiesArray: Array<Array<Array<string>>>;
   partyLinks: Array<Array<Array<string>>>;
   nameAndLinesBool: boolean;
   parties: Array<string>;
   setParties: (parties: Array<string>) => void;
   partyOveride: boolean;
   extraChairs: number;
   setExtraChairs: (extraChairs: number) => void;
   setPartyOveride: (partyOveride: boolean) => void;
   // setVacant: (id: string) => void;
   setSelected: (id: string, selected: boolean) => void;
   selectGroup: (id: string) => void;
   deselectAll: () => void;
   setAssigned: (
      id: string,
      assigned: Array<string>,
      selected?: boolean
   ) => void;
   removeAssigned: (id: string, party: string) => void;
   addPartyLink: (thisParty: Array<string>, linkedParty: Array<string>) => void;
   removePartyLink: (thisParty: Array<string>, index: number) => void;
   renderNameAndLines: () => void;
}

const SelectedContext = createContext<SelectedContextType>({
   state: {},
   unlinkedPartiesArray: [],
   partyLinks: [],
   nameAndLinesBool: false,
   parties: [],
   setParties: () => {},
   partyOveride: true,
   extraChairs: 0,
   setExtraChairs: () => {},
   setPartyOveride: () => {},
   setSelected: () => {},
   selectGroup: () => {},
   deselectAll: () => {},
   setAssigned: () => {},
   removeAssigned: () => {},
   addPartyLink: () => {},
   removePartyLink: () => {},
   renderNameAndLines: () => {},
});

interface SelectedProviderProps {
   children: React.ReactNode;
}

export const SelectedProvider: React.FC<SelectedProviderProps> = ({
   children,
}) => {
   const [state, setState] = useState<Record<string, recordValue>>({});
   const [unlinkedPartiesArray, setUnlinkedPartiesArray] = useState<
      Array<Array<Array<string>>>
   >([]);
   const [partyLinks, setPartyLinks] = useState<Array<Array<Array<string>>>>(
      []
   );
   const [nameAndLinesBool, setNameAndLinesBool] = useState<boolean>(false);

   // the party list for this infoBox
   // updates the state onChange
   const [parties, setParties] = useState<Array<string>>([]);

   //when setPartyOverride is true, then whatever parties are in the InfoBox state will be assigned to the clicked selectable
   const [partyOveride, setPartyOveride] = useState<boolean>(false);
   const [extraChairs, setExtraChairs] = useState<number>(0);

   // updae the party set whenever state updates
   // useEffect(() => updatePartiesSet(), [state]);

   // const updatePartiesSet = useCallback(() => {
   //    console.log("updating parties set");
   //    setPartiesSet((prevSet) => {
   //       const newSet = new Set(prevSet);
   //       Object.values(state).forEach((record) => {
   //          newSet.add(record.assigned);
   //       });
   //       return newSet;
   //    });
   // }, []);
   // const updateUnlinkedPartiesArray = useCallback(() => {
   //    partyLinks
   //    // console.log("updating parties set");
   //    setUnlinkedPartiesArray(() => {
   //       const unlinkedPartyArray = new Array<Array<string>>();
   //       Object.values(state).forEach((record) => {
   //          if (record.assigned.length > 0) {
   //             unlinkedPartyArray.push(record.assigned);
   //          }
   //       });
   //       return unlinkedPartyArray;
   //    });
   // }, [state, partyLinks]);
   const updateUnlinkedPartiesArray = useCallback(() => {
      // Flatten partyLinks into a single array of all linked parties
      const linkedParties = new Set(partyLinks.flat(2));

      // Get all unique parties from state
      const allParties = new Set<string>();
      Object.values(state).forEach((record) => {
         record.assigned.forEach((party) => allParties.add(party));
      });

      // Filter out parties that are in linkedParties
      const unlinkedParties = Array.from(allParties).filter(
         (party) => !linkedParties.has(party)
      );

      // Transform unlinkedParties into string[][][]
      const newUnlinkedPartiesArray = unlinkedParties.map((party) => [[party]]);

      // Update the state
      setUnlinkedPartiesArray(newUnlinkedPartiesArray);
   }, [state, partyLinks]);

   useEffect(() => {
      updateUnlinkedPartiesArray();
   }, [state, partyLinks, updateUnlinkedPartiesArray]);

   //copies the currently selected assignments to the newly selected.
   const setSelected = useCallback((id: string, selected: boolean) => {
      setState((prev) => {
         return {
            ...prev,
            [id]: {
               selected: selected,
               assigned: prev[id].assigned,
            },
         };
      });
   }, []);

   const selectGroup = useCallback((id: string) => {
      setState((prev) => {
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
      (id: string, newAssigned: Array<string>, newSelected?: boolean) => {
         // const isAssigned: boolean = newAssigned.length > 0;

         setState((prev) => ({
            ...prev,
            [id]: {
               selected:
                  newSelected !== undefined ? newSelected : prev[id].selected,
               assigned: [...newAssigned],
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
         // const isStillAssigned: boolean = remainingAssigned.length > 0;

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

   const addPartyLink = useCallback(
      (thisParty: string[], linkedParty: string[]) => {
         setPartyLinks((prev) => {
            const newLinks = [...prev];
            const existingLinkIndex = newLinks.findIndex((link) =>
               link.some(
                  (party) =>
                     party.every((item, index) => item === thisParty[index]) ||
                     party.every((item, index) => item === linkedParty[index])
               )
            );

            if (existingLinkIndex !== -1) {
               // If a link with either party exists, add the other party to it
               const existingLink = newLinks[existingLinkIndex];
               if (
                  !existingLink.some((party) =>
                     party.every((item, index) => item === thisParty[index])
                  )
               ) {
                  existingLink.push(thisParty);
               }
               if (
                  !existingLink.some((party) =>
                     party.every((item, index) => item === linkedParty[index])
                  )
               ) {
                  existingLink.push(linkedParty);
               }
            } else {
               // If no existing link is found, create a new one
               newLinks.push([thisParty, linkedParty]);
            }

            // console.log(newLinks);
            return newLinks;
         });
      },
      []
   );

   //remove a specific party from the array of parties at index.
   const removePartyLink = useCallback((thisParty: string[], index: number) => {
      setPartyLinks((prev) => {
         // Check if the index is valid
         if (index < 0 || index >= prev.length) {
            console.error("Invalid index");
            return prev;
         }
         //store local copy of the array
         const updatedLinks = [...prev];
         //remove if 2 or less bc that means the link is gone
         if (prev[index].length <= 2) {
            updatedLinks.splice(index, 1);
         } else {
            //remove the party from the array
            const updatedParties = prev[index].filter(
               (party) => !arraysEqual(party, thisParty)
            );
            updatedLinks[index] = updatedParties;
         }
         return updatedLinks;
      });
   }, []);

   const renderNameAndLines = () => {
      setNameAndLinesBool((prev) => !prev);
   };

   const value: SelectedContextType = {
      state,
      unlinkedPartiesArray,
      partyLinks,
      nameAndLinesBool,
      parties,
      setParties,
      partyOveride,
      extraChairs,
      setExtraChairs,
      setPartyOveride,
      setSelected,
      selectGroup,
      deselectAll,
      setAssigned,
      removeAssigned,
      addPartyLink,
      removePartyLink,
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
