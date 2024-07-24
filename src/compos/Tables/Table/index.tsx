import { State, useSelected } from "../../../context/SelectedContext";
import "./style.css";

const Table: React.FC<{
   id: number;
}> = ({ id }) => {
   const { state, setSelected, setVacant } = useSelected();
   const tableState = state[`Table ${id}`];

   var tableClass: string;
   if (tableState) {
      if (tableState.state == State.Selected) {
         tableClass = "selected";
      } else if (tableState.state == State.Assigned) {
         tableClass = "assigned";
      } else {
         tableClass = "vacant";
      }
   } else {
      tableClass = "vacant";
   }

   const onClickHandler = (id: string) => {
      if (tableClass == "vacant") {
         setSelected(id);
      } else if (tableClass == "selected") {
         setVacant(id);
      }
   };

   return (
      <>
         <div
            className={`table ${tableClass}`}
            style={
               tableClass == "assigned"
                  ? { backgroundColor: tableState.colour }
                  : {}
            }
            onClick={() => onClickHandler(`Table ${id}`)}
         >
            <div className="table-id no-select">{id}</div>
         </div>
      </>
   );
};

export default Table;
