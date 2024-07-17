import Seat from "./Seat";
import "./style.css";

const Seats = () => {
   return (
      <div className="seat-col">
         <Seat key="col-1" number={1} />
         <Seat key="col-2" number={2} />
         <Seat key="col-3" number={3} />
         <Seat key="col-4" number={4} />
         <Seat key="col-5" number={5} />
         <Seat key="col-6" number={6} />
         <Seat key="col-7" number={7} />
         <Seat key="col-8" number={8} />
         <Seat key="col-9" number={9} />
         <Seat key="col-10" number={10} />
         <Seat key="col-11" number={11} />
         <Seat key="col-12" number={12} />
         <Seat key="col-13" number={13} />
         <Seat key="col-14" number={14} />
         <Seat key="col-15" number={15} />
         <Seat key="col-16" number={16} />
         <div className="seat-row">
            <Seat key="row-15" number={69} invis={true} />
            <Seat key="row-14" number={14} />
            <Seat key="row-13" number={13} />
            <Seat key="row-12" number={12} />
            <Seat key="row-11" number={11} />
            <Seat key="row-10" number={10} />
            <Seat key="row-9" number={9} />
            <Seat key="row-8" number={8} />
            <Seat key="row-7" number={7} />
            <Seat key="row-6" number={6} />
            <Seat key="row-5" number={5} />
            <Seat key="row-4" number={4} />
            <Seat key="row-3" number={3} />
            <Seat key="row-2" number={2} />
            <Seat key="row-1" number={1} />
         </div>
      </div>
   );
};

export default Seats;
