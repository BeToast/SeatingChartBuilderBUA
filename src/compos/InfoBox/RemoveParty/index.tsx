import { useSelected } from "../../../context/SelectedContext";
import { xSvg } from "../../../utils/svgs";
import Tooltip from "../../Tooltip";
import "./style.css";

const RemoveParty: React.FC<{}> = ({}) => {
   return (
      <>
         <Tooltip content={"Remove Party"}>
            <div
               onClick={() => {
                  console.log("hello");
               }}
               className="remove-party"
            >
               {xSvg}
            </div>
         </Tooltip>

         {/* <div className="remove-party">{xSvg}</div> */}
      </>
   );
};

export default RemoveParty;
