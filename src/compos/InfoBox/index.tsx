import "./style.css";
import { useSelected } from "../../context/SelectedContext";
import { useState, useEffect, useMemo } from "react";
import RemoveParty from "./RemoveParty";
import LinkParty from "./LinkParty";
import { arraysEqual } from "../../utils/generic";

const InfoBox: React.FC<{}> = ({}) => {
   const {
      state,
      uniquePartiesArray,
      parties,
      setParties,
      partyOveride,
      setPartyOveride,
      setAssigned,
      setSelected,
   } = useSelected();
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

   // syncs infoBox state with SelectedContext state
   useEffect(() => {
      //party ovverride boolean to populate parties when going from none selected
      if (partyOveride) {
         selectedIds.forEach((id) => {
            setAssigned(id, parties);
         });
      } else {
         if (selectedCount > 0) {
            setParties(state[selectedIds[0]].assigned);
            setPartyOveride(true);
         }
      }
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

   // legit just remove the party from the state. useEffect() will handle the rest.
   const removePartyHandler = (party: string) => {
      setParties(parties.filter((p) => p !== party));
   };

   const deselectHandler = () => {
      selectedIds.forEach((id) => setSelected(id, false));
      setParties([]);
      setPartyOveride(false);
   };

   const addPartyJsx = (
      <div className="party-input-wrapper">
         <p className="party-input-label">
            {parties.length > 0
               ? "Add another party to table?"
               : "Enter name and size of party."}
         </p>

         <div className="input-group">
            <input
               type="text"
               className="name-input"
               placeholder={
                  parties.length > 0 ? "Add another party" : "Party Name"
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

   // const linkOptions = uniquePartiesArray.filter(
   //    (party) => !arraysEqual(party, parties)
   // );
   const linkOptions = Array.from(
      new Set(
         uniquePartiesArray
            .filter((party) => !arraysEqual(party, parties))
            .map((party) => JSON.stringify(party))
      )
   ).map((party) => JSON.parse(party));

   return (
      <>
         <div className="info-wrap no-print">
            <div className="info-box">
               {/* party list */}
               {parties.length > 0 ? (
                  <div className="parties">
                     {parties.map((party) => (
                        <div key={party} className="party-row">
                           <RemoveParty
                              party={party}
                              removePartyHandler={() =>
                                 removePartyHandler(party)
                              }
                           />
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
               {parties.length > 0 ? (
                  <>
                     {/* <div className="selected-info">
                        <div>{tableCount} : Tables</div>
                        <div>{railCount} : Rail</div>
                     </div> */}
                  </>
               ) : (
                  <></>
               )}

               {/* link party input */}
               {parties.length > 0 && linkOptions.length > 0 ? (
                  <LinkParty linkOptions={linkOptions} currParties={parties} />
               ) : (
                  <></>
               )}

               {/* deselect */}
               {selectedCount > 0 ? (
                  <button onClick={deselectHandler} className="deselect-button">
                     Done
                  </button>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </>
   );
};

export default InfoBox;
