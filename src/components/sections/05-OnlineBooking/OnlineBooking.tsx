"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OnlineBooking: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // 🎯 Упрощенный hover эффект только для иконок
  const createCardHoverEffect = (gradient: string) => ({
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const icon = card.querySelector('img');
      
      // Только градиент фона, без движения карточки
      gsap.to(card, {
        background: gradient,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Только анимация иконки - этого достаточно!
      if (icon) {
        gsap.to(icon, {
          scale: 1.15,
          rotation: 8,
          duration: 0.3,
          ease: "back.out(1.2)"
        });
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const icon = card.querySelector('img');
      
      gsap.to(card, {
        background: 'transparent',
        duration: 0.3,
        ease: "power2.out"
      });
      
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  });

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !titleRef.current || !subtitleRef.current || !cardsContainerRef.current || !imageContainerRef.current || !textContainerRef.current) return;

    const ctx = gsap.context(() => {
      // 🍎 Apple-style анимации с привязкой к прогрессу скролла
      
      // Устанавливаем начальное состояние подзаголовка
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95
      });

      // Начальное состояние карточек - простое появление без смещения
      gsap.set(cardsRefs.current.filter(Boolean), {
        opacity: 0,
        scale: 0.9 // Просто небольшое уменьшение
      });

      // Начальное состояние контейнеров - с боковым смещением
      gsap.set(imageContainerRef.current, {
        opacity: 0,
        x: -100, // Появляется слева
        y: 30,
        scale: 0.95
      });
      
      gsap.set(textContainerRef.current, {
        opacity: 0,
        x: 100, // Появляется справа
        y: 30,
        scale: 0.95
      });

      // 🎯 ЗАГОЛОВОК - эффект появления по словам (как BlurText)
      // Разбиваем заголовок на слова и анимируем каждое слово отдельно
      const titleText = titleRef.current!.textContent || '';
      const words = titleText.split(' ');
      
      // Очищаем содержимое и создаем spans для каждого слова
      titleRef.current!.innerHTML = '';
      const wordSpans: HTMLSpanElement[] = [];
      
      words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.style.display = 'inline-block';
        wordSpan.style.willChange = 'transform, filter, opacity';
        
        // Начальное состояние каждого слова
        gsap.set(wordSpan, {
          opacity: 0,
          y: 30,
          scale: 0.8,
          filter: 'blur(8px)'
        });
        
        titleRef.current!.appendChild(wordSpan);
        if (index < words.length - 1) {
          titleRef.current!.appendChild(document.createTextNode(' '));
        }
        
        wordSpans.push(wordSpan);
      });
      
      // Анимируем каждое слово с задержкой
      wordSpans.forEach((wordSpan, index) => {
        gsap.to(wordSpan, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: index * 0.1, // Задержка между словами
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom-=50", // Позже появляется
            end: "top center+=50", 
            toggleActions: "play none none reverse"
          }
        });
      });

      // 🎯 ПОДЗАГОЛОВОК - следом за заголовком
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=150",
          end: "top center+=150",
          toggleActions: "play none none reverse",
          scrub: 1.0 // Медленнее
        }
      });

      // 🎯 КАРТОЧКИ - ДЕЙСТВИТЕЛЬНО поочередное появление слева направо
      cardsRefs.current.filter(Boolean).forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.2, // Задержка между карточками
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center+=100", // Когда карточки должны начать появляться
              end: "bottom center", // Более широкая область
              toggleActions: "play none none reverse", // Появляются и остаются видимыми
              scrub: false // УБИРАЕМ scrub чтобы delay работал!
            }
          });
        }
      });

      // 🎯 КОНТЕЙНЕРЫ - появляются чуть раньше по timeline
      // Контейнер с изображением - появляется слева
      gsap.to(imageContainerRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=50", // Чуть вперед по timeline
          end: "top center-=100",
          toggleActions: "play reverse play reverse",
          scrub: 0.4
        }
      });
      
      // Контейнер с текстом - появляется справа с небольшой задержкой
      gsap.to(textContainerRef.current, {
        opacity: 1,
        x: 0,
        y: 0,  
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center", // Чуть вперед по timeline
          end: "top center-=150",
          toggleActions: "play reverse play reverse",
          scrub: 0.5
        }
      });

      // 🌟 Убираем лишний эффект увеличения - он может мешать основным анимациям

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center bg-white py-16"
    >
      <div 
        ref={containerRef}
        className="w-full max-w-[1440px] mx-auto py-8 sm:py-12 md:py-16 border-2 border-dashed border-red-500 container-type-inline"
        style={{
          paddingInline: 'var(--container-padding)',
        }}
      >
        <div className="text-center w-full max-w-[900px] mx-auto border-2 border-dashed border-blue-500">
          <h2 
            ref={titleRef}
            className="font-black text-gray-900 leading-none tracking-tight font-inter overflow-hidden"
            style={{
              fontSize: "var(--about-h2-size)",
              marginBottom: "var(--hero-spacing-h2)",
            }}
          >
            Записаться Online
          </h2>
          <h3 
            ref={subtitleRef}
            className="text-gray-700 font-medium leading-relaxed border-2 border-dashed border-orange-500 font-inter"
            style={{
              fontSize: 'var(--subheading-size)',
            }}
          >
            Выберете услугу и запишитесь к врачу онлайн
          </h3>
        </div>
        
        {/* Зеленый контейнер контента без теней */}
        <div 
          ref={cardsContainerRef}
          className="mt-8 md:mt-12 w-full border-2 border-dashed border-green-500 overflow-hidden min-h-[200px]"
          style={{
            marginBlockStart: 'var(--spacing-lg)',
          }}
        >
          {/* CSS Grid с auto-fit и Subgrid для будущего контента */}
          <div className="auto-fit-grid min-h-[200px]">
            {/* Subgrid контейнер для вложенных элементов */}
            <div className="subgrid-container min-h-[200px]">
              {/* Карточки с иконками онлайн услуг */}
              <div className="w-full flex justify-center items-center">
                <div 
                  className="grid justify-items-center w-full max-w-full"
                  style={{
                    gap: 'var(--service-card-gap)',
                    gridTemplateColumns: 'repeat(4, 1fr)'
                  }}
                >
                  {/* Карточка 1 - Вызов врача на дом */}
                  <div 
                    ref={(el) => { cardsRefs.current[0] = el; }}
                    className="w-full flex flex-col items-center justify-center cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-blue-500 transition-transform duration-300 hover:scale-105"
                    {...createCardHoverEffect('linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))')}
                    style={{
                      height: 'var(--service-card-size)',
                      aspectRatio: '1',
                      borderRadius: 'var(--content-border-radius)',
                      background: 'transparent'
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Вызов врача на дом"
                  >
                    <div className="text-center p-6">
                      <div className="mb-4 flex justify-center">
                        <img
                          src="/Online icons 2/1.png"
                          alt="Иконка: Вызов врача на дом"
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 font-inter text-center mb-2">
                        Вызов врача на дом
                      </h4>
                      <p className="text-sm text-gray-600 font-inter text-center">
                        Вызов врача онлайн
                      </p>
                    </div>
                  </div>

                  {/* Карточка 2 - Вакцинация */}
                  <div 
                    ref={(el) => { cardsRefs.current[1] = el; }}
                    className="w-full flex flex-col items-center justify-center cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-blue-500 transition-transform duration-300 hover:scale-105"
                    {...createCardHoverEffect('linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))')}
                    style={{
                      height: 'var(--service-card-size)',
                      aspectRatio: '1',
                      borderRadius: 'var(--content-border-radius)',
                      background: 'transparent'
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Вакцинация"
                  >
                    <div className="text-center p-6">
                      <div className="mb-4 flex justify-center">
                        <img
                          src="/Online icons 2/2.png"
                          alt="Иконка: Вакцинация"
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 font-inter text-center mb-2">
                        Вакцинация
                      </h4>
                      <p className="text-sm text-gray-600 font-inter text-center">
                        Онлайн запись на вакцинацию
                      </p>
                    </div>
                  </div>

                  {/* Карточка 3 - Чипирование */}
                  <div 
                    ref={(el) => { cardsRefs.current[2] = el; }}
                    className="w-full flex flex-col items-center justify-center cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-blue-500 transition-transform duration-300 hover:scale-105"
                    {...createCardHoverEffect('linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))')}
                    style={{
                      height: 'var(--service-card-size)',
                      aspectRatio: '1',
                      borderRadius: 'var(--content-border-radius)',
                      background: 'transparent'
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Чипирование"
                  >
                    <div className="text-center p-6">
                      <div className="mb-4 flex justify-center">
                        <img
                          src="/Online icons 2/3.png"
                          alt="Иконка: Чипирование"
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 font-inter text-center mb-2">
                        Чипирование
                      </h4>
                      <p className="text-sm text-gray-600 font-inter text-center">
                        Онлайн запись на чипирование
                      </p>
                    </div>
                  </div>

                  {/* Карточка 4 - Реабилитация */}
                  <div 
                    ref={(el) => { cardsRefs.current[3] = el; }}
                    className="w-full flex flex-col items-center justify-center cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-blue-500 transition-transform duration-300 hover:scale-105"
                    {...createCardHoverEffect('linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))')}
                    style={{
                      height: 'var(--service-card-size)',
                      aspectRatio: '1',
                      borderRadius: 'var(--content-border-radius)',
                      background: 'transparent'
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Реабилитация"
                  >
                    <div className="text-center p-6">
                      <div className="mb-4 flex justify-center">
                        <img
                          src="/Online icons 2/4.png"
                          alt="Иконка: Реабилитация"
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 font-inter text-center mb-2">
                        Реабилитация
                      </h4>
                      <p className="text-sm text-gray-600 font-inter text-center">
                        Онлайн запись на реабилитацию
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Второй зеленый контейнер контента без теней */}
        <div 
          className="mt-8 md:mt-12 w-full border-2 border-dashed border-green-500 overflow-hidden min-h-[200px]"
          style={{
            marginBlockStart: 'var(--spacing-lg)',
          }}
        >
          {/* CSS Grid с auto-fit и Subgrid для будущего контента */}
          <div className="auto-fit-grid min-h-[200px]">
            {/* Subgrid контейнер для вложенных элементов */}
            <div className="subgrid-container min-h-[200px]">
              {/* Два прямоугольника с фиолетовой пунктирной обводкой */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div 
                  ref={imageContainerRef}
                  className="border-2 border-dashed border-purple-500 flex items-center justify-center overflow-hidden card-rounded"
                  style={{
                    width: 'var(--rectangle-width)',
                    height: '400px',
                  }}
                >
                  {/* Изображение онлайн записи */}
                  <img
                    src="/img OnlineBooking/online-booking.jpg"
                    alt="Онлайн запись в Центр здоровья животных"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: 'center',
                    }}
                  />
                </div>
                
                <div 
                  ref={textContainerRef}
                  className="border-2 border-dashed border-purple-500 p-6 flex flex-col justify-center card-rounded"
                  style={{
                    width: 'var(--rectangle-width)',
                    height: '400px',
                    background: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))'
                  }}
                >
                  {/* Заголовок */}
                  <h3 className="text-2xl font-bold text-white mb-4 font-inter">
                    Вызов врача на дом
                  </h3>
                  
                  {/* Основной текст */}
                  <p className="text-white text-base leading-relaxed mb-4 font-inter">
                    Если ваш питомец не транспортабелен, в критическом состоянии или плохо переносит поездки, или вы просто хотите сэкономить время, вызовите ветеринара на дом. Врач проведет осмотр, назначит лечение и даст рекомендации по уходу и питанию.
                  </p>
                  
                  {/* Информация о времени */}
                  <p className="text-white text-base leading-relaxed mb-4 font-inter">
                    Вы можете сделать вызов в любое время суток, врач приедет в течение 40 минут.
                  </p>
                  
                  {/* Контактная информация */}
                  <div className="mt-auto">
                    <p className="text-white text-base leading-relaxed mb-2 font-inter">
                      Для вызова ветеринара звоните по номеру:
                    </p>
                    <p className="text-lg font-semibold text-white font-inter">
                      тел: <a 
                        href="tel:+79882332818" 
                        className="hover:scale-105 transition-transform duration-300 ease-out text-white"
                        style={{ textDecoration: 'none' }}
                      >
                        +7 (988) 233-28-18
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineBooking;
