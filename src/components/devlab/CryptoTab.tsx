import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { computeSHA256 } from "../../utils/cryptoUtils";

export const CryptoTab: React.FC = () => {
  // Lab Tab 1: Crypto States
  const [cryptoText, setCryptoText] = useState("Hello Ethereal Technologies!");
  const [textHash, setTextHash] = useState("");
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [hashA, setHashA] = useState("");
  const [hashB, setHashB] = useState("");
  const [hashComparison, setHashComparison] = useState<"match" | "mismatch" | "empty">("empty");

  // Real-time text hashing
  useEffect(() => {
    if (!cryptoText) {
      setTextHash("");
      return;
    }
    computeSHA256(cryptoText).then(hash => setTextHash(hash));
  }, [cryptoText]);

  // File hashing handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, target: "A" | "B") => {
    const file = e.target.files?.[0] || null;
    if (target === "A") setFileA(file);
    else setFileB(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const arrayBuffer = evt.target?.result as ArrayBuffer;
        if (arrayBuffer) {
          const hash = await computeSHA256(arrayBuffer);
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
    if (hashA && hashB) {
      setHashComparison(hashA === hashB ? "match" : "mismatch");
    } else {
      setHashComparison("empty");
    }
  }, [hashA, hashB]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-lg font-bold">SHA-256 File Integrity Verification</h4>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Demonstrates client-side cryptography utilizing the native browser Web Crypto API (`crypto.subtle`). Upload two files or input text to verify if any modifications have occurred.
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
          <div className="flex gap-2">
            <code className="flex-1 select-all px-3 py-2 text-xs font-mono rounded-xl bg-slate-900 text-green-400 border border-slate-800 overflow-x-auto break-all whitespace-pre">
              {textHash || "Waiting for input..."}
            </code>
          </div>
        </div>
      </div>

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
              <code className="text-[10px] font-mono select-all bg-slate-900 text-orange-400 p-1.5 rounded overflow-x-auto break-all">
                {hashA}
              </code>
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
              <code className="text-[10px] font-mono select-all bg-slate-900 text-orange-400 p-1.5 rounded overflow-x-auto break-all">
                {hashB}
              </code>
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
