import Table from "./Table";
import "./style.css";

const Tables = () => {
   return (
      <div className="table-col">
         <Table id={10} />
         <Table id={11} />
         <Table id={12} />
         <Table id={13} />
         <Table id={14} />
         <Table id={15} />
         <div className="table-row">
            <Table id={16} />
            <Table id={17} />
            <Table id={18} />
            <Table id={19} />
            <Table id={20} />
            <Table id={21} />
         </div>
      </div>
   );
};

export default Tables;
