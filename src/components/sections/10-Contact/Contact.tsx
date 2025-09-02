import React from 'react';
import Image from 'next/image';

const Contact: React.FC = () => {
  return (
    <section className="min-h-screen w-full bg-black flex items-center justify-center">
      <div 
        className="w-full max-w-[1440px] mx-auto py-8 sm:py-12 md:py-16 border-2 border-dashed border-red-500 container-type-inline"
        style={{
          paddingInline: 'var(--container-padding)',
        }}
      >
        {/* Зеленый контейнер контента с Subgrid */}
        <div 
          className="mt-8 md:mt-12 w-full border-2 border-dashed border-green-500 overflow-hidden"
          style={{
            marginBlockStart: 'var(--spacing-lg)',
            height: 'var(--contact-rectangle-height)',
          }}
        >
          {/* Два фиолетовых прямоугольника, заполняющих весь зеленый контейнер */}
          <div className="flex flex-col sm:flex-row w-full h-full">
            {/* Левый фиолетовый прямоугольник с Яндекс картой */}
            <div 
              className="border-2 border-dashed border-purple-500 flex-1 h-full rounded-2xl overflow-hidden"
              style={{
                height: 'var(--contact-rectangle-height)',
              }}
            >
              {/* Яндекс карта без отступов */}
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A123456789&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Яндекс карта - Центр здоровья животных"
                style={{
                  border: 'none',
                  margin: '0',
                  padding: '0',
                }}
              />
            </div>
            
            {/* Правый фиолетовый прямоугольник */}
            <div 
              className="border-2 border-dashed border-purple-500 flex-1 p-8 flex flex-col justify-center card-rounded"
              style={{
                height: 'var(--contact-rectangle-height)',
              }}
            >
              {/* Заголовок и подзаголовок */}
              <div className="mb-8">
                <h2 
                  className="font-black text-gray-900 leading-none tracking-tight font-inter overflow-hidden text-white"
                  style={{
                    fontSize: "var(--about-h2-size)",
                    marginBottom: "var(--hero-spacing-h2)",
                  }}
                >
                  Контакты
                </h2>
                <h3 
                  className="text-gray-300 font-medium leading-relaxed font-inter text-lg"
                >
                  Свяжитесь с нами любым удобным способом
                </h3>
              </div>
              
              {/* Контактная информация */}
              <div className="text-white space-y-6">
                {/* Заголовок города */}
                <h3 className="text-2xl font-bold text-white mb-5 font-inter">
                  Г. Сочи
                </h3>
                
                {/* Адреса и время работы */}
                <div className="space-y-4">
                  <div className="border-l-4 border-white pl-4">
                    <p className="text-white text-base font-medium">Тепличная ул., 18а (с. Раздольное)</p>
                    <p className="text-gray-300 text-sm">24/7</p>
                  </div>
                  
                  <div className="border-l-4 border-white pl-4">
                    <p className="text-white text-base font-medium">Волжская ул., 30 (р-н Мамайка)</p>
                    <p className="text-gray-300 text-sm">09:00</p>
                  </div>
                  
                  <div className="border-l-4 border-white pl-4">
                    <p className="text-white text-base font-medium">Роз, 37 (р-н Центральный)</p>
                    <p className="text-gray-300 text-sm">09:00</p>
                  </div>
                </div>
                
                {/* Контакты */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-300 text-lg">📞</span>
                    <a 
                      href="tel:+78622332818" 
                      className="text-white hover:scale-105 transition-transform duration-300 text-base font-medium"
                    >
                      +7 (862) 233-28-18
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-300 text-lg">📱</span>
                    <a 
                      href="tel:+79882332818" 
                      className="text-white hover:scale-105 transition-transform duration-300 text-base font-medium"
                    >
                      +7 (988) 233-28-18
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-300 text-lg">✉️</span>
                    <a 
                      href="mailto:center.vet@mail.ru" 
                      className="text-white hover:scale-105 transition-transform duration-300 text-base font-medium"
                    >
                      center.vet@mail.ru
                    </a>
                  </div>
                </div>
                
                {/* Девиз - прибит к левому краю, белый цвет */}
                <div className="pt-4">
                  <p className="text-white text-base font-medium">
                    Заботливая команда профессионалов
                  </p>
                </div>
                
                {/* Иконки соцсетей */}
                <div className="pt-6">
                  <div className="flex items-center space-x-4">
                    {/* Telegram */}
                    <a 
                      href="https://t.me/center_vet" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    >
                      <Image 
                        src="/contact icons/free-icon-telegram-logo-87413.png"
                        alt="Telegram"
                        width={24}
                        height={24}
                        className="filter brightness-0 invert"
                      />
                    </a>
                    
                    {/* WhatsApp */}
                    <a 
                      href="https://wa.me/79882332818" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    >
                      <Image 
                        src="/contact icons/free-icon-whatsapp-1384023.png"
                        alt="WhatsApp"
                        width={24}
                        height={24}
                        className="filter brightness-0 invert"
                      />
                    </a>
                    
                    {/* Instagram */}
                    <a 
                      href="https://instagram.com/center_vet" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    >
                      <Image 
                        src="/contact icons/free-icon-instagram-1384031.png"
                        alt="Instagram"
                        width={24}
                        height={24}
                        className="filter brightness-0 invert"
                      />
                    </a>
                    
                    {/* Phone */}
                    <a 
                      href="tel:+79882332818"
                      className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    >
                      <Image 
                        src="/contact icons/free-icon-phone-call-5585562.png"
                        alt="Phone"
                        width={24}
                        height={24}
                        className="filter brightness-0 invert"
                      />
                    </a>
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

export default Contact;
