"use client";

import { useState, useEffect } from 'react';

export const useLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Симулируем загрузку ресурсов
    const simulateLoading = () => {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Небольшая задержка перед скрытием
            setTimeout(() => setIsLoading(false), 800);
            return 100;
          }
          return prev + Math.random() * 12 + 3; // Случайный прогресс 3-15%
        });
      }, 150);

      return () => clearInterval(interval);
    };

    // Начинаем загрузку после небольшой задержки
    const timer = setTimeout(simulateLoading, 100);

    return () => clearInterval(timer);
  }, []);

  return { isLoading, loadingProgress };
};
