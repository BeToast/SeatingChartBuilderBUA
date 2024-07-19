import React, { createContext, useContext, useState, useCallback } from "react";

const SelectedSeatsContext = createContext();

export const SelectedSeatsProvider = ({ children }) => {
   const [selectedSeats, setSelectedSeats] = useState({});

   const toggleSeat = useCallback((id) => {
      setSelectedSeats((prev) => ({
         ...prev,
         [id]: !prev[id],
      }));
   }, []);

   const selectSeat = useCallback((id) => {
      setSelectedSeats((prev) => ({
         ...prev,
         [id]: true,
      }));
   }, []);

   const deselectSeat = useCallback((id) => {
      setSelectedSeats((prev) => ({
         ...prev,
         [id]: false,
      }));
   }, []);

   const clearSelectedSeats = useCallback(() => {
      setSelectedSeats({});
   }, []);

   const value = {
      selectedSeats,
      toggleSeat,
      selectSeat,
      deselectSeat,
      clearSelectedSeats,
   };

   return (
      <SelectedSeatsContext.Provider value={value}>
         {children}
      </SelectedSeatsContext.Provider>
   );
};

export const useSelectedSeats = () => {
   const context = useContext(SelectedSeatsContext);
   if (!context) {
      throw new Error(
         "useSelectedSeats must be used within a SelectedSeatsProvider"
      );
   }
   return context;
};
