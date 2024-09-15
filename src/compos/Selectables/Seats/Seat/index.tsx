import React, { forwardRef } from "react";
import { useSelected } from "../../../../context/SelectedContext";
import {
   getAssignments,
   getElementClass,
   getElementSelectState,
   getOtherSelectedAssignments,
   handleElementClick,
} from "./../../utils";
import "./style.css";

interface SeatProps {
   id: string;
   displayNumber: number;
   extraSeat?: boolean;
   invis?: boolean;
   kSeats: number[];
   setKSeats: React.Dispatch<React.SetStateAction<number[]>>;
}

const Seat = forwardRef<HTMLDivElement, SeatProps>(
   (
      {
         id,
         displayNumber,
         extraSeat = false,
         invis = false,
         kSeats,
         setKSeats,
      },
      ref
   ) => {
      const {
         state,
         setSelected,
         selectGroup,
         setAssigned,
         deselectAll,
         setParties,
         setPartyOveride,
      } = useSelected();
      const seatId = `Seat ${id}`;
      const seatState = state[seatId];

      const seatClass = getElementClass(seatState);

      return (
         <>
            <div
               ref={ref}
               id={seatId}
               className={`seat ${seatClass} ${invis ? "invis" : ""}`}
               onClick={() =>
                  handleElementClick(
                     getElementSelectState(seatState),
                     seatId,
                     getAssignments(seatId, state),
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
               <div className="seat-id no-select">{displayNumber}</div>
            </div>
         </>
      );
   }
);

export default Seat;
