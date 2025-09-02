"use client";

import Hero from '@/components/sections/01-Hero/Hero';
import Advantages from '@/components/sections/04-Advantages/Advantages';
import OnlineBooking from '@/components/sections/05-OnlineBooking/OnlineBooking';
import Team from '@/components/sections/06-Team/Team';
import Certificates from '@/components/sections/07-Certificates/Certificates';
import Reviews from '@/components/sections/08-Reviews/Reviews';
import Articles from '@/components/sections/09-Articles/Articles';
import Contact from '@/components/sections/10-Contact/Contact';
import MobileVersion from '@/components/MobileVersion';
import LoadingScreen from '@/components/LoadingScreen';
import { useLoadingScreen } from '@/hooks/useLoadingScreen';

export default function Home() {
  const { isLoading } = useLoadingScreen();

  return (
    <>
      {/* Загрузочный экран */}
      {isLoading && <LoadingScreen />}
      
      {/* Skip link для доступности */}
      <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
        Перейти к основному содержанию
      </a>
      
      {/* Мобильная версия (скрыта на больших экранах) */}
      <div className="lg:hidden">
        <MobileVersion />
      </div>
      
                     {/* Десктопная версия (скрыта на маленьких экранах) */}
               <main 
                 className="hidden lg:block min-h-screen w-full min-w-[320px] overflow-x-hidden"
                 id="main-content"
                 style={{
                   viewTransitionName: 'root'
                 }}
                               >
                  <Hero />
        <Advantages />
        <OnlineBooking />
        <Team />
        <Certificates />
        <Reviews />
        <Articles />
        <Contact />
      </main>
    </>
  );
}
