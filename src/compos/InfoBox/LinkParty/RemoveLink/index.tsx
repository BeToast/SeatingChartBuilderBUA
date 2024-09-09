import { xSvg } from "../../../../utils/svgs";
import Tooltip from "../../../Tooltip";
import "./style.css";

const RemoveLink: React.FC<{
   party: string;
   removeLinkHandler: (party: string) => void;
}> = ({ party, removeLinkHandler }) => {
   return (
      <>
         <Tooltip content={"Remove Party Link"}>
            <div
               onClick={() => removeLinkHandler(party)}
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
