import { useEffect, useState } from "react";
import AddSeat from "./AddSeat";
import Seat from "./Seat";
import "./style.css";
import { useSelected } from "../../../context/SelectedContext";

const Seats = () => {
   const [kSeats, setKSeats] = useState<Array<number>>(
      Array.from({ length: 16 }, (_, i) => i + 1)
   );
   const [bSeats, setBSeats] = useState<Array<number>>(
      Array.from({ length: 14 }, (_, i) => 14 - i)
   );
   useEffect(() => {
      kSeats.map((id) => setAssigned(`Seat k${id}`, []));
      bSeats.map((id) => setAssigned(`Seat k${id}`, []));
   }, []);

   const { state, setAssigned, deselectAll } = useSelected();

   const addKitchenSeatHandler = () => {
      //deselect to be safe??? or cuz i cant wrap my head around the alternatives rn?
      //to be fair, its confusing to the user if their selection should increment with the added seats...
      // deselectAll();

      //incremente all assigned
      kSeats.map((index) => {
         //use this to iterate backwards in O(n) time
         let currId = kSeats[kSeats.length - index];
         let currKey = `Seat k${currId}`;
         setAssigned(
            `Seat k${currId + 1}`,
            state[currKey].assigned,
            state[currKey].colour,
            state[currKey].selected
         );
      });
      setAssigned("Seat k1", []);

      //add a seat id, consequently re-rendering the seats
      setKSeats([...kSeats, kSeats.length + 1]);
   };

   return (
      <div className="seat-col">
         <AddSeat addHandler={addKitchenSeatHandler} />
         <div style={{ height: "8px" }} />
         {kSeats.map((num) => (
            <Seat id={`k${num}`} />
         ))}
         <Seat id={"nope"} invis={true} />
         <div className="seat-row">
            <Seat id={"nope"} invis={true} />
            <Seat id={"nope"} invis={true} />
            {bSeats.map((num) => (
               <Seat id={`b${num}`} />
            ))}
         </div>
      </div>
   );
};

export default Seats;
