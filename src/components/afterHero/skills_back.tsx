import React, { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent, motion, useInView } from "framer-motion";
import Image from "next/image";

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
  const textDesktop = `Hi, I am Roland\na passionate developer\nand a design enthusiast`;
  const textMobile = `Hi, I am Roland\na passionate\ndeveloper\nand a design\nenthusiast`;
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

  // Ajustons les constantes pour le 'l'
  const L_POSITION = {
    x: 0.2,  // Position du 'l' dans le mot
    offsetX: -300,  // Décalage horizontal
    transformOriginX: "42%"  // Point d'origine du zoom (même pourcentage que x)
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isInView) {
      if (latest <= 0.50) {
        const adjustedIndex = (latest / 0.45) * (totalLetters + OFFSET);
        setCurrentIndex(adjustedIndex - OFFSET);
        setAnimationPhase(0);
        // Reset le flag quand on revient en arrière
        hasSetInitialPosition.current = false;
      } 
      else {
        // Capture la position juste avant le changement de phase
        if (!hasSetInitialPosition.current && wordRef.current) {
          const rect = wordRef.current.getBoundingClientRect();
          console.log('rect:', rect)
          setInitialPosition({
            x: rect.left,
            y: rect.top
          });
          hasSetInitialPosition.current = true;
        }
        
        setCurrentIndex(totalLetters + OFFSET);
        setAnimationPhase(1);
        const detachProgress = (latest - 0.50) / 0.50;
        setZoomProgress(Math.min(1, Math.max(0, detachProgress)));
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
      {/* Espace "avant" pour déclencher le sticky */}
      <div className="h-[60vh] bg-white"></div>

      {/* Grande zone scrollable pour laisser le temps à l'animation */}
      <div className="w-screen h-[400vh] bg-white">
        <div className="sticky top-0 flex flex-col items-start justify-end h-[100vh] w-screen p-5 md:p-10">
          <div
            className={`whitespace-pre-wrap ${isMobile ? "text-[20vw] leading-[16vw]" : "text-[10.5vw] leading-[8.5vw]"
              } text-left ml-0`}
          >
            <div className="gothic">
              {lineData.map(({ words, startIndex, endIndex }, lineIndex) => {
                // On reconstruit la ligne lettre par lettre
                let letterCountSoFar = 0;

                return (
                  <div key={lineIndex}>
                    {words.map((word, wordIndex) => {
                      const letters = Array.from(word);

                      return (
                        <span
                          ref={word === "Roland" ? wordRef : null}
                          key={`${lineIndex}-${wordIndex}`}
                          style={{
                            whiteSpace: "nowrap",
                            display: "inline-block",
                            marginRight: "0.27em",
                            position: animationPhase === 1 && word === "Roland" ? "fixed" : "relative",
                            top: animationPhase === 1 && word === "Roland" ? `${initialPosition.y}px` : "auto",
                            left: animationPhase === 1 && word === "Roland" ? `${initialPosition.x}px` : "auto",
                            transform: animationPhase === 1 && word === "Roland" 
                              ? `translate(
                                  ${zoomProgress * (window.innerWidth/2 - initialPosition.x - (wordRef.current?.offsetWidth || 0) * L_POSITION.x + L_POSITION.offsetX)}px,
                                  ${zoomProgress * (window.innerHeight/2 - initialPosition.y)}px
                                ) scale(${1 + (easeScale(zoomProgress) * 200)})`
                              : "none",
                            transformOrigin: animationPhase === 1 && word === "Roland" 
                              ? `${L_POSITION.transformOriginX} center`
                              : "center center",
                            zIndex: animationPhase === 1 && word === "Roland" ? 50 : 1,
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
            </div>
          </div>

          {/* <div className="absolute top-[5vh] right-[10vw]">
            <motion.div
              variants={{
                left: { rotate: -20 },
                right: { rotate: 5 }
              }}
              initial="left"
              animate={["left", "right"]}
              transition={{
                duration: 0.01,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.4
              }}
            >
              <Image
                src="/assets/svg/me.svg"
                alt="Description of the SVG"
                width={300}
                height={300}
              />
            </motion.div>
          </div> */}
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
        v6h-3v9h3V30z M12,33v3h3v-3H12z M18,39v-3h-3v3H18z M30,42h3v-6h-3V42z M156,60h-3v-3h-3v-3h-6v-3h-3v-6h-3v-3h-3v-3h-3v-3h-3v-3h-3v-3h-3v-3h-3v3h-9v3H72v3h-9v3h-3v3h-3v3h-3v3h-3v3h-6v3h-3v3h-3v6h-3v3h-6v3h-6v15h-3v18h3v12h3v3h3v3h3v3h3v3h3v3h3
        v3h6v3h9v-3h9v-3h3v-3h6v-3h9v-3h12v-3h6v3h6v6h3v3h3v3h12v-3h3v-3h6v-3h9v-3h9v-3h3v-6h3V87h3V63h-3V60z M108,81v-9h-3v-9h-3v-6h-3
        v-9h-3v-6h-3v3h-3v-3h-3v6h3v6h3v6h3v6h3v6h3v12h-3v3h-3v6h3v-3h3v3h-3v3h-6v-3h-9v3h-3v-3h-3v-6h-3v-6h-3v-9h-3v-9h-3v-9h-3v6h-3
        v6h3v6h3v6h3v6h3v6h3v9h3v3h-3v3h-6v3h-3v-3h3v-3H54v-3h-3v-6h-3v-3h-3v-9h-3v-6h-3v9h3v9h3v6h3v3h3v12H39v-3h-3v-3h-3v-6h-3v-3h-3
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
