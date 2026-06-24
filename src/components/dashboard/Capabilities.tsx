import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch, faTags, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { mySkills } from "../../data/skills";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface CapabilitiesProps {
  selectedSkills: string[];
  toggleSkillFilter: (skillName: string) => void;
  clearAllFilters: () => void;
  skillsSearch: string;
  setSkillsSearch: (val: string) => void;
  activeSkillCategory: string;
  setActiveSkillCategory: (val: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({
  selectedSkills,
  toggleSkillFilter,
  clearAllFilters,
  skillsSearch,
  setSkillsSearch,
  activeSkillCategory,
  setActiveSkillCategory
}) => {
  const { ref, isVisible } = useScrollReveal(0.1, true);
  const [isOpen, setIsOpen] = useState(false);

  const getSkillsByCategory = () => {
    const categories: Record<string, string[]> = {
      "Programming & APIs": ["JavaScript/NodeJS", "TypeScript", "Java", "Python", "SQL", "REST", "GraphQL"],
      "Cloud, DevOps & Systems": ["AWS", "GCP", "Terraform", "Pulumi", "Docker", "Kubernetes", "Gitlab", "GitHub Actions", "Kafka", "RabbitMQ"],
      "Web & Mobile": ["React", "NextJS", "Angular", "ExpressJS", "Fastify", "Spring Boot", "Spring Data", "Tailwind", "React Native", "Ionic", "Vercel (CI/CD)"],
      "Testing & Other": ["JUnit", "Jest", "Cypress", "OLAP Systems", "OLTP Databases", "Figma", "JSON", "YAML", "OpenAI"]
    };

    if (activeSkillCategory === "All") {
      return mySkills.filter(skill => 
        skill.name.toLowerCase().includes(skillsSearch.toLowerCase())
      );
    }

    const categorySkills = categories[activeSkillCategory] || [];
    return mySkills.filter(skill => 
      categorySkills.some(cs => skill.name.toLowerCase() === cs.toLowerCase() || skill.name.toLowerCase().includes(cs.toLowerCase())) &&
      skill.name.toLowerCase().includes(skillsSearch.toLowerCase())
    );
  };

  return (
    <section ref={ref as any} className={`glass-panel rounded-3xl overflow-hidden scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
      {/* Header / Accordion Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left transition-colors hover:bg-emerald-500/5"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 text-white flex items-center justify-center shadow-md">
            <FontAwesomeIcon icon={faTags} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Capabilities Dashboard</h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">Select tags below to highlight matching experiences in the timeline.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-start md:self-auto">
          {/* Filter Status Badge (stops propagation so clicking it doesn't toggle accordion) */}
          {selectedSkills.length > 0 && (
            <div 
              id="skills-clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                clearAllFilters();
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              Active: {selectedSkills.length} filters <FontAwesomeIcon icon={faTimes} />
            </div>
          )}
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
          />
        </div>
      </button>

      {/* Accordion Body */}
      <div 
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 flex flex-col gap-6 border-t border-[var(--glass-border)] pt-4">
            {/* Search and Category Selectors */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input 
                  id="skills-search-input"
                  type="text" 
                  placeholder="Search engineering skill..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:border-emerald-500 text-sm placeholder-[var(--text-muted)]"
                  value={skillsSearch}
                  onChange={(e) => setSkillsSearch(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} className="absolute left-3.5 top-3.5 text-xs text-[var(--text-muted)]" />
              </div>

              <select 
                id="skills-category-select"
                className="px-4 py-2.5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none focus:border-emerald-500 text-[var(--text-muted)]"
                value={activeSkillCategory}
                onChange={(e) => setActiveSkillCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Programming & APIs">Languages & APIs</option>
                <option value="Cloud, DevOps & Systems">Cloud & DevOps</option>
                <option value="Web & Mobile">Web & Mobile Frameworks</option>
                <option value="Testing & Other">Quality & Databases</option>
              </select>
            </div>

            {/* Skills Tags Grid */}
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {getSkillsByCategory().map((skill, idx) => {
                const isSelected = selectedSkills.includes(skill.name);
                return (
                  <button
                    key={idx}
                    id={`skill-tag-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    onClick={() => toggleSkillFilter(skill.name)}
                    className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-300 ${
                      isSelected 
                        ? "bg-emerald-500 text-white shadow-md scale-105" 
                        : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/30"
                    }`}
                  >
                    {skill.name}
                    <span className="ml-1.5 opacity-60 font-medium text-[10px]">
                      ({skill.experience})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
