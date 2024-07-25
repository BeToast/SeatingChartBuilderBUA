import "./App.css";
import InfoBox from "./compos/InfoBox";
import InfoContext from "./compos/InfoContext";
import PrintButton from "./compos/PrintButton";
import Seats from "./compos/Selectables/Seats";
import Tables from "./compos/Selectables/Tables";
import { SelectedProvider } from "./context/SelectedContext";

function App() {
   return (
      <>
         <PrintButton />
         <SelectedProvider>
            <div className="flexie">
               <main className="letter-paper">
                  <Tables />
                  <Seats />
               </main>
               <InfoBox />
               <InfoContext />
            </div>
         </SelectedProvider>
      </>
   );
}

export default App;
