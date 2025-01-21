export const SkillSection = () => {
    return (
      <section id="skills-section">
        <div className="h-[100vh] bg-white"></div>
        <div className="w-screen p-4 md:p-6 lg:p-16 flex justify-start items-end relative bg-white">
          <div className="gothic text-8xl md:text-9xl lg:text-15xl lg:leading-15xl">
            Hi, I am Roland Vrignon,<br />
            a passionate developer
            <br />
            and design amator. {" "}
            {/* SVG directement en ligne */}
            <svg
              className="inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 180 141"
              preserveAspectRatio="xMinYMid"
              style={{
                height: "1em", // Adapte la hauteur à celle du texte environnant
                width: "auto", // Conserve les proportions du SVG
                fill: "#ff0000", // Hérite de la couleur du texte environnant
              }}
            >
              <path
                d="M15,12h3v6h3v6h3v6h3v6h3v-9h-3v-9h-3V9h-3V3h-9v6h3V12z M12,27H9v-3H3v6h3v3h6V27z M45,30h3v-6h3v-3h-3v-3h-3
    v6h-3v9h3V30z M12,33v3h3v-3H12z M18,39v-3h-3v3H18z M30,42h3v-6h-3V42z M156,60h-3v-3h-3v-3h-6v-3h-3v-6h-3v-3h-3v-3h-3v-3h-3v-3
    h-3v-3h-3v-3h-3v-3h-3v-3h-3v-3h-3v-3h-3v3h-9v3H72v3h-9v3h-3v3h-3v3h-3v3h-3v3h-3v3h-6v3h-3v3h-3v6h-3v3h-6v3h-6v15h-3v18h3
    v12h3v3h3v3h3v3h3v3h3v3h3v3h6v3h9v-3h9v-3h3v-3h6v-3h9v-3h12v-3h6v3h6v6h3v3h3v3h12v-3h3v-3h6v-3h9v-3h9v-3h3v-6h3V87h3V63h-3V60z
    M108,81v-9h-3v-9h-3v-6h-3v-9h-3v-6h-3v3h-3v-3h-3v6h3v6h3v6h3v6h3v6h3v12h-3v3h-3v6h3v-3h3v3h-3v3h-6v-3h-9v3h-3v-3h-3v-6h-3v-6
    h-3v-9h-3v-9h-3v-9h-3v6h-3v6h3v6h3v6h3v6h3v6h3v9h3v3h-3v3h-6v3h-3v-3h3v-3H54v-3h-3v-6h-3v-3h-3v-9h-3v-6h-3v9h3v9h3v6h3v3h3v12
    H39v-3h-3v-3h-3v-6h-3v-3h-3v-9h-3v-9h3v-6h-3V63h3v-3h6v-3h6v-6h3v-6h3v-3h6v-3h3v-3h3v-3h3v-3h6v-3h9v-3h6v3h3v-3h6v-3h9v-3h9v3h3
    v3h3v6h3v3h3v3h3v12h3v3h3v9h3v12h-3v3h-3v3h3v3h-3v3h-9v-3h3v-3h-6v3H108z M153,75h-3v12h-3v3h-3v9h-3v3h-9v-3h-3v-3h-3v6h3v6h-3v3
    h-6v-9h-3v12h-3v-3h-3V96h3v-3h3v-3h6v-3h6v-3h3v-3h3v-3h3v-9h3v-3h-3v-3h-3v-9h3v3h6v3h3v3h3v3h3V75z M165,72v3h3v3h9v-6H165z
    M141,87v3h3v-3H141z M72,102h3v-3h-3V102z M174,117h-3v-12h-3v-9h-3V84h-3v36h3v15h9v-3h3v-3h-3V117z"
              ></path>
            </svg>
          </div>
        </div>
      </section>
    );
  };
  
  export default SkillSection;
  