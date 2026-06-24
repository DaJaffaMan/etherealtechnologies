import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { experiences } from "../../data/experiences";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface TimelineProps {
  selectedSkills: string[];
  toggleSkillFilter: (skillName: string) => void;
}

const HighlightedText: React.FC<{ text: string, keywords: string[] }> = ({ text, keywords }) => {
  if (keywords.length === 0) return <>{text}</>;
  
  // Sort by length so longer phrases (e.g. 'React Native') match before shorter ones ('React')
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  const escaped = sortedKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        const isMatch = sortedKeywords.some(k => k.toLowerCase() === part.toLowerCase());
        return isMatch ? (
          <strong key={i} className="text-emerald-500 font-bold bg-emerald-500/10 px-0.5 rounded-sm transition-colors duration-300">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
};

const TimelineCard: React.FC<{
  exp: typeof experiences[0],
  idx: number,
  selectedSkills: string[],
  toggleSkillFilter: (skillName: string) => void,
  isMatching: boolean,
  hasActiveFilters: boolean
}> = ({ exp, idx, selectedSkills, toggleSkillFilter, isMatching, hasActiveFilters }) => {
  const { ref, isVisible } = useScrollReveal(0.1, true);
  const [expanded, setExpanded] = useState<boolean>(idx <= 1);

  // Auto-expand/collapse based on filters
  useEffect(() => {
    if (hasActiveFilters && isMatching) {
      setExpanded(true);
    } else if (!hasActiveFilters) {
      setExpanded(idx <= 1);
    }
  }, [hasActiveFilters, isMatching, idx]);

  return (
    <div 
      ref={ref as any}
      id={`job-card-${idx}`}
      className={`relative transition-all duration-500 scroll-reveal group ${isVisible ? 'is-visible' : ''} ${
        hasActiveFilters 
          ? isMatching 
            ? "opacity-100 scale-100" 
            : "opacity-35 scale-95 blur-[0.4px]" 
          : "opacity-100"
      }`}
    >
      {/* Timeline Node Dot */}
      <span className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-[var(--bg-overlay)] transition-all duration-300 ${
        hasActiveFilters && isMatching 
          ? "border-emerald-500 bg-emerald-500 scale-125 shadow-lg" 
          : "border-[var(--timeline-line)] group-hover:border-emerald-500 group-hover:bg-emerald-500/20 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
      }`}></span>

      <div className={`glass-card rounded-3xl p-6 flex flex-col gap-3 transition-colors ${
        hasActiveFilters && isMatching ? "border-emerald-500/40 ring-1 ring-emerald-500/10 timeline-match" : ""
      }`}>
        {/* Header - Clickable for Accordion */}
        <div 
          className="flex flex-col cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <h3 className="text-xl font-bold tracking-tight group-hover:text-emerald-500 transition-colors">{exp.title}</h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--glass-border)] text-[var(--text-muted)] self-start sm:self-auto">
              {exp.duration}
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <h4 className="text-emerald-500 font-bold text-sm tracking-wide uppercase leading-none">
              {exp.company}
            </h4>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`text-[var(--text-muted)] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} 
            />
          </div>
        </div>

        {/* Collapsible content (description & tags) */}
        <div 
          className={`grid transition-all duration-500 ease-in-out ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          } ${hasActiveFilters && !isMatching ? "hidden" : ""}`}
        >
          <div className="overflow-hidden flex flex-col gap-3">
            <p className="text-sm leading-relaxed text-[var(--text-muted)] mt-1">
              <HighlightedText text={exp.description} keywords={selectedSkills} />
            </p>

            {/* Experience Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--glass-border)]">
              {exp.skills.map((skill, sIdx) => {
                const isFilterActive = selectedSkills.includes(skill);
                return (
                  <button
                    key={sIdx}
                    onClick={() => toggleSkillFilter(skill)}
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                      isFilterActive 
                        ? "bg-emerald-500 text-white" 
                        : "bg-[var(--glass-border)] text-[var(--text-muted)] hover:text-emerald-500"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ selectedSkills, toggleSkillFilter }) => {
  const doesJobMatchFilters = (exp: typeof experiences[0]) => {
    if (selectedSkills.length === 0) return true;
    return selectedSkills.some(skill => {
      const s = skill.toLowerCase();
      const inSkills = exp.skills.some(js => js.toLowerCase() === s || js.toLowerCase().includes(s));
      const inDesc = exp.description.toLowerCase().includes(s);
      return inSkills || inDesc;
    });
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold tracking-tight px-1">Professional Experience</h2>

      {/* Vertical Timeline container */}
      <div className="relative pl-6 md:pl-8 border-l-2 border-[var(--timeline-line)] flex flex-col gap-8 transition-colors duration-500">
        {experiences.map((exp, idx) => {
          const isMatching = doesJobMatchFilters(exp);
          const hasActiveFilters = selectedSkills.length > 0;
          
          return (
            <TimelineCard 
              key={idx}
              exp={exp}
              idx={idx}
              selectedSkills={selectedSkills}
              toggleSkillFilter={toggleSkillFilter}
              isMatching={isMatching}
              hasActiveFilters={hasActiveFilters}
            />
          );
        })}
      </div>
    </section>
  );
};
