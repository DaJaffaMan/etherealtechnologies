import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSpinner, faCheckCircle, faTimesCircle, faTerminal, faRedo, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getBrowserTestSuites, runBrowserTestSuite, runSingleSuite, TestSuite } from "../../utils/testRunner";

interface TestRunnerTabProps {
  suites: TestSuite[];
  setSuites: React.Dispatch<React.SetStateAction<TestSuite[]>>;
  consoleLogs: string[];
  setConsoleLogs: React.Dispatch<React.SetStateAction<string[]>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  testResults: boolean | null;
  setTestResults: React.Dispatch<React.SetStateAction<boolean | null>>;
  setActiveLabTab: React.Dispatch<React.SetStateAction<string>>;
}

export const TestRunnerTab: React.FC<TestRunnerTabProps> = ({
  suites, setSuites,
  consoleLogs, setConsoleLogs,
  isRunning, setIsRunning,
  progress, setProgress,
  testResults, setTestResults,
  setActiveLabTab,
}) => {
  // Ref for the terminal scroll *container* — we scroll it directly to avoid
  // scrollIntoView() hijacking the page viewport.
  const terminalScrollRef = useRef<HTMLDivElement>(null);
  // Track expanded test detail rows
  const [expandedTests, setExpandedTests] = useState<Set<string>>(new Set());

  // Scroll the terminal container to bottom whenever logs change
  useEffect(() => {
    const el = terminalScrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [consoleLogs]);

  const handleRunTests = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleLogs([]);
    setProgress(0);
    setTestResults(null);
    setExpandedTests(new Set());

    const freshSuites = getBrowserTestSuites();
    setSuites(freshSuites);

    const totalTests = freshSuites.reduce((acc, s) => acc + s.tests.length, 0);

    const result = await runBrowserTestSuite(freshSuites, (updatedSuites, newLogLine) => {
      setSuites([...updatedSuites]);
      setConsoleLogs(prev => [...prev, newLogLine]);
      const finishedCount = updatedSuites.reduce(
        (acc, s) => acc + s.tests.filter(t => t.status === "passed" || t.status === "failed").length,
        0
      );
      setProgress((finishedCount / totalTests) * 100);
    });

    setTestResults(result);
    setIsRunning(false);
    
    // Guarantee we return to the Test UI once the suite is complete
    // so users can actually see the output.
    setActiveLabTab("tests");
  };

  const handleRunSingle = async (suiteIdx: number) => {
    if (isRunning) return;
    setIsRunning(true);

    // Reset only this suite's tests to pending
    const resetSuites = suites.map((s, i) =>
      i === suiteIdx
        ? { ...s, tests: s.tests.map(t => ({ ...t, status: "pending" as const, error: undefined })) }
        : s
    );
    setSuites(resetSuites);

    const suiteLogs: string[] = [];
    const logAndAppend = (line: string) => {
      suiteLogs.push(line);
      setConsoleLogs(prev => [...prev, line]);
    };

    const updatedSuite = await runSingleSuite(resetSuites[suiteIdx], (updatedSuite) => {
      setSuites(prev => prev.map((s, i) => i === suiteIdx ? { ...updatedSuite } : s));
    }, logAndAppend);

    // Recalculate overall results
    const finalSuites = resetSuites.map((s, i) => i === suiteIdx ? updatedSuite : s);
    setSuites([...finalSuites]);
    const allPassed = finalSuites.every(s => s.tests.every(t => t.status === "passed"));
    setTestResults(allPassed);

    const totalTests = finalSuites.reduce((acc, s) => acc + s.tests.length, 0);
    const passed = finalSuites.reduce((acc, s) => acc + s.tests.filter(t => t.status === "passed").length, 0);
    setProgress((passed / totalTests) * 100);
    setIsRunning(false);
    
    // Guarantee we return to the Test UI once the suite is complete
    setActiveLabTab("tests");
  };

  const toggleExpanded = (key: string) => {
    setExpandedTests(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const totalTests = suites.reduce((acc, s) => acc + s.tests.length, 0);
  const passedTests = suites.reduce((acc, s) => acc + s.tests.filter(t => t.status === "passed").length, 0);
  const failedTests = suites.reduce((acc, s) => acc + s.tests.filter(t => t.status === "failed").length, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-lg font-bold">Interactive Client-Side Test Runner</h4>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Executes real unit test assertions directly in your browser — the same suite that runs via Jest CLI. Verify cryptographic hashes, byte protocols, text-wrapping algorithms, and routing rules live on the client side.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Test Control & Status Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
              isRunning 
                ? "bg-emerald-500/20 text-emerald-500 cursor-not-allowed" 
                : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md"
            }`}
          >
            {isRunning ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Running Tests...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlay} /> Run All Suites
              </>
            )}
          </button>

          {/* Test Suites Overview List with per-suite re-run */}
          <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)] flex flex-col gap-3">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Test Suites</span>
            <div className="flex flex-col gap-2 text-xs">
              {suites.map((suite, suiteIdx) => {
                const isSuitePassed = suite.tests.length > 0 && suite.tests.every(t => t.status === "passed");
                const isSuiteFailed = suite.tests.some(t => t.status === "failed");
                const isSuiteRunning = suite.tests.some(t => t.status === "running");
                const suiteName = suite.name.split("/").pop();

                return (
                  <div key={suiteIdx} className="flex flex-col rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] overflow-hidden">
                    {/* Suite header row */}
                    <div className="flex items-center justify-between p-2 gap-2">
                      <button
                        onClick={() => toggleExpanded(`suite-${suiteIdx}`)}
                        className="flex items-center gap-1.5 font-mono text-slate-300 truncate hover:text-emerald-400 transition-colors text-left"
                      >
                        <FontAwesomeIcon
                          icon={expandedTests.has(`suite-${suiteIdx}`) ? faChevronDown : faChevronRight}
                          className="text-[9px] opacity-60 shrink-0"
                        />
                        <span className="truncate max-w-[160px]">{suiteName}</span>
                      </button>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isSuitePassed && <span className="text-[10px] bg-green-500/10 text-green-500 font-bold px-2 py-0.5 rounded">PASS</span>}
                        {isSuiteFailed && <span className="text-[10px] bg-red-500/10 text-red-500 font-bold px-2 py-0.5 rounded">FAIL</span>}
                        {isSuiteRunning && <span className="text-[10px] bg-blue-500/10 text-blue-500 font-bold px-2 py-0.5 rounded animate-pulse">RUN</span>}
                        {(!isSuitePassed && !isSuiteFailed && !isSuiteRunning) && <span className="text-[10px] bg-slate-500/10 text-[var(--text-muted)] px-2 py-0.5 rounded">IDLE</span>}
                        <button
                          onClick={() => handleRunSingle(suiteIdx)}
                          disabled={isRunning}
                          title="Re-run this suite"
                          className="p-1 rounded text-[var(--text-muted)] hover:text-emerald-400 disabled:opacity-30 transition-colors"
                        >
                          <FontAwesomeIcon icon={faRedo} className="text-[9px]" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable per-test rows */}
                    {expandedTests.has(`suite-${suiteIdx}`) && (
                      <div className="border-t border-[var(--glass-border)] flex flex-col">
                        {suite.tests.map((test, testIdx) => (
                          <div
                            key={testIdx}
                            className="px-3 py-1.5 border-b border-[var(--glass-border)] last:border-b-0"
                          >
                            <div className="flex items-start gap-2">
                              <span className={`shrink-0 mt-0.5 ${test.status === "passed" ? "text-green-500" : test.status === "failed" ? "text-red-500" : test.status === "running" ? "text-blue-400" : "text-slate-500"}`}>
                                {test.status === "passed" ? "✓" : test.status === "failed" ? "✕" : test.status === "running" ? "⏳" : "○"}
                              </span>
                              <div className="min-w-0">
                                <p className="font-mono leading-tight truncate" title={test.name}>{test.name}</p>
                                {test.duration !== undefined && (
                                  <p className="text-[9px] text-[var(--text-muted)] mt-0.5">{test.duration}ms</p>
                                )}
                                {test.error && (
                                  <p className="text-[10px] text-red-400 font-mono mt-1 leading-snug break-words whitespace-pre-wrap">{test.error}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Execution Progress Metric */}
          <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)] flex flex-col gap-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[var(--text-muted)]">Progress</span>
              <span>{Math.round(progress)}% ({passedTests + failedTests}/{totalTests} tests)</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${failedTests > 0 ? "bg-red-500" : "bg-green-500"}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {testResults !== null && (
              <div className={`mt-1 text-xs font-semibold flex items-center gap-1.5 ${testResults ? "text-green-500" : "text-red-500"}`}>
                <FontAwesomeIcon icon={testResults ? faCheckCircle : faTimesCircle} />
                {testResults ? "All test suites completed successfully!" : `${failedTests} assertion(s) failed.`}
              </div>
            )}
          </div>
        </div>

        {/* Real-time Jest-like Terminal Console */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1 text-xs text-[var(--text-muted)]">
            <FontAwesomeIcon icon={faTerminal} />
            <span>Terminal Output Console</span>
          </div>
          {/* terminalScrollRef on the container itself — scrollTop controls only this box */}
          <div
            ref={terminalScrollRef}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-900 text-slate-300 font-mono text-xs shadow-inner min-h-[300px] max-h-[380px] overflow-y-auto custom-scrollbar flex flex-col leading-relaxed"
          >
            {consoleLogs.length === 0 ? (
              <div className="text-slate-500 italic m-auto text-center">
                <p>Jest interactive browser reporter is idle.</p>
                <p className="text-[10px] mt-1">Click "Run All Suites" to execute assertions.</p>
              </div>
            ) : (
              consoleLogs.map((log, idx) => {
                let color = "text-slate-300";
                if (log.startsWith("RUN ")) color = "text-blue-400 font-bold";
                else if (log.startsWith("PASS ")) color = "text-green-400 font-bold";
                else if (log.startsWith("FAIL ")) color = "text-red-400 font-bold";
                else if (log.includes("✓")) color = "text-green-400";
                else if (log.includes("✕")) color = "text-red-400 font-semibold";
                else if (log.includes("Error:")) color = "text-red-500 font-mono pl-4";
                else if (log.includes("Result:")) color = log.includes("SUCCESS") ? "text-green-400 font-bold border-t border-slate-800 pt-2" : "text-red-400 font-bold border-t border-slate-800 pt-2";
                else if (log.startsWith("[JEST")) color = "text-emerald-400 font-bold";

                return (
                  <div key={idx} className={`${color} whitespace-pre-wrap py-0.5`}>
                    {log}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
