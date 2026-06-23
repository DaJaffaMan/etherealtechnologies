import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export const Objective: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.1, true);
  return (
    <section ref={ref as any} className={`glass-panel rounded-3xl p-6 md:p-8 scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
      <h2 className="text-2xl font-bold mb-4 tracking-tight">Professional Objective</h2>
      <p className="text-base md:text-lg leading-relaxed text-[var(--text-muted)] font-normal">
        A highly skilled polyglot engineer with a decade of experience working with object-oriented languages like TypeScript/JavaScript, Java, and various web technologies. Expert in delivering edge compute expertise using REST and Graph APIs in event architectures, with a proven track record of building quality interfaces for both mobile and web applications using Flutter or React. Competent in scaling from start-up to production confidently using the latest DevOps tools such as Terraform, Pulumi, and CDK, whilst maintaining general best practices for cloud-based system architecture. Regularly adept at managing large, complex data structures stored across varying databases, including standard RDBMS, noSQL/Document, Graph, and Time-based systems.
      </p>
    </section>
  );
};
