"use client";

import React from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const Team: React.FC = () => {
  // Данные команды
  const teamMembers = [
    {
      name: "Волкова Галина Николаевна",
      specialization: "Терапевт, хирург, эндокринолог, дерматолог, кардиолог",
      position: "Главный врач филиала ул. Тепличная 184",
      image: "/image blok nasha comanda/1.jpg"
    },
    {
      name: "Шкиль Светлана Леонидовна", 
      specialization: "Хирург, онколог",
      position: "Главный врач филиала ул. Волжская 30",
      image: "/image blok nasha comanda/2.jpg"
    },
    {
      name: "Ярославская Анастасия Михайловна",
      specialization: "Дерматолог, эндокринолог, визуальная диагностика", 
      position: "Главный ветеринарный врач филиала ул. Роз 37",
      image: "/image blok nasha comanda/3.jpg"
    },
    {
      name: "Брагин Юрий Михайлович",
      specialization: "Хирург, невролог, ортопед",
      position: "Ветеринарный врач — хирург, невролог", 
      image: "/image blok nasha comanda/4.jpg"
    },
    {
      name: "Фанфора Илья Станиславович",
      specialization: "Хирург, стоматолог",
      position: "Ветеринарный врач — хирург, стоматолог",
      image: "/image blok nasha comanda/5.jpg"
    },
    {
      name: "Шарипа Карина Игоревна", 
      specialization: "Невролог, уролог",
      position: "Ветеринарный врач-терапевт, нефролог",
      image: "/image blok nasha comanda/6.jpg"
    },
    {
      name: "Ковалёв Сергей Васильевич",
      specialization: "Ветеринарный врач-терапевт",
      position: "",
      image: "/image blok nasha comanda/7.jpg"
    },
    {
      name: "Николаишина Евгения Олеговна",
      specialization: "Дерматолог, диагностика", 
      position: "Ветеринарный врач-терапевт",
      image: "/image blok nasha comanda/8.jpg"
    },
    {
      name: "Осипова Дарья Андреевна",
      specialization: "Анестезиология",
      position: "Ветеринарный врач отделения интенсивной терапии и реанимации, врач стационара",
      image: "/image blok nasha comanda/9.jpg"
    },
    {
      name: "Феткулов Антон Александрович",
      specialization: "Ветеринарный врач интенсивной терапии и реанимации, врач стационара", 
      position: "",
      image: "/image blok nasha comanda/10.jpg"
    },
    {
      name: "Чубарова Алиса Андреевна",
      specialization: "Ветеринарный врач-ординатор отделения интенсивной терапии и реанимации",
      position: "",
      image: "/image blok nasha comanda/11.jpg"
    },
    {
      name: "Рожкова Екатерина Александровна",
      specialization: "Ветеринарный врач-ординатор отделения интенсивной терапии и реанимации",
      position: "",
      image: "/image blok nasha comanda/12.jpg"
    },
    {
      name: "Зыбайлова Оксана Олеговна",
      specialization: "Ветеринарный врач-терапевт", 
      position: "",
      image: "/image blok nasha comanda/13.jpg"
    },
    {
      name: "Морозова Анастасия Сергеевна",
      specialization: "Ветеринарный врач-лаборант",
      position: "",
      image: "/image blok nasha comanda/14.jpg"
    },
    {
      name: "Красюк Кристина Александровна",
      specialization: "Администратор",
      position: "",
      image: "/image blok nasha comanda/15.jpg"
    },
    {
      name: "Курносова Снежана Вячеславовна",
      specialization: "Администратор",
      position: "",
      image: "/image blok nasha comanda/16.jpg"
    },
    {
      name: "Устинова Анастасия Витальевна",
      specialization: "Администратор", 
      position: "",
      image: "/image blok nasha comanda/17.jpg"
    },
    {
      name: "Гладышева Анастасия Олеговна",
      specialization: "Ассистент",
      position: "",
      image: "/image blok nasha comanda/18.jpg"
    },
    {
      name: "Каминская Дарья Никитична",
      specialization: "Ассистент 1 категории",
      position: "",
      image: "/image blok nasha comanda/19.jpg"
    },
    {
      name: "Ярославский Лев Сергеевич",
      specialization: "Ассистент 2 категории",
      position: "",
      image: null // placeholder
    }
  ];

  // 🚀 ПУШКА! Финальная быстрая функция для всех карточек команды
  const createAwesomeTeamHoverEffect = () => ({
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const image = card.querySelector('img');
      const overlay = card.querySelector('.team-overlay') as HTMLElement;
      
      // Быстрая анимация blur для фотографии
      if (image) {
        gsap.to(image, {
          filter: 'blur(2px) brightness(0.6)',
          duration: 0.2,
          ease: "power1.out"
        });
      }
      
      // Быстрое появление overlay без лишних эффектов
      if (overlay) {
        gsap.set(overlay, { display: 'flex' });
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.2,
          ease: "power1.out"
        });
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const image = card.querySelector('img');
      const overlay = card.querySelector('.team-overlay') as HTMLElement;
      
      // Быстрое возвращение фотографии
      if (image) {
        gsap.to(image, {
          filter: 'blur(0px) brightness(1)',
          duration: 0.2,
          ease: "power1.out"
        });
      }
      
      // Быстрое скрытие overlay
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.15,
          ease: "power1.out",
          onComplete: () => {
            gsap.set(overlay, { display: 'none' });
          }
        });
      }
    }
  });

  return (
    <section 
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: '#ffffff'
      }}
    >
      <div 
        className="w-full max-w-[1440px] mx-auto py-8 sm:py-12 md:py-16 border-2 border-dashed border-red-500 container-type-inline"
        style={{
          paddingInline: 'var(--container-padding)',
        }}
      >
        <div className="text-center w-full max-w-[900px] mx-auto border-2 border-dashed border-blue-500">
          <h2 
            className="font-black text-gray-900 leading-none tracking-tight font-inter overflow-hidden border-2 border-dashed border-orange-500"
            style={{
              fontSize: "var(--about-h2-size)",
              marginBottom: "var(--hero-spacing-h2)",
            }}
          >
            Наша профессиональная команда
          </h2>
          <h3 
            className="text-gray-700 font-medium leading-relaxed border-2 border-dashed border-orange-500 font-inter"
            style={{
              fontSize: 'var(--subheading-size)',
            }}
          >
            Ветеринары с многолетним опытом
          </h3>
        </div>
        
        {/* Зеленый контейнер контента с Subgrid */}
        <div 
          className="w-full border-2 border-dashed border-green-500 overflow-hidden"
          style={{
            marginBlockStart: 'var(--spacing-lg)',
          }}
        >
          {/* CSS Grid с auto-fit для карточек команды */}
          <div className="auto-fit-grid min-h-[800px] gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="team-card bg-gray-50 rounded-lg shadow-lg hover:shadow-2xl border-2 border-dashed border-purple-500 min-h-[360px] flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer"
                {...createAwesomeTeamHoverEffect()}
              >
                {/* Фотография на весь размер карточки или placeholder */}
                {member.image ? (
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover" 
                  />
                ) : (
                  <div 
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))'
                    }}
                  >
                    <span className="text-white text-lg font-medium font-inter">Фото врача</span>
                </div>
                )}
                
                {/* Упрощенный overlay - текст прямо на фото без лишних рамок */}
                <div className="team-overlay absolute inset-0 rounded-lg p-6 flex items-center justify-center hidden backdrop-blur-md bg-black/30">
                  <div className="text-center max-w-full">
                    <h4 className="text-white text-lg sm:text-xl font-bold mb-2 font-inter drop-shadow-xl leading-tight">
                      {member.name}
                    </h4>
                    <p className="text-white/95 text-sm sm:text-base mb-1 font-inter font-medium drop-shadow-lg leading-snug">
                      {member.specialization}
                    </p>
                    {member.position && (
                      <p className="text-white/90 text-xs sm:text-sm font-inter drop-shadow-lg leading-snug">
                        {member.position}
                      </p>
                    )}
            </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
