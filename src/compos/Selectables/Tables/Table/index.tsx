import React from "react";
import { useSelected } from "../../../../context/SelectedContext";
import {
   getElementClass,
   handleElementClick,
   getOtherSelectedAssignments,
   getElementSelectState,
   getAssignments,
} from "./../../utils";
import "./style.css";

interface TableProps {
   id: number;
}

const Table: React.FC<TableProps> = ({ id }) => {
   const {
      state,
      setSelected,
      setAssigned,
      selectGroup,
      deselectAll,
      setParties,
      setPartyOveride,
   } = useSelected();
   const tableId = `Table ${id}`;
   const tableState = state[tableId];

   const tableClass = getElementClass(tableState);

   return (
      <div
         id={tableId}
         className={`table ${tableClass}`}
         onClick={() =>
            handleElementClick(
               getElementSelectState(tableState),
               tableId,
               getAssignments(tableId, state),
               getOtherSelectedAssignments(state),
               setSelected,
               selectGroup,
               deselectAll,
               setAssigned,
               setParties,
               setPartyOveride
            )
         }
      >
         <div className="table-id no-select">{id}</div>
      </div>
   );
};

export default Table;
