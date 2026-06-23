import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header";
import { Objective } from "../components/dashboard/Objective";
import { DevLab } from "../components/devlab/DevLab";
import { Capabilities } from "../components/dashboard/Capabilities";
import { Timeline } from "../components/dashboard/Timeline";
import { Contact } from "../components/dashboard/Contact";
import "./home.css";

const HomePage: React.FC = () => {
  // Theme State: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "system";
  });

  // Filters State shared for highlighting matching timeline jobs
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillsSearch, setSkillsSearch] = useState<string>("");
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("All");

  // Scroll Progress State for the indicator bar
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  // Scroll Listener for top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollPercent((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Switching Logic
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("theme", theme);

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (theme === "system" && typeof window !== "undefined" && window.matchMedia) {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      if (systemPrefersDark) {
        applyTheme(systemPrefersDark.matches);

        const listener = (e: MediaQueryListEvent) => {
          applyTheme(e.matches);
        };
        systemPrefersDark.addEventListener("change", listener);
        return () => systemPrefersDark.removeEventListener("change", listener);
      }
    } else {
      applyTheme(theme === "dark");
    }
  }, [theme]);

  const toggleSkillFilter = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSkillsSearch("");
  };

  return (
    <>
      {/* Dynamic Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollPercent}%` }}></div>

      <div 
        className="min-h-screen w-full relative flex flex-col items-center bg-cover bg-no-repeat bg-center bg-fixed"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)` }}
      >
        {/* Soft Background Layer */}
        <div className="absolute inset-0 z-[-1] bg-[var(--bg-overlay)] transition-colors duration-500"></div>

        {/* Global Wrapper Grid */}
        <div className="w-full max-w-7xl mx-auto px-4 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR: Personal Profile & Fast Facts (Cols 1-4) */}
          <Sidebar />

          {/* MAIN WORKSPACE: Orchestrating child views (Cols 5-12) */}
          <main className="lg:col-span-8 flex flex-col gap-8">
            <Header theme={theme} setTheme={setTheme} />
            
            <Objective />

            {/* Developer Playground Lab (Repositioned to the top) */}
            <DevLab />

            <Capabilities 
              selectedSkills={selectedSkills} 
              toggleSkillFilter={toggleSkillFilter} 
              clearAllFilters={clearAllFilters}
              skillsSearch={skillsSearch}
              setSkillsSearch={setSkillsSearch}
              activeSkillCategory={activeSkillCategory}
              setActiveSkillCategory={setActiveSkillCategory}
            />

            <Timeline 
              selectedSkills={selectedSkills} 
              toggleSkillFilter={toggleSkillFilter} 
            />

            <Contact />
          </main>

        </div>
      </div>
    </>
  );
};

export default HomePage;
