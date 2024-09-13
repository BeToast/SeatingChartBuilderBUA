import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelected } from "../../../context/SelectedContext";
import "./style.css";
import RemoveLink from "./RemoveLink";
import LinkIcon from "./LinkIcon";

const LinkParty: React.FC<{
   currParties: Array<string>;
   linkedArrayIndex: number;
   otherCombinedLinkOptions: Array<Array<Array<string>>>;
}> = ({ currParties, linkedArrayIndex, otherCombinedLinkOptions }) => {
   const { partyLinks, addPartyLink, removePartyLink } = useSelected();
   const [isOpen, setIsOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const dropdownRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
         ) {
            setIsOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleToggleDropdown = () => {
      setIsOpen(!isOpen);
   };

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   };
   //the array for this parties link
   const linkedArray: Array<Array<string>> =
      linkedArrayIndex !== -1 ? partyLinks[linkedArrayIndex] : [];
   //array excluding the currently selected party[]
   // const otherLinkedParties = linkedArray.filter(
   //    (party) => !arraysEqual(party, currParties)
   // );

   // const useFilteredLinkOptions = (
   //    LinkOptions: string[][],
   //    linkedArray: string[][]
   // ) => {
   //    const filteredLinkOptions = useMemo(() => {
   //       return LinkOptions.filter(
   //          (option) => !isArrayInArrayOfArrays(option, linkedArray)
   //       );
   //    }, [LinkOptions, linkedArray]);

   //    return filteredLinkOptions;
   // };

   // const filteredLinkOptions = useFilteredLinkOptions(
   //    unlinkedPartiesArray,
   //    linkedArray
   // );

   //filtered by the search field
   const searchedLinkOptions = otherCombinedLinkOptions.filter((party) =>
      party.some((item) =>
         item.join().toLowerCase().includes(searchTerm.toLowerCase())
      )
   );

   return (
      <div ref={dropdownRef}>
         {/* <div className="linked-with">Linked Parties:</div> */}
         <div className="linked-party-wrapper">
            {linkedArray.map((currentParty: Array<string>, index) => (
               <div key={index} className="linked-party">
                  <RemoveLink
                     currentParty={currentParty}
                     removeLinkHandler={() =>
                        removePartyLink(currentParty, linkedArrayIndex)
                     }
                  />
                  <span key={currentParty.join()}>
                     {currentParty.join(", ")}
                  </span>
               </div>
            ))}
            {otherCombinedLinkOptions.length > 0 && (
               <input
                  type="text"
                  className="party-input"
                  placeholder={
                     linkedArray.length > 0
                        ? "Link Another Party"
                        : "Search Parties to Link"
                  }
                  value={searchTerm}
                  onFocus={handleToggleDropdown}
                  onBlur={handleToggleDropdown}
                  onChange={handleSearchChange}
               />
            )}
            {isOpen && (
               <>
                  {searchedLinkOptions.map((party, index) => (
                     <div
                        className="link-option"
                        key={index}
                        onMouseDown={() => addPartyLink(currParties, party[0])}
                     >
                        <LinkIcon />
                        {party.join(", ")}
                     </div>
                  ))}
               </>
            )}
         </div>
      </div>
   );
};

export default LinkParty;
