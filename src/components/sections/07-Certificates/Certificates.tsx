import React from 'react';

const Certificates: React.FC = () => {
  return (
    <section className="min-h-screen w-full bg-white flex items-center justify-center">
      <div 
        className="w-full max-w-[1440px] mx-auto py-8 sm:py-12 md:py-16 border-2 border-dashed border-red-500 container-type-inline"
        style={{
          paddingInline: 'var(--container-padding)',
        }}
      >
        <div className="text-center w-full max-w-[900px] mx-auto border-2 border-dashed border-blue-500">
          <h2 
            className="font-black text-gray-900 leading-none tracking-tight font-inter overflow-hidden border-2 border-dashed border-orange-500 adaptive-heading scroll-animation-left"
            style={{
              fontSize: "var(--about-h2-size)",
              marginBottom: "var(--hero-spacing-h2)",
            }}
          >
            Сертификаты
          </h2>
          <h3 
            className="text-gray-700 font-medium leading-relaxed border-2 border-dashed border-orange-500 font-inter scroll-animation-right"
            style={{
              fontSize: 'var(--subheading-size)',
            }}
          >
            Наши достижения и сертификаты качества
          </h3>
        </div>
        
        {/* Зеленый контейнер контента с Subgrid */}
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
                  className="flex items-center justify-center rounded-xl overflow-hidden"
                  style={{
                    width: 'var(--rectangle-width)',
                    height: '600px',
                    background: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(8, 145, 178))',
                  }}
                >
                  <span className="text-white text-xl font-bold font-inter">Здесь будут сертификаты</span>
                </div>
                
                <div 
                  className="border-2 border-dashed border-purple-500 p-6 flex flex-col justify-center"
                  style={{
                    width: 'var(--rectangle-width)',
                    height: '600px',
                  }}
                >
                  {/* Заголовок */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-inter">
                    Сертификаты и квалификация
                  </h3>
                  
                  {/* Основной текст */}
                  <p className="text-gray-700 text-base leading-relaxed mb-4 font-inter">
                    Сотрудники &ldquo;Центр здоровья животных&rdquo; периодически проходят повышение квалификации, участвуют в семинарах, научно-практических конференциях и тд, для того чтобы оказывать нашим клиентам высококачественные услуги соответствующие современным тенденциям в ветеринарии.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
