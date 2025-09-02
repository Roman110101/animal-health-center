"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About from '@/components/sections/02-About/About';
import Services from '@/components/sections/03-Services/Services';
import FloatingParticles from '@/components/FloatingParticles';
import LightRays from './LightRays';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentSection, setCurrentSection] = useState<'hero' | 'about' | 'services'>('hero');
  const [showServices, setShowServices] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const addressRef = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const introTlRef = useRef<gsap.core.Timeline | null>(null);

  // Массив фоновых изображений
  const backgroundImages = [
    {
      src: "/img hero/hero11.jpg",
      alt: "Красивый сибирский хаски на фоне абстрактного сине-зеленого градиента"
    },
    {
      src: "/img hero/2.jpg",
      alt: "Белый лабрадор на темном фоне с бирюзовыми световыми эффектами"
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current || !buttonsRef.current || !addressRef.current || !sectionRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      // Добавляем класс для показа контента
      document.body.classList.add('gsap-initialized');
      
      // Pin Hero секцию для эффекта заезда About сверху
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1400vh", // Сокращаем PIN еще на 100vh (было 1500vh)
        pin: true,
        pinSpacing: true, // Enable spacing to prevent overlap
        anticipatePin: 1,
        invalidateOnRefresh: true
      });

      // 🔥 ПРЕМИУМ OVERLAY - затемнение Hero сверху вниз при скролле About
      // Устанавливаем начальное состояние overlay - полностью прозрачный
      gsap.set(overlayRef.current, {
        background: 'rgba(0, 0, 0, 0)',
        backdropFilter: 'blur(0px)',
        WebkitBackdropFilter: 'blur(0px)'
      });
      
      // Создаем ScrollTrigger для overlay только для Hero секции
      ScrollTrigger.create({
        trigger: "body",
        start: "top top", 
        end: "+=180vh", // Увеличиваем диапазон для более медленного затемнения
        scrub: 2.2, // Замедляем анимацию overlay
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Затемнение только во время Hero
          gsap.set(overlayRef.current, {
            background: `rgba(0, 0, 0, ${progress * 0.8})`
          });
        },
        invalidateOnRefresh: true
      });
      
      // ScrollTrigger для смены секций внутри Hero
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "+=1400vh", // Соответствует сокращенному PIN диапазону
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Смена секций на основе прогресса скролла
          if (progress < 0.125) {
            setCurrentSection('hero');
          } else if (progress < 0.95) { // About до 95% прогресса - больше времени на исчезновение
            setCurrentSection('about');
          } else {
            setCurrentSection('services'); // Services с 95% 
          }
        },
        invalidateOnRefresh: true
      });

      // Отдельный ScrollTrigger для появления Services после анимации About
      ScrollTrigger.create({
        trigger: "body",
        start: "900vh", // Services появляется раньше, чтобы анимации успели сработать
        end: "1400vh", // АБСОЛЮТНОЕ значение - сокращаем для всех Services анимаций
        scrub: 1,
        onUpdate: (self) => {
          if (self.progress > 0) {
            setShowServices(true);
          } else {
            setShowServices(false);
          }
        },
        invalidateOnRefresh: true
      });

      // Эффектная анимация уезда контента Hero вверх при скролле
      const heroContent = [titleRef.current, subtitleRef.current, buttonsRef.current, addressRef.current];
      
      gsap.to(heroContent, {
        y: -120, // Больше смещение вверх для драматичности
        opacity: 0,
        scale: 0.9, // Легкое уменьшение при уезде
        filter: "blur(8px)", // Blur эффект при исчезновении
        ease: "power2.in", // Ускорение при уезде вверх
        stagger: 0.05, // Поочередное исчезновение элементов
        overwrite: "auto",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top+=1", 
          end: () => `+=${Math.round(window.innerHeight * 0.35)}`, // Идеальный баланс - 35% высоты экрана
          scrub: 1.0, // Оптимальная скорость исчезновения
          markers: false,
          invalidateOnRefresh: true
        }
      });
      // МГНОВЕННО скрываем все элементы до начала анимаций
      gsap.set(containerRef.current, {
        opacity: 0,
        willChange: "opacity"
      });
      
      // Скрываем Hero контент до анимации появления
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, addressRef.current], {
        opacity: 0,
        y: 20
      });

      // Анимация появления всех элементов Hero
      const tl = gsap.timeline({ delay: 0.3 });
      introTlRef.current = tl;
      
      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto"
      })
      .to([titleRef.current, subtitleRef.current, buttonsRef.current, addressRef.current], {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.15
      }, 0.3); // Начинаем чуть позже появления контейнера

      // Включаем скролл-анимацию, когда интро закончено
      // Скролл-анимация активна сразу; интро ускоряем при взаимодействии

    }, containerRef);

    // Ускоряем вступительную анимацию при первом скролле
    const accelerateIntro = () => {
      const tl = introTlRef.current;
      if (tl && tl.progress() < 1) {
        tl.tweenTo(tl.duration(), { duration: 0.4, ease: "power1.out" });
      }
    };
    const onceOpts = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener('scroll', accelerateIntro, onceOpts);
    window.addEventListener('wheel', accelerateIntro, onceOpts);
    window.addEventListener('touchstart', accelerateIntro, onceOpts);
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'PageDown' || e.code === 'ArrowDown') accelerateIntro();
    };
    window.addEventListener('keydown', onKey, { once: true });

    // Гарантируем актуальные позиции и мгновенный старт
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener('scroll', accelerateIntro);
      window.removeEventListener('wheel', accelerateIntro as EventListener);
      window.removeEventListener('touchstart', accelerateIntro as EventListener);
      window.removeEventListener('keydown', onKey);
      ctx.revert();
    };
  }, []);

  // Автоматическое переключение фоновых изображений
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % backgroundImages.length
          );
          setTimeout(() => {
            setIsTransitioning(false);
          }, 1000); // Время анимации
        }, 100); // Небольшая задержка для начала анимации
      }
    }, 8000); // Переключение каждые 8 секунд (увеличено с 5)

    return () => clearInterval(interval);
  }, [backgroundImages.length, isTransitioning]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center relative bg-black overflow-hidden"
    >
      
      {/* Skip link для доступности */}
      <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
        Перейти к основному содержанию
      </a>
      
      {/* Фоновое изображение с оптимизацией для Retina и современных форматов */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={backgroundImages[currentImageIndex].src}
          alt={backgroundImages[currentImageIndex].alt}
          fill
          priority
          className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          style={{
            objectPosition: 'center right',
            // Оптимизация для высокоплотных экранов
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            willChange: 'transform'
          }}
        />
        {/* Следующее изображение для плавного перехода */}
        <Image
          src={backgroundImages[(currentImageIndex + 1) % backgroundImages.length].src}
          alt={backgroundImages[(currentImageIndex + 1) % backgroundImages.length].alt}
          fill
          priority
          className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          style={{
            objectPosition: 'center right',
            // Оптимизация для высокоплотных экранов
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            willChange: 'transform'
          }}
        />
      </div>
      
      {/* 🔥 ПРЕМИУМ OVERLAY - затемнение сверху вниз при скролле About */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'transparent',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
          transition: 'none' // Отключаем CSS transition для GSAP анимации
        }}
      />
      
      {/* Летающие частички только на Hero */}
      <FloatingParticles />
      
      {/* Световые лучи */}
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 25 
      }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={0.8}
          lightSpread={0.8}
          rayLength={1.5}
          fadeDistance={0.7}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.0}
          distortion={0.0}
          className="custom-rays"
        />
      </div>
      
      {/* Основной красный контейнер */}
      <div 
        ref={containerRef}
        className="hero-content w-full max-w-[1440px] mx-auto py-8 sm:py-12 md:py-16 border-2 border-dashed border-red-500 container-type-inline relative z-30"
        style={{
          paddingInline: 'var(--container-padding)',
        }}
      >
        {/* Контейнер типографики */}
        <div 
          className="text-center w-full mx-auto border-2 border-dashed border-blue-500"
          style={{ maxWidth: 'var(--hero-text-max-width)' }}
        >
          {/* H1 Заголовок */}
          <h1 
            ref={titleRef}
            className="font-black text-white font-inter leading-none tracking-tight"
            style={{ 
              fontSize: 'var(--hero-h1-size)',
              marginBottom: 'var(--hero-spacing-h1)' 
            }}
          >
            Центр здоровья<br />
            животных
          </h1>
          
          {/* H2 Подзаголовок */}
          <h2 
            ref={subtitleRef}
            className="font-extrabold text-white font-inter leading-relaxed"
            style={{ 
              fontSize: 'var(--hero-h2-size)',
              marginBottom: 'var(--hero-spacing-h2)'
            }}
          >
            Мы знаем, как они важны для вас!
          </h2>
          
          {/* КНОПКИ - PIXEL-PERFECT по границам 'животных' */}
          <div 
            ref={buttonsRef}
            className="flex justify-center items-center"
            style={{ 
              gap: 'var(--hero-button-gap)',
              marginBottom: 'var(--hero-spacing-h2)'
            }}
          >
            <button 
              className="bg-white text-black font-semibold transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl"
              style={{ 
                width: 'var(--hero-button-width)',
                height: 'var(--hero-button-height)',
                fontSize: 'var(--hero-button-text-size)',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8f9fa';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Консультация
            </button>
            <button 
              className="bg-white text-black font-semibold transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl"
              style={{ 
                width: 'var(--hero-button-width)',
                height: 'var(--hero-button-height)',
                fontSize: 'var(--hero-button-text-size)',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8f9fa';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Записаться
            </button>
          </div>
          
          {/* Address Контакты */}
          <address 
            ref={addressRef}
            className="font-semibold text-white font-inter leading-relaxed not-italic flex items-center justify-center gap-2"
            style={{ fontSize: 'var(--hero-address-size)' }}
          >
            <a 
              href="tel:+79882332818" 
              className="hover:scale-105 transition-transform duration-300 ease-out"
            >
              +7 (988) 233-28-18
            </a>
            <span>•</span>
            <a 
              href="mailto:center.vet@mail.ru" 
              className="hover:scale-105 transition-transform duration-300 ease-out"
            >
              center.vet@mail.ru
            </a>
          </address>
        </div>
      </div>
      
      {/* Контейнер для смены секций */}
      <div 
        ref={contentContainerRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center z-40"
        style={{ pointerEvents: 'none' }}
      >
        {/* About секция - всегда в DOM для анимаций */}
        <div className="about-section absolute inset-0 w-full h-full flex items-center justify-center">
          <About />
        </div>
        
        {/* Services секция - всегда в DOM для анимаций */}
        <div className="services-section absolute inset-0 w-full h-full flex items-center justify-center">
          <Services />
        </div>
      </div>
      
      {/* Индикаторы переключения изображений */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-3">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white scale-110' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Переключить на изображение ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
