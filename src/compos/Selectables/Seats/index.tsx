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
      kSeats.map((id) => setAssigned(`Seat k${id}`, [], undefined, false));
      bSeats.map((id) => setAssigned(`Seat k${id}`, [], undefined, false));
   }, []);

   const { state, setAssigned, nameAndLinesBool, renderNameAndLines } =
      useSelected();
   console.log(nameAndLinesBool);

   const addKitchenSeatHandler = () => {
      //incremente all assigned
      kSeats.map((index) => {
         //use this to iterate backwards in O(n) time
         const currId = kSeats[kSeats.length - index];
         const currKey = `Seat k${currId}`;
         const assignedObj = {
            id: `Seat k${currId + 1}`,
            assigned: state[currKey].assigned,
            colour: state[currKey].colour,
            selected: state[currKey].selected,
         };
         setAssigned(
            assignedObj.id,
            assignedObj.assigned,
            assignedObj.colour,
            assignedObj.selected
            // `Seat k${currId + 1}`,
            // state[currKey].assigned,
            // state[currKey].colour,
            // state[currKey].selected
         );
      });
      setAssigned("Seat k1", []);

      //add a seat id, consequently re-rendering the seats
      setKSeats([...kSeats, kSeats.length + 1]);

      //toggle renderNameAndLines to re-render the lines and names
      window.setTimeout(renderNameAndLines, 100);
   };

   let extraSeats = kSeats.length - 15; //-15 bc decrement comes before boolean

   return (
      <div className="seat-col">
         <AddSeat addHandler={addKitchenSeatHandler} />
         <div style={{ height: "8px" }} />
         {kSeats.map((num) => {
            extraSeats--; //decrement before return statement
            return (
               <Seat
                  id={`k${num}`}
                  extraSeat={extraSeats > 0}
                  kSeats={kSeats}
                  setKSeats={setKSeats}
               />
            );
         })}
         <Seat id={"nope"} invis={true} kSeats={kSeats} setKSeats={setKSeats} />
         <div className="seat-row">
            <Seat
               id={"nope"}
               invis={true}
               kSeats={kSeats}
               setKSeats={setKSeats}
            />
            <Seat
               id={"nope"}
               invis={true}
               kSeats={kSeats}
               setKSeats={setKSeats}
            />
            {bSeats.map((num) => (
               <Seat id={`b${num}`} kSeats={kSeats} setKSeats={setKSeats} />
            ))}
         </div>
      </div>
   );
};

export default Seats;
