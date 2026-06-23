import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <header className="glass-panel rounded-3xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-xl tracking-wider">
          ET
        </div>
        <div>
          <h2 className="text-lg font-black tracking-tight leading-none">ETHEREAL</h2>
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mt-0.5">Technologies</p>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="flex p-1 bg-[var(--glass-border)] rounded-full text-xs font-medium">
        <button 
          onClick={() => setTheme("system")} 
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${theme === "system" ? "bg-orange-500 text-white shadow-sm" : "hover:text-orange-500"}`}
        >
          <FontAwesomeIcon icon={faLaptop} /> System
        </button>
        <button 
          onClick={() => setTheme("light")} 
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${theme === "light" ? "bg-orange-500 text-white shadow-sm" : "hover:text-orange-500"}`}
        >
          <FontAwesomeIcon icon={faSun} /> Light
        </button>
        <button 
          onClick={() => setTheme("dark")} 
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${theme === "dark" ? "bg-orange-500 text-white shadow-sm" : "hover:text-orange-500"}`}
        >
          <FontAwesomeIcon icon={faMoon} /> Dark
        </button>
      </div>
    </header>
  );
};
