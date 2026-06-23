export const speedCodeMap: Record<number, number> = {
  0: 0,   // None
  20: 2,
  30: 3,
  40: 4,
  50: 5,
  60: 6,
  70: 7
};

export const laneCodeMap: Record<string, number> = {
  open: 1,
  closed: 2,
  warning: 3
};

export interface SerializedPacket {
  byte0: number;
  buffer: Uint8Array;
  hex: string;
}

export const serializeVMSPacket = (speed: number, lane: string, text: string): SerializedPacket => {
  const sCode = speedCodeMap[speed] || 0;
  const lCode = laneCodeMap[lane] || 0;
  
  // Combine byte 0: speed limit shifted by 4, OR lane status shifted by 2
  const byte0 = (sCode << 4) | (lCode << 2);
  
  const textBytes = new TextEncoder().encode(text.slice(0, 20)); // Limit to 20 chars
  const buffer = new Uint8Array(2 + textBytes.length);
  buffer[0] = byte0;
  buffer[1] = textBytes.length;
  for (let i = 0; i < textBytes.length; i++) {
    buffer[2 + i] = textBytes[i];
  }

  // Convert to hex string
  const hex = Array.from(buffer).map(b => "0x" + b.toString(16).toUpperCase().padStart(2, "0")).join(", ");
  
  return { byte0, buffer, hex };
};

export const formatVMSText = (text: string): string[] => {
  if (!text || !text.trim()) return ["VMS BLANK"];
  const words = text.toUpperCase().trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (!word) continue;
    if (word.length > 12) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }
      lines.push(word);
    } else if ((currentLine + (currentLine ? " " : "") + word).length <= 12) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines.slice(0, 3); // Capped at 3 lines
};

export const getVMSFontSizeClass = (lines: string[]): string => {
  const maxLineLength = Math.max(...lines.map(l => l.length), 0);
  const lineCount = lines.length;

  if (lineCount === 1) {
    if (maxLineLength <= 6) return "text-lg tracking-widest py-4";
    if (maxLineLength <= 10) return "text-base tracking-wider py-4";
    return "text-sm tracking-normal py-4";
  }
  if (lineCount === 2) {
    if (maxLineLength <= 8) return "text-sm tracking-wider py-2.5";
    return "text-xs tracking-normal py-2.5";
  }
  if (maxLineLength <= 8) return "text-xs tracking-normal py-1.5";
  return "text-[10px] tracking-tight leading-tight py-1";
};
