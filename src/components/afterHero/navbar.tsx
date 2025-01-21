import Link from "next/link";

export const Navbar = ({ isVisible }: { isVisible: boolean }) => {
    return (
        <div
            className={`fixed z-50 top-0 w-full transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <Link href="/" className="relative w-full flex justify-center items-center">
                    <span className="absolute jacquard-24-regular blur-sm opacity-50 text-6xl text-[#ff0000] w-full text-center">
                        &gt; ./rolandv.sh_
                    </span>

                    <span className="absolute jacquard-24-regular blur-sm opacity-50 text-6xl text-[#ff0000] w-full text-center">
                        &gt; ./rolandv.sh_
                    </span>

                    {/* Texte principal */}
                    <span className="jacquard-24-regular  text-6xl text-[#ff0000] w-full text-center">
                        &gt; ./rolandv.sh_
                    </span>
            </Link>
        </div>
    );
};

export default Navbar;
