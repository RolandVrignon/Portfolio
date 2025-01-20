"use client";

import { useEffect, useState } from "react";
import useSound from "use-sound";
import Image from "next/image";
import texture from "@/../public/assets/textures/texture.gif";

export const HeroSection = ({
  isOnHero,
  onEnterAfterHero,
  onEnterHero,
}: {
  isOnHero: boolean;
  onEnterAfterHero: () => void;
  onEnterHero: () => void;
}) => {
  const [currentFrame, setCurrentFrame] = useState(0); // Frame actuelle
  const totalFrames = 12; // Nombre total de frames (images)

  // Son pour les frames (tick.mp3)
  const [playFrameSound] = useSound("/assets/sound/tick2.mp3", {
    volume: 0.8,
    playbackRate: 1,
  });

  // Son pour le néon avec contrôle d'arrêt
  const [playNeonSound, { stop: stopNeonSound }] = useSound(
    "/assets/sound/neon_flicker.mp3",
    {
      volume: 0.3,
      playbackRate: 1,
      loop: true, // Boucle activée pour le son néon
    }
  );

  // Jouer le son des frames lorsque la frame change
  useEffect(() => {
    if (currentFrame > 0) {
      playFrameSound(); // Joue le son uniquement si une frame est affichée
    }
  }, [currentFrame, playFrameSound]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculer l'indice du frame en fonction de la position de scroll
      const maxScroll = windowHeight; // Définit la zone où l'animation se produit
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1); // Progression entre 0 et 1
      const frameIndex = Math.floor(progress * (totalFrames - 1));

      setCurrentFrame(frameIndex); // Met à jour la frame actuelle

      // Détecter quand on sort du Hero
      if (frameIndex === totalFrames - 1 && isOnHero) {
        onEnterAfterHero(); // On est sur AfterHero
        stopNeonSound(); // Arrêter le son néon
      }

      // Détecter quand on revient sur le Hero
      if (frameIndex < totalFrames - 1 && !isOnHero) {
        onEnterHero(); // On est sur Hero
        playNeonSound(); // Redémarrer le son néon si on revient
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    totalFrames,
    isOnHero,
    onEnterAfterHero,
    onEnterHero,
    playNeonSound,
    stopNeonSound,
  ]);

  // Jouer le son néon au chargement
  useEffect(() => {
    playNeonSound(); // Joue le son au début
  }, [playNeonSound]);

  return (
    <div className="relative flex justify-center items-center h-screen w-screen">
      <div className={`${isOnHero ? "fixed" : "hidden"} h-screen w-screen bg-[#171414]`}></div>

      {/* Texture en superposition */}
      <div
        className={`${isOnHero ? "fixed" : "hidden"} h-full w-full mix-blend-exclusion pointer-events-none opacity-20`}
      >
        <Image
          src={texture}
          alt="Texture"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Overlay pour les frames */}
      {currentFrame > 0 && (
        <div
          className={`${isOnHero ? "fixed" : "hidden"} top-0 left-0 w-full h-full z-50 pointer-events-none`}
        >
          <Image
            src={`/assets/animation/vortex/sprite_${currentFrame
              .toString()
              .padStart(2, "0")}.png`}
            alt={`Sprite frame ${currentFrame}`}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* Texte principal avec effet néon */}
      <span
        className={`${isOnHero ? "fixed" : "hidden"} jacquard-24-regular neon-effect text-[15vw] text-[#ff0000] w-full text-center`}
      >
        ./ roland.sh_
      </span>
    </div>
  );
};

export default HeroSection;
