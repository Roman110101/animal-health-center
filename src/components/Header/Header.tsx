"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useHeaderContext } from './HeaderContext';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [servicesTimeout, setServicesTimeout] = useState<NodeJS.Timeout | null>(null);
  const [priceTimeout, setPriceTimeout] = useState<NodeJS.Timeout | null>(null);

  const { 
    showServicesDropdown, 
    showPriceDropdown, 
    setShowServicesDropdown, 
    setShowPriceDropdown 
  } = useHeaderContext();

  // Данные услуг (такие же как в секции Services)
  const services = [
    { id: 1, title: 'ТЕРАПИЯ', icon: '/icon uslugi/1.png' },
    { id: 2, title: 'ХИРУРГИЯ', icon: '/icon uslugi/2.png' },
    { id: 3, title: 'ДЕРМАТОЛОГИЯ', icon: '/icon uslugi/3.png' },
    { id: 4, title: 'СТАЦИОНАР', icon: '/icon uslugi/4.png' },
    { id: 5, title: 'ПРИЕМ', icon: '/icon uslugi/5.png' },
    { id: 6, title: 'ЭНДОСКОПИЯ', icon: '/icon uslugi/6.png' },
    { id: 7, title: 'РЕАБИЛИТАЦИЯ', icon: '/icon uslugi/7.png' },
    { id: 8, title: 'ОНЛАЙН', icon: '/icon uslugi/8.png' },
    { id: 9, title: 'СТОМАТОЛОГИЯ', icon: '/icon uslugi/9.png' },
    { id: 10, title: 'НЕЙРОХИРУРГИЯ', icon: '/icon uslugi/10.png' }
  ];

  // Данные прайс-листа
  const priceItems = [
    { id: 1, title: 'ОБЩИЙ ПРАЙС НА ВСЕ ВИДЫ УСЛУГ', icon: '/price icons/1.png' },
    { id: 2, title: 'ВЫЗОВ', icon: '/price icons/2.png' },
    { id: 3, title: 'ДЕРМАТОЛОГИЯ', icon: '/price icons/3.png' },
    { id: 4, title: 'ДИЕТОЛОГИЯ', icon: '/price icons/4.png' },
    { id: 5, title: 'ЗООПСИХОЛОГИЯ', icon: '/price icons/5.png' },
    { id: 6, title: 'КИСЛОРОД', icon: '/price icons/6.png' },
    { id: 7, title: 'КРЕМАЦИЯ', icon: '/price icons/7.png' },
    { id: 8, title: 'ЛОШАДИ', icon: '/price icons/8.png' },
    { id: 9, title: 'НЕВРОЛОГИЯ', icon: '/price icons/9.png' },
    { id: 10, title: 'НЕЙРОХИРУРГИЯ', icon: '/price icons/10.png' },
    { id: 11, title: 'НЕФРОЛОГИЯ', icon: '/price icons/11.png' },
    { id: 12, title: 'ОНКОЛОГИЯ', icon: '/price icons/12.png' },
    { id: 13, title: 'ОНЛАЙН КОНСУЛЬТАЦИЯ УЗ. СПЕЦ.', icon: '/price icons/13.png' },
    { id: 14, title: 'ОФТАЛЬМОЛОГИЯ', icon: '/price icons/14.png' },
    { id: 15, title: 'ПЕРЕЛИВАНИЕ КРОВИ', icon: '/price icons/15.png' },
    { id: 16, title: 'ПРИЕМ КАРДИОЛОГИЯ', icon: '/price icons/16.png' },
    { id: 17, title: 'РЕНТГЕН', icon: '/price icons/17.png' },
    { id: 18, title: 'СТАЦИОНАР', icon: '/price icons/18.png' },
    { id: 19, title: 'СТОМАТОЛОГИЯ', icon: '/price icons/19.png' },
    { id: 20, title: 'ТИТРЫ АНТИТЕЛ НА БЕШЕНСТВО', icon: '/price icons/20.png' },
    { id: 21, title: 'ТРАВМАТОЛОГИЯ', icon: '/price icons/21.png' },
    { id: 22, title: 'УЗИ', icon: '/price icons/22.png' },
    { id: 23, title: 'ГАСТРОЭНТЕРОЛОГ', icon: '/price icons/23.png' },
    { id: 24, title: 'УСЛУГИ', icon: '/price icons/24.png' },
    { id: 25, title: 'ХИРУРГИЯ', icon: '/price icons/25.png' },
    { id: 26, title: 'ЧИПИРОВАНИЕ', icon: '/price icons/26.png' },
    { id: 27, title: 'ЭНДОКРИНОЛОГИЯ', icon: '/price icons/27.png' },
    { id: 28, title: 'ЭНДОСКОПИЯ', icon: '/price icons/28.png' },
    { id: 29, title: 'ТЕРАПИЯ', icon: '/price icons/29.png' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Скрываем header при скролле вниз, показываем при скролле вверх
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Скрываем при скролле вниз
      } else {
        setIsVisible(true); // Показываем при скролле вверх
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Функции для управления задержкой выпадающих меню
  const handleServicesMouseEnter = () => {
    if (servicesTimeout) {
      clearTimeout(servicesTimeout);
      setServicesTimeout(null);
    }
    // Закрываем прайс-лист при открытии услуг
    setShowPriceDropdown(false);
    setShowServicesDropdown(true);
  };

  const handleServicesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowServicesDropdown(false);
    }, 300); // Задержка 300ms
    setServicesTimeout(timeout);
  };

  const handlePriceMouseEnter = () => {
    if (priceTimeout) {
      clearTimeout(priceTimeout);
      setPriceTimeout(null);
    }
    // Закрываем услуги при открытии прайс-листа
    setShowServicesDropdown(false);
    setShowPriceDropdown(true);
  };

  const handlePriceMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowPriceDropdown(false);
    }, 300); // Задержка 300ms
    setPriceTimeout(timeout);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{
        height: '50px',
        isolation: 'isolate'
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto h-full flex items-center justify-between px-6"
        style={{
          paddingInline: 'var(--container-padding)',
        }}
      >
        {/* Логотип */}
        <div className="flex items-center">
          <Link href="/" className="text-white text-lg font-bold font-inter">
            Ветеринарная клиника
          </Link>
        </div>

        {/* Навигационное меню */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="#filials" 
            className="text-white hover:text-gray-200 transition-colors duration-300 font-inter font-medium text-sm"
          >
            Филиалы
          </Link>
          
          {/* Выпадающее меню Услуги */}
          <div 
            className="relative"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button 
              className="text-white hover:text-gray-200 transition-colors duration-300 font-inter font-medium flex items-center text-sm"
            >
              Услуги
              <svg className="ml-1 w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Выпадающее меню */}
            {showServicesDropdown && (
              <div 
                className="fixed top-[50px] left-0 right-0 z-[50] bg-black/60"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <div className="w-full max-w-[1440px] mx-auto p-6"
                  style={{
                    paddingInline: 'var(--container-padding)',
                  }}
                >
                  <div className="grid grid-cols-5 gap-4">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={`#service-${service.id}`}
                        className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center">
                          <Image
                            src={service.icon}
                            alt={service.title}
                            width={32}
                            height={32}
                            className="object-contain group-hover:scale-110 transition-transform duration-300 will-change-transform"
                          />
                        </div>
                        <span className="text-white font-medium text-sm font-inter group-hover:text-gray-200">
                          {service.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Link 
            href="#news" 
            className="text-white hover:text-gray-200 transition-colors duration-300 font-inter font-medium text-sm"
          >
            Новости
          </Link>
          
          {/* Выпадающее меню Прайс-лист */}
          <div 
            className="relative"
            onMouseEnter={handlePriceMouseEnter}
            onMouseLeave={handlePriceMouseLeave}
          >
            <button 
              className="text-white hover:text-gray-200 transition-colors duration-300 font-inter font-medium flex items-center text-sm"
            >
              Прайс-лист
              <svg className="ml-1 w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Выпадающее меню прайс-листа */}
            {showPriceDropdown && (
              <div 
                className="fixed top-[50px] left-0 right-0 z-[50] bg-black/60"
                onMouseEnter={handlePriceMouseEnter}
                onMouseLeave={handlePriceMouseLeave}
              >
                <div className="w-full max-w-[1440px] mx-auto p-6"
                  style={{
                    paddingInline: 'var(--container-padding)',
                  }}
                >
                  <div className="grid grid-cols-6 gap-4">
                    {priceItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`#price-${item.id}`}
                        className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center">
                          <Image
                            src={item.icon}
                            alt={item.title}
                            width={32}
                            height={32}
                            className="object-contain group-hover:scale-110 transition-transform duration-300 will-change-transform"
                          />
                        </div>
                        <span className="text-white font-medium text-sm font-inter group-hover:text-gray-200">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Link 
            href="#contacts" 
            className="text-white hover:text-gray-200 transition-colors duration-300 font-inter font-medium text-sm"
          >
            Контакты
          </Link>
        </nav>

        {/* Мобильное меню (пока скрыто) */}
        <div className="md:hidden">
          <button className="text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
