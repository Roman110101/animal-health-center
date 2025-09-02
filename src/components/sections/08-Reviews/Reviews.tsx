"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientBlinds from './GradientBlinds';

gsap.registerPlugin(ScrollTrigger);

// Массив реалистичных отзывов для ветеринарной клиники
const reviews = [
  {
    text: "Огромная благодарность врачам клиники! Мой кот Барсик перенес сложную операцию, все прошло отлично. Профессионализм на высшем уровне!",
    author: "Анна Иванова"
  },
  {
    text: "Спасли нашу собачку Лайму! Когда она отравилась, мы не знали что делать. Врачи работали всю ночь, теперь наша малышка здорова.",
    author: "Семья Петровых"
  },
  {
    text: "Отличная клиника! Врач очень внимательно осмотрел моего попугая, дал подробные рекомендации по уходу. Цены адекватные.",
    author: "Михаил К."
  },
  {
    text: "Вызывали врача на дом к нашему коту. Приехали быстро, провели все процедуры прямо дома. Очень удобно для пожилых животных!",
    author: "Елена Смирнова"
  },
  {
    text: "Делали стерилизацию кошки. Все прошло без осложнений, кошка быстро восстановилась. Спасибо за заботу!",
    author: "Дмитрий"
  },
  {
    text: "Лучшая ветклиника в городе! Регулярно приводим сюда нашего хорька. Врачи разбираются в экзотических животных.",
    author: "Ольга Волкова"
  },
  {
    text: "Срочно обратились с щенком - проблемы с желудком. Врач сразу поставил диагноз, назначил лечение. Через неделю малыш здоров!",
    author: "Андрей М."
  },
  {
    text: "Очень довольна обслуживанием! Персонал вежливый, врачи опытные. Мой старый пес чувствует себя намного лучше после лечения.",
    author: "Татьяна Белова"
  },
  {
    text: "Отдельное спасибо за работу в выходные! Когда наша кошка родила котят, врач приехал в воскресенье и помог принять роды.",
    author: "Игорь и Марина"
  },
  {
    text: "Профилактический осмотр прошел на отлично. Врач дал много полезных советов по питанию и уходу за котом. Обязательно приедем еще!",
    author: "Светлана Р."
  },
  {
    text: "Клиника спасла жизнь нашему кролику! Сложная операция, но все прошло успешно. Врачи - настоящие профессионалы!",
    author: "Владимир Соколов"
  },
  {
    text: "Замечательное отношение к животным! Мой нервный кот сразу успокоился в руках врача. Чувствуется, что люди любят свое дело.",
    author: "Наталья К."
  },
  {
    text: "Удобная онлайн запись, не нужно ждать в очереди. Пришли точно в назначенное время, все быстро и качественно.",
    author: "Алексей Морозов"
  },
  {
    text: "Вакцинировали здесь всех наших животных - двух собак и кота. Никаких побочных эффектов, все прививки качественные.",
    author: "Юлия Данилова"
  },
  {
    text: "Чипировали собаку перед поездкой за границу. Процедура прошла быстро и безболезненно. Документы оформили правильно.",
    author: "Роман В."
  },
  {
    text: "Лечили здесь нашу старенькую кошку от артрита. Назначили эффективное лечение, теперь она снова активная и игривая!",
    author: "Вера Макарова"
  },
  {
    text: "Отлично оборудованная клиника! Современное оборудование, чистота, приятная атмосфера. Животные здесь не испытывают стресса.",
    author: "Денис Козлов"
  },
  {
    text: "Спасибо за помощь с нашим хомячком! Не каждая клиника берется лечить таких малышей, а здесь помогли быстро и эффективно.",
    author: "Мария Тихонова"
  }
];

const Reviews: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reviewRowsRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Разделяем отзывы на 3 ряда
  const reviewRows = [
    reviews.slice(0, 6),   // Ряд 1: первые 6 отзывов
    reviews.slice(6, 12),  // Ряд 2: следующие 6 отзывов  
    reviews.slice(12, 18)  // Ряд 3: оставшиеся 6 отзывов
  ];

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Анимация заголовка
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.98
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          end: "top center+=100",
          toggleActions: "play none none reverse",
          scrub: 0.5
        }
      });

      // Анимация движения рядов с отзывами - создаем эффект бесконечности
      reviewRowsRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? -1 : 1; // четные ряды влево (0,2), нечетные вправо (1)
          const speed = 60 + (index * 15); // замедляем скорость: 60, 75, 90 секунд
          
          // Дублируем контент многократно для плавного бесконечного эффекта
          const originalContent = row.innerHTML;
          row.innerHTML = originalContent + originalContent + originalContent;
          
          // Устанавливаем начальную позицию в зависимости от направления
          const startPosition = direction === -1 ? 0 : -(row.scrollWidth / 3);
          const endPosition = direction === -1 ? -(row.scrollWidth / 3) : 0;
          
          gsap.set(row, { x: startPosition });
          
          gsap.to(row, {
            x: endPosition,
            duration: speed,
            ease: "none",
            repeat: -1,
            yoyo: false
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen w-full relative flex items-center justify-center"
    >
      {/* Эффект GradientBlinds */}
      <div style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0,
        pointerEvents: 'auto',
        zIndex: 1
      }}>
        <GradientBlinds
          gradientColors={['#00D4FF', '#08B3B8']}
          angle={45}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full max-w-[1440px] mx-auto py-8 sm:py-12 md:py-16 border-2 border-dashed border-red-500 container-type-inline"
        style={{
          paddingInline: 'var(--container-padding)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      >
        <div className="text-center w-full max-w-[900px] mx-auto border-2 border-dashed border-blue-500" style={{ pointerEvents: 'none' }}>
          <h2 
            ref={titleRef}
            className="font-black text-white leading-none tracking-tight font-inter overflow-hidden"
            style={{
              fontSize: "var(--about-h2-size)",
              marginBottom: "var(--hero-spacing-h2)",
            }}
          >
            Отзывы наших клиентов
          </h2>
        </div>
        
        {/* Зеленый контейнер с движущимися отзывами */}
        <div 
          className="mt-8 md:mt-12 w-full border-2 border-dashed border-green-500 overflow-hidden"
          style={{
            marginBlockStart: 'var(--spacing-lg)',
            height: '700px', // Увеличиваем высоту для всех отзывов
            pointerEvents: 'none'
          }}
        >
          {/* 3 ряда движущихся отзывов */}
          {reviewRows.map((rowReviews, rowIndex) => (
            <div 
              key={rowIndex}
              className="relative overflow-hidden"
              style={{ 
                height: '175px', // 150px + отступы
                marginBottom: rowIndex < reviewRows.length - 1 ? '50px' : '25px' // увеличиваем отступы
              }}
            >
              <div
                ref={(el) => { reviewRowsRefs.current[rowIndex] = el; }}
                className="absolute flex items-center"
                style={{
                  top: '12.5px', // центрируем по вертикали
                  left: '0',
                  height: '150px',
                  gap: '20px'
                }}
              >
                {rowReviews.map((review, reviewIndex) => (
                  <div
                    key={reviewIndex}
                    className="p-4 card-rounded flex-shrink-0"
                    style={{
                      width: '300px',
                      height: '150px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <div className="h-full flex flex-col justify-between">
                      <p className="text-white text-sm leading-relaxed font-inter line-clamp-4">
                        "{review.text}"
                      </p>
                      <p className="text-white/80 text-xs font-medium font-inter mt-2">
                        — {review.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
