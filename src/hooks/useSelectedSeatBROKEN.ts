import React, { createContext, useContext, useState, useCallback } from "react";

interface SelectedSeatsContextType {
   selectedSeats: Record<string, boolean>;
   toggleSeat: (id: string) => void;
   selectSeat: (id: string) => void;
   deselectSeat: (id: string) => void;
   clearSelectedSeats: () => void;
}

const SelectedSeatsContext = createContext<
   SelectedSeatsContextType | undefined
>(undefined);

interface SelectedSeatsProviderProps {
   children: React.ReactNode;
}

export const SelectedSeatsProvider: React.FC<SelectedSeatsProviderProps> = ({
   children,
}) => {
   const [selectedSeats, setSelectedSeats] = useState<Record<string, boolean>>(
      {}
   );

   const toggleSeat = useCallback((id: string) => {
      setSelectedSeats((prev) => ({
         ...prev,
         [id]: !prev[id],
      }));
   }, []);

   const selectSeat = useCallback((id: string) => {
      setSelectedSeats((prev) => ({
         ...prev,
         [id]: true,
      }));
   }, []);

   const deselectSeat = useCallback((id: string) => {
      setSelectedSeats((prev) => ({
         ...prev,
         [id]: false,
      }));
   }, []);

   const clearSelectedSeats = useCallback(() => {
      setSelectedSeats({});
   }, []);

   const value: SelectedSeatsContextType = {
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

export const useSelectedSeats = (): SelectedSeatsContextType => {
   const context = useContext(SelectedSeatsContext);
   if (context === undefined) {
      throw new Error(
         "useSelectedSeats must be used within a SelectedSeatsProvider"
      );
   }
   return context;
};
