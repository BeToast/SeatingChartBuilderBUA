import "./style.css";
import { useSelected } from "../../context/SelectedContext";
import { useState } from "react";
import { getColour } from "../../utils/colours";

const InfoBox: React.FC<{}> = ({}) => {
   const { state, setVacant, setAssigned, removeAssigned } = useSelected();
   const selectedIds = Object.keys(state).filter((id) => state[id].state);

   const [partyName, setPartyName] = useState<string>("");
   const [partyCount, setPartyCount] = useState<number>(1);
   const [parties, setParties] = useState<Array<string>>([]);

   const addPartyHandler = (name: string, count: number): void => {
      // setParties((prevParties) => {
      //    return [...prevParties, `${name} (${count})`];
      // });
      const newParties: Array<string> = [...parties, `${name} (${count})`];
      const newColour: string | undefined =
         newParties.length == 1 ? getColour() : undefined;
      setPartyName(""); // Clear the input after adding
      selectedIds.map((id) => {
         setAssigned(id, newParties, newColour);
      });
      setParties(newParties);
   };

   const selectedRemoveHandler = (selectedId: string) => {
      setVacant(selectedId);
   };

   const partyRemoveHandler = (party: string) => {
      //update local state
      setParties((prevParties) => {
         return prevParties.filter((name) => name !== party);
      });
      //update Context
      selectedIds.map((id) => {
         removeAssigned(id, party);
      });
   };

   return (
      <>
         <div className="info-wrap no-print">
            <div className="info-box">
               <div className="heading">Selected</div>
               <div style={{ width: "100%" }}>
                  {selectedIds.length > 0 ? (
                     <>
                        <ul>
                           {selectedIds.map((id) => (
                              <li
                                 onClick={() => selectedRemoveHandler(id)}
                                 className="remove-hover selected-id"
                                 key={id}
                              >
                                 {id}
                              </li>
                           ))}
                        </ul>
                        <div>
                           <div className="heading">Parties at Selected</div>
                           <ul>
                              {parties.map((name, index) => (
                                 <li
                                    onClick={() => partyRemoveHandler(name)}
                                    className="remove-hover"
                                    key={index}
                                 >
                                    {name}
                                 </li>
                              ))}
                           </ul>
                        </div>
                        <div className="input-group">
                           <input
                              type="text"
                              className="name-input"
                              placeholder="Name"
                              value={partyName}
                              onChange={(e) => setPartyName(e.target.value)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter") {
                                    e.preventDefault(); // Prevents form submission if within a form
                                    const partySizeInput =
                                       document.getElementById(
                                          "party-size-input"
                                       );
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
                                 var parsedValue = parseInt(e.target.value);
                                 if (isNaN(parsedValue)) {
                                    parsedValue = 1;
                                 }
                                 setPartyCount(parsedValue);
                              }}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter") {
                                    e.preventDefault(); // Prevents form submission if within a form
                                    addPartyHandler(partyName, partyCount);
                                 }
                              }}
                           />
                           <button
                              onClick={() => {
                                 addPartyHandler(partyName, partyCount);
                              }}
                              className="add-button"
                           >
                              Add
                           </button>
                        </div>
                     </>
                  ) : (
                     <p>None selected</p>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default InfoBox;
