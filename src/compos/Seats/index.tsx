import AddSeat from "./AddSeat";
import Seat from "./Seat";
import "./style.css";

const Seats = () => {
   return (
      <div className="seat-col">
         <AddSeat idLetter={"k"} />
         <div style={{ height: "8px" }} />
         <Seat id={"k1"} />
         <Seat id={"k2"} />
         <Seat id={"k3"} />
         <Seat id={"k4"} />
         <Seat id={"k5"} />
         <Seat id={"k6"} />
         <Seat id={"k7"} />
         <Seat id={"k8"} />
         <Seat id={"k9"} />
         <Seat id={"k10"} />
         <Seat id={"k11"} />
         <Seat id={"k12"} />
         <Seat id={"k13"} />
         <Seat id={"k14"} />
         <Seat id={"k15"} />
         <Seat id={"k16"} />
         <div className="seat-row">
            <Seat id={"nope"} invis={true} />
            {/* <Seat id={"b17"} />
            <Seat id={"b16"} />
            <Seat id={"b15"} /> */}
            <Seat id={"b14"} />
            <Seat id={"b13"} />
            <Seat id={"b12"} />
            <Seat id={"b11"} />
            <Seat id={"b10"} />
            <Seat id={"b9"} />
            <Seat id={"b8"} />
            <Seat id={"b7"} />
            <Seat id={"b6"} />
            <Seat id={"b5"} />
            <Seat id={"b4"} />
            <Seat id={"b3"} />
            <Seat id={"b2"} />
            <Seat id={"b1"} />
            <div style={{ width: "8px" }} />
            <AddSeat idLetter={"b"} />
         </div>
      </div>
   );
};

export default Seats;
