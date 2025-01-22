"use client";

import { useRef, useState } from "react";
import HeroSection from "@/components/home/hero";
import AfterHero from "@/components/home/afterHero";
import Image from "next/image";
import "locomotive-scroll/dist/locomotive-scroll.css";
import texture from "@/../public/assets/textures/texture.gif";

export default function Home() {
  const containerRef = useRef(null);
  const [isOnHero, setIsOnHero] = useState(true);

  const handleEnterHero = () => setIsOnHero(true);
  const handleEnterAfterHero = () => setIsOnHero(false);

  return (
    <div ref={containerRef}>
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
    </div>
  );
}
