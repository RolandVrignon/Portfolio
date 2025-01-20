"use client";

import HeroSection from "@/components/home/hero";
import AfterHero from "@/components/home/afterHero";
import { useState } from "react";

export default function Home() {
  const [isOnHero, setIsOnHero] = useState(true); // Détermine si on est sur HeroSection

  // Callback pour indiquer que l'utilisateur est sur HeroSection
  const handleEnterHero = () => setIsOnHero(true);

  // Callback pour indiquer que l'utilisateur est sur AfterHero
  const handleEnterAfterHero = () => setIsOnHero(false);

  return (
    <div className="relative">
      <HeroSection
        isOnHero={isOnHero}
        onEnterAfterHero={handleEnterAfterHero}
        onEnterHero={handleEnterHero}
      />
      <AfterHero showNavbar={!isOnHero} />
    </div>
  );
}
