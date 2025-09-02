"use client";

import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Небольшая задержка перед скрытием
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Случайный прогресс 5-20%
      });
    }, 200); // Обновляем каждые 200мс

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center loading-screen">
      {/* Основной контент */}
      <div className="relative z-10 text-center loading-content">
        {/* Забавное сообщение */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-red-400 mb-4 font-inter">
            Рома опять что-то нахуивертил!
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-inter">
            Чиним, подождите...
          </p>
        </div>

        {/* Прогресс-бар */}
        <div className="w-80 md:w-96 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-red-400 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Процент загрузки */}
        <div className="text-white/90 font-medium text-lg mb-4">
          Загрузка... {Math.round(progress)}%
        </div>

        {/* Анимированные точки */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-red-400 rounded-full loading-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-red-400 rounded-full loading-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-red-400 rounded-full loading-bounce" style={{ animationDelay: '0.2s' }} />
        </div>

        {/* Статус загрузки */}
        <div className="mt-6 text-white/70 text-sm">
          {progress < 30 && "Ищем где Рома спрятал баги..."}
          {progress >= 30 && progress < 60 && "Перезагружаем мозг Ромы..."}
          {progress >= 60 && progress < 90 && "Почти починили..."}
          {progress >= 90 && "Готово! Рома больше не будет..."}
        </div>
      </div>

      {/* Дополнительные эффекты */}
      <div className="absolute bottom-8 left-8 text-white/50 text-sm">
        <div className="animate-pulse">🔧 Чиним баги</div>
      </div>
      
      <div className="absolute bottom-8 right-8 text-white/50 text-sm">
        <div className="animate-pulse">🤦‍♂️ Рома...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
