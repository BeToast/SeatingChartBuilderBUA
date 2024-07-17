import "./style.css";

const Table = ({ number }: { number: number }) => {
   return (
      <div className="table">
         <div className="table-number no-select">{number}</div>
      </div>
   );
};

export default Table;
