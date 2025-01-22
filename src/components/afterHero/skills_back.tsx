import React, { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, useInView } from "framer-motion";

export const SkillSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Utilisez useInView pour détecter si la section est visible
  const isInView = useInView(containerRef, {
    margin: "0px 0px -50% 0px", // Déclenche lorsque le milieu de la section entre dans la vue
    once: true, // Animation uniquement au premier passage
  });

  const isMobile = window.innerWidth < 768;
  const textDesktop = `Hi, I am Roland Vrignon,\na passionate developer\nand a design enthusiast`;
  const textMobile = `Hi, I am\nRoland\nVrignon, a\npassionate\ndeveloper\nand a\ndesign\nenthusiast`;
  const text = isMobile ? textMobile : textDesktop;

  // Découpe le texte en paragraphes et en mots
  const paragraphs = text.split("\n").filter((line) => line.trim() !== "");
  const wordsPerParagraph = paragraphs.map((p) => p.trim().split(" "));

  const paragraphBoundaries = wordsPerParagraph.map((paragraphWords, paragraphIndex) => {
    const startIndexParagraph = wordsPerParagraph
      .slice(0, paragraphIndex)
      .flat().length;

    return {
      startIndex: startIndexParagraph,
      words: paragraphWords.map((word, wordIndex) => {
        const globalWordIndex = startIndexParagraph + wordIndex;
        const letters = Array.from(word);
        return { letters, globalWordIndex };
      }),
    };
  });

  const totalLetters = paragraphBoundaries.reduce((sum, paragraph) => {
    return sum + paragraph.words.reduce((wSum, word) => wSum + word.letters.length, 0);
  }, 0);

  // Scroll interaction
  const [currentIndex, setCurrentIndex] = useState(-5);
  const OFFSET = 15; // Ajustez pour commencer et terminer correctement l'animation

  useMotionValueEvent(
    useScroll({
      target: containerRef,
      offset: ["0.2 start", "end end"], // Décalage pour démarrer à 20% de la section
    }).scrollYProgress,
    "change",
    (latest) => {
      if (isInView) {
        const adjustedIndex = latest * (totalLetters + OFFSET); // Calcul ajusté
        setCurrentIndex(adjustedIndex - OFFSET); // Ajoutez ou retirez l'offset
      }
    }
  );

  let letterCounter = 0;

  return (
    <section id="skills-section" ref={containerRef}>
      <div className="h-[60vh] bg-white"></div>
      <div className="w-screen h-[200vh] bg-white">
        <div className="sticky top-0 flex flex-col items-start justify-end h-[100vh] w-screen p-5 md:p-10">
          {/* Texte aligné à gauche */}
          <div
            className={`whitespace-pre-wrap ${isMobile ? "text-[23vw] leading-[18vw]" : "text-[11.5vw] leading-[10vw]"
              } text-left ml-0`}
          >
            <div className="gothic">
              {paragraphBoundaries.map((paragraph, paragraphIndex) => (
                <div key={paragraphIndex}>
                  {paragraph.words.map((wordObj, wordIndex) => (
                    <span
                      key={wordObj.globalWordIndex}
                      style={{
                        whiteSpace: "nowrap",
                        display: "inline-block",
                        marginRight: "0.27em",
                      }}
                    >
                      {wordObj.letters.map((letter, letterIndex) => {
                        const currentLetterIndex = letterCounter++;
                        const diff = currentLetterIndex - currentIndex;

                        let letterOpacity = 0.2;
                        if (diff < 0) {
                          letterOpacity = 1;
                        } else if (diff < 1) {
                          letterOpacity = 0.8;
                        } else if (diff < 2) {
                          letterOpacity = 0.6;
                        } else if (diff < 3) {
                          letterOpacity = 0.4;
                        }

                        let letterColor = "#000000"; // Couleur principale : Noir
                        if (diff >= 0) {
                          if (diff < 1) letterColor = "#1a1a1a";
                          else if (diff < 2) letterColor = "#4d4d4d";
                          else if (diff < 3) letterColor = "#808080";
                          else letterColor = "#b3b3b3";
                        }

                        return (
                          <motion.span
                            key={currentLetterIndex}
                            className="gothic"
                            style={{
                              display: "inline-block",
                              opacity: letterOpacity,
                              color: letterColor,
                              marginRight: "-0.03em",
                            }}
                          >
                            {letter}
                          </motion.span>
                        );
                      })}
                      {/* Ajouter le SVG après la dernière lettre du dernier mot */}
                      {paragraphIndex === paragraphBoundaries.length - 1 &&
                        wordIndex === paragraph.words.length - 1 && (
                          <motion.svg
                            className="inline-block"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 180 141"
                            preserveAspectRatio="xMinYMid"
                            style={{
                              height: "1em", // Même taille que les lettres
                              width: "auto", // Conserver les proportions
                              fill: "#ff0000", // Couleur du SVG
                              verticalAlign: "middle", // Centré verticalement
                              marginLeft: "0.1em", // Espacement entre le dernier mot et le SVG
                            }}
                            initial={{ opacity: 0, scale: 0.5 }} // Initialement invisible
                            animate={{
                              opacity: currentIndex >= totalLetters ? 1 : 0, // S'affiche uniquement après le texte
                              scale: currentIndex >= totalLetters ? 1 : 0.5, // Agrandissement fluide
                            }}
                            transition={{ duration: 0.5 }} // Transition douce
                          >
                            <path
                              d="M15,12h3v6h3v6h3v6h3v6h3v-9h-3v-9h-3V9h-3V3h-9v6h3V12z M12,27H9v-3H3v6h3v3h6V27z M45,30h3v-6h3v-3h-3v-3h-3
                               v6h-3v9h3V30z M12,33v3h3v-3H12z M18,39v-3h-3v3H18z M30,42h3v-6h-3V42z M156,60h-3v-3h-3v-3h-6v-3h-3v-6h-3v-3h-3v-3h-3v-3h-3v-3
                               h-3v-3h-3v-3h-3v-3h-3v3h-9v3H72v3h-9v3h-3v3h-3v3h-3v3h-3v3h-6v3h-3v3h-3v6h-3v3h-6v3h-6v15h-3v18h3v12h3v3h3v3h3v3h3v3h3v3h3
                               v3h6v3h9v-3h9v-3h3v-3h6v-3h9v-3h12v-3h6v3h6v6h3v3h3v3h12v-3h3v-3h6v-3h9v-3h9v-3h3v-6h3V87h3V63h-3V60z M108,81v-9h-3v-9h-3v-6h-3
                               v-9h-3v-6h-3v3h-3v-3h-3v6h3v6h3v6h3v6h3v6h3v12h-3v3h-3v6h3v-3h3v3h-3v3h-6v-3h-9v3h-3v-3h-3v-6h-3v-6h-3v-9h-3v-9h-3v-9h-3v6h-3
                               v6h3v6h3v6h3v6h3v6h3v9h3v3h-3v3h-6v3h-3v-3h3v-3H54v-3h-3v-6h-3v-3h-3v-9h-3v-6h-3v9h3v9h3v6h3v3h3v12H39v-3h-3v-3h-3v-6h-3v-3h-3
                               v-9h-3v-9h3v-6h-3V63h3v-3h6v-3h6v-6h3v-6h3v-3h6v-3h3v-3h3v-3h3v-3h6v-3h9v-3h6v3h3v-3h6v-3h9v-3h9v3h3v3h3v6h3v3h3v3h3v12h3v3h3v9
                               h3v12h-3v3h-3v3h3v3h-3v3h-9v-3h3v-3h-6v3H108z M153,75h-3v12h-3v3h-3v9h-3v3h-9v-3h-3v-3h-3v6h3v6h-3v3h-6v-9h-3v12h-3v-3h-3V96h3
                               v-3h3v-3h6v-3h6v-3h3v-3h3v-3h3v-9h3v-3h-3v-3h-3v-9h3v3h6v3h3v3h3v3h3V75z M165,72v3h3v3h9v-6H165z M141,87v3h3v-3H141z M72,102h3
                               v-3h-3V102z M174,117h-3v-12h-3v-9h-3V84h-3v36h3v15h9v-3h3v-3h-3V117z"
                            />
                          </motion.svg>
                        )}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
