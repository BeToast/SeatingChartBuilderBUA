import { useSelected } from "../../../../context/SelectedContext";
import "./style.css";

const Table: React.FC<{
   id: number;
}> = ({ id }) => {
   const { state, setSelected } = useSelected();
   const tableState = state[`Table ${id}`];

   var tableClass: string;
   if (tableState) {
      if (tableState.selected) {
         tableClass = "selected";
      } else if (tableState.assigned.length > 0) {
         tableClass = "assigned";
      } else {
         tableClass = "vacant";
      }
   } else {
      tableClass = "vacant";
   }

   const onClickHandler = (id: string) => {
      if (tableClass == "vacant") {
         setSelected(id, true);
      } else if (tableClass == "selected") {
         setSelected(id, false);
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
