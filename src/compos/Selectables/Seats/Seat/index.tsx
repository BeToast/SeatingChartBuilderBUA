import React from "react";
import { useSelected } from "../../../../context/SelectedContext";
import {
   getElementClass,
   handleElementClick,
   getElementStyle,
} from "./../../utils";
import "./style.css";

interface SeatProps {
   id: string;
   invis?: boolean;
}

const Seat: React.FC<SeatProps> = ({ id, invis = false }) => {
   const { state, setSelected, selectGroup, setAssigned } = useSelected();
   const seatId = `Seat ${id}`;
   const seatState = state[seatId];

   const seatClass = getElementClass(seatState);

   return (
      <div
         className={`seat ${seatClass} ${invis ? "invis" : ""}`}
         style={getElementStyle(seatState?.colour)}
         onClick={() =>
            handleElementClick(
               seatClass,
               seatId,
               setSelected,
               selectGroup,
               setAssigned
            )
         }
      >
         <div className="seat-id no-select">{id.slice(1)}</div>
      </div>
   );
};

export default Seat;
