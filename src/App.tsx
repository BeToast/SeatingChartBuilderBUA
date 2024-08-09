import "./App.css";
import InfoBox from "./compos/InfoBox";
import InfoContext from "./compos/InfoContext";
import OverlayPrinter from "./compos/OverlayPrinter";
import PrintButton from "./compos/PrintButton";
import Seats from "./compos/Selectables/Seats";
import Tables from "./compos/Selectables/Tables";
import { SelectedProvider } from "./context/SelectedContext";

function App() {
   return (
      <>
         <PrintButton />
         <SelectedProvider>
            <div id="flexie" className="flexie">
               <main id="letter-paper" className="letter-paper">
                  <Tables />
                  <Seats />
                  <OverlayPrinter />
               </main>
               <InfoBox />
               <InfoContext />
            </div>
         </SelectedProvider>
      </>
   );
}

export default App;
