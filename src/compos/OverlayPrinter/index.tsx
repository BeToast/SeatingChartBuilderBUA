import React, {
   useState,
   useEffect,
   useCallback,
   useMemo,
   useRef,
} from "react";
import { useSelected } from "../../context/SelectedContext";
import { createAssignedElementsRecord } from "./utils";
import NameAndLines from "./NameAndLines";

const AbsolutePrinter: React.FC = () => {
   const [scrollTop, setScrollTop] = useState(0);
   const [paperSize, setPaperSize] = useState({ width: 0, height: 0 });
   const [paperRect, setPaperRect] = useState<DOMRect | null>(null);
   const [flexieMargin, setFlexieMargin] = useState(0);

   const { state, partyLinks } = useSelected();
   const paperRef = useRef<HTMLElement | null>(null);

   const updateScrollTopAndPaperSize = useCallback(() => {
      setScrollTop(window.scrollY || document.documentElement.scrollTop);
      if (paperRef.current) {
         const { width, height } = paperRef.current.getBoundingClientRect();
         setPaperSize({ width, height });
      }
   }, []);

   const updatePaperRect = useCallback(() => {
      const letterPaper = document.getElementById("letter-paper");
      if (letterPaper) {
         setPaperRect(letterPaper.getBoundingClientRect());
      }
   }, []);

   const updateFlexieMargin = useCallback(() => {
      const flexie = document.getElementById("flexie");
      setFlexieMargin(flexie?.offsetTop || 0);
   }, []);

   useEffect(() => {
      paperRef.current = document.getElementById("letter-paper");
      updateScrollTopAndPaperSize();
      updatePaperRect();
      updateFlexieMargin();

      window.addEventListener("scroll", updateScrollTopAndPaperSize);
      window.addEventListener("resize", updateScrollTopAndPaperSize);
      window.addEventListener("resize", updatePaperRect);

      return () => {
         window.removeEventListener("scroll", updateScrollTopAndPaperSize);
         window.removeEventListener("resize", updateScrollTopAndPaperSize);
         window.removeEventListener("resize", updatePaperRect);
      };
   }, [updateScrollTopAndPaperSize, updatePaperRect, updateFlexieMargin]);

   const assignedElements = useMemo(
      () => createAssignedElementsRecord(state),
      [state]
   );

   return (
      <>
         {/* handle linked groups here */}
         {partyLinks.map((parties) => {
            const assignedArray: Array<string> = [];
            const elementsArray: Array<Array<Element>> = [];
            parties.map((party) => {
               const partyPound = party.join("£");
               assignedArray.push(partyPound);
               elementsArray.push(assignedElements.party);
               delete assignedElements[partyPound]; //how do i remove an item from assignedElements??
            });
            // NameAndLines with assignedArray and elementsArray
            return (
               <React.Fragment key={assignedArray[0]}>
                  <NameAndLines
                     assignedLink={assignedArray}
                     elementsLink={elementsArray}
                     scrollTop={scrollTop}
                     paperRect={paperRect}
                     flexieMargin={flexieMargin}
                  />
               </React.Fragment>
            );
         })}
         {/* iterate through remainder of unlinked */}
         {Object.entries(assignedElements).map(([assigned, elements]) => {
            // console.log(assigned);
            return (
               <React.Fragment key={assigned}>
                  <NameAndLines
                     assigned={assigned}
                     elements={elements}
                     scrollTop={scrollTop}
                     paperRect={paperRect}
                     flexieMargin={flexieMargin}
                  />
               </React.Fragment>
            );
         })}
      </>
   );
};

export default AbsolutePrinter;
