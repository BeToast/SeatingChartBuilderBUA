import React from "react";
import { useSelected } from "../../../../context/SelectedContext";
import { xSvg } from "../../../../utils/svgs";
import Tooltip from "../../../Tooltip";
import "./style.css";

interface RemoveSeatProps {
   kSeats: number[];
   setKSeats: React.Dispatch<React.SetStateAction<number[]>>;
}

const RemoveSeat: React.FC<RemoveSeatProps> = ({ kSeats, setKSeats }) => {
   const { state, setAssigned } = useSelected();

   const removeSeatHandler = () => {
      if (kSeats.length <= 16) return; // Don't remove if we're at or below the initial seat count

      // Find the seat to remove (the one with the lowest number, which is at the start of the array)
      const seatToRemove = kSeats[0];

      // Remove the seat from kSeats
      setKSeats((prevSeats) => prevSeats.slice(1));

      // Remove the assignment for the removed seat
      setAssigned(`Seat k${seatToRemove}`, [], false);

      // No need to shift assignments as seats are now numbered independently
   };

   return (
      <div className="relative">
         <div onClick={removeSeatHandler} className="remove-wrapper">
            <Tooltip content={"Remove Seat 🪑"}>
               <div className="remove-seat">{xSvg}</div>
            </Tooltip>
         </div>
      </div>
   );
};

export default RemoveSeat;
