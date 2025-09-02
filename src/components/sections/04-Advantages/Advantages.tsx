"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Advantages: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Вычисляем правильную дистанцию скролла
      const cardsContainer = cardsContainerRef.current!.querySelector('.absolute.flex') as HTMLDivElement;
      const cards = gsap.utils.toArray<HTMLDivElement>('.horizontal-card');
      
      if (cardsContainer && cards.length > 0) {
        // Вычисляем точную ширину для правильного окончания скролла
        const firstCardWidth = 500; // Первая карточка
        const otherCardWidth = 700; // Остальные 7 карточек
        const cardGap = 40; // Отступ между карточками
        const containerWidth = cardsContainerRef.current!.offsetWidth;
        
        // Общая ширина: первая карточка + 7 карточек + отступы между ними
        const totalWidth = firstCardWidth + (otherCardWidth * 7) + (cardGap * 7); // 7 отступов между 8 карточками
        
        // Точная дистанция: показать последнюю карточку с отступом cardGap от правого края
        const scrollDistance = totalWidth - containerWidth + cardGap;

        // PIN эффект - максимально огромный диапазон для очень размеренной прокрутки
        const pinDistance = Math.max(2000, Math.min(3000, scrollDistance / 2)); // Огромное увеличение
        
        // Оптимизация для плавности - убираем все будущие свойства
        gsap.set(cardsContainer, { 
          force3D: true,
          transformStyle: "preserve-3d"
        });

        // 🌟 ОДИН ГЛАВНЫЙ ScrollTrigger - пин + горизонтальный скролл + исчезновение карточек
        const horizontalCards = gsap.utils.toArray<HTMLDivElement>('.horizontal-card');
        
        const scrollTween = gsap.to(cardsContainer, {
          x: -scrollDistance,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${pinDistance}vh`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: self => {
              const progress = self.progress;

              // Каждую карточку проверяем по прогрессу
              horizontalCards.forEach((card, index) => {
                if (index === horizontalCards.length - 1) return; // последняя не исчезает

                const cardWidth = index === 0 ? 500 : 700;
                const gap = 40;

                // Считаем где начинается эта карточка
                let cardLeft = 0;
                for (let i = 0; i < index; i++) {
                  cardLeft += (i === 0 ? 500 : 700) + gap;
                }

                // диапазон прогресса для fade
                const fadeStart = cardLeft / scrollDistance;
                const fadeEnd = (cardLeft + cardWidth) / scrollDistance;

                if (progress >= fadeStart && progress <= fadeEnd) {
                  const localP = (progress - fadeStart) / (fadeEnd - fadeStart);
                  gsap.set(card, {
                    opacity: 1 - localP,
                    scale: 1 - 0.2 * localP,
                    filter: `blur(${6 * localP}px)`
                  });
                } else if (progress < fadeStart) {
                  gsap.set(card, { opacity: 1, scale: 1, filter: "blur(0px)" });
                } else if (progress > fadeEnd) {
                  gsap.set(card, { opacity: 0, scale: 0.8, filter: "blur(6px)" });
                }
              });
            }
          }
        });

        // Полоса прогресса синхронизирована
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { force3D: true });
          
          gsap.fromTo(progressBarRef.current, 
            { width: '0%' },
            {
              width: '100%',
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top", 
                end: `+=${pinDistance}vh`,
                scrub: 0.5, // Немного замедляем прогресс-бар
                invalidateOnRefresh: true
              }
            }
          );
        }

        // Бегущая строка
        if (tickerRef.current) {
          const tickerText = tickerRef.current.querySelector('.ticker-text') as HTMLDivElement;
          if (tickerText) {
            // Создаем бесконечный эффект через дублирование текста
            const originalText = tickerText.innerHTML;
            tickerText.innerHTML = originalText + originalText + originalText + originalText;
            
            // Устанавливаем начальную позицию
            gsap.set(tickerText, {
              x: '0%'
            });
            
            gsap.to(tickerText, {
              x: '-25%', // Двигаемся на четверть длины для бесконечного эффекта
              duration: 120,
              ease: 'none',
              repeat: -1,
              yoyo: false
            });
          }
        }
        
        // Принудительно обновляем ScrollTrigger после изменений
        ScrollTrigger.refresh();
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        background: '#e8e8ea'
      }}
    >

      <div 
        ref={containerRef}
        className="w-full max-w-[1440px] mx-auto py-8 sm:py-12 md:py-16 border-2 border-dashed border-red-500 container-type-inline"
        style={{
          paddingInline: 'var(--container-padding)'
        }}
      >
        {/* Удаляем заголовки секции - плашка выполняет эту роль */}
        
        {/* Зеленый контейнер контента с горизонтальным скроллом */}
        <div 
          ref={cardsContainerRef}
          className="mt-8 md:mt-12 w-full border-2 border-dashed border-green-500 overflow-hidden min-h-[600px] relative"
          style={{
            marginBlockStart: 'var(--spacing-lg)',
          }}
        >
          {/* Контейнер для горизонтального скролла всех карточек */}
          <div className="absolute flex" style={{ left: '0px', top: '50px', transform: 'translateY(0)' }}>
            {/* Первая карточка - основная голубая */}
            <div 
              className="horizontal-card border-2 border-dashed border-purple-500 content-rounded overflow-hidden"
              style={{
                width: '500px',
                height: '500px',
                marginRight: '40px',
                borderRadius: '16px',
                padding: '40px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                background: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))',
                boxShadow: '0 8px 32px rgba(34, 211, 238, 0.2)',
                flexShrink: 0
              }}
            >
              {/* Заголовок */}
              <h3 
                className="font-black font-inter relative z-10 leading-none tracking-tight"
                style={{
                  fontSize: "clamp(18px, 4.5vw, 100px)",
                  marginBottom: "40px",
                  lineHeight: "0.9",
                  color: '#000000',
                  textAlign: 'left',
                  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                <span style={{ 
                  color: '#000000',
                  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  Почему
                </span>{' '}
                нужно обратиться именно к нам?
              </h3>
              
              {/* Основной текст */}
              <p 
                className="text-xl leading-relaxed font-black font-inter relative z-10"
                style={{
                  lineHeight: "1.3",
                  maxWidth: "100%",
                  color: '#000000',
                  opacity: 0.9,
                  textAlign: 'left',
                  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                Только самое лучшее для вашего любимца!
              </p>
            </div>

            {/* Остальные 7 карточек - только фотографии */}
            {Array.from({ length: 7 }, (_, index) => (
              <div
                key={index}
                className="horizontal-card border-2 border-dashed border-yellow-500 overflow-hidden"
                style={{
                  width: '700px',
                  height: '500px',
                  marginRight: '40px',
                  borderRadius: 'var(--content-border-radius)',
                  flexShrink: 0
                }}
              >
                <img
                  src={`/img priemushestva/${index + 1}.jpg`}
                  alt={`Преимущество ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Полоса прогресса - на полную ширину красного контейнера */}
        <div className="mt-8 border-2 border-dashed border-orange-500">
          <div 
            className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden"
            style={{ height: '4px' }}
          >
            <div 
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-black rounded-full"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
      
      {/* Бегущая строка внизу секции */}
      <div 
        ref={tickerRef}
        className="absolute bottom-0 left-0 w-full z-50 overflow-hidden"
        style={{
          height: '50px',
          background: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div 
          className="ticker-text whitespace-nowrap"
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#000000',
            transform: 'translateX(0%)'
          }}
        >
          онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина • онлайн ветеринарная телемедицина •
        </div>
      </div>
    </section>
  );
};

export default Advantages;
