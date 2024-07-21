import "./style.css";

const AddSeat: React.FC<{
   idLetter: "k" | "b";
}> = ({ idLetter }) => {
   return (
      <>
         <div className="add-seat no-print" onClick={() => {}}>
            <img src="/plus.webp" width={"16px"} />
            {/* <div className="add-seat-plus">+</div> */}
         </div>
      </>
   );
};

export default AddSeat;
