import { useSelected } from "../../../../context/SelectedContext";
import "./style.css";

const Seat: React.FC<{
   id: string;
   invis?: boolean;
   // extra: boolean;
}> = ({ id, invis = false }) => {
   const { state, setSelected } = useSelected();
   const seatId: string = `Seat ${id}`;
   const seatState = state[seatId];

   var seatClass: string;
   if (seatState) {
      if (seatState.selected) {
         seatClass = "selected";
      } else if (seatState.assigned.length > 0) {
         seatClass = "assigned";
      } else {
         seatClass = "vacant";
      }
   } else {
      seatClass = "vacant";
   }

   const onClickHandler = (id: string) => {
      if (seatClass == "vacant") {
         setSelected(id, true);
      } else if (seatClass == "selected") {
         setSelected(id, false);
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
