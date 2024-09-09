import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelected } from "../../../context/SelectedContext";
import "./style.css";
import RemoveLink from "./RemoveLink";
import { arraysEqual, isArrayInArrayOfArrays } from "../../../utils/generic";

const LinkParty: React.FC<{
   linkOptions: Array<Array<string>>;
   currParties: string[];
}> = ({ linkOptions, currParties }) => {
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
   //index of the links for this party in the partyLinks array
   const linkedArrayIndex = partyLinks.findIndex((link) =>
      link.some((party) => arraysEqual(currParties, party))
   );
   //the array for this parties link
   const linkedArray: Array<Array<string>> =
      linkedArrayIndex !== -1 ? partyLinks[linkedArrayIndex] : [];
   //array excluding the currently selected party[]
   const otherLinkedParties = linkedArray.filter(
      (party) => !arraysEqual(party, currParties)
   );

   const useFilteredLinkOptions = (
      LinkOptions: string[][],
      linkedArray: string[][]
   ) => {
      const filteredLinkOptions = useMemo(() => {
         return LinkOptions.filter(
            (option) => !isArrayInArrayOfArrays(option, linkedArray)
         );
      }, [LinkOptions, linkedArray]);

      return filteredLinkOptions;
   };

   const filteredLinkOptions = useFilteredLinkOptions(linkOptions, linkedArray);
   const filteredOptions = filteredLinkOptions.filter((party) =>
      party.some((item) =>
         item.toLowerCase().includes(searchTerm.toLowerCase())
      )
   );

   return (
      <div ref={dropdownRef}>
         <div className="linked-with">Linked Parties:</div>
         <div className="linked-party-wrapper">
            {otherLinkedParties.map((otherAssignment: Array<string>, index) => (
               <div key={index} className="linked-party">
                  <RemoveLink
                     otherAssignment={otherAssignment}
                     removeLinkHandler={() =>
                        removePartyLink(currParties, linkedArrayIndex)
                     }
                  />
                  <span key={otherAssignment.join()}>
                     {otherAssignment.join(", ")}
                  </span>
               </div>
            ))}
            {filteredLinkOptions.length > 0 && (
               <input
                  type="text"
                  className="party-input"
                  placeholder={
                     linkedArray.length > 0
                        ? "Link Another Party"
                        : "Add Linked Party"
                  }
                  value={searchTerm}
                  onFocus={handleToggleDropdown}
                  onBlur={handleToggleDropdown}
                  onChange={handleSearchChange}
               />
            )}
            {isOpen && (
               <div>
                  {filteredOptions.map((party, index) => (
                     <div
                        key={index}
                        onMouseDown={() =>
                           addPartyLink(currParties, party, linkedArray)
                        }
                     >
                        {party.join(", ")}
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default LinkParty;
