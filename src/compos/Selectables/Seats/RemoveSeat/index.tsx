import { useSelected } from "../../../../context/SelectedContext";
import { xSvg } from "../../../../utils/svgs";
import Tooltip from "../../../Tooltip";
import "./style.css";

const RemoveSeat: React.FC<{
   kSeats: number[];
   setKSeats: React.Dispatch<React.SetStateAction<number[]>>;
}> = ({ kSeats, setKSeats }) => {
   const { state, setAssigned } = useSelected();

   const removeSeatHandler = () => {
      //add a seat id, consequently re-rendering the seats
      setKSeats(kSeats.slice(0, -1));

      //incremente all assigned
      kSeats.map((index) => {
         if (index >= kSeats.length - 1) return;
         //use this to iterate backwards in O(n) time
         const replaceKey = `Seat k${kSeats[index]}`;
         const nextKey = `Seat k${kSeats[index] + 1}`;
         const assignedObj = {
            id: replaceKey,
            assigned: state[nextKey].assigned,
            selected: state[nextKey].selected,
         };
         setAssigned(
            assignedObj.id,
            assignedObj.assigned,
            assignedObj.selected
         );
      });
      // setAssigned(`Seat k${kSeats.length}`, []);

      //toggle renderNameAndLines to re-render the lines and names
      // for (let i = 0; i < 20; i++) {
      //    window.setTimeout(renderNameAndLines, 50);
      // }
   };

   return (
      <>
         <div className="relative">
            <div onClick={removeSeatHandler} className="remove-wrapper">
               <Tooltip content={"Remove Seat 🪑"}>
                  <div className="remove-seat">{xSvg}</div>
               </Tooltip>
            </div>
         </div>
      </>
   );
};

export default RemoveSeat;
