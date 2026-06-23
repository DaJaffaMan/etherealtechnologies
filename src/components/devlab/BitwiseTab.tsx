import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { 
  serializeVMSPacket, 
  formatVMSText, 
  getVMSFontSizeClass 
} from "../../utils/vmsUtils";

export const BitwiseTab: React.FC = () => {
  // Input Protocol Variables
  const [signSpeed, setSignSpeed] = useState<number>(50);
  const [signLane, setSignLane] = useState<string>("closed");
  const [signText, setSignText] = useState("LANE CLOSED AHEAD");
  
  // Serialized buffer state
  const [vmsBufferHex, setVmsBufferHex] = useState("");
  
  // Real-time states rendered on the sign
  const [vmsQueueState, setVmsQueueState] = useState<"idle" | "producing" | "queued" | "consuming" | "rendered">("idle");
  const [vmsLogs, setVmsLogs] = useState<string[]>([]);
  const [activeSignSpeed, setActiveSignSpeed] = useState<number>(50);
  const [activeSignLane, setActiveSignLane] = useState<string>("closed");
  const [activeSignText, setActiveSignText] = useState("LANE CLOSED AHEAD");

  // Serialization listener
  useEffect(() => {
    const { hex } = serializeVMSPacket(signSpeed, signLane, signText);
    setVmsBufferHex(hex);
  }, [signSpeed, signLane, signText]);

  const triggerVmsTransmission = () => {
    if (vmsQueueState !== "idle" && vmsQueueState !== "rendered") return;
    
    setVmsQueueState("producing");
    setVmsLogs([
      "[Producer] Packaging motorway sign variables...",
      `[Producer] Byte Buffer created: [${vmsBufferHex.slice(0, 30)}...]`
    ]);

    setTimeout(() => {
      setVmsQueueState("queued");
      setVmsLogs(prev => [
        ...prev,
        "[Queue] Routing packet into High-throughput Kafka message stream...",
        "[Queue] Message acknowledged at broker."
      ]);

      setTimeout(() => {
        setVmsQueueState("consuming");
        setVmsLogs(prev => [
          ...prev,
          "[Consumer] Roadside C Server received packet.",
          `[Consumer] Decoding Byte 0: Speed Code = ${signSpeed} MPH, Lane Status = ${signLane.toUpperCase()}`,
          "[Consumer] Parsing ASCII text payload..."
        ]);

        setTimeout(() => {
          setVmsQueueState("rendered");
          setActiveSignSpeed(signSpeed);
          setActiveSignLane(signLane);
          setActiveSignText(signText);
          setVmsLogs(prev => [
            ...prev,
            `[LED Sign] Sign state successfully updated to Speed: ${signSpeed} / Text: "${signText}"`,
            "[LED Sign] Local LED matrices rendering outputs..."
          ]);
        }, 1200);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-lg font-bold">Bitwise Byte Protocol & Event Queue Simulator</h4>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Simulates reverse-engineered VMS sign protocols and high-throughput routing pipelines designed for Costain Group PLC. Change variables to pack bits and watch them route through the system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Variables controller inputs */}
        <div className="md:col-span-5 flex flex-col gap-4">
          {/* Speed Limit */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)]">Speed Limit Variable:</label>
            <select 
              value={signSpeed} 
              onChange={(e) => setSignSpeed(parseInt(e.target.value))}
              className="px-3 py-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none"
            >
              <option value={0}>No Speed Limit</option>
              <option value={20}>20 MPH</option>
              <option value={30}>30 MPH</option>
              <option value={40}>40 MPH</option>
              <option value={50}>50 MPH</option>
              <option value={60}>60 MPH</option>
              <option value={70}>70 MPH</option>
            </select>
          </div>

          {/* Lane Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)]">Lane Status Code:</label>
            <div className="flex gap-2">
              {["open", "closed", "warning"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSignLane(opt)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize border ${signLane === opt ? "bg-orange-500 text-white border-orange-500" : "bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-muted)]"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Message Text */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)]">Display Text (Max 20 chars):</label>
            <input 
              type="text" 
              maxLength={20}
              value={signText}
              onChange={(e) => setSignText(e.target.value.toUpperCase())}
              className="px-3 py-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <button 
            onClick={triggerVmsTransmission}
            disabled={vmsQueueState !== "idle" && vmsQueueState !== "rendered"}
            className="w-full py-3 mt-2 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowRight} /> Dispatch Event
          </button>
        </div>

        {/* Byte buffer display and visual sign */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {/* Packed byte buffer view */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-white flex flex-col gap-2">
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest font-mono">Serialized Binary Packet (Byte Buffer Array)</span>
            <code className="text-xs font-mono text-green-400 select-all p-2 rounded bg-slate-950 break-all overflow-x-auto whitespace-pre">
              [{vmsBufferHex}]
            </code>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 mt-1">
              <div>
                <p className="text-orange-400 font-bold">Byte 0: Protocol Header</p>
                <p>Bits 0-3: Speed Limit Code</p>
                <p>Bits 4-5: Lane Code</p>
              </div>
              <div>
                <p className="text-orange-400 font-bold">Byte 1: Text Length</p>
                <p>Bytes 2+: ASCII ASCII bytes</p>
              </div>
            </div>
          </div>

          {/* Motorway Sign Visual Output */}
          <div className="p-4 rounded-xl bg-black border-2 border-slate-800 flex flex-col items-center justify-center min-h-[140px] shadow-inner text-yellow-500 font-mono">
            <div className="flex items-center gap-6">
              {/* Virtual LED Sign Display (Left Panel) */}
              <div className="w-16 h-16 flex items-center justify-center">
                {activeSignLane === "closed" ? (
                  <svg className="w-14 h-14 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" viewBox="0 0 100 100">
                    <title>Lane Closed - Slashed Circle</title>
                    <circle cx="50" cy="50" r="40" stroke="#ef4444" strokeWidth="8" fill="none" />
                    <line x1="22" y1="22" x2="78" y2="78" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                ) : activeSignLane === "warning" ? (
                  <svg className="w-16 h-16 animate-pulse drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" viewBox="0 0 100 100">
                    <title>Warning - Hazard / Speed Limit</title>
                    <polygon points="50,15 88,82 12,82" stroke="#f59e0b" strokeWidth="8" strokeLinejoin="round" fill="none" />
                    {activeSignSpeed > 0 ? (
                      <text x="50" y="66" fontFamily="var(--font-mono), monospace" fontWeight="900" fontSize="28" fill="#f59e0b" textAnchor="middle">
                        {activeSignSpeed}
                      </text>
                    ) : (
                      <text x="50" y="68" fontFamily="sans-serif" fontWeight="900" fontSize="36" fill="#f59e0b" textAnchor="middle">
                        !
                      </text>
                    )}
                  </svg>
                ) : activeSignSpeed > 0 ? (
                  <svg className="w-14 h-14 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" viewBox="0 0 100 100">
                    <title>Speed Limit</title>
                    <circle cx="50" cy="50" r="40" stroke="#ef4444" strokeWidth="8" fill="none" />
                    <text x="50" y="64" fontFamily="var(--font-mono), monospace" fontWeight="900" fontSize="36" fill="#ffffff" textAnchor="middle">
                      {activeSignSpeed}
                    </text>
                  </svg>
                ) : (
                  <svg className="w-14 h-14 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" viewBox="0 0 100 100">
                    <title>Lane Open - Green Arrow</title>
                    <circle cx="50" cy="50" r="40" stroke="#22c55e" strokeWidth="8" fill="none" />
                    <path d="M50 25 L50 75 M32 55 L50 75 L68 55" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                )}
              </div>

              {/* Matrix Text (Right Panel) */}
              <div className="flex flex-col justify-center items-center bg-black border-2 border-yellow-600/20 rounded-lg p-2.5 min-h-[90px] w-[220px] shadow-[inset_0_0_10px_rgba(234,179,8,0.15)]">
                <div className={`w-full text-center font-bold font-mono text-yellow-500 tracking-wider flex flex-col justify-center gap-1 leading-normal ${getVMSFontSizeClass(formatVMSText(activeSignText))}`}>
                  {formatVMSText(activeSignText).map((line, idx) => (
                    <div key={idx} className="drop-shadow-[0_0_3px_rgba(234,179,8,0.75)]">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Queue Pipeline Visualizer Logs */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs font-mono min-h-[90px] max-h-[120px] overflow-y-auto custom-scrollbar">
            {vmsLogs.map((log, lIdx) => (
              <div key={lIdx} className="py-0.5">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
