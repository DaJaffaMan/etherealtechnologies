import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { 
  serializeVMSPacket, 
  formatVMSText, 
  getVMSFontSizeClass,
  speedCodeMap,
  laneCodeMap,
} from "../../utils/vmsUtils";

/** XOR checksum of all bytes in the buffer (standard protocol integrity byte) */
const computeChecksum = (buffer: Uint8Array): number =>
  Array.from(buffer).reduce((acc, b) => acc ^ b, 0);

/** Render Byte 0 as 8 coloured bit cells */
const BitField: React.FC<{ value: number }> = ({ value }) => {
  const bits = Array.from({ length: 8 }, (_, i) => (value >> (7 - i)) & 1);
  // bits[0-3] = speed code (upper nibble), bits[4-5] = lane code (next 2 bits), bits[6-7] = reserved
  const regionColor = (i: number) => {
    if (i <= 3) return bits[i] ? "bg-emerald-500 text-white" : "bg-emerald-500/10 text-emerald-400";
    if (i <= 5) return bits[i] ? "bg-blue-500 text-white" : "bg-blue-500/10 text-blue-400";
    return bits[i] ? "bg-slate-600 text-white" : "bg-slate-700 text-slate-500";
  };
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {bits.map((bit, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-black font-mono border border-black/20 transition-all duration-300 ${regionColor(i)}`}
          >
            {bit}
          </div>
        ))}
      </div>
      <div className="flex gap-0 text-[8px] font-mono text-slate-500">
        <span className="w-[116px] text-center text-emerald-400">speed code (bits 7-4)</span>
        <span className="w-[58px] text-center text-blue-400">lane (3-2)</span>
        <span className="w-[58px] text-center">rsvd</span>
      </div>
    </div>
  );
};

/** Decode Byte 0 back to human-readable values */
const decodeStep = (byte0: number) => {
  const speedCode = (byte0 >> 4) & 0x0F;
  const laneCode  = (byte0 >> 2) & 0x03;
  const speedMph  = Object.entries(speedCodeMap).find(([, v]) => v === speedCode)?.[0] ?? "?";
  const laneName  = Object.entries(laneCodeMap).find(([, v]) => v === laneCode)?.[0] ?? "?";
  return { speedCode, laneCode, speedMph, laneName };
};

export const BitwiseTab: React.FC = () => {
  const [signSpeed, setSignSpeed] = useState<number>(50);
  const [signLane, setSignLane] = useState<string>("closed");
  const [signText, setSignText] = useState("LANE CLOSED AHEAD");

  const [vmsBufferHex, setVmsBufferHex] = useState("");
  const [currentByte0, setCurrentByte0] = useState(0);
  const [checksumByte, setChecksumByte] = useState(0);

  const [vmsQueueState, setVmsQueueState] = useState<"idle" | "producing" | "queued" | "consuming" | "rendered">("idle");
  const [vmsLogs, setVmsLogs] = useState<string[]>([]);
  const [activeSignSpeed, setActiveSignSpeed] = useState<number>(50);
  const [activeSignLane, setActiveSignLane] = useState<string>("closed");
  const [activeSignText, setActiveSignText] = useState("LANE CLOSED AHEAD");

  // Show decode mode after a dispatch completes
  const [showDecode, setShowDecode] = useState(false);

  // Serialization listener — updates hex display and bit visualization in real-time
  useEffect(() => {
    const packet = serializeVMSPacket(signSpeed, signLane, signText);
    const xor = computeChecksum(packet.buffer);
    setVmsBufferHex(packet.hex + `, 0x${xor.toString(16).toUpperCase().padStart(2, "0")} (CRC)`);
    setCurrentByte0(packet.byte0);
    setChecksumByte(xor);
  }, [signSpeed, signLane, signText]);

  const triggerVmsTransmission = () => {
    if (vmsQueueState !== "idle" && vmsQueueState !== "rendered") return;
    setShowDecode(false);
    setVmsQueueState("producing");
    const packet = serializeVMSPacket(signSpeed, signLane, signText);
    const xor = computeChecksum(packet.buffer);
    setVmsLogs([
      "[Producer] Packaging motorway sign variables...",
      `[Producer] Byte 0 (header):  0x${packet.byte0.toString(16).toUpperCase().padStart(2, "0")} → speed=${signSpeed} MPH, lane=${signLane.toUpperCase()}`,
      `[Producer] Byte 1 (length):  ${signText.slice(0, 20).length} chars`,
      `[Producer] Bytes 2+ (ASCII): "${signText.slice(0, 20)}"`,
      `[Producer] Checksum (XOR):   0x${xor.toString(16).toUpperCase().padStart(2, "0")}`,
      `[Producer] Buffer → [${packet.hex.slice(0, 35)}…]`,
    ]);

    setTimeout(() => {
      setVmsQueueState("queued");
      setVmsLogs(prev => [
        ...prev,
        "[Queue] Routing packet into Kafka message stream...",
        "[Queue] Message acknowledged at broker. Offset: +1.",
      ]);

      setTimeout(() => {
        setVmsQueueState("consuming");
        setVmsLogs(prev => [
          ...prev,
          "[Consumer] Roadside C Server received packet.",
          `[Consumer] Byte 0 decode: (0x${packet.byte0.toString(16).toUpperCase()} >> 4) & 0x0F = speed code ${(packet.byte0 >> 4) & 0x0F} → ${signSpeed} MPH`,
          `[Consumer] Byte 0 decode: (0x${packet.byte0.toString(16).toUpperCase()} >> 2) & 0x03 = lane code ${(packet.byte0 >> 2) & 0x03} → ${signLane.toUpperCase()}`,
          `[Consumer] XOR checksum: 0x${xor.toString(16).toUpperCase()} ✓ integrity verified`,
          "[Consumer] Parsing ASCII text payload...",
        ]);

        setTimeout(() => {
          setVmsQueueState("rendered");
          setActiveSignSpeed(signSpeed);
          setActiveSignLane(signLane);
          setActiveSignText(signText);
          setShowDecode(true);
          setVmsLogs(prev => [
            ...prev,
            `[LED Sign] Sign updated → Speed: ${signSpeed} MPH / Text: "${signText}"`,
            "[LED Sign] LED matrices rendering outputs...",
          ]);
        }, 1200);
      }, 1200);
    }, 1000);
  };

  const decoded = decodeStep(currentByte0);

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
              id="vms-speed-select"
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
                  id={`vms-lane-btn-${opt}`}
                  onClick={() => setSignLane(opt)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize border ${signLane === opt ? "bg-emerald-500 text-white border-emerald-500" : "bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-muted)]"}`}
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
              id="vms-text-input"
              type="text" 
              maxLength={20}
              value={signText}
              onChange={(e) => setSignText(e.target.value.toUpperCase())}
              className="px-3 py-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button 
            id="vms-dispatch-btn"
            onClick={triggerVmsTransmission}
            disabled={vmsQueueState !== "idle" && vmsQueueState !== "rendered"}
            className="w-full py-3 mt-2 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowRight} /> Dispatch Event
          </button>

          {/* Byte 0 Bit Visualizer */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-3">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest font-mono">Byte 0 — Bit-field Visualisation</span>
            <BitField value={currentByte0} />
            <div className="flex gap-3 text-[10px] font-mono text-slate-400 flex-wrap">
              <span><span className="text-emerald-400">■</span> Speed bits: <span className="text-white">{(currentByte0 >> 4) & 0x0F}</span> (code {decoded.speedCode} = {decoded.speedMph} MPH)</span>
              <span><span className="text-blue-400">■</span> Lane bits: <span className="text-white">{(currentByte0 >> 2) & 0x03}</span> (code {decoded.laneCode} = {decoded.laneName})</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800 pt-2">
              Byte 0 = (<span className="text-emerald-400">speedCode</span> &lt;&lt; 4) | (<span className="text-blue-400">laneCode</span> &lt;&lt; 2)
              = 0x{currentByte0.toString(16).toUpperCase().padStart(2, "0")} ({currentByte0})
            </div>
          </div>
        </div>

        {/* Byte buffer display and visual sign */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {/* Packed byte buffer view */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-white flex flex-col gap-2">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest font-mono">Serialized Binary Packet (Byte Buffer + CRC)</span>
            <code id="vms-binary-packet" className="text-xs font-mono text-green-400 select-all p-2 rounded bg-slate-950 break-all overflow-x-auto whitespace-pre">
              [{vmsBufferHex}]
            </code>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400 mt-1">
              <div>
                <p className="text-emerald-400 font-bold">Byte 0: Header</p>
                <p>Bits 7-4: Speed Code</p>
                <p>Bits 3-2: Lane Code</p>
              </div>
              <div>
                <p className="text-emerald-400 font-bold">Byte 1: Text Length</p>
                <p>Bytes 2+: ASCII bytes</p>
              </div>
              <div>
                <p className="text-emerald-400 font-bold">Last: XOR Checksum</p>
                <p>0x{checksumByte.toString(16).toUpperCase().padStart(2, "0")} = integrity CRC</p>
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
                      <text x="50" y="66" fontFamily="var(--font-mono), monospace" fontWeight="900" fontSize="28" fill="#f59e0b" textAnchor="middle">{activeSignSpeed}</text>
                    ) : (
                      <text x="50" y="68" fontFamily="sans-serif" fontWeight="900" fontSize="36" fill="#f59e0b" textAnchor="middle">!</text>
                    )}
                  </svg>
                ) : activeSignSpeed > 0 ? (
                  <svg className="w-14 h-14 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" viewBox="0 0 100 100">
                    <title>Speed Limit</title>
                    <circle cx="50" cy="50" r="40" stroke="#ef4444" strokeWidth="8" fill="none" />
                    <text x="50" y="64" fontFamily="var(--font-mono), monospace" fontWeight="900" fontSize="36" fill="#ffffff" textAnchor="middle">{activeSignSpeed}</text>
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
                    <div key={idx} className="drop-shadow-[0_0_3px_rgba(234,179,8,0.75)]">{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decode mode panel — shown after dispatch */}
          {showDecode && (
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex flex-col gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <FontAwesomeIcon icon={faArrowLeft} />
                <span className="text-[10px] uppercase tracking-widest">Consumer Decode — Byte 0: 0x{currentByte0.toString(16).toUpperCase().padStart(2, "0")}</span>
              </div>
              <div className="flex flex-col gap-1 text-[10px] text-slate-400">
                <span>speed_code = (byte0 &gt;&gt; 4) &amp; 0x0F  →  <span className="text-emerald-400">{(currentByte0 >> 4) & 0x0F}</span>  →  <span className="text-white">{activeSignSpeed} MPH</span></span>
                <span>lane_code  = (byte0 &gt;&gt; 2) &amp; 0x03  →  <span className="text-blue-400">{(currentByte0 >> 2) & 0x03}</span>  →  <span className="text-white">{activeSignLane.toUpperCase()}</span></span>
                <span>checksum   = XOR(all bytes)           →  <span className="text-green-400">0x{checksumByte.toString(16).toUpperCase().padStart(2, "0")} ✓</span></span>
              </div>
            </div>
          )}

          {/* Queue Pipeline Visualizer Logs */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs font-mono min-h-[90px] max-h-[140px] overflow-y-auto custom-scrollbar">
            {vmsLogs.length === 0 ? (
              <span className="text-slate-600 italic">Pipeline idle. Set variables and dispatch an event.</span>
            ) : (
              vmsLogs.map((log, lIdx) => (
                <div key={lIdx} className={`py-0.5 ${log.startsWith("[Producer]") ? "text-emerald-400" : log.startsWith("[Queue]") ? "text-blue-400" : log.startsWith("[Consumer]") ? "text-purple-400" : log.startsWith("[LED Sign]") ? "text-green-400" : ""}`}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
