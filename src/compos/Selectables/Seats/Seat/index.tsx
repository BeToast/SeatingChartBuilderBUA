import React from "react";
import { recordValue, useSelected } from "../../../../context/SelectedContext";
import {
   getElementClass,
   getElementSelectState,
   getOtherSelectedAssignments,
   handleElementClick,
} from "./../../utils";
import "./style.css";
import RemoveSeat from "../RemoveSeat";

interface SeatProps {
   id: string;
   extraSeat?: boolean;
   invis?: boolean;
   kSeats: number[];
   setKSeats: React.Dispatch<React.SetStateAction<number[]>>;
}

const Seat: React.FC<SeatProps> = ({
   id,
   extraSeat = false,
   invis = false,
   kSeats,
   setKSeats,
}) => {
   const { state, setSelected, selectGroup, setAssigned, deselectAll } =
      useSelected();
   const seatId = `Seat ${id}`;
   const seatState = state[seatId];

   const seatClass = getElementClass(seatState);

   return (
      <>
         <div
            id={seatId}
            className={`seat ${seatClass} ${invis ? "invis" : ""}`}
            onClick={() =>
               handleElementClick(
                  getElementSelectState(seatState),
                  seatId,
                  getOtherSelectedAssignments(state),
                  setSelected,
                  selectGroup,
                  deselectAll,
                  setAssigned
               )
            }
         >
            <div className="seat-id no-select">{id.slice(1)}</div>
         </div>
         {extraSeat ? (
            <RemoveSeat kSeats={kSeats} setKSeats={setKSeats} />
         ) : (
            <></>
         )}
      </>
   );
};

export default Seat;
