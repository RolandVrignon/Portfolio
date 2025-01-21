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
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0); // Frame actuelle
  const totalFrames = 13; // Nombre total de frames (images)

  // Son pour les frames (tick.mp3)
  const [playFrameSound] = useSound("/assets/sound/tick2.mp3", {
    volume: 1,
    playbackRate: 1,
  });

  // Son pour le néon avec contrôle d'arrêt
  const [playNeonSound, { stop: stopNeonSound }] = useSound(
    "/assets/sound/neon_flicker.mp3",
    {
      volume: 0.2,
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

  const enableSoundAndAnimation = () => {
    playNeonSound(); // Joue le son
    setIsSoundEnabled(true); // Active l'animation
    window.removeEventListener("click", enableSoundAndAnimation); // Supprime l'écouteur
  };

  useEffect(() => {
    // Ajoute un écouteur pour détecter une interaction utilisateur
    window.addEventListener("click", enableSoundAndAnimation);

    return () => {
      window.removeEventListener("click", enableSoundAndAnimation);
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center h-screen w-screen">
      <div className={`${isOnHero ? "fixed" : "hidden"} h-screen w-screen bg-[#171414]`}></div>

      {/* Texte principal avec effet néon */}
      <span
        className={`${isOnHero ? "fixed" : "hidden"} jacquard-24-regular neon-effect text-[15vw] text-[#ff0000] w-full text-center`}
      >
        &gt; ./rolandv.sh_
      </span>

      {/* Overlay pour les frames */}
      {currentFrame > 0 && (
        <div
          className={`${isOnHero ? "fixed" : "hidden"} top-0 left-0 w-full h-full pointer-events-none`}
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

      {/* Texture en superposition */}
    </div>
  );
};

export default HeroSection;
