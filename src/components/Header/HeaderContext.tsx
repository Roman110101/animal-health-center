"use client";

import React, { createContext, useContext, useState } from 'react';

interface HeaderContextType {
  showServicesDropdown: boolean;
  showPriceDropdown: boolean;
  setShowServicesDropdown: (show: boolean) => void;
  setShowPriceDropdown: (show: boolean) => void;
  closeAllDropdowns: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeaderContext must be used within HeaderProvider');
  }
  return context;
};

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const closeAllDropdowns = () => {
    setShowServicesDropdown(false);
    setShowPriceDropdown(false);
  };

  return (
    <HeaderContext.Provider value={{
      showServicesDropdown,
      showPriceDropdown,
      setShowServicesDropdown,
      setShowPriceDropdown,
      closeAllDropdowns
    }}>
      {children}
    </HeaderContext.Provider>
  );
};
