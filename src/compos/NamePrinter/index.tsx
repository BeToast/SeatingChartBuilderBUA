import { useSelected } from "../../context/SelectedContext";
import { getClassFromAssigned, getExtremePointsX } from "../Selectables/utils";

const NamePrinter: React.FC = () => {
   const { state, getAllUniqueAssigned } = useSelected();

   const parties: Array<string> = getAllUniqueAssigned(state);
   parties.map((party) => {
      //get the class for selected
      const partyClass = getClassFromAssigned([party]);
      //find elements
      const partySeats = document.getElementsByClassName(partyClass);
      //get extreme points
      const extremesX = getExtremePointsX(partySeats);
      console.log(extremesX);

      // console.log(`${partyClass} has ${partySeats.length} seats`);
   });

   return <></>; //new state in context HTMLCollection of ELments? < yeah
};

export default NamePrinter;
