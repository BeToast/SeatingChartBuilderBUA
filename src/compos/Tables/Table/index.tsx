import { State, useSelected } from "../../../context/SelectedContext";
import "./style.css";

const Table: React.FC<{
   id: number;
}> = ({ id }) => {
   const { state, setSelected, setVacant } = useSelected();
   const tableState = state[`Table ${id}`];

   const tableClass: string =
      tableState == State.Selected
         ? "selected"
         : tableState == State.Assigned
         ? "assigned"
         : "vacant";

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
            onClick={() => onClickHandler(`Table ${id}`)}
         >
            <div className="table-id no-select">{id}</div>
         </div>
      </>
   );
};

export default Table;
