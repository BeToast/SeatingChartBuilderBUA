import React, {
   useState,
   useEffect,
   useCallback,
   useMemo,
   useRef,
} from "react";
import { useSelected } from "../../context/SelectedContext";
import { createAssignedElementsRecord, getLrtb } from "./utils";
import Name from "./Name";
import Canvas from "./Canvas";

const AbsolutePrinter: React.FC = () => {
   const [scrollTop, setScrollTop] = useState<number>(0);
   const [paperSize, setPaperSize] = useState<{
      width: number;
      height: number;
   }>({ width: 0, height: 0 });
   const { state } = useSelected();
   const paperRef = useRef<HTMLElement | null>(null);

   const updateScrollTopAndPaperSize = useCallback(() => {
      setScrollTop(window.scrollY || document.documentElement.scrollTop);
      if (paperRef.current) {
         const { width, height } = paperRef.current.getBoundingClientRect();
         setPaperSize({ width, height });
      }
   }, []);

   useEffect(() => {
      paperRef.current = document.getElementById("letter-paper");
      updateScrollTopAndPaperSize(); // Initial update
      window.addEventListener("scroll", updateScrollTopAndPaperSize);
      window.addEventListener("resize", updateScrollTopAndPaperSize);
      return () => {
         window.removeEventListener("scroll", updateScrollTopAndPaperSize);
         window.removeEventListener("resize", updateScrollTopAndPaperSize);
      };
   }, [updateScrollTopAndPaperSize]);

   const assignedElements = useMemo(
      () => createAssignedElementsRecord(state),
      [state]
   );

   return (
      <>
         <Canvas width={paperSize.width} height={paperSize.height} />
         {Object.entries(assignedElements).map(([assigned, elements]) => (
            <React.Fragment key={assigned}>
               <Name
                  assigned={assigned}
                  elements={elements}
                  scrollTop={scrollTop}
               />
            </React.Fragment>
         ))}
      </>
   );
};

export default AbsolutePrinter;
