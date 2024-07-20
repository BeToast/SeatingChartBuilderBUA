import React, { createContext, useContext, useState, useCallback } from "react";

export const enum State {
   Vacant,
   Selected,
   Assigned,
}

interface SelectedContextType {
   state: Record<string, State>;
   setVacant: (id: string) => void;
   setSelected: (id: string) => void;
   setAssigned: (id: string) => void;
}

const SelectedContext = createContext<SelectedContextType>({
   state: {},
   setVacant: () => {},
   setSelected: () => {},
   setAssigned: () => {},
});

interface SelectedProviderProps {
   children: React.ReactNode;
}

export const SelectedProvider: React.FC<SelectedProviderProps> = ({
   children,
}) => {
   const [state, setState] = useState<Record<string, State>>({});

   const setVacant = useCallback((id: string) => {
      setState((prev) => ({
         ...prev,
         [id]: State.Vacant,
      }));
   }, []);

   const setSelected = useCallback((id: string) => {
      setState((prev) => ({
         ...prev,
         [id]: State.Selected,
      }));
   }, []);

   const setAssigned = useCallback((id: string) => {
      setState((prev) => ({
         ...prev,
         [id]: State.Assigned,
      }));
   }, []);

   const value: SelectedContextType = {
      state,
      setVacant,
      setSelected,
      setAssigned,
   };

   return (
      <SelectedContext.Provider value={value}>
         {children}
      </SelectedContext.Provider>
   );
};

export const useSelected = (): SelectedContextType => {
   const context = useContext(SelectedContext);
   if (context === undefined) {
      throw new Error("useSelected must be used within a SelectedProvider");
   }
   return context;
};
