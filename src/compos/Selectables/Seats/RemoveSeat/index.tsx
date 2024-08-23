import { xSvg } from "../../../../utils/svgs";
import Tooltip from "../../../Tooltip";

const RemoveSeat: React.FC<{}> = ({}) => {
   const removeSeatHandler = () => {
      console.log("Remove Seat");
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
