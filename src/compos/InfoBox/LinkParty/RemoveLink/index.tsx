import { xSvg } from "../../../../utils/svgs";
import Tooltip from "../../../Tooltip";
import "./style.css";

const RemoveLink: React.FC<{
   otherAssignment: Array<string>;
   removeLinkHandler: (party: Array<string>) => void;
}> = ({ otherAssignment, removeLinkHandler }) => {
   return (
      <>
         <Tooltip content={"Remove Party Link"}>
            <div
               onClick={() => removeLinkHandler(otherAssignment)}
               className="remove-link"
            >
               {xSvg}
            </div>
         </Tooltip>

         {/* <div className="remove-party">{xSvg}</div> */}
      </>
   );
};

export default RemoveLink;
