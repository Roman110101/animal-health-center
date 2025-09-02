"use client";

import React from 'react';
import { useHeaderContext } from './HeaderContext';

const HeaderOverlay: React.FC = () => {
  const { showServicesDropdown, showPriceDropdown } = useHeaderContext();

  if (!showServicesDropdown && !showPriceDropdown) {
    return null;
  }

  return (
    <div 
      className="fixed top-[50px] left-0 right-0 bottom-0 bg-black/40 z-[45] pointer-events-none" 
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    />
  );
};

export default HeaderOverlay;
