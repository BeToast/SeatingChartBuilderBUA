import "./App.css";
import PrintButton from "./compos/PrintButton";
import Seats from "./compos/Seats";
import Tables from "./compos/Tables";

function App() {
   return (
      <>
         <PrintButton />
         <main className="letter-paper">
            <Tables />
            <Seats />
         </main>
      </>
   );
}

export default App;
