import "./style.css";
import { useSelected } from "../../context/SelectedContext";
import { useState, useEffect, useMemo } from "react";
import RemoveParty from "./RemoveParty";
import LinkParty from "./LinkParty";
import { arraysEqual } from "../../utils/generic";
import InfoSection from "./InfoSection";

const InfoBox: React.FC<{}> = ({}) => {
   const {
      state,
      unlinkedPartiesArray,
      parties,
      setParties,
      partyOveride,
      setPartyOveride,
      setAssigned,
      setSelected,
      partyLinks,
      removePartyLink,
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
   const [partySize, setPartySize] = useState<number | undefined>(undefined);

   const addPartyHandler = (name: string, size: number | undefined): void => {
      const newParty = `${name.trim()}(${size ? size : 1})`;
      setPartyName(""); // Clear the input after adding
      setPartySize(undefined); // Reset party count
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

   // legit just remove the party from the state. useEffect() will handle the rest.
   const removePartyHandler = (party: string) => {
      //find index of linked parties
      const partyLinkIndex = partyLinks.findIndex((link) =>
         link.some((assigned) => arraysEqual(parties, assigned))
      );
      //if it is linked remove the link
      if (partyLinkIndex !== -1) {
         removePartyLink(parties, partyLinkIndex);
      }
      //update state
      setParties(parties.filter((p) => p !== party));
   };

   const deselectHandler = () => {
      selectedIds.forEach((id) => setSelected(id, false));
      setParties([]);
      setPartyOveride(false);
   };

   const addPartyJsx = (
      <div className="party-input-wrapper">
         <div className="input-group">
            <input
               type="text"
               className="name-input"
               placeholder={
                  parties.length > 0
                     ? "Add another party"
                     : "Enter party details."
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
               value={partySize}
               onChange={(e) => {
                  const parsedValue = parseInt(e.target.value);
                  setPartySize(isNaN(parsedValue) ? undefined : parsedValue);
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
   // const linkOptions: Array<Array<Array<string>>> = Array.from(
   //    new Set(
   //       uniquePartiesArray
   //          .filter((party) => !arraysEqual(party, parties))
   //          .map((party) => JSON.stringify(party))
   //    )
   // ).map((party) => JSON.parse(party));

   return (
      <>
         <div className="info-wrap no-print">
            <div className="info-wrap-fixed">
               <div className="info-box">
                  {/* party list */}
                  <InfoSection header="Parties">
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
                     {tableCount > 0 || parties.length == 0 ? (
                        addPartyJsx
                     ) : (
                        <></>
                     )}
                  </InfoSection>
                  {/* selected/assigned info */}
                  <InfoSection header="Seats">
                     <div className="selected-info">
                        <div>{tableCount} : Tables</div>
                        <div>{railCount} : Rail</div>
                     </div>
                  </InfoSection>
                  {/* link party input */}
                  {/* {parties.length > 0 &&
               linkOptions.length > 0 &&
               (tableCount > 0 || railCount > 0) ? (
                  <InfoSection header="Linked">
                     <LinkParty
                        linkOptions={linkOptions}
                        currParties={parties}
                     />
                  </InfoSection>
               ) : (
                  <></>
               )} */}

                  {/* if there is things to be linked to */}
                  {parties.length > 0 && (tableCount > 0 || railCount > 0) ? ( // if there is a selected Selectable
                     <InfoSection header="Linked">
                        <LinkParty
                           unlinkedPartiesArray={unlinkedPartiesArray}
                           currParties={parties}
                        />
                     </InfoSection>
                  ) : (
                     <></>
                  )}
                  {/* deselect */}
                  {selectedCount > 0 ? (
                     <button
                        onClick={deselectHandler}
                        className="deselect-button"
                     >
                        Done
                     </button>
                  ) : (
                     <></>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default InfoBox;
