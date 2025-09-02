'use client';

import React, { useState, useEffect } from 'react';

const DebugToggle: React.FC = () => {
  const [isDebugMode, setIsDebugMode] = useState(false);

  // Функция для переключения режима отладки
  const toggleDebugMode = () => {
    const newMode = !isDebugMode;
    setIsDebugMode(newMode);
    
    // Сохраняем в localStorage для сохранения состояния между перезагрузками
    localStorage.setItem('debugMode', newMode.toString());
    
    // Применяем/убираем классы отладки
    if (newMode) {
      document.documentElement.classList.add('debug-mode');
    } else {
      document.documentElement.classList.remove('debug-mode');
    }
  };

  // Инициализация при загрузке компонента
  useEffect(() => {
    const savedMode = localStorage.getItem('debugMode');
    if (savedMode === 'true') {
      setIsDebugMode(true);
      document.documentElement.classList.add('debug-mode');
    }
  }, []);

  return (
    <button
      onClick={toggleDebugMode}
      className={`
        fixed bottom-4 left-4 z-[9999] 
        w-12 h-12 rounded-full 
        bg-black hover:bg-gray-800 
        text-white text-xs font-bold
        shadow-lg hover:shadow-xl
        transition-all duration-200 ease-in-out
        flex items-center justify-center
        ${isDebugMode ? 'ring-2 ring-green-400 ring-offset-2' : ''}
      `}
      title={isDebugMode ? 'Отключить отладку' : 'Включить отладку'}
      aria-label={isDebugMode ? 'Отключить отладку' : 'Включить отладку'}
    >
      {isDebugMode ? 'ON' : 'OFF'}
    </button>
  );
};

export default DebugToggle;
