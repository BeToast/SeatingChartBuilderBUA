import React, { useEffect, useRef, useState } from "react";
import AddSeat from "./AddSeat";
import Seat from "./Seat";
import "./style.css";
import { useSelected } from "../../../context/SelectedContext";

const MAX_POSITIVE_K_SEATS = 16; // Default number of kitchen seats
const MAX_NEGATIVE_K_SEATS = 15; // Maximum number of additional seats in negative direction
const MAX_B_SEATS = 14; // Number of bar seats

const Seats = () => {
   const [kSeats, setKSeats] = useState<Array<number>>(
      Array.from({ length: MAX_POSITIVE_K_SEATS }, (_, i) => i + 1)
   );
   const bSeats = Array.from(
      { length: MAX_B_SEATS },
      (_, i) => MAX_B_SEATS - i
   );

   const { state, setAssigned, renderNameAndLines, setExtraChairs } =
      useSelected();

   const isFirstRender = useRef(true);

   // Create refs for both positive and negative seat numbers
   const kSeatRefs = useRef({
      positive: Array.from({ length: MAX_POSITIVE_K_SEATS }, () =>
         React.createRef<HTMLDivElement>()
      ),
      negative: Array.from({ length: MAX_NEGATIVE_K_SEATS }, () =>
         React.createRef<HTMLDivElement>()
      ),
   });
   const bSeatRefs = useRef(
      Array.from({ length: MAX_B_SEATS }, () =>
         React.createRef<HTMLDivElement>()
      )
   );

   useEffect(() => {
      if (isFirstRender.current) {
         kSeats.forEach((id) => {
            setAssigned(
               `Seat k${id}`,
               [],
               false,
               kSeatRefs.current.positive[id - 1]
            );
         });
         bSeats.forEach((id) => {
            setAssigned(
               `Seat b${id}`,
               [],
               false,
               bSeatRefs.current[MAX_B_SEATS - id]
            );
         });
         isFirstRender.current = false;
      } else {
         kSeats.forEach((id) => {
            const ref =
               id > 0
                  ? kSeatRefs.current.positive[id - 1]
                  : kSeatRefs.current.negative[-id];
            setAssigned(
               `Seat k${id}`,
               state[`Seat k${id}`]?.assigned || [],
               state[`Seat k${id}`]?.selected || false,
               ref
            );
         });
      }

      renderNameAndLines();
   }, [kSeats]);

   const addKitchenSeatHandler = () => {
      const newSeatId = Math.min(...kSeats) - 1;
      if (-newSeatId < MAX_NEGATIVE_K_SEATS) {
         setKSeats((prevSeats) => [newSeatId, ...prevSeats]);

         // Assign the new seat
         const newSeatRef = kSeatRefs.current.negative[-newSeatId];
         setAssigned(`Seat k${newSeatId}`, [], false, newSeatRef);
      }
   };

   let extraChairs = kSeats.length - MAX_POSITIVE_K_SEATS;
   if (extraChairs > -1) {
      setExtraChairs(extraChairs);
   }

   return (
      <>
         <div className="seat-col">
            <AddSeat addHandler={addKitchenSeatHandler} />
            <div style={{ height: "8px" }} />
            {kSeats.map((num) => {
               const ref =
                  num > 0
                     ? kSeatRefs.current.positive[num - 1]
                     : kSeatRefs.current.negative[-num];
               return (
                  <Seat
                     key={num}
                     id={`k${num}`}
                     extraSeat={num <= 0}
                     kSeats={kSeats}
                     setKSeats={setKSeats}
                     ref={ref}
                  />
               );
            })}
            <Seat
               id={"nope"}
               invis={true}
               kSeats={kSeats}
               setKSeats={setKSeats}
               ref={React.createRef<HTMLDivElement>()}
            />
            <div className="seat-row">
               <Seat
                  id={"nope"}
                  invis={true}
                  kSeats={kSeats}
                  setKSeats={setKSeats}
                  ref={React.createRef<HTMLDivElement>()}
               />
               <Seat
                  id={"nope"}
                  invis={true}
                  kSeats={kSeats}
                  setKSeats={setKSeats}
                  ref={React.createRef<HTMLDivElement>()}
               />
               {bSeats.map((num) => (
                  <Seat
                     key={num}
                     id={`b${num}`}
                     kSeats={kSeats}
                     setKSeats={setKSeats}
                     ref={bSeatRefs.current[MAX_B_SEATS - num]}
                  />
               ))}
            </div>
         </div>
      </>
   );
};

export default Seats;
