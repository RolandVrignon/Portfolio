"use client";

import HeroSection from "@/components/home/hero";
import AfterHero from "@/components/home/afterHero";
import { useState } from "react";
import Image from "next/image";
import texture from "@/../public/assets/textures/texture.gif";

export default function Home() {
  const [isOnHero, setIsOnHero] = useState(true); // Détermine si on est sur HeroSection

  // Callback pour indiquer que l'utilisateur est sur HeroSection
  const handleEnterHero = () => setIsOnHero(true);

  // Callback pour indiquer que l'utilisateur est sur AfterHero
  const handleEnterAfterHero = () => setIsOnHero(false);

  return (
    <>
      <div
        className={`fixed h-full w-full mix-blend-exclusion pointer-events-none opacity-20 z-[1000]`}
      >
        <Image
          src={texture}
          alt="Texture"
          layout="fill"
          objectFit="cover"
          quality={100}
          unoptimized
        />
      </div>
      <div className="relative">
        <HeroSection
          isOnHero={isOnHero}
          onEnterAfterHero={handleEnterAfterHero}
          onEnterHero={handleEnterHero}
        />
        <AfterHero showNavbar={!isOnHero} />
      </div>
    </>
  );
}
