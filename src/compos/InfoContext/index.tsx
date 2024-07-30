import "./style.css";
import { useSelected } from "../../context/SelectedContext";

const InfoContext: React.FC<{}> = ({}) => {
   const { state } = useSelected();

   const _DEBUG = true;

   if (_DEBUG) {
      return (
         <>
            <div className="info-context-wrap">
               <div className="info-context">
                  {JSON.stringify(state, null, 2)}
               </div>
            </div>
         </>
      );
   } else return <></>;
};

export default InfoContext;
