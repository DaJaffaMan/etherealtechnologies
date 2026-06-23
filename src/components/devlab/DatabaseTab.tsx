import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSpinner } from "@fortawesome/free-solid-svg-icons";

export const DatabaseTab: React.FC = () => {
  const [dbRunning, setDbRunning] = useState(false);
  const [dbStep, setDbStep] = useState(0);
  const [oltpTime, setOltpTime] = useState(0);
  const [olapTime, setOlapTime] = useState(0);

  const runDBSimulation = () => {
    if (dbRunning) return;
    setDbRunning(true);
    setDbStep(1);
    setOltpTime(0);
    setOlapTime(0);

    // OLTP simulation steps (takes longer, joins multiple tables)
    setTimeout(() => {
      setDbStep(2);
      setTimeout(() => {
        setDbStep(3);
        setTimeout(() => {
          setDbStep(4);
          setOltpTime(1420); // ms simulated
          // OLAP simulation starts (quick, direct star schema read)
          setTimeout(() => {
            setDbStep(5);
            setTimeout(() => {
              setDbStep(6);
              setOlapTime(12); // ms simulated
              setDbRunning(false);
            }, 600);
          }, 1000);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-lg font-bold">IoT Data Analytics Query Simulator</h4>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Simulates the OLTP-to-OLAP database architectural migration I designed at Homelink. Compare traditional relational normalization join overhead to denormalized analytical modeling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Simulation Visual Tracker */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={runDBSimulation} 
            disabled={dbRunning}
            className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${dbRunning ? "bg-orange-500/20 text-orange-500 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600 shadow-md"}`}
          >
            {dbRunning ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Query Running...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlay} /> Run Query Test
              </>
            )}
          </button>

          {/* OLTP execution sequence flow */}
          <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)]">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Model A: Relational OLTP (Normalized)</span>
            <div className="flex flex-col gap-2.5 mt-3 text-xs">
              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 1 ? "bg-red-500/10 text-red-500 font-semibold" : "opacity-40"}`}>
                <span>1. Scan 1,000,000 measurements</span>
                <span>{dbStep >= 1 ? "Done" : "Pending"}</span>
              </div>
              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 2 ? "bg-red-500/10 text-red-500 font-semibold" : "opacity-40"}`}>
                <span>2. Join Device table on ID</span>
                <span>{dbStep >= 2 ? "Done" : "Pending"}</span>
              </div>
              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 3 ? "bg-red-500/10 text-red-500 font-semibold" : "opacity-40"}`}>
                <span>3. Join Location & Tenant tables</span>
                <span>{dbStep >= 3 ? "Done" : "Pending"}</span>
              </div>
              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 4 ? "bg-red-500/10 text-red-500 font-semibold" : "opacity-40"}`}>
                <span>4. Sort & Group by Month</span>
                <span>{dbStep >= 4 ? "Finished" : "Pending"}</span>
              </div>
            </div>
          </div>

          {/* OLAP execution sequence flow */}
          <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)]">
            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Model B: Analytical OLAP (Star Schema)</span>
            <div className="flex flex-col gap-2.5 mt-3 text-xs">
              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 5 ? "bg-green-500/10 text-green-500 font-semibold" : "opacity-40"}`}>
                <span>1. Scan denormalized Fact Table</span>
                <span>{dbStep >= 5 ? "Done" : "Pending"}</span>
              </div>
              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 6 ? "bg-green-500/10 text-green-500 font-semibold" : "opacity-40"}`}>
                <span>2. Group by Month Pre-indexed Dim</span>
                <span>{dbStep >= 6 ? "Finished" : "Pending"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Comparison Results */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Simulation Audit Metrics</span>
            <p className="text-xs text-slate-400 mt-1">Calculates computational query time comparison (shorter is better).</p>
          </div>

          {/* Chart Bars */}
          <div className="flex flex-col gap-6 my-6">
            {/* OLTP Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span>OLTP (Normalized relational joins)</span>
                <span className="font-bold text-red-400">{oltpTime ? `${oltpTime} ms` : "0 ms"}</span>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all duration-1000"
                  style={{ width: oltpTime ? "100%" : "0%" }}
                ></div>
              </div>
            </div>

            {/* OLAP Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span>OLAP (Denormalized star schema)</span>
                <span className="font-bold text-green-400">{olapTime ? `${olapTime} ms` : "0 ms"}</span>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-1000"
                  style={{ width: olapTime ? `${(olapTime / oltpTime) * 100}%` : "0%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Summary text */}
          {olapTime > 0 && (
            <div className="text-xs p-3 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 leading-relaxed font-mono">
              OLAP Query completes 118x faster. Decoupled fact-dimensional schema eliminates heavy multi-table join computational lockup.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
