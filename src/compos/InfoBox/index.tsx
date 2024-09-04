import "./style.css";
import { useSelected } from "../../context/SelectedContext";
import {
   useState,
   useEffect,
   useMemo,
   useCallback,
   SetStateAction,
} from "react";
import Tooltip from "../Tooltip";
import { xSvg } from "../../utils/svgs";
import RemoveParty from "./RemoveParty";

const InfoBox: React.FC<{}> = ({}) => {
   const { state, setSelected, setAssigned, removeAssigned } = useSelected();
   const selectedIds = useMemo(
      () => Object.keys(state).filter((id) => state[id].selected),
      [state]
   );
   const selectedCount: number = useMemo(
      () => selectedIds.length,
      [selectedIds]
   );

   const railCount = selectedIds.filter((selected) =>
      selected.startsWith("Seat ")
   ).length;
   // selectedIds.some((el) => el.id.match(/Seat k+\d/));
   const tableCount = selectedIds.filter((selected) =>
      selected.startsWith("Table ")
   ).length;

   // used for input fields
   const [partyName, setPartyName] = useState<string>("");
   const [partySize, setPartyCount] = useState<number>(1);
   // the party list for this infoBox
   // updates the state onChange
   const [parties, setParties] = useState<Array<string>>([]);

   // const updateParties = useCallback(() => {
   //    const updatedParties = new Set<string>();
   //    selectedIds.forEach((id) => {
   //       if (state[id].assigned) {
   //          state[id].assigned.forEach((party: string) => {
   //             updatedParties.add(party);
   //          });
   //       }
   //    });
   //    const newParties = Array.from(updatedParties);
   //    if (JSON.stringify(newParties) !== JSON.stringify(parties)) {
   //       setParties(newParties);
   //    }
   // }, [selectedIds, state, parties]);

   const addPartyHandler = (name: string, count: number): void => {
      const newParty = `${name.trim()}(${count})`;
      setPartyName(""); // Clear the input after adding
      setPartyCount(1); // Reset party count
      setParties([...parties, newParty]);
   };

   useEffect(() => {
      selectedIds.forEach((id) => {
         setAssigned(id, parties);
      });
   }, [parties, selectedCount]);

   // this may be unnessicary
   // useEffect(() => {
   //    if (selectedIds.length == 0) {
   //       setParties([]);
   //    }
   // }, [selectedIds]);

   // const addPartyToSelection = () => {};

   // const selectedRemoveHandler = (selectedId: string) => {
   //    setSelected(selectedId, false);
   // };

   // const partyRemoveHandler = (party: string) => {
   //    selectedIds.forEach((id) => {
   //       removeAssigned(id, party);
   //    });
   // };

   // const deselectHandler = () => {
   //    selectedIds.forEach((id) => setSelected(id, false));
   // };

   // useEffect(() => {
   //    updateParties();
   // }, [updateParties]);

   const addPartyJsx = (
      <div>
         <p className="party-input-label">Enter name and size of party.</p>

         <div className="input-group">
            <input
               type="text"
               className="name-input"
               placeholder={
                  parties.length > 0 ? "Party Name" : "Add another party"
               }
               value={partyName}
               onChange={(e) => setPartyName(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     e.preventDefault();
                     const partySizeInput =
                        document.getElementById("party-size-input");
                     if (partySizeInput) {
                        partySizeInput.focus();
                     }
                  }
               }}
            />
            <input
               type="number"
               className="number-input"
               id="party-size-input"
               placeholder="1"
               onChange={(e) => {
                  const parsedValue = parseInt(e.target.value);
                  setPartyCount(isNaN(parsedValue) ? 1 : parsedValue);
               }}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     e.preventDefault();
                     addPartyHandler(partyName, partySize);
                  }
               }}
            />
            <button
               onClick={() => {
                  addPartyHandler(partyName, partySize);
               }}
               className="add-button"
            >
               Add
            </button>
         </div>
      </div>
   );
   return (
      <>
         <div className="info-wrap no-print">
            <div className="info-box">
               {/* party list */}
               {parties.length > 0 ? (
                  <div className="parties">
                     {parties.map((party) => (
                        <div className="party-row">
                           <RemoveParty />
                           <div key={party} className="party">
                              {party}
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <></>
               )}

               {/* add party box */}
               {/* if has table or there is no assigned party then display add party box */}
               {tableCount > 0 || parties.length == 0 ? addPartyJsx : <></>}

               {/* selected/assigned info */}
               <div className="selected-info">
                  <div>{tableCount} : Tables</div>
                  <div>{railCount} : Rail</div>
               </div>
            </div>
         </div>
      </>
   );
};

export default InfoBox;
