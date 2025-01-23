import React, { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent, motion, useInView } from "framer-motion";
import Image from "next/image";
import { debounce } from "lodash";

export const SkillSection = () => {
  /**
   * ----------------------------------------
   * 1) Détecter si on est sur mobile ou pas
   * ----------------------------------------
   */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * ----------------------------------------
   * 2) Préparer le texte (version desktop / mobile)
   * ----------------------------------------
   */
  const textDesktop = `Hi, I am Roland Vrignon\na passionate developer\nand a design enthusiast`;
  const textMobile = `Hi, I am Roland Vrignon\na passionate\ndeveloper\nand a design\nenthusiast`;
  const text = isMobile ? textMobile : textDesktop;

  // On découpe en lignes (tableau de chaînes)
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  // Calcul pour chaque ligne : nombre total de lettres, index global de début/fin
  let cumulative = 0;
  const lineData = lines.map((line) => {
    const words = line.split(" ");
    const lettersInLine = words.reduce((acc, w) => acc + w.length, 0);
    const startIndex = cumulative;
    const endIndex = startIndex + lettersInLine;
    cumulative += lettersInLine;
    return { words, startIndex, endIndex };
  });

  const totalLetters = cumulative; // Nombre total de lettres dans tout le texte

  /**
   * ----------------------------------------
   * 3) Gestion du scroll et calcul currentIndex
   * ----------------------------------------
   */
  const containerRef = useRef<HTMLDivElement>(null);

  // Déclenche l'animation seulement quand la section entre dans le viewport
  const isInView = useInView(containerRef, {
    margin: "0px 0px -50% 0px",
    once: true,
  });

  // Framer Motion - scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.2 start", "end end"],
  });

  // currentIndex : index global pour savoir quelle lettre on est en train de « dépasser »
  const [currentIndex, setCurrentIndex] = useState(-5);
  const OFFSET = 15;
  const [animationPhase, setAnimationPhase] = useState(0); // 0: reveal, 1: zoom
  const [zoomProgress, setZoomProgress] = useState(0);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const wordRef = useRef<HTMLSpanElement>(null);
  const hasSetInitialPosition = useRef(false);
  const gothicRef = useRef<HTMLDivElement>(null);
  const rolandRef = useRef<HTMLSpanElement>(null);
  const [rolandPosition, setRolandPosition] = useState({ x: 0, y: 0 });

  // Calcul dynamique des valeurs de zoom en fonction de la taille de l'écran
  const [zoomConfig, setZoomConfig] = useState({
    offsetX: 0,
    offsetY: 0,
    transformOrigin: "0% 0%"
  });

  // Ajoutons des constantes d'ajustement fin
  const FINE_TUNING = {
    offsetX: -50,  // décalage horizontal supplémentaire
    offsetY: -100, // décalage vertical supplémentaire
    letterOffset: 2.5  // ajustement de la position du 'l' (entre 2 et 3 pour être entre le 'o' et le 'l')
  };

  // Calculer la position exacte du 'l' dans Roland
  useEffect(() => {
    const calculateZoomConfig = () => {
      if (rolandRef.current) {
        const rolandRect = rolandRef.current.getBoundingClientRect();
        const letterWidth = rolandRect.width / 6; // "Roland" a 6 lettres
        
        // Position du 'l' (3ème lettre) avec ajustement fin
        const lPosition = {
          x: rolandRect.left + letterWidth * FINE_TUNING.letterOffset,
          y: rolandRect.top + rolandRect.height / 2
        };

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Ajout des offsets de correction
        const offsetX = centerX - lPosition.x + FINE_TUNING.offsetX;
        const offsetY = centerY - lPosition.y + FINE_TUNING.offsetY;

        const gothicRect = gothicRef.current?.getBoundingClientRect();
        if (gothicRect) {
          const originX = ((lPosition.x - gothicRect.left) / gothicRect.width) * 100;
          const originY = ((lPosition.y - gothicRect.top) / gothicRect.height) * 100;

          setZoomConfig({
            offsetX,
            offsetY,
            transformOrigin: `${originX}% ${originY}%`
          });
        }
      }
    };

    let timeoutId: NodeJS.Timeout;
    
    if (animationPhase === 1) {
      // Debounce le calcul
      timeoutId = setTimeout(calculateZoomConfig, 50);
    }

    const debouncedResize = debounce(calculateZoomConfig, 100);
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [animationPhase]);

  // Calcul de la position de Roland
  useEffect(() => {
    if (animationPhase === 1 && rolandRef.current) {
      const rolandRect = rolandRef.current.getBoundingClientRect();
      
      // Position du centre de l'écran
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Position cible pour Roland (légèrement décalée vers la gauche pour le 'l')
      const targetX = centerX - 100; // 100px à gauche du centre
      const targetY = centerY;

      // Calcul du décalage nécessaire
      const offsetX = targetX - rolandRect.left;
      const offsetY = targetY - rolandRect.top;

      console.log('Positions:', { rolandRect, targetX, targetY, offsetX, offsetY });
      
      setRolandPosition({
        x: offsetX,
        y: offsetY
      });
    }
  }, [animationPhase]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isInView) {
      if (latest <= 0.50) {
        const adjustedIndex = (latest / 0.45) * (totalLetters + OFFSET);
        setCurrentIndex(adjustedIndex - OFFSET);
        setAnimationPhase(0);
      } 
      else {
        setCurrentIndex(totalLetters + OFFSET);
        setAnimationPhase(1);
        const zoomValue = (latest - 0.50) / 0.50;
        setZoomProgress(Math.min(1, Math.max(0, zoomValue)));
      }
    }
  });

  /**
   * ----------------------------------------
   * 4) Rendu final
   * ----------------------------------------
   *  - Par défaut TOUT est déjà visible en gris clair (#ccc)
   *  - Les lettres passent au gris moyen (#666) quand on s'approche
   *  - Puis deviennent noires (#000) quand on a dépassé la lettre
   */
  return (
    <section id="skills-section" ref={containerRef}>
      <div className="h-[60vh] bg-white"></div>
      <div className="w-screen h-[400vh] bg-white">
        <div className="sticky top-0 flex flex-col items-start justify-end h-[100vh] w-screen">
          <div className="overflow-hidden w-full h-full flex items-end">
            <div className="p-5 md:p-10 w-full">
              <div
                className={`whitespace-pre-wrap ${
                  isMobile ? "text-[20vw] leading-[16vw]" : "text-[10.5vw] leading-[8.5vw]"
                } text-left ml-0`}
              >
                <motion.div 
                  ref={gothicRef}
                  className="gothic"
                  style={{
                    transformOrigin: zoomConfig.transformOrigin,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'subpixel-antialiased',
                    WebkitTransform: 'translate3d(0,0,0)',
                    perspective: '1000px',
                    fontKerning: 'none',
                    textRendering: 'optimizeSpeed',
                  }}
                  animate={{
                    scale: animationPhase === 1 ? 1 + (Math.pow(zoomProgress, 2) * 900) : 1,
                    x: animationPhase === 1 ? zoomProgress * zoomConfig.offsetX : 0,
                    y: animationPhase === 1 ? zoomProgress * zoomConfig.offsetY : 0,
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "linear",
                    type: "tween",
                  }}
                >
                  {lineData.map(({ words, startIndex, endIndex }, lineIndex) => {
                    // On reconstruit la ligne lettre par lettre
                    let letterCountSoFar = 0;

                    return (
                      <div key={lineIndex}>
                        {words.map((word, wordIndex) => {
                          const letters = Array.from(word);

                          return (
                            <span
                              ref={word === "Roland" ? rolandRef : null}
                              key={`${lineIndex}-${wordIndex}`}
                              style={{
                                whiteSpace: "nowrap",
                                display: "inline-block",
                                marginRight: "0.27em",
                                position: "relative", // Toujours relative maintenant
                              }}
                            >
                              {letters.map((letter, letterIdx) => {
                                // Index global de la lettre
                                const globalLetterIndex = startIndex + letterCountSoFar;
                                letterCountSoFar++;

                                // "diff" = (position de la lettre) - (currentIndex)
                                // Si diff < 0 => on a dépassé la lettre => noir
                                // Si -1 < diff < 0 => on est en train de la dépasser => gris moyen
                                // Sinon => gris clair
                                const diff = globalLetterIndex - currentIndex;

                                let letterColor = "#ccc"; // gris clair par défaut

                                // Vérifie si le mot est "Roland" ou "Vrignon"
                                const isNameWord = word === "Roland" || word === "Vrignon";

                                if (diff < 0) {
                                  // On a déjà dépassé la lettre
                                  letterColor = isNameWord ? "#ff0000" : "#000";
                                } else if (diff < 1) {
                                  // On s'en approche
                                  letterColor = isNameWord ? "#ff5858" : "#666";
                                } else if (diff < 2) {
                                  letterColor = isNameWord ? "#ffb9b9" : "#888";
                                }

                                return (
                                  <motion.span
                                    key={`${lineIndex}-${wordIndex}-${letterIdx}`}
                                    style={{
                                      display: "inline-block",
                                      color: letterColor,
                                      marginRight: "-0.03em",
                                    }}
                                  >
                                    {letter}
                                  </motion.span>
                                );
                              })}

                              {/* Ajouter le SVG à la dernière lettre du dernier mot de la dernière ligne */}
                              {lineIndex === lineData.length - 1 &&
                                wordIndex === words.length - 1 && (
                                  <>
                                    <SVGReveal
                                      currentIndex={currentIndex}
                                      endIndex={endIndex}
                                    />
                                  </>
                                )}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * ----------------------------------------
 * 5) Le petit SVG final
 * ----------------------------------------
 * Apparaît uniquement quand l'index dépasse la dernière lettre
 */

const SVGRevealBis = ({
  currentIndex,
  endIndex,
}: {
  currentIndex: number;
  endIndex: number;
}) => {
  return (
    <motion.div
      variants={{
        left: { rotate: -20 },
        right: { rotate: 5 }
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: currentIndex >= endIndex ? 1 : 0,
        scale: currentIndex >= endIndex ? 1 : 0.5,
      }}
      transition={{ duration: 0.5 }}
      className="inline-block"
      style={{
        height: "1em",
        width: "auto",
        fill: "#ff0000",
        verticalAlign: "middle",
        marginLeft: "0.1em",
        marginBottom: "0.3em"
      }}
    >
      <Image
        src="/assets/svg/me.svg"
        alt="Description of the SVG"
        width={200}
        height={200}
      />
    </motion.div>
  );
};

const SVGReveal = ({
  currentIndex,
  endIndex,
}: {
  currentIndex: number;
  endIndex: number;
}) => {
  return (
    <motion.svg
      className="inline-block"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 141"
      preserveAspectRatio="xMinYMid"
      style={{
        height: "1em",
        width: "auto",
        fill: "#ff0000",
        verticalAlign: "middle",
        marginLeft: "0.1em",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: currentIndex >= endIndex ? 1 : 0,
        scale: currentIndex >= endIndex ? 1 : 0.5,
      }}
      transition={{ duration: 0.5 }}
    >
      <path d="M15,12h3v6h3v6h3v6h3v6h3v-9h-3v-9h-3V9h-3V3h-9v6h3V12z M12,27H9v-3H3v6h3v3h6V27z M45,30h3v-6h3v-3h-3v-3h-3
        v6h-3v9h3V30z M12,33v3h3v-3H12z M18,39v-3h-3v3H18z M30,42h3v-6h-3V42z M156,60h-3v-3h-3v-3h-6v-3h-3v-6h-3v-3h-3v-3h-3v-3h-3v-3h-3v-3h-3v-3h-3v3h-9v3H72v3h-9v3h-3v3h-3v3h-3v3h-6v3h-3v3h-3v6h-3v3h-6v3h-6v15h-3v18h3v12h3v3h3v3h3v3h3v3h3v3h3
        v3h6v3h9v-3h9v-3h3v-3h6v-3h9v-3h12v-3h6v3h6v6h3v3h3v3h12v-3h3v-3h6v-3h9v-3h9v-3h3v-6h3V87h3V63h-3V60z M108,81v-9h-3v-9h-3v-6h-3
        v-9h-3v-6h-3v3h-3v-3h-3v6h3v6h3v6h3v6h3v6h3v12h-3v3h-3v6h3v-3h3v3h-3v3h-6v-3h-9v3h-3v-3h-3v-6h-3v-6h-3v-9h-3v-9h-3v-9h-3v6h-3
        v6h3v6h3v6h3v6h3v9h3v3h-3v3h-6v3h-3v-3h3v-3H54v-3h-3v-6h-3v-3h-3v-9h-3v-6h-3v9h3v9h3v6h3v3h3v12H39v-3h-3v-3h-3v-6h-3v-3h-3
        v-9h-3v-9h3v-6h-3V63h3v-3h6v-3h6v-6h3v-6h3v-3h6v-3h3v-3h3v-3h3v-3h6v-3h9v-3h6v3h3v-3h6v-3h9v-3h9v3h3v3h3v6h3v3h3v3h3v12h3v3h3v9
        h3v12h-3v3h-3v3h3v3h-3v3h-9v-3h3v-3h-6v3H108z M153,75h-3v12h-3v3h-3v9h-3v3h-9v-3h-3v-3h-3v6h3v6h-3v3h-6v-9h-3v12h-3v-3h-3V96h3
        v-3h3v-3h6v-3h6v-3h3v-3h3v-3h3v-9h3v-3h-3v-3h-3v-9h3v3h6v3h3v3h3v3h3V75z M165,72v3h3v3h9v-6H165z M141,87v3h3v-3H141z M72,102h3
        v-3h-3V102z M174,117h-3v-12h-3v-9h-3V84h-3v36h3v15h9v-3h3v-3h-3V117z" />
    </motion.svg>
  );
};

// Ajoutons une fonction d'easing personnalisée
const easeScale = (x: number): number => {
  // Fonction exponentielle pour une accélération progressive
  return Math.pow(x, 2); // Vous pouvez ajuster l'exposant (2, 3, 4...) pour modifier la courbe
};

export default SkillSection;
