import React from "react";
import { useSelected } from "../../../../context/SelectedContext";
import {
   getElementClass,
   handleElementClick,
   getElementStyle,
} from "./../../utils";
import "./style.css";

interface TableProps {
   id: number;
}

const Table: React.FC<TableProps> = ({ id }) => {
   const { state, setSelected, setAssigned, selectGroup } = useSelected();
   const tableId = `Table ${id}`;
   const tableState = state[tableId];

   const tableClass = getElementClass(tableState);

   return (
      <div
         className={`table ${tableClass}`}
         style={getElementStyle(tableState?.colour)}
         onClick={() =>
            handleElementClick(
               tableClass,
               tableId,
               setSelected,
               selectGroup,
               setAssigned
            )
         }
      >
         <div className="table-id no-select">{id}</div>
      </div>
   );
};

export default Table;
