"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const word1Ref = useRef<HTMLSpanElement | null>(null);
  const word2Ref = useRef<HTMLSpanElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !word1Ref.current || !word2Ref.current || !cardsContainerRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Скрываем секцию до появления
      gsap.set(sectionRef.current, { opacity: 0, background: 'transparent' });
      gsap.to(sectionRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: "body",
          start: "180vh",
          end: "200vh",
          toggleActions: "play none none reverse"
        }
      });

      // Flip-анимация слов
      const prepareFlip = (el: HTMLElement, className: string) => {
        const text = el.innerText;
        el.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? "&nbsp;"
              : `<span class="${className} inline-block" style="transform: rotateX(-90deg); opacity:0">${char}</span>`
          )
          .join("");
      };

      prepareFlip(word1Ref.current!, "flip-char-services-1");
      prepareFlip(word2Ref.current!, "flip-char-services-2");

      const flipChars1 = gsap.utils.toArray<HTMLSpanElement>(".flip-char-services-1");
      const flipChars2 = gsap.utils.toArray<HTMLSpanElement>(".flip-char-services-2");

      // ✅ FLIP-АНИМАЦИЯ С ПРОГРЕССИЕЙ СКРОЛЛА
      gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "950vh", // Еще на 150vh позже (было 800vh)
          end: "1150vh", // Соответственно сдвигаем
          scrub: 1.5 // Уменьшаю - убираю инерцию
        }
      })
      .to([...flipChars1, ...flipChars2], {
        rotateX: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "back.out(1.7)",
        overwrite: "auto" // Убираю инерцию как в About
        // Убираю duration - пусть scrub контролирует
      });

      // ✅ РАЗЪЕЗД С ПРОГРЕССИЕЙ СКРОЛЛА
      gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "1100vh", // Сдвигаю позже - после завершения Flip (было 950vh)
          end: "1400vh", // Диапазон 300vh - очень плавная анимация
          scrub: 1 // Уменьшаю еще больше - как в About
        }
      })
      .to([word1Ref.current, word2Ref.current], {
        x: (i) => i === 0 ? -800 : 800, // Больше смещение для исчезновения за пределами
        opacity: 0, // Исчезают за пределами контейнера
        ease: "power2.out",
        stagger: 0, // Синхронно - без задержки
        overwrite: "auto" // Убираю инерцию как в About
        // Убираю duration - пусть scrub контролирует
      });

      // ✅ КАРТОЧКИ С ПРОГРЕССИЕЙ СКРОЛЛА
      cardsRefs.current.filter(Boolean).forEach((card, index) => {
        if (card) gsap.set(card, { opacity: 0, scale: 0.3, y: 50, rotation: -5, visibility: 'hidden' });
      });

      // Карточки начинаются практически одновременно с разъездом
      const cardsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "1101vh", // Практически одновременно с разъездом (было 951vh)
          end: "1200vh", // Уменьшаю диапазон карточек (было 1050vh)
          scrub: 1 // Уменьшаю scrub - как у разъезда
        }
      });

      cardsTimeline.fromTo(
        cardsRefs.current.filter(Boolean),
        { opacity: 0, scale: 0.3, y: 50, rotation: -5, visibility: 'hidden', pointerEvents: 'none' },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          visibility: 'visible',
          pointerEvents: 'auto',
          ease: "power3.out",
          stagger: 0.05,
          overwrite: "auto" // Убираю инерцию как в About
          // Убираю duration - пусть scrub контролирует
        }
      );

      // ✅ ПОДЗАГОЛОВОК С ПРОГРЕССИЕЙ СКРОЛЛА
      const servicesText = document.querySelector('.text-container p');
      if (servicesText) {
        gsap.set(servicesText, { opacity: 0 });
        
        gsap.to(servicesText, {
          opacity: 1,
          ease: "power2.out",
          overwrite: "auto", // Убираю инерцию как в About
          scrollTrigger: {
            trigger: "body",
            start: "1200vh", // После завершения карточек (было 1050vh)
            end: "1250vh", // Увеличиваю диапазон подзаголовка
            scrub: 1.5 // Уменьшаю - убираю инерцию
          }
          // Убираю duration - пусть scrub контролирует
        });
      }



      // ✅ ФИНАЛЬНАЯ АНИМАЦИЯ ИСЧЕЗНОВЕНИЯ Services контента
      const servicesContent = [titleRef.current, servicesText].filter(Boolean); // Убираем cardsContainerRef из исчезновения
      
      gsap.fromTo(servicesContent, 
        // FROM состояние (обеспечиваем правильные начальные значения)
        {
          y: 0,
          opacity: 1, 
          scale: 1,
          filter: "blur(0px)"
        },
        // TO состояние (исчезновение с премиум размытием)
        {
          y: -120, // Аналогично Hero и About контенту
          opacity: 0,
          scale: 0.9, // Легкое уменьшение при уезде
          filter: "blur(15px)", // Усиленный blur эффект для премиум перехода
          ease: "power2.in", // Ускорение при уезде вверх
          stagger: 0.05, // Поочередное исчезновение элементов
          overwrite: "auto",
          scrollTrigger: {
            trigger: "body",
            start: "1250vh", // Начинаем исчезновение после всех анимаций появления
            end: "1450vh", // АБСОЛЮТНОЕ - заканчиваем исчезновение
            scrub: 2.0, // Более медленная анимация для премиум эффекта
            markers: false,
            invalidateOnRefresh: true,
            // Обеспечиваем правильное поведение при обратном скролле
            onUpdate: (self) => {
              if (self.progress === 0) {
                // Сбрасываем все значения при возврате к началу
                gsap.set(servicesContent, {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)"
                });
              }
            }
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 1,
      title: 'ТЕРАПИЯ',
      icon: '🏥',
      bgColor: 'bg-gradient-to-br from-rose-500 to-pink-600'
    },
    {
      id: 2,
      title: 'ХИРУРГИЯ',
      icon: '🔪',
      bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    {
      id: 3,
      title: 'ДЕРМАТОЛОГИЯ',
      icon: '🦠',
      bgColor: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      id: 4,
      title: 'СТАЦИОНАР',
      icon: '🏨',
      bgColor: 'bg-gradient-to-br from-purple-500 to-violet-600'
    },
    {
      id: 5,
      title: 'ПРИЕМ И КОНСУЛЬТАЦИЯ',
      icon: '👨‍⚕️',
      bgColor: 'bg-gradient-to-br from-amber-500 to-orange-600'
    },
    {
      id: 6,
      title: 'ЭНДОСКОПИЯ',
      icon: '🔬',
      bgColor: 'bg-gradient-to-br from-cyan-500 to-teal-600'
    },
    {
      id: 7,
      title: 'РЕАБИЛИТАЦИЯ',
      icon: '🏃‍♂️',
      bgColor: 'bg-gradient-to-br from-lime-500 to-green-600'
    },
    {
      id: 8,
      title: 'ОНЛАЙН КОНСУЛЬТАЦИЯ ВЕТЕРИНАРНОГО ВРАЧА',
      icon: '💻',
      bgColor: 'bg-gradient-to-br from-sky-500 to-blue-600'
    },
    {
      id: 9,
      title: 'СТОМАТОЛОГИЯ',
      icon: '🦷',
      bgColor: 'bg-gradient-to-br from-slate-500 to-gray-600'
    },
    {
      id: 10,
      title: 'НЕЙРОХИРУРГИЯ',
      icon: '🧠',
      bgColor: 'bg-gradient-to-br from-fuchsia-500 to-pink-600'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: 'transparent'
      }}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-[1440px] mx-auto py-8 sm:py-12 md:py-16 border-2 border-dashed border-red-500 container-type-inline"
        style={{
          paddingInline: 'var(--container-padding)',
        }}
      >
        {/* Объединенный контейнер для заголовка и карточек */}
        <div 
          className="relative w-full mx-auto border-2 border-dashed border-blue-500 mb-8 md:mb-12"
          style={{
            minHeight: 'fit-content',
            overflow: 'visible'
          }}
        >
          {/* Контейнер типографики */}
          <div className="text-center absolute top-0 left-0 right-0 z-10" style={{ padding: '60px 20px 0' }}>
            <h2 
              ref={titleRef}
              className="font-black text-white leading-none tracking-tight font-inter m-0 p-0"
              style={{
                fontSize: "var(--about-h2-size)",
                marginBottom: "var(--hero-spacing-h2)",
              }}
            >
              {/* ✅ ИСПРАВЛЕНО - ДОПОЛНИТЕЛЬНЫЕ КОНТЕЙНЕРЫ ДЛЯ РАЗЪЕЗДА */}
              <span 
                ref={word1Ref} 
                className="word-container border-2 border-dashed border-purple-500 m-0 p-0"
                style={{
                  display: 'inline-block',
                  transformOrigin: 'center center'
                }}
              >
                Наши
              </span>{' '}
              <span 
                ref={word2Ref} 
                className="word-container border-2 border-dashed border-purple-500 m-0 p-0"
                style={{
                  display: 'inline-block',
                  transformOrigin: 'center center'
                }}
              >
                услуги
              </span>
            </h2>
          </div>

          {/* Контейнер с карточками */}
          <div 
            ref={cardsContainerRef}
            className="w-full border-2 border-dashed border-green-500 container-type-inline"
            style={{
              padding: '60px 20px',
              overflow: 'visible',
            }}
          >
          {/* Современная сетка с CSS Grid + auto-fit - 5 карточек в ряд */}
          <div 
            className="grid justify-items-center w-full max-w-full"
            style={{
              gap: 'var(--service-card-gap)',
              gridTemplateColumns: 'repeat(5, 1fr)'
            }}
          >
            {services.map((service, index) => (
              <div 
                key={service.id}
                ref={(el) => {
                  cardsRefs.current[index] = el;
                }}
                className={`w-full flex flex-col items-center justify-center cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-blue-500 service-card-${service.id}`}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  const icon = card.querySelector('img'); // Находим иконку внутри карточки
                  
                  // Цвета для каждой карточки по ID через GSAP
                  const colors = {
                    1: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))', // ТЕРАПИЯ
                    2: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))', // ХИРУРГИЯ
                    3: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))', // ДЕРМАТОЛОГИЯ
                    4: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))', // СТАЦИОНАР
                    5: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))', // ПРИЕМ
                    6: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))', // ЭНДОСКОПИЯ - аква с белым
                    7: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))', // РЕАБИЛИТАЦИЯ
                    8: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))', // ОНЛАЙН
                    9: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))', // СТОМАТОЛОГИЯ
                    10: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))' // НЕЙРОХИРУРГИЯ
                  };
                  
                  // Анимация карточки (только цвет)
                  gsap.to(card, {
                    background: colors[service.id as keyof typeof colors],
                    duration: 0.3,
                    ease: "power2.out"
                  });
                  
                  // Анимация иконки (увеличение + поворот)
                  if (icon) {
                    gsap.to(icon, {
                      scale: 1.3, // Увеличиваем иконку
                      rotation: 15, // Поворачиваем вправо на 15 градусов
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  const icon = card.querySelector('img'); // Находим иконку внутри карточки
                  
                  // Возвращаем карточку к исходному состоянию
                  gsap.to(card, {
                    background: 'transparent',
                    duration: 0.3,
                    ease: "power2.out"
                  });
                  
                  // Возвращаем иконку к исходному состоянию
                  if (icon) {
                    gsap.to(icon, {
                      scale: 1, // Возвращаем к нормальному размеру
                      rotation: 0, // Возвращаем к нормальному повороту
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }
                }}
                style={{
                  height: 'var(--service-card-size)',
                  aspectRatio: '1',
                  borderRadius: 'var(--content-border-radius)',
                  // Начальное скрытое состояние через CSS
                  opacity: 0,
                  transform: 'scale(0.3) rotate(-5deg)',
                  visibility: 'hidden'
                }}
                tabIndex={0}
                role="button"
                aria-label={`Услуга: ${service.title}`}
              >
                <div className="text-center p-6">
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={`/icon uslugi/${service.id}.png`}
                      alt={`Иконка услуги: ${service.title}`}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-white font-inter text-center">
                    {service.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
        
        {/* Дополнительный контейнер с Container Queries для типографики */}
        <div 
          className="w-full max-w-[900px] mx-auto border-2 border-dashed border-blue-500 -mt-8"
          style={{
            paddingTop: '20px',
          }}
        >
          <div className="text-container text-center">
            <p 
              className="text-white font-semibold font-inter leading-relaxed"
              style={{
                fontSize: "var(--about-text-size)",
                marginBottom: "var(--about-spacing-text)",
              }}
            >
              Все наши услуги предоставляются с использованием современного оборудования и передовых методик лечения.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
