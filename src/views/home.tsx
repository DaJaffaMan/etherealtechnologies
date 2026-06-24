import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header";
import { Objective } from "../components/dashboard/Objective";
import { DevLab } from "../components/devlab/DevLab";
import { Capabilities } from "../components/dashboard/Capabilities";
import { Timeline } from "../components/dashboard/Timeline";
import { Contact } from "../components/dashboard/Contact";

const HomePage: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    try {
      const stored = localStorage.getItem("theme");
      return stored || "system";
    } catch (e) {
      return "system";
    }
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

  // Theme Switching Logic — re-runs whenever the user picks a different theme
  useEffect(() => {
    const root = document.documentElement;
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // Ignore localStorage errors
    }

    const applyTheme = (isDark: boolean) => {
      // If the browser doesn't support View Transitions or the user prefers reduced motion,
      // fallback to instant toggle.
      if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.classList.toggle("dark", isDark);
        return;
      }

      // Execute smooth "flush" view transition
      root.classList.add("theme-animating");
      const transition = document.startViewTransition(() => {
        root.classList.toggle("dark", isDark);
      });
      
      // Catch all transition promises to prevent unhandled "Transition was skipped" AbortErrors
      transition.ready.catch(() => {});
      transition.updateCallbackDone.catch(() => {});
      transition.finished.catch(() => {
        // Ignore "Transition was skipped" DOMExceptions
      }).finally(() => {
        root.classList.remove("theme-animating");
      });
    };

    if (theme === "system") {
      const mq = typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;

      if (mq) {
        applyTheme(mq.matches);
        const listener = (e: MediaQueryListEvent | MediaQueryList) => applyTheme(e.matches);
        
        if (mq.addEventListener) {
          mq.addEventListener("change", listener as EventListener);
          return () => mq.removeEventListener("change", listener as EventListener);
        } else if (mq.addListener) {
          mq.addListener(listener as (e: MediaQueryListEvent) => void);
          return () => mq.removeListener(listener as (e: MediaQueryListEvent) => void);
        }
      } else {
        applyTheme(true);
      }
    } else {
      applyTheme(theme === "dark");
    }

    // Explicit return for non-system branches (no cleanup needed)
    return undefined;
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
        <div className="w-full max-w-7xl mx-auto px-4 py-4 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
          
          {/* SIDEBAR: Personal Profile & Fast Facts (Cols 1-4) */}
          <Sidebar />

          {/* MAIN WORKSPACE: Orchestrating child views (Cols 5-12) */}
          <main className="lg:col-span-8 flex flex-col gap-4 lg:gap-8">
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
