import "./style.css";
import { useSelected } from "../../context/SelectedContext";
import { useState } from "react";

const InfoBox: React.FC<{}> = ({}) => {
   const { state } = useSelected();
   const selectedIds = Object.keys(state).filter((id) => state[id]);

   const [partyName, setPartyName] = useState<string>("");
   const [partyCount, setPartyCount] = useState<number>(1);
   const [parties, setParties] = useState<Array<string>>([]);

   const addHandler = (name: string, count: number): void => {
      setParties((prevParties) => {
         return [...prevParties, `${name} (${count})`];
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
                              <li key={id}>{id}</li>
                           ))}
                        </ul>
                        <div>
                           <div className="heading">Parties at Selected</div>
                           <ul>
                              {parties.map((name, index) => (
                                 <li key={index}>{name}</li>
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
                           />
                           <input
                              type="number"
                              className="number-input"
                              placeholder="1"
                           />
                           <button
                              onClick={() => {
                                 addHandler(partyName, partyCount);
                                 setPartyName(""); // Clear the input after adding
                                 setPartyCount(1); // Reset the count to 1
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
