import "./style.css";
import { useSelected } from "../../context/SelectedContext";

const InfoBox: React.FC<{}> = ({}) => {
   const { state } = useSelected();
   const selectedIds = Object.keys(state).filter((id) => state[id]);

   console.log(state);

   return (
      <>
         <div className="info-box no-print">
            <h2>Selected</h2>
            <div>
               {selectedIds.length > 0 ? (
                  <ul>
                     {selectedIds.map((id) => (
                        <li key={id}>{id}</li>
                     ))}
                  </ul>
               ) : (
                  <p>None selected</p>
               )}
            </div>
         </div>
      </>
   );
};

export default InfoBox;
