"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const badge1Ref = useRef<HTMLDivElement | null>(null);
  const badge2Ref = useRef<HTMLDivElement | null>(null);
  const badge3Ref = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current || !titleRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // МГНОВЕННО скрываем About контент до анимаций
      gsap.set(sectionRef.current, {
        opacity: 0
      });
      
      // Устанавливаем начальное состояние для плашек
      const badges = [badge1Ref.current, badge2Ref.current, badge3Ref.current];
      badges.forEach(badge => {
        if (badge) {
          gsap.set(badge, { 
            opacity: 0, 
            y: 20,
            transformOrigin: "center center"
          });
        }
      });
      
      // Создаем flip text эффект для заголовка
      const titleText = titleRef.current!.innerText;
      const titleChars = titleText.split("");
      titleRef.current!.innerHTML = titleChars
        .map((char) => 
          char === " " ? "&nbsp;" : 
          `<span class="flip-char inline-block" style="transform: rotateX(-90deg); opacity: 0;">${char}</span>`
        )
        .join("");

      const flipChars = gsap.utils.toArray<HTMLSpanElement>(".flip-char");

      // Показываем About секцию когда она активируется
      gsap.to(sectionRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: "body",
          start: "+=150vh", // Show slightly earlier than flip animation
          end: "+=200vh",
          scrub: 1,
        },
      });
      
      // Flip text анимация привязанная к скроллу  
      gsap.to(flipChars, {
        rotateX: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "body",
          start: "+=200vh", // Start after Hero disappears
          end: "+=300vh", // Give less time for flip text
          scrub: 1,
        },
      });

      // Разбиваем только текст на отдельные слова
      const textWords = textRef.current!.innerText.split(" ");
      textRef.current!.innerHTML = textWords
        .map((w) => `<span class="word opacity-0">${w}</span>`)
        .join(" ");

      const words = gsap.utils.toArray<HTMLSpanElement>(".word");

      // Анимация текста привязанная к скроллу - НАЧИНАЕМ РАНЬШЕ
      gsap.to(words, {
        opacity: 1,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "body",
          start: "+=300vh", // Start earlier - right after flip text
          end: "+=500vh", // Give more time for text animation
          scrub: 1,
        },
      });

      // Анимация плашек привязанная к скроллу - АБСОЛЮТНЫЕ значения
      gsap.to(badges, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: "body",
          start: "550vh", // АБСОЛЮТНОЕ - начинаем после полного печатания текста
          end: "750vh", // АБСОЛЮТНОЕ - заканчиваем ДО начала исчезновения (800vh)
          scrub: 1,
        },
      });
      
      // СКРОЛЛ-АНИМАЦИЯ ИСЧЕЗНОВЕНИЯ About контента с премиум размытием
      const aboutContent = [titleRef.current, textRef.current, badge1Ref.current, badge2Ref.current, badge3Ref.current].filter(Boolean);
      
      gsap.fromTo(aboutContent, 
        // FROM состояние (обеспечиваем правильные начальные значения)
        {
          y: 0,
          opacity: 1, 
          scale: 1,
          filter: "blur(0px)"
        },
        // TO состояние (исчезновение с премиум размытием)
        {
          y: -120, // Аналогично Hero контенту
          opacity: 0,
          scale: 0.9, // Легкое уменьшение при уезде
          filter: "blur(15px)", // Усиленный blur эффект для премиум перехода
          ease: "power2.in", // Ускорение при уезде вверх
          stagger: 0.05, // Поочередное исчезновение элементов
          overwrite: "auto",
          scrollTrigger: {
            trigger: "body",
            start: "700vh", // Начинаем исчезновение позже - после всех анимаций появления
            end: "1140vh", // АБСОЛЮТНОЕ - заканчиваем когда появляется Services  
            scrub: 2.0, // Более медленная анимация для премиум эффекта
            markers: false,
            invalidateOnRefresh: true,
            // Обеспечиваем правильное поведение при обратном скролле
            onUpdate: (self) => {
              if (self.progress === 0) {
                // Сбрасываем все значения при возврате к началу
                gsap.set(aboutContent, {
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

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen w-full bg-transparent flex items-center justify-center relative z-10"
    >
      <div
        className="w-full max-w-[1440px] mx-auto py-8 sm:py-12 md:py-16 container-type-inline"
        style={{
          paddingInline: "var(--container-padding)",
        }}
      >
        {/* Контейнер типографии (синий) */}
        <div
          ref={containerRef}
          className="text-left w-full border-2 border-dashed border-blue-500 relative container-type-inline min-h-[400px] flex items-center"
        >
          {/* Центральный текст */}
          <div 
            className="mx-auto border-2 border-dashed border-purple-500 text-center z-10 relative w-full"
            style={{ 
              maxWidth: 'var(--about-container-width)'
            }}
          >
            <h2
              ref={titleRef}
              className="font-black text-white leading-none tracking-tight font-inter overflow-hidden"
              style={{
                fontSize: "var(--about-h2-size)",
                marginBottom: "var(--about-spacing-title)",
              }}
            >
              О клинике
            </h2>

            <p
              ref={textRef}
              className="text-white font-semibold font-inter"
              style={{
                fontSize: "var(--about-text-size)",
                lineHeight: "var(--about-text-line-height)",
                marginBottom: "var(--about-spacing-text)",
              }}
            >
              В Центре Здоровья Животных предоставляется широкий спектр
              ветеринарных услуг: 💎 терапия, лабораторная и визуальная
              диагностика, ✦ эндоскопия, хирургические манипуляции, 😊 плановые
              операции, косметические операции (в том числе пересадка кожи), ⭐
              стоматология, офтальмология, дерматология, ✨ приём экзотических
              животных и вызов на дом. Отделение реанимационной терапии
              предлагает ✦ переливание крови и реабилитацию пациентов после
              остеосинтеза и операций на позвоночном столбе. ❤️ Уникальная
              методика позволяет эффективно лечить заболевания дёсен. 🔥 Впервые
              в Сочи проводится лапароскопическая стерилизация собак и кошек.
            </p>

            {/* Контейнер анимированных плашек Magic UI стиля */}
            <div 
              className="mx-auto border-2 border-dashed border-green-500 flex items-start justify-center"
              style={{
                height: 'var(--magic-badge-container-height)',
                gap: 'var(--magic-badge-gap)',
                paddingTop: 'var(--spacing-sm)'
              }}
            >
              {/* Плашка 1 */}
              <div 
                ref={badge1Ref}
                className="flex items-center justify-center px-4 py-1.5 border border-white"
                style={{
                  width: 'var(--magic-badge-width)',
                  height: 'var(--magic-badge-height)',
                  fontSize: 'var(--magic-badge-text-size)',
                  borderRadius: '20px',
                }}
              >
                <span style={{ fontSize: 'var(--magic-badge-text-size)' }}>⏰</span>
                <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                <span className="text-white font-medium" style={{ fontSize: 'var(--magic-badge-text-size)' }}>
                  24/7
                </span>
              </div>
              
              {/* Плашка 2 */}
              <div 
                ref={badge2Ref}
                className="flex items-center justify-center px-4 py-1.5 border border-white"
                style={{
                  width: 'var(--magic-badge-width)',
                  height: 'var(--magic-badge-height)',
                  fontSize: 'var(--magic-badge-text-size)',
                  borderRadius: '20px',
                }}
              >
                <span style={{ fontSize: 'var(--magic-badge-text-size)' }}>🏥</span>
                <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                <span className="text-white font-medium" style={{ fontSize: 'var(--magic-badge-text-size)' }}>
                  3 филиала
                </span>
              </div>
              
              {/* Плашка 3 */}
              <div 
                ref={badge3Ref}
                className="flex items-center justify-center px-4 py-1.5 border border-white"
                style={{
                  width: 'var(--magic-badge-width)',
                  height: 'var(--magic-badge-height)',
                  fontSize: 'var(--magic-badge-text-size)',
                  borderRadius: '20px',
                }}
              >
                <span style={{ fontSize: 'var(--magic-badge-text-size)' }}>❤️</span>
                <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                <span className="text-white font-medium" style={{ fontSize: 'var(--magic-badge-text-size)' }}>
                  С заботой
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;