"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Articles: React.FC = () => {
  // Данные статей
  const articlesData = [
    {
      id: 1,
      title: "КАК РАСПОЗНАТЬ, ЧТО ЖИВОТНОЕ БОЛЕЕТ 😥",
      image: "/stat/2025-09-02 15.58.41.jpg",
      shortContent: "Если животное перестает есть или, наоборот, начинает есть больше обычного, это может быть признаком проблемы. Апатия, агрессия, беспокойство или изменение привычного поведения могут указывать на болезнь.",
      fullContent: [
        "Если животное перестает есть или, наоборот, начинает есть больше обычного, это может быть признаком проблемы.",
        "Апатия, агрессия, беспокойство или изменение привычного поведения могут указывать на болезнь.",
        "Обратите внимание на изменения в весе, шерсти (потеря блеска, облысение) и коже (высыпания, покраснения).",
        "Ненормальные выделения из глаз, носа, ушей или рта могут свидетельствовать о заболевании.",
        "Одышка, учащенное дыхание или кашель также могут быть тревожными симптомами.",
        "Хромота, трудности при вставании или передвижении могут указывать на травмы или заболевания опорно-двигательной системы.",
        "Повышенная или пониженная температура тела может быть признаком инфекции или других заболеваний."
      ],
      conclusion: "Если вы заметили один или несколько из этих признаков, рекомендуется обратиться к ветеринару для диагностики и лечения 🔛",
      initialLikes: 42,
      initialComments: [
        { id: 1, author: 'Анна К.', text: 'Очень полезная статья! Спасибо!', time: '2 часа назад' },
        { id: 2, author: 'Михаил П.', text: 'У моего кота были такие симптомы, сразу к врачу пошли', time: '5 часов назад' },
        { id: 3, author: 'Елена В.', text: 'Отличная информация, буду знать на что обращать внимание', time: '1 день назад' }
      ]
    },
    {
      id: 2,
      title: "БЕЛЫЕ ВОРОНЫ ДЕЙСТВИТЕЛЬНО СУЩЕСТВУЮТ 😱",
      image: "/stat/2.jpg",
      shortContent: "Альбинизм — это отсутствие пигмента меланина, который делает животное белым, глаза - красными, а ноги - розовыми. Но у белых воронов наблюдается лейцизм, при котором пигмент теряется лишь частично.",
      fullContent: [
        "Альбинизм — это отсутствие пигмента меланина, который делает животное белым, глаза - красными, а ноги - розовыми.",
        "Но у белых воронов наблюдается лейцизм, при котором пигмент теряется лишь частично.",
        "Поэтому их оперение белое, но глаза обычно голубые.",
        "И выглядят они очень красиво 🤗"
      ],
      conclusion: "Удивительные создания природы, которые встречаются крайне редко! 🔛",
      initialLikes: 28,
      initialComments: [
        { id: 1, author: 'Дмитрий С.', text: 'Невероятно красивые птицы! Никогда не видел таких', time: '1 час назад' },
        { id: 2, author: 'Мария Л.', text: 'Интересно узнать разницу между альбинизмом и лейцизмом', time: '3 часа назад' },
        { id: 3, author: 'Алексей К.', text: 'Фото просто потрясающее! Спасибо за информацию', time: '6 часов назад' }
      ]
    },
    {
      id: 3,
      title: "СПОКОЙСТВИЕ, ТОЛЬКО СПОКОЙСТВИЕ 😩",
      image: "/stat/2025-09-02 17.18.10.jpg",
      shortContent: "Как стресс может влиять на здоровье вашего питомца? Ослаблять иммунную систему, делая животных более уязвимыми к инфекциям. Также стресс может вызывать проблемы с пищеварением.",
      fullContent: [
        "Как стресс может влиять на здоровье вашего питомца?",
        "Ослаблять иммунную систему, делая животных более уязвимыми к инфекциям. Также стресс может вызывать проблемы с пищеварением, такие как колики или расстройства желудка.",
        "Животные, испытывающие стресс, могут проявлять агрессию, страх или депрессию. Это может сказаться на их поведении и социальных взаимодействиях.",
        "Длительное воздействие стресса может привести к серьезным заболеваниям, включая сердечно-сосудистые проблемы, гормональные нарушения и даже сокращение продолжительности жизни."
      ],
      conclusion: "Важно обеспечить животным комфортные условия жизни и минимизировать стрессовые факторы для поддержания их здоровья и благополучия ♥️",
      initialLikes: 156,
      initialComments: [
        { id: 1, author: 'Ольга М.', text: 'Очень важная тема! Мой кот стал намного спокойнее после того, как мы создали ему уютное место', time: '30 минут назад' },
        { id: 2, author: 'Сергей В.', text: 'Никогда не думал, что стресс так сильно влияет на животных', time: '2 часа назад' },
        { id: 3, author: 'Анна П.', text: 'Спасибо за полезную информацию! Буду внимательнее к своему питомцу', time: '4 часа назад' },
        { id: 4, author: 'Марина К.', text: 'У моего пса была агрессия из-за стресса, теперь все наладилось', time: '1 час назад' },
        { id: 5, author: 'Дмитрий Л.', text: 'Отличная статья! Теперь понимаю, почему мой кот плохо ест', time: '3 часа назад' },
        { id: 6, author: 'Елена С.', text: 'Создала для своей собаки тихое место, и она стала намного спокойнее', time: '5 часов назад' },
        { id: 7, author: 'Александр Н.', text: 'Интересно, как стресс влияет на иммунитет животных', time: '6 часов назад' },
        { id: 8, author: 'Татьяна Р.', text: 'Мой ветеринар тоже говорил о важности спокойной обстановки', time: '8 часов назад' }
      ]
          }
    ];

  // Данные видео
  const videosData = [
    {
      id: 1,
      title: "Знакомство с нашим центром",
      video: "/stat/Video/IMG_9092.MOV",
      description: "Узнайте больше о нашем ветеринарном центре и команде профессионалов",
      initialLikes: 89,
      initialComments: []
    },
    {
      id: 2,
      title: "Наши специалисты",
      video: "/stat/Video/IMG_9172.MOV",
      description: "Познакомьтесь с нашей командой опытных ветеринаров",
      initialLikes: 67,
      initialComments: []
    },
    {
      id: 3,
      title: "Современное оборудование",
      video: "/stat/Video/IMG_9189.MOV",
      description: "Используем передовые технологии для диагностики и лечения",
      initialLikes: 124,
      initialComments: []
    },
    {
      id: 4,
      title: "Процедуры и лечение",
      video: "/stat/Video/IMG_8445.MOV",
      description: "Профессиональный подход к лечению и уходу за животными",
      initialLikes: 156,
      initialComments: []
    },
    {
      id: 5,
      title: "Реабилитация животных",
      video: "/stat/Video/IMG_8406.MOV",
      description: "Комплексная реабилитация и восстановление здоровья питомцев",
      initialLikes: 98,
      initialComments: []
    }
  ];

  // Состояния для каждой статьи
  const [expandedStates, setExpandedStates] = useState<Record<number, boolean>>({});
  const [likedStates, setLikedStates] = useState<Record<number, boolean>>({});
  const [likesCounts, setLikesCounts] = useState<Record<number, number>>({});
  const [showCommentsStates, setShowCommentsStates] = useState<Record<number, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [commentsData, setCommentsData] = useState<Record<number, any[]>>({});

  // Состояния для видео
  const [videoLikedStates, setVideoLikedStates] = useState<Record<number, boolean>>({});
  const [videoLikesCounts, setVideoLikesCounts] = useState<Record<number, number>>({});
  const [videoShowCommentsStates, setVideoShowCommentsStates] = useState<Record<number, boolean>>({});
  const [videoCommentInputs, setVideoCommentInputs] = useState<Record<number, string>>({});
  const [videoCommentsData, setVideoCommentsData] = useState<Record<number, any[]>>({});
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [videoPlayingStates, setVideoPlayingStates] = useState<Record<number, boolean>>({});

  // Инициализация состояний
  useEffect(() => {
    const initialExpanded: Record<number, boolean> = {};
    const initialLiked: Record<number, boolean> = {};
    const initialLikes: Record<number, number> = {};
    const initialShowComments: Record<number, boolean> = {};
    const initialCommentInputs: Record<number, string> = {};
    const initialComments: Record<number, any[]> = {};

    articlesData.forEach(article => {
      initialExpanded[article.id] = false;
      initialLiked[article.id] = false;
      initialLikes[article.id] = article.initialLikes;
      initialShowComments[article.id] = false;
      initialCommentInputs[article.id] = '';
      initialComments[article.id] = article.initialComments;
    });

    setExpandedStates(initialExpanded);
    setLikedStates(initialLiked);
    setLikesCounts(initialLikes);
    setShowCommentsStates(initialShowComments);
    setCommentInputs(initialCommentInputs);
    setCommentsData(initialComments);

    // Инициализация состояний для видео
    const initialVideoLiked: Record<number, boolean> = {};
    const initialVideoLikes: Record<number, number> = {};
    const initialVideoShowComments: Record<number, boolean> = {};
    const initialVideoCommentInputs: Record<number, string> = {};
    const initialVideoComments: Record<number, any[]> = {};

    videosData.forEach(video => {
      initialVideoLiked[video.id] = false;
      initialVideoLikes[video.id] = video.initialLikes;
      initialVideoShowComments[video.id] = false;
      initialVideoCommentInputs[video.id] = '';
      initialVideoComments[video.id] = video.initialComments;
    });

    const initialVideoPlaying: Record<number, boolean> = {};
    videosData.forEach(video => {
      initialVideoPlaying[video.id] = false;
    });

    setVideoLikedStates(initialVideoLiked);
    setVideoLikesCounts(initialVideoLikes);
    setVideoShowCommentsStates(initialVideoShowComments);
    setVideoCommentInputs(initialVideoCommentInputs);
    setVideoCommentsData(initialVideoComments);
    setVideoPlayingStates(initialVideoPlaying);
  }, []);

  // Функции для работы с лайками и комментариями
  const handleLike = (articleId: number) => {
    setLikedStates(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
    setLikesCounts(prev => ({
      ...prev,
      [articleId]: prev[articleId] + (likedStates[articleId] ? -1 : 1)
    }));
  };

  const handleAddComment = (articleId: number) => {
    const commentText = commentInputs[articleId];
    if (commentText?.trim()) {
      const newComment = {
        id: commentsData[articleId]?.length + 1 || 1,
        author: 'Вы',
        text: commentText.trim(),
        time: 'Только что'
      };
      setCommentsData(prev => ({
        ...prev,
        [articleId]: [newComment, ...(prev[articleId] || [])]
      }));
      setCommentInputs(prev => ({
        ...prev,
        [articleId]: ''
      }));
    }
  };

  const handleToggleExpanded = (articleId: number) => {
    setExpandedStates(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  const handleToggleComments = (articleId: number) => {
    setShowCommentsStates(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  // Функции для работы с видео
  const handleVideoLike = (videoId: number) => {
    setVideoLikedStates(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
    setVideoLikesCounts(prev => ({
      ...prev,
      [videoId]: prev[videoId] + (videoLikedStates[videoId] ? -1 : 1)
    }));
  };

  const handleVideoAddComment = (videoId: number) => {
    const commentText = videoCommentInputs[videoId];
    if (commentText?.trim()) {
      const newComment = {
        id: videoCommentsData[videoId]?.length + 1 || 1,
        author: 'Вы',
        text: commentText.trim(),
        time: 'Только что'
      };
      setVideoCommentsData(prev => ({
        ...prev,
        [videoId]: [newComment, ...(prev[videoId] || [])]
      }));
      setVideoCommentInputs(prev => ({
        ...prev,
        [videoId]: ''
      }));
    }
  };

  const handleVideoToggleComments = (videoId: number) => {
    setVideoShowCommentsStates(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const handleVideoPlay = (videoId: number) => {
    setVideoPlayingStates(prev => ({
      ...prev,
      [videoId]: true
    }));
  };

  const handleVideoPause = (videoId: number) => {
    setVideoPlayingStates(prev => ({
      ...prev,
      [videoId]: false
    }));
  };

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
            Полезные статьи
          </h2>
        </div>
        
        {/* Зеленый контейнер для статей */}
        <div 
          className="mt-8 md:mt-12 w-full border-2 border-dashed border-green-500 overflow-hidden min-h-[300px]"
          style={{
            marginBlockStart: 'var(--spacing-lg)',
          }}
        >
          
          {/* Карточки статей */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {articlesData.map((article) => (
              <div key={article.id} className="border-2 border-dashed border-purple-500 min-h-[600px] rounded-xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group relative">
                {/* Instagram-style кнопки справа */}
                <div className={`absolute right-4 z-30 flex flex-col space-y-3 ${expandedStates[article.id] ? 'top-4' : 'top-2/5 transform -translate-y-1/2'}`}>
                  {/* Большой палец вверх для лайка с круглой обводкой */}
                  <div className="flex flex-col items-center space-y-1">
                    <div 
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 transform hover:scale-110 border-2 border-white/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(article.id);
                      }}
                    >
                      <Image 
                        src={likedStates[article.id] ? "/stat/icons/icon-thumb-up active.png" : "/stat/icons/free-icon-thumb-up-17041194.png"}
                        alt="Лайк"
                        width={24}
                        height={24}
                        className="transition-all duration-300"
                      />
                    </div>
                    {/* Счетчик лайков */}
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
                      <span className="text-white text-xs font-medium">{likesCounts[article.id]}</span>
                    </div>
                  </div>
                  
                  {/* Иконка комментариев с круглой обводкой */}
                  <div className="flex flex-col items-center space-y-1">
                    <div 
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 transform hover:scale-110 border-2 border-white/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleComments(article.id);
                      }}
                    >
                      <Image 
                        src="/stat/icons/free-icon-comment-5755460.png"
                        alt="Комментарии"
                        width={24}
                        height={24}
                        className="filter brightness-0"
                      />
                    </div>
                    {/* Счетчик комментариев */}
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
                      <span className="text-white text-xs font-medium">{commentsData[article.id]?.length || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Фоновое изображение */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  {/* Темный градиент для читаемости текста */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>

                {/* Заголовок статьи */}
                <div className="absolute top-4 left-4 right-4 z-20">
                  <h3 className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white font-bold text-lg font-inter">
                    {article.title}
                  </h3>
                </div>

                {/* Контент статьи */}
                <div className="relative z-10 p-4 flex flex-col justify-end h-full text-white">
                  {!expandedStates[article.id] ? (
                    /* Свернутое состояние - краткое содержание */
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-xs text-white/95 font-inter mb-3">
                        <p className="leading-relaxed">{article.shortContent}</p>
                      </div>
                      
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-md p-2 text-center cursor-pointer hover:bg-gradient-to-r hover:from-cyan-600 hover:to-teal-600 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleExpanded(article.id);
                        }}
                      >
                        <p className="text-xs font-semibold font-inter">
                          📖 ЧИТАТЬ ПОЛНОСТЬЮ
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Развернутое состояние - полная статья */
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                      <div className="text-xs text-white/95 font-inter space-y-2 mb-4">
                        {article.fullContent.map((paragraph, index) => (
                          <p key={index} className="leading-relaxed">{paragraph}</p>
                        ))}
                      </div>
                      
                      <div className="border-t border-white/20 pt-3">
                        <p className="text-xs text-white/90 font-inter mb-3">
                          {article.conclusion}
                        </p>
                        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-md p-2 text-center">
                          <p className="text-xs font-semibold font-inter">
                            📞 Единый телефон нашего центра: 8 988 233 28 18
                          </p>
                        </div>
                      </div>
                      
                      {/* Кнопка "Свернуть" */}
                      <div 
                        className="mt-3 bg-white/20 text-white rounded-md p-2 text-center cursor-pointer hover:bg-white/30 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleExpanded(article.id);
                        }}
                      >
                        <p className="text-xs font-semibold font-inter">
                          🔽 СВЕРНУТЬ
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Зеленый контейнер для видео */}
        <div 
          className="mt-8 md:mt-12 w-full border-2 border-dashed border-green-500 overflow-hidden min-h-[300px]"
          style={{
            marginBlockStart: 'var(--spacing-lg)',
          }}
        >
          {/* Заголовок для видео */}
          <div className="text-center mb-6">
            <h3 
              className="font-black text-gray-900 leading-none tracking-tight font-inter overflow-hidden"
              style={{
                fontSize: "var(--about-h2-size)",
                marginBottom: "var(--hero-spacing-h2)",
              }}
            >
              Видео "Центр здоровья животных"
            </h3>
          </div>
          
          {/* Видео карточки */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {videosData.slice(0, showAllVideos ? videosData.length : 3).map((video) => (
              <div key={video.id} className="border-2 border-dashed border-purple-500 min-h-[600px] rounded-xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group relative">
                  {/* Instagram-style кнопки справа */}
                  <div className="absolute right-4 top-2/5 transform -translate-y-1/2 z-30 flex flex-col space-y-3">
                    {/* Лайк с круглой обводкой */}
                    <div className="flex flex-col items-center space-y-1">
                      <div 
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 transform hover:scale-110 border-2 border-white/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoLike(video.id);
                        }}
                      >
                        <Image 
                          src={videoLikedStates[video.id] ? "/stat/icons video/like active.png" : "/stat/icons video/like.png"}
                          alt="Лайк"
                          width={24}
                          height={24}
                          className="transition-all duration-300"
                        />
                      </div>
                      {/* Счетчик лайков */}
                      <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
                        <span className="text-white text-xs font-medium">{videoLikesCounts[video.id]}</span>
                      </div>
                    </div>
                    
                    {/* Иконка комментариев с круглой обводкой */}
                    <div className="flex flex-col items-center space-y-1">
                      <div 
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 transform hover:scale-110 border-2 border-white/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoToggleComments(video.id);
                        }}
                      >
                        <Image 
                          src="/stat/icons/free-icon-comment-5755460.png"
                          alt="Комментарии"
                          width={24}
                          height={24}
                          className="filter brightness-0"
                        />
                      </div>
                      {/* Счетчик комментариев */}
                      <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
                        <span className="text-white text-xs font-medium">{videoCommentsData[video.id]?.length || 0}</span>
                      </div>
                    </div>
                  </div>

                                      {/* Видео контейнер */}
                    <div className="absolute inset-0 w-full h-full">
                      <video
                        src={video.video}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        playsInline
                        onPlay={() => handleVideoPlay(video.id)}
                        onPause={() => handleVideoPause(video.id)}
                        onEnded={() => handleVideoPause(video.id)}
                      />
                      
                      {/* Кнопка Play/Pause по центру */}
                      {!videoPlayingStates[video.id] && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center border-2 border-white/30">
                            <span className="text-white text-3xl">▶</span>
                          </div>
                        </div>
                      )}
                    </div>
                </div>
              ))}
            </div>
            
            {/* Кнопка "Показать все видео" */}
            {videosData.length > 3 && (
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => setShowAllVideos(!showAllVideos)}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 font-medium text-lg"
                >
                  {showAllVideos ? '📹 Скрыть видео' : `📹 Показать все видео (${videosData.length})`}
                </button>
              </div>
            )}
          

        </div>
      </div>
      
      {/* Модальные окна комментариев для всех статей */}
      {articlesData.map((article) => (
        showCommentsStates[article.id] && (
          <div key={`modal-${article.id}`} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
              {/* Заголовок модального окна */}
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold font-inter">Комментарии</h3>
                <button 
                  onClick={() => handleToggleComments(article.id)}
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>
              
              {/* Содержимое модального окна */}
              <div className="p-4">
                {/* Поле для добавления комментария */}
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={commentInputs[article.id] || ''}
                    onChange={(e) => setCommentInputs(prev => ({
                      ...prev,
                      [article.id]: e.target.value
                    }))}
                    placeholder="Написать комментарий..."
                    className="flex-1 bg-gray-100 text-gray-800 text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(article.id)}
                  />
                  <button
                    onClick={() => handleAddComment(article.id)}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm rounded-lg px-4 py-2 hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 font-medium"
                  >
                    Отправить
                  </button>
                </div>
                
                {/* Список комментариев */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {commentsData[article.id]?.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-800 font-inter">{comment.author}</span>
                        <span className="text-xs text-gray-500 font-inter">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 font-inter">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      ))}

      {/* Модальные окна комментариев для всех видео */}
      {videosData.map((video) => (
        videoShowCommentsStates[video.id] && (
          <div key={`video-modal-${video.id}`} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
              {/* Заголовок модального окна */}
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold font-inter">Комментарии</h3>
                <button 
                  onClick={() => handleVideoToggleComments(video.id)}
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>
              
              {/* Содержимое модального окна */}
              <div className="p-4">
                {/* Поле для добавления комментария */}
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={videoCommentInputs[video.id] || ''}
                    onChange={(e) => setVideoCommentInputs(prev => ({
                      ...prev,
                      [video.id]: e.target.value
                    }))}
                    placeholder="Написать комментарий..."
                    className="flex-1 bg-gray-100 text-gray-800 text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleVideoAddComment(video.id)}
                  />
                  <button
                    onClick={() => handleVideoAddComment(video.id)}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm rounded-lg px-4 py-2 hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 font-medium"
                  >
                    Отправить
                  </button>
                </div>
                
                {/* Список комментариев */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {videoCommentsData[video.id]?.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-800 font-inter">{comment.author}</span>
                        <span className="text-xs text-gray-500 font-inter">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 font-inter">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      ))}


    </section>
  );
};

export default Articles;
