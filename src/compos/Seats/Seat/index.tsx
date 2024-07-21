import { useSelected, State } from "../../../context/SelectedContext";
import "./style.css";

const Seat: React.FC<{
   id: string;
   invis?: boolean;
   // extra: boolean;
}> = ({ id, invis = false }) => {
   const { state, setSelected, setVacant } = useSelected();
   const seatState = state[`Seat ${id}`];

   const seatClass: string =
      seatState == State.Selected
         ? "selected"
         : seatState == State.Assigned
         ? "assigned"
         : "vacant";

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
            onClick={() => onClickHandler(`Seat ${id}`)}
         >
            <div className="seat-id no-select">{id.slice(1)}</div>
         </div>
      </>
   );
};

export default Seat;
