"use client";

import Navbar from "@/components/afterHero/navbar";
import Skills from "@/components/afterHero/skills_back";
import Tech from "../afterHero/tech";

export const AfterHero = ({ showNavbar }: { showNavbar: boolean }) => {
  return (
    <>
      <Navbar isVisible={showNavbar} />
      <Skills />
      <Tech />
    </>
  );
};

export default AfterHero;