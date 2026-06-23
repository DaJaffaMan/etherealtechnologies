import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationTriangle, faBolt } from "@fortawesome/free-solid-svg-icons";
import { computeSHA256 } from "../../utils/cryptoUtils";

/** Count different bits between two equal-length hex strings */
const diffCountBits = (a: string, b: string): number => {
  let diffs = 0;
  for (let i = 0; i < a.length; i++) {
    const valA = parseInt(a[i], 16);
    const valB = parseInt(b[i], 16);
    let xor = valA ^ valB;
    while (xor > 0) {
      diffs += xor & 1;
      xor >>= 1;
    }
  }
  return diffs;
};

export const CryptoTab: React.FC = () => {
  const [cryptoText, setCryptoText] = useState("Hello Ethereal Technologies!");
  const [textHash, setTextHash] = useState("");
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [hashA, setHashA] = useState("");
  const [hashB, setHashB] = useState("");
  const [hashComparison, setHashComparison] = useState<"match" | "mismatch" | "empty">("empty");

  // Avalanche effect: mutated text = flip one char
  const mutatedText = cryptoText
    ? cryptoText.slice(0, -1) + String.fromCharCode((cryptoText.charCodeAt(cryptoText.length - 1) + 1) % 128 || 65)
    : "";
  const [mutatedHash, setMutatedHash] = useState("");

  // Pipeline steps for the encoding visualization
  const [pipelineSteps, setPipelineSteps] = useState<string[]>([]);

  // Real-time text hashing
  useEffect(() => {
    if (!cryptoText) { setTextHash(""); setMutatedHash(""); return; }
    computeSHA256(cryptoText).then(h => setTextHash(h));
    computeSHA256(mutatedText).then(h => setMutatedHash(h));
  }, [cryptoText, mutatedText]);

  // Build pipeline visualization whenever cryptoText changes
  useEffect(() => {
    if (!cryptoText) { setPipelineSteps([]); return; }
    const bytes = new TextEncoder().encode(cryptoText);
    const bytePreview = Array.from(bytes.slice(0, 6))
      .map(b => `0x${b.toString(16).toUpperCase().padStart(2, "0")}`)
      .join(" ") + (bytes.length > 6 ? ` … +${bytes.length - 6} more` : "");
    setPipelineSteps([
      `string   "${cryptoText.slice(0, 28)}${cryptoText.length > 28 ? "…" : ""}"`,
      `TextEncoder → Uint8Array(${bytes.length})   [${bytePreview}]`,
      `crypto.subtle.digest("SHA-256", buffer)`,
      `ArrayBuffer → Uint8Array(32)`,
      `map b → b.toString(16).padStart(2,"0")  →  hex string`,
    ]);
  }, [cryptoText]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, target: "A" | "B") => {
    const file = e.target.files?.[0] || null;
    if (target === "A") setFileA(file);
    else setFileB(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const buf = evt.target?.result as ArrayBuffer;
        if (buf) {
          const hash = await computeSHA256(buf);
          if (target === "A") setHashA(hash);
          else setHashB(hash);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      if (target === "A") setHashA("");
      else setHashB("");
    }
  };

  useEffect(() => {
    if (hashA && hashB) setHashComparison(hashA === hashB ? "match" : "mismatch");
    else setHashComparison("empty");
  }, [hashA, hashB]);

  const diffBits = (textHash && mutatedHash) ? diffCountBits(textHash, mutatedHash) : 0;
  const diffPct = textHash.length ? Math.round((diffBits / (textHash.length * 4)) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-lg font-bold">SHA-256 File Integrity Verification</h4>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Demonstrates client-side cryptography utilizing the native browser Web Crypto API (<code>crypto.subtle</code>). Upload two files or input text to verify if any modifications have occurred.
        </p>
      </div>

      {/* Manual Text Hashing Input */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[var(--text-muted)]">Input text to hash:</label>
          <input 
            type="text"
            value={cryptoText}
            onChange={(e) => setCryptoText(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="md:col-span-8 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[var(--text-muted)]">Resulting SHA-256 Hash:</label>
          <code className="flex-1 select-all px-3 py-2 text-xs font-mono rounded-xl bg-slate-900 text-green-400 border border-slate-800 overflow-x-auto break-all whitespace-pre">
            {textHash || "Waiting for input..."}
          </code>
        </div>
      </div>

      {/* Encoding Pipeline Visualization */}
      {pipelineSteps.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest font-mono">Encoding Pipeline</span>
          <div className="flex flex-col gap-1">
            {pipelineSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px] font-mono">
                <span className="text-orange-400 shrink-0 w-4 text-right">{i + 1}.</span>
                <span className="text-slate-300 break-all">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Avalanche Effect Demo */}
      {textHash && mutatedHash && cryptoText.length > 0 && (
        <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBolt} className="text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Avalanche Effect Demo</span>
            <span className="text-[10px] text-[var(--text-muted)] ml-auto">1-character mutation → {diffPct}% hash divergence ({diffBits}/256 bits flipped)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-mono">
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 font-sans text-[10px]">Original: <span className="text-white">"{cryptoText.slice(0, 30)}{cryptoText.length > 30 ? "…" : ""}"</span></span>
              <code className="text-green-400 break-all leading-relaxed">
                {Array.from(textHash).map((c, i) => (
                  <span key={i} className={mutatedHash[i] !== c ? "text-red-400 font-bold" : ""}>{c}</span>
                ))}
              </code>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 font-sans text-[10px]">Mutated: <span className="text-amber-300">"{mutatedText.slice(0, 30)}{mutatedText.length > 30 ? "…" : ""}"</span> (last char +1)</span>
              <code className="text-green-400 break-all leading-relaxed">
                {Array.from(mutatedHash).map((c, i) => (
                  <span key={i} className={textHash[i] !== c ? "text-red-400 font-bold" : ""}>{c}</span>
                ))}
              </code>
            </div>
          </div>
          <p className="text-[10px] text-[var(--text-muted)]">Red characters highlight positions where the hashes diverge. Because each hex character represents 4 bits, a single bit-flip alters the entire character. A secure hash function avalanches even a single-bit input change across ~50% of its output bits.</p>
        </div>
      )}

      {/* File Verification comparison uploader */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {/* File A */}
        <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)] flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">Source File (File A)</span>
            {hashA && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
          </div>
          <input 
            type="file" 
            onChange={(e) => handleFileChange(e, "A")}
            className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer"
          />
          {fileA && (
            <div className="flex flex-col gap-1 mt-1">
              <span className="text-xs font-medium text-[var(--text-muted)]">Size: {fileA.size} bytes</span>
              <code className="text-[10px] font-mono select-all bg-slate-900 text-orange-400 p-1.5 rounded overflow-x-auto break-all">{hashA}</code>
            </div>
          )}
        </div>

        {/* File B */}
        <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)] flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">Comparison File (File B)</span>
            {hashB && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
          </div>
          <input 
            type="file" 
            onChange={(e) => handleFileChange(e, "B")}
            className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer"
          />
          {fileB && (
            <div className="flex flex-col gap-1 mt-1">
              <span className="text-xs font-medium text-[var(--text-muted)]">Size: {fileB.size} bytes</span>
              <code className="text-[10px] font-mono select-all bg-slate-900 text-orange-400 p-1.5 rounded overflow-x-auto break-all">{hashB}</code>
            </div>
          )}
        </div>
      </div>

      {/* Integrity Verification Comparison Output */}
      {hashComparison !== "empty" && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 transition-colors ${hashComparison === "match" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
          <FontAwesomeIcon icon={hashComparison === "match" ? faCheckCircle : faExclamationTriangle} className="text-lg" />
          <div>
            <p className="font-bold text-sm">
              {hashComparison === "match" ? "INTEGRITY SECURED: Files are identical." : "INTEGRITY BREACHED: Files are modified / mismatch."}
            </p>
            <p className="text-xs mt-0.5">
              {hashComparison === "match" ? "The computed cryptographic checksums match perfectly. Original content unmodified." : "The SHA-256 byte sums do not match. The file data has been altered."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
