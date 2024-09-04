import { useEffect } from "react";
import Table from "./Table";
import "./style.css";
import { useSelected } from "../../../context/SelectedContext";

const Tables = () => {
   const kTables: Array<number> = [10, 11, 12, 13, 14, 15];
   const bTables: Array<number> = [16, 17, 18, 19, 20, 21];

   const { setAssigned } = useSelected();

   useEffect(() => {
      kTables.map((id) => setAssigned(`Table ${id}`, [], undefined, false));
      bTables.map((id) => setAssigned(`Table ${id}`, [], undefined, false));
   }, []);

   return (
      <div className="table-col">
         {kTables.map((num) => (
            <Table key={num} id={num} />
         ))}
         <div className="table-row">
            {bTables.map((num) => (
               <Table key={num} id={num} />
            ))}
         </div>
      </div>
   );
};

export default Tables;
