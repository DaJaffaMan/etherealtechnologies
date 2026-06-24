import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSpinner } from "@fortawesome/free-solid-svg-icons";

const ROW_OPTIONS = [
  { label: "100K rows", value: 100_000 },
  { label: "500K rows", value: 500_000 },
  { label: "1M rows",   value: 1_000_000 },
  { label: "5M rows",   value: 5_000_000 },
];

/** OLTP cost scales super-linearly with row count (join overhead) */
const oltpMs = (rows: number) => Math.round(142 * Math.pow(rows / 100_000, 1.35));
/** OLAP cost is nearly flat — pre-indexed star schema */
const olapMs = (rows: number) => Math.round(1.2 * Math.pow(rows / 100_000, 0.3));

export const DatabaseTab: React.FC = () => {
  const [dbRunning, setDbRunning] = useState(false);
  const [dbStep, setDbStep] = useState(0);
  const [oltpTime, setOltpTime] = useState(0);
  const [olapTime, setOlapTime] = useState(0);
  const [rowCount, setRowCount] = useState(1_000_000);

  const runDBSimulation = () => {
    if (dbRunning) return;
    setDbRunning(true);
    setDbStep(0);
    setOltpTime(0);
    setOlapTime(0);

    const targetOltp = oltpMs(rowCount);
    const targetOlap = olapMs(rowCount);

    setTimeout(() => { setDbStep(1);
    setTimeout(() => { setDbStep(2);
    setTimeout(() => { setDbStep(3);
    setTimeout(() => { setDbStep(4); setOltpTime(targetOltp);
    setTimeout(() => { setDbStep(5);
    setTimeout(() => { setDbStep(6); setOlapTime(targetOlap); setDbRunning(false); }, 600);
    }, 1000); }, 800); }, 800); }, 800); }, 800);
  };

  const targetOltp = oltpMs(rowCount);
  const targetOlap = olapMs(rowCount);
  const speedup = targetOltp > 0 ? Math.round(targetOltp / Math.max(targetOlap, 1)) : 0;
  const rowLabel = ROW_OPTIONS.find(o => o.value === rowCount)?.label ?? "";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-lg font-bold">IoT Data Analytics Query Simulator</h4>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Simulates the OLTP-to-OLAP database architectural migration I designed at Homelink. Compare traditional relational normalisation join overhead to denormalised analytical modelling — and see how the gap widens at scale.
        </p>
      </div>

      {/* Row-count scale selector */}
      <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)] flex flex-col gap-3">
        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Dataset Scale</span>
        <div className="flex gap-2 flex-wrap">
          {ROW_OPTIONS.map(opt => (
            <button
              key={opt.value}
              id={`db-row-btn-${opt.value}`}
              onClick={() => setRowCount(opt.value)}
              disabled={dbRunning}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all disabled:opacity-40 ${rowCount === opt.value ? "bg-emerald-500 text-white border-emerald-500" : "bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-muted)] hover:border-emerald-500/50"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-[var(--text-muted)] font-mono">
          OLTP projected: <span className="text-red-400 font-bold">{targetOltp.toLocaleString()} ms</span>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          OLAP projected: <span className="text-green-400 font-bold">{targetOlap.toLocaleString()} ms</span>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          Speedup: <span className="text-emerald-400 font-bold">~{speedup}×</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Simulation Visual Tracker */}
        <div className="flex flex-col gap-4">
          <button 
            id="db-run-query-btn"
            onClick={runDBSimulation} 
            disabled={dbRunning}
            className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${dbRunning ? "bg-emerald-500/20 text-emerald-500 cursor-not-allowed" : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md"}`}
          >
            {dbRunning ? (
              <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Query Running...</>
            ) : (
              <><FontAwesomeIcon icon={faPlay} /> Run Query Test ({rowLabel})</>
            )}
          </button>

          {/* OLTP execution sequence flow */}
          <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)]">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Model A: Relational OLTP (Normalized)</span>
            <div className="flex flex-col gap-2.5 mt-3 text-xs">
              {[
                `1. Scan ${(rowCount / 1000).toFixed(0)}K measurements`,
                "2. JOIN Device table on device_id",
                "3. JOIN Location & Tenant tables",
                "4. GROUP BY month, ORDER BY date",
              ].map((label, i) => (
                <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= i + 1 ? "bg-red-500/10 text-red-500 font-semibold" : "opacity-40"}`}>
                  <span>{label}</span>
                  <span>{dbStep >= i + 1 ? "Done" : "Pending"}</span>
                </div>
              ))}
            </div>
            {/* OLTP SQL query */}
            <pre className="mt-3 text-[9px] font-mono text-slate-400 bg-slate-900 p-2 rounded-lg overflow-x-auto leading-relaxed whitespace-pre">
{`SELECT date_trunc('month', m.timestamp) AS month,
       AVG(m.value)                       AS avg_value
FROM   measurements m
JOIN   devices   d ON d.id       = m.device_id
JOIN   locations l ON l.id       = d.location_id
JOIN   tenants   t ON t.id       = l.tenant_id
GROUP  BY 1 ORDER BY 1;
-- Full table scan + 3 nested-loop joins over ${(rowCount / 1000).toFixed(0)}K rows`}
            </pre>
          </div>

          {/* OLAP execution sequence flow */}
          <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)]">
            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Model B: Analytical OLAP (Star Schema)</span>
            <div className="flex flex-col gap-2.5 mt-3 text-xs">
              {[
                "1. Scan denormalized Fact Table",
                "2. GROUP BY pre-indexed month dim",
              ].map((label, i) => (
                <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= i + 5 ? "bg-green-500/10 text-green-500 font-semibold" : "opacity-40"}`}>
                  <span>{label}</span>
                  <span>{dbStep >= i + 5 ? (i === 1 ? "Finished" : "Done") : "Pending"}</span>
                </div>
              ))}
            </div>
            {/* OLAP SQL query */}
            <pre className="mt-3 text-[9px] font-mono text-slate-400 bg-slate-900 p-2 rounded-lg overflow-x-auto leading-relaxed whitespace-pre">
{`SELECT month_key,
       AVG(value) AS avg_value
FROM   fact_measurements
GROUP  BY month_key;
-- Single columnar scan, month pre-indexed in dim_time
-- No JOINs. Columnar storage reads only needed cols.`}
            </pre>
          </div>
        </div>

        {/* Right: schema diagram + chart comparison */}
        <div className="flex flex-col gap-4">

          {/* Schema diagram */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col gap-3">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Schema Comparison</span>
            <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
              {/* OLTP ERD */}
              <div className="flex flex-col gap-1.5">
                <p className="text-red-400 font-bold text-[9px] uppercase tracking-wider mb-1">OLTP — 4 tables</p>
                {[
                  { name: "measurements", cols: ["id PK", "device_id FK", "timestamp", "value"] },
                  { name: "devices",      cols: ["id PK", "location_id FK", "name"] },
                  { name: "locations",    cols: ["id PK", "tenant_id FK", "name"] },
                  { name: "tenants",      cols: ["id PK", "name"] },
                ].map(t => (
                  <div key={t.name} className="border border-slate-700 rounded p-1.5">
                    <p className="text-emerald-400 font-bold">{t.name}</p>
                    {t.cols.map(c => <p key={c} className="text-slate-400 pl-2">{c}</p>)}
                  </div>
                ))}
              </div>
              {/* OLAP Star */}
              <div className="flex flex-col gap-1.5">
                <p className="text-green-400 font-bold text-[9px] uppercase tracking-wider mb-1">OLAP — star schema</p>
                <div className="border border-slate-700 rounded p-1.5">
                  <p className="text-emerald-400 font-bold">fact_measurements</p>
                  {["id PK", "month_key FK", "device_name", "location", "tenant", "value"].map(c => <p key={c} className="text-slate-400 pl-2">{c}</p>)}
                </div>
                <div className="border border-slate-700 rounded p-1.5">
                  <p className="text-emerald-400 font-bold">dim_time</p>
                  {["month_key PK", "year", "quarter", "month_label"].map(c => <p key={c} className="text-slate-400 pl-2">{c}</p>)}
                </div>
              </div>
            </div>
          </div>

          {/* Chart Comparison Results */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col justify-between min-h-[200px]">
            <div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Simulation Audit Metrics</span>
              <p className="text-xs text-slate-400 mt-1">Query time comparison at {rowLabel} (shorter is better).</p>
            </div>
            <div className="flex flex-col gap-5 my-4">
              {/* OLTP Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span>OLTP (normalized relational joins)</span>
                  <span className="font-bold text-red-400">{oltpTime ? `${oltpTime.toLocaleString()} ms` : "—"}</span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: oltpTime ? "100%" : "0%" }}></div>
                </div>
              </div>
              {/* OLAP Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span>OLAP (denormalized star schema)</span>
                  <span className="font-bold text-green-400">{olapTime ? `${olapTime.toLocaleString()} ms` : "—"}</span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: (oltpTime && olapTime) ? `${(olapTime / oltpTime) * 100}%` : "0%" }}></div>
                </div>
              </div>
            </div>
            {olapTime > 0 && (
              <div className="text-xs p-3 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 leading-relaxed font-mono">
                OLAP completes ~{speedup}× faster at {rowLabel}. Decoupled fact-dimensional schema eliminates multi-table join lockup — and the gap widens non-linearly with row count.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
