import { useSelected, State } from "../../../context/SelectedContext";
import "./style.css";

const Seat: React.FC<{
   id: string;
   invis?: boolean;
   // extra: boolean;
}> = ({ id, invis = false }) => {
   const { state, setSelected, setVacant } = useSelected();
   const seatId: string = `Seat ${id}`;
   const seatState = state[seatId];

   var seatClass: string;
   if (seatState) {
      if (seatState.state == State.Selected) {
         seatClass = "selected";
      } else if (seatState.state == State.Assigned) {
         seatClass = "assigned";
      } else {
         seatClass = "vacant";
      }
   } else {
      seatClass = "vacant";
   }

   const onClickHandler = (id: string) => {
      if (seatClass == "vacant") {
         setSelected(id);
      } else if (seatClass == "selected") {
         setVacant(id);
      }
   };

   return (
      <>
         <div
            className={`seat ${seatClass} ${invis ? "invis" : ""}`}
            style={
               seatClass == "assigned"
                  ? { backgroundColor: seatState.colour }
                  : {}
            }
            onClick={() => onClickHandler(seatId)}
         >
            <div className="seat-id no-select">{id.slice(1)}</div>
         </div>
      </>
   );
};

export default Seat;
