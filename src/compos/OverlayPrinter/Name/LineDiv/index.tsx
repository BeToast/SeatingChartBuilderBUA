import React from "react";

interface LineProps {
   pointOne: { x: number; y: number };
   pointTwo: { x: number; y: number };
}

const LineDiv: React.FC<LineProps> = ({ pointOne, pointTwo }) => {
   // Calculate the length of the line
   const length = Math.sqrt(
      Math.pow(pointTwo.x - pointOne.x, 2) +
         Math.pow(pointTwo.y - pointOne.y, 2)
   );

   // Calculate the angle of the line
   const angle = Math.atan2(pointTwo.y - pointOne.y, pointTwo.x - pointOne.x);

   // Convert angle to degrees
   const degrees = angle * (180 / Math.PI);

   // Style for the line div
   const lineStyle: React.CSSProperties = {
      position: "absolute",
      height: "2px", // Set the thickness of the line
      width: `${length}px`,
      backgroundColor: "black",
      transformOrigin: "0 0", // Set transform origin to the start of the line
      transform: `translate(${pointOne.x}px, ${pointOne.y}px) rotate(${degrees}deg)`,
      borderRadius: "2px", // Rounded corners for a smooth line
   };

   return <div style={lineStyle} />;
};

export default LineDiv;
