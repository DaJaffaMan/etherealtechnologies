import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSpinner, faCheckCircle, faTimesCircle, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { getBrowserTestSuites, runBrowserTestSuite, TestSuite } from "../../utils/testRunner";

export const TestRunnerTab: React.FC = () => {
  const [suites, setSuites] = useState<TestSuite[]>(() => getBrowserTestSuites());
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testResults, setTestResults] = useState<boolean | null>(null);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the terminal logs as they arrive
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  const handleRunTests = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleLogs([]);
    setProgress(0);
    setTestResults(null);

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
  };

  const totalTests = suites.reduce((acc, s) => acc + s.tests.length, 0);
  const passedTests = suites.reduce((acc, s) => acc + s.tests.filter(t => t.status === "passed").length, 0);
  const failedTests = suites.reduce((acc, s) => acc + s.tests.filter(t => t.status === "failed").length, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-lg font-bold">Interactive Client-Side Test Runner</h4>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Executes real unit test assertions directly in your browser. Verify the cryptographic hashes, byte protocols, text-wrapping algorithms, and routing rules live on the client side.
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
                ? "bg-orange-500/20 text-orange-500 cursor-not-allowed" 
                : "bg-orange-500 text-white hover:bg-orange-600 shadow-md"
            }`}
          >
            {isRunning ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Running Jest in Browser...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlay} /> Run Test Suite
              </>
            )}
          </button>

          {/* Test Suites Overview List */}
          <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)] flex flex-col gap-3">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Test Suites</span>
            <div className="flex flex-col gap-2.5 text-xs">
              {suites.map((suite, idx) => {
                const isSuitePassed = suite.tests.every(t => t.status === "passed");
                const isSuiteFailed = suite.tests.some(t => t.status === "failed");
                const isSuiteRunning = suite.tests.some(t => t.status === "running");

                return (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                    <span className="font-mono text-slate-300 truncate max-w-[190px]">{suite.name.split("/").pop()}</span>
                    <div className="flex items-center gap-2">
                      {isSuitePassed && <span className="text-[10px] bg-green-500/10 text-green-500 font-bold px-2 py-0.5 rounded">PASS</span>}
                      {isSuiteFailed && <span className="text-[10px] bg-red-500/10 text-red-500 font-bold px-2 py-0.5 rounded">FAIL</span>}
                      {isSuiteRunning && <span className="text-[10px] bg-blue-500/10 text-blue-500 font-bold px-2 py-0.5 rounded animate-pulse">RUNNING</span>}
                      {(!isSuitePassed && !isSuiteFailed && !isSuiteRunning) && <span className="text-[10px] bg-slate-500/10 text-[var(--text-muted)] px-2 py-0.5 rounded">IDLE</span>}
                    </div>
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
                {testResults ? "All test suites completed successfully!" : `${failedTests} assertions failed.`}
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
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 text-slate-300 font-mono text-xs shadow-inner min-h-[300px] max-h-[340px] overflow-y-auto custom-scrollbar flex flex-col leading-relaxed">
            {consoleLogs.length === 0 ? (
              <div className="text-slate-500 italic m-auto text-center">
                <p>Jest interactive browser reporter is idle.</p>
                <p className="text-[10px] mt-1">Click "Run Test Suite" to execute assertions.</p>
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
                else if (log.startsWith("[JEST")) color = "text-orange-400 font-bold";

                return (
                  <div key={idx} className={`${color} whitespace-pre-wrap py-0.5`}>
                    {log}
                  </div>
                );
              })
            )}
            <div ref={terminalEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
};
