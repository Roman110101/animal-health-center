"use client";

import React from 'react';

const MobileVersion: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 font-inter">
            Мобильная версия
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-inter">
            Ромчик разрабатывает
          </p>
        </div>
        
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4"></div>
          <p className="text-white/60 text-sm font-inter">
            Скоро будет готова
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileVersion;
