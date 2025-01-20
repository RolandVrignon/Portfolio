"use client";

import Navbar from "@/components/afterHero/navbar";
import Skills from "@/components/afterHero/skills";

export const AfterHero = ({ showNavbar }: { showNavbar: boolean }) => {
  return (
    <>
      <Navbar isVisible={showNavbar} />
      <Skills />
    </>
  );
};

export default AfterHero;
