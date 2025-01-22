"use client";

import Navbar from "@/components/afterHero/navbar";
import Skills from "@/components/afterHero/skills_back";

export const AfterHero = ({ showNavbar }: { showNavbar: boolean }) => {
  return (
    <>
      <Navbar isVisible={showNavbar} />
      <Skills />
    </>
  );
};

export default AfterHero;

{/* <motion.svg
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
</motion.svg> */}