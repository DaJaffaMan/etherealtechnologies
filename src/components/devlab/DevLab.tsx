import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal, faLock, faDatabase, faFlask, faCloud } from "@fortawesome/free-solid-svg-icons";
import { CryptoTab } from "./CryptoTab";
import { DatabaseTab } from "./DatabaseTab";
import { BitwiseTab } from "./BitwiseTab";
import { ArchitectureTab } from "./ArchitectureTab";
import { TestRunnerTab } from "./TestRunnerTab";
import { getBrowserTestSuites, TestSuite } from "../../utils/testRunner";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export const DevLab: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.1, true);
  const [labOpen, setLabOpen] = useState<boolean>(false);
  const [activeLabTab, setActiveLabTab] = useState<string>("crypto");

  // Test runner state lifted here so it survives tab switches
  const [suites, setSuites] = useState<TestSuite[]>(() => getBrowserTestSuites());
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testResults, setTestResults] = useState<boolean | null>(null);

  return (
    <section ref={ref as any} className={`glass-panel rounded-3xl overflow-hidden border border-emerald-500/20 scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
      {/* Accordion Trigger Header */}
      <button 
        id="dev-lab-trigger"
        onClick={() => setLabOpen(!labOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-gradient-to-r from-emerald-500/5 to-amber-500/5 hover:from-emerald-500/10 hover:to-amber-500/10 transition-all border-b border-[var(--glass-border)]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 text-white flex items-center justify-center shadow-md animate-pulse-glowing">
            <FontAwesomeIcon icon={faFlask} />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">🔬 Developer Lab & Playground</h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Explore real-time client-side demonstrations of core architectural concepts.</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[var(--glass-border)] hover:bg-emerald-500 hover:text-white transition-all">
          {labOpen ? "Close Lab" : "Open Lab"}
        </span>
      </button>

      {/* Accordion Body */}
      {labOpen && (
        <div className="p-6 flex flex-col gap-6">
          {/* Lab Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[var(--glass-border)] pb-3 text-sm">
            <button 
              id="dev-lab-tab-crypto"
              onClick={() => setActiveLabTab("crypto")}
              className={`pb-2 px-3 border-b-2 font-bold transition-all flex items-center gap-2 ${activeLabTab === "crypto" ? "border-emerald-500 text-emerald-500" : "border-transparent text-[var(--text-muted)] hover:text-emerald-500"}`}
            >
              <FontAwesomeIcon icon={faLock} className="text-xs" /> Cryptography & Hashing
            </button>
            <button 
              id="dev-lab-tab-db"
              onClick={() => setActiveLabTab("db")}
              className={`pb-2 px-3 border-b-2 font-bold transition-all flex items-center gap-2 ${activeLabTab === "db" ? "border-emerald-500 text-emerald-500" : "border-transparent text-[var(--text-muted)] hover:text-emerald-500"}`}
            >
              <FontAwesomeIcon icon={faDatabase} className="text-xs" /> OLAP vs OLTP Database
            </button>
            <button 
              id="dev-lab-tab-architecture"
              onClick={() => setActiveLabTab("architecture")}
              className={`pb-2 px-3 border-b-2 font-bold transition-all flex items-center gap-2 ${activeLabTab === "architecture" ? "border-emerald-500 text-emerald-500" : "border-transparent text-[var(--text-muted)] hover:text-emerald-500"}`}
            >
              <FontAwesomeIcon icon={faCloud} className="text-xs" /> Architecture
            </button>
            <button 
              id="dev-lab-tab-vms"
              onClick={() => setActiveLabTab("vms")}
              className={`pb-2 px-3 border-b-2 font-bold transition-all flex items-center gap-2 ${activeLabTab === "vms" ? "border-emerald-500 text-emerald-500" : "border-transparent text-[var(--text-muted)] hover:text-emerald-500"}`}
            >
              <FontAwesomeIcon icon={faTerminal} className="text-xs" /> Bitwise Roadside Protocols
            </button>
            <button 
              id="dev-lab-tab-tests"
              onClick={() => setActiveLabTab("tests")}
              className={`pb-2 px-3 border-b-2 font-bold transition-all flex items-center gap-2 ${activeLabTab === "tests" ? "border-emerald-500 text-emerald-500" : "border-transparent text-[var(--text-muted)] hover:text-emerald-500"}`}
            >
              <FontAwesomeIcon icon={faTerminal} className="text-xs" /> Automated Unit Tests
            </button>
          </div>

          {/* Tab Render Switch */}
          <div className="transition-all duration-300">
            {activeLabTab === "crypto" && <CryptoTab />}
            {activeLabTab === "db" && <DatabaseTab />}
            {activeLabTab === "architecture" && <ArchitectureTab />}
            {activeLabTab === "vms" && <BitwiseTab />}
            {activeLabTab === "tests" && (
              <TestRunnerTab
                suites={suites}
                setSuites={setSuites}
                consoleLogs={consoleLogs}
                setConsoleLogs={setConsoleLogs}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                progress={progress}
                setProgress={setProgress}
                testResults={testResults}
                setTestResults={setTestResults}
                setActiveLabTab={setActiveLabTab}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};
