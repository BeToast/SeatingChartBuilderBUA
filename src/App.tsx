import "./App.css";
import InfoBox from "./compos/InfoBox";
import PrintButton from "./compos/PrintButton";
import Seats from "./compos/Seats";
import Tables from "./compos/Tables";
import { SelectedProvider } from "./context/SelectedContext";

function App() {
   return (
      <>
         <PrintButton />
         <SelectedProvider>
            <InfoBox />
            <main className="letter-paper">
               <Tables />
               <Seats />
            </main>
         </SelectedProvider>
      </>
   );
}

export default App;
