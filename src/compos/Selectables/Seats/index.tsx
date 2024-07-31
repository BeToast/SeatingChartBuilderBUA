import { useState } from "react";
import AddSeat from "./AddSeat";
import Seat from "./Seat";
import "./style.css";

const Seats = () => {
   const [kSeats, setKSeats] = useState<Array<number>>(
      Array.from({ length: 16 }, (_, i) => i + 1)
   );
   const [bSeats, setBSeats] = useState<Array<number>>(
      Array.from({ length: 14 }, (_, i) => 14 - i)
   );
   return (
      <div className="seat-col">
         <AddSeat
            addHandler={() => setKSeats([...kSeats, kSeats.length + 1])}
         />
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
            <div style={{ width: "8px" }} />
            <AddSeat
               addHandler={() => setBSeats([bSeats.length + 1, ...bSeats])}
            />
         </div>
      </div>
   );
};

export default Seats;
