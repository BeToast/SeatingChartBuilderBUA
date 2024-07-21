import "./style.css";

const AddSeat: React.FC<{
   addHandler: () => void;
}> = ({ addHandler }) => {
   return (
      <>
         <div className="add-seat no-print" onClick={addHandler}>
            <img src="/plus.webp" width={"16px"} />
         </div>
      </>
   );
};

export default AddSeat;
