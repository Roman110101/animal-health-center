"use client";

import { useState, useEffect } from 'react';

export const useLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Ждем полной загрузки страницы
    const handleLoad = () => {
      // Дополнительная задержка для полной загрузки всех ресурсов
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 1 секунда после загрузки страницы
    };

    // Симулируем прогресс загрузки
    const simulateLoading = () => {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 8 + 2; // Более медленный прогресс 2-10%
        });
      }, 100);

      return interval;
    };

    // Если страница уже загружена
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Ждем загрузки страницы
      window.addEventListener('load', handleLoad);
    }

    // Начинаем симуляцию загрузки
    const loadingInterval = simulateLoading();

    return () => {
      window.removeEventListener('load', handleLoad);
      if (loadingInterval) {
        clearInterval(loadingInterval);
      }
    };
  }, []);

  return { isLoading, loadingProgress };
};
