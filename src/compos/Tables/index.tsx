import Table from "./Table";
import "./style.css";

const Tables = () => {
   return (
      <div className="table-col">
         <Table number={10} />
         <Table number={11} />
         <Table number={12} />
         <Table number={13} />
         <Table number={14} />
         <Table number={15} />
         <div className="table-row">
            <Table number={16} />
            <Table number={17} />
            <Table number={18} />
            <Table number={19} />
            <Table number={20} />
            <Table number={21} />
         </div>
      </div>
   );
};

export default Tables;
