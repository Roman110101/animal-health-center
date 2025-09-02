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
    <div className="fixed inset-0 bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 z-[9999] flex items-center justify-center loading-screen">
      {/* Анимированные частички */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full loading-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Основной контент */}
      <div className="relative z-10 text-center loading-content">
        {/* Логотип */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 font-inter">
            Центр здоровья животных
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-inter">
            Мы знаем, как они важны для вас!
          </p>
        </div>

        {/* Прогресс-бар */}
        <div className="w-80 md:w-96 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-300 ease-out"
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
          <div className="w-2 h-2 bg-white/60 rounded-full loading-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-white/60 rounded-full loading-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-white/60 rounded-full loading-bounce" style={{ animationDelay: '0.2s' }} />
        </div>

        {/* Статус загрузки */}
        <div className="mt-6 text-white/70 text-sm">
          {progress < 30 && "Инициализация..."}
          {progress >= 30 && progress < 60 && "Загрузка ресурсов..."}
          {progress >= 60 && progress < 90 && "Подготовка интерфейса..."}
          {progress >= 90 && "Почти готово..."}
        </div>
      </div>

      {/* Дополнительные эффекты */}
      <div className="absolute bottom-8 left-8 text-white/50 text-sm">
        <div className="animate-pulse">⚡ Быстрая загрузка</div>
      </div>
      
      <div className="absolute bottom-8 right-8 text-white/50 text-sm">
        <div className="animate-pulse">🔄 Оптимизация</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
