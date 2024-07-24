import "./style.css";
import { useSelected } from "../../context/SelectedContext";

const InfoContext: React.FC<{}> = ({}) => {
   const { state } = useSelected();

   return (
      <>
         <div className="info-context-wrap">
            <div className="info-context">{JSON.stringify(state, null, 2)}</div>
         </div>
      </>
   );
};

export default InfoContext;
