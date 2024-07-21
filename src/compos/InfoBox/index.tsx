import "./style.css";
import { useSelected } from "../../context/SelectedContext";

const InfoBox: React.FC<{}> = ({}) => {
   const { state } = useSelected();
   const selectedIds = Object.keys(state).filter((id) => state[id]);

   console.log(state);

   return (
      <>
         <div className="info-wrap no-print">
            <div className="info-box">
               <h2>Selected</h2>
               <div style={{ width: "100%" }}>
                  {selectedIds.length > 0 ? (
                     <>
                        <ul>
                           {selectedIds.map((id) => (
                              <li key={id}>{id}</li>
                           ))}
                        </ul>
                        {/* <input className="name-input"></input> */}
                        <div className="input-group">
                           <input
                              type="text"
                              className="name-input"
                              placeholder="Name"
                           />
                           <input
                              type="number"
                              className="number-input"
                              placeholder="1"
                           />
                           <button className="add-button">Add</button>
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
