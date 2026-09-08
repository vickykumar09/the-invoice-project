/**
 * This file sets up a global context for storing JSON data across the app.
 *
 * It includes:
 * - A React context (`AppContext`) to hold the shared state
 * - A provider component (`AppProvider`) to wrap the app
 * - A custom hook (`useAppContext`) to access the context safely
*/

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for your context value
type AppContextType = {
  jsonData: any;
  setJsonData: React.Dispatch<React.SetStateAction<any>>;
};

// Create the context with correct typing, starting as undefined
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [jsonData, setJsonData] = useState<any>(null);

  return (
    <AppContext.Provider value={{ jsonData, setJsonData }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context safely
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
