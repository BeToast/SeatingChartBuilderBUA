import React, { useState, useEffect, useRef } from "react";
import { useSelected } from "../../../context/SelectedContext";
import "./style.css";
import RemoveLink from "./RemoveLink";
import { arraysEqual } from "../../../utils/generic";

const LinkParty: React.FC<{
   linkOptions: Array<Array<string>>;
   currParties: string[];
}> = ({ linkOptions, currParties }) => {
   const { partyLinks, addPartyLink } = useSelected();
   const [isOpen, setIsOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const dropdownRef = useRef<HTMLDivElement>(null);

   const filteredOptions = linkOptions.filter((party) =>
      party.some((item) =>
         item.toLowerCase().includes(searchTerm.toLowerCase())
      )
   );

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

   //get the array of links
   const linkedArray = partyLinks.filter((link) => {
      return link.some((party) => arraysEqual(currParties, party));
   });

   const handleRemoveLink = (linkToRemove: Array<Array<string>>) => {
      // removePartyLink(linkToRemove);
      console.log("remove link", linkToRemove);
   };

   console.log("relevantLinks", linkedArray);

   return (
      <div ref={dropdownRef}>
         <div className="linked-with">Linked Parties:</div>
         <div className="linked-party-wrapper">
            {linkedArray.map((link: Array<Array<string>>, index) => (
               <div key={index} className="linked-party">
                  <RemoveLink
                     party=""
                     removeLinkHandler={() => handleRemoveLink(link)}
                  />
                  {link.map((assigned) =>
                     arraysEqual(currParties, assigned) ? null : (
                        <span key={assigned.join()}>{assigned.join(", ")}</span>
                     )
                  )}
               </div>
            ))}
            {linkedArray.length < filteredOptions.length && (
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
                           addPartyLink(currParties, party, linkedArray[0])
                        }
                        style={{
                           display: linkedArray.some((link) =>
                              link.some((linkedParty) =>
                                 arraysEqual(linkedParty, party)
                              )
                           )
                              ? "none"
                              : "block",
                        }}
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
