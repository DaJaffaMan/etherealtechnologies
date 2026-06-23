import React from "react";
import { experiences } from "../../data/experiences";

interface TimelineProps {
  selectedSkills: string[];
  toggleSkillFilter: (skillName: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ selectedSkills, toggleSkillFilter }) => {
  const doesJobMatchFilters = (jobSkills: string[]) => {
    if (selectedSkills.length === 0) return true;
    return selectedSkills.some(skill => 
      jobSkills.some(js => js.toLowerCase() === skill.toLowerCase() || js.toLowerCase().includes(skill.toLowerCase()))
    );
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold tracking-tight px-1">Professional Experience</h2>

      {/* Vertical Timeline container */}
      <div className="relative pl-6 md:pl-8 border-l-2 border-[var(--timeline-line)] flex flex-col gap-8 transition-colors duration-500">
        {experiences.map((exp, idx) => {
          const isMatching = doesJobMatchFilters(exp.skills);
          const hasActiveFilters = selectedSkills.length > 0;
          
          return (
            <div 
              key={idx} 
              className={`relative transition-all duration-500 ${
                hasActiveFilters 
                  ? isMatching 
                    ? "opacity-100 scale-100" 
                    : "opacity-35 scale-95 blur-[0.4px]" 
                  : "opacity-100"
              }`}
            >
              {/* Timeline Node Dot */}
              <span className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-[var(--bg-overlay)] transition-all ${
                hasActiveFilters && isMatching 
                  ? "border-orange-500 bg-orange-500 scale-125 shadow-lg" 
                  : "border-[var(--timeline-line)]"
              }`}></span>

              {/* Job card */}
              <div className={`glass-card rounded-3xl p-6 flex flex-col gap-3 ${
                hasActiveFilters && isMatching ? "border-orange-500/40 ring-1 ring-orange-500/10" : ""
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <h3 className="text-xl font-bold tracking-tight">{exp.title}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--glass-border)] text-[var(--text-muted)] self-start sm:self-auto">
                    {exp.duration}
                  </span>
                </div>
                
                <h4 className="text-orange-500 font-bold text-sm tracking-wide uppercase leading-none">
                  {exp.company}
                </h4>

                <p className="text-sm leading-relaxed text-[var(--text-muted)] mt-1">
                  {exp.description}
                </p>

                {/* Experience Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-[var(--glass-border)]">
                  {exp.skills.map((skill, sIdx) => {
                    const isFilterActive = selectedSkills.includes(skill);
                    return (
                      <button
                        key={sIdx}
                        onClick={() => toggleSkillFilter(skill)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                          isFilterActive 
                            ? "bg-orange-500 text-white" 
                            : "bg-[var(--glass-border)] text-[var(--text-muted)] hover:text-orange-500"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
