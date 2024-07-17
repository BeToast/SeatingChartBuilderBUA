import "./style.css";

interface SeatProps {
   number: number;
   invis?: boolean;
}

const Seat: React.FC<SeatProps> = ({ number, invis = false }) => {
   return (
      <div className={`seat ${invis ? "invis" : ""}`}>
         <div className="seat-number no-select">{number}</div>
      </div>
   );
};

export default Seat;
