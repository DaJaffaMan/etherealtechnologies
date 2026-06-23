export const computeSHA256 = async (data: string | ArrayBuffer): Promise<string> => {
  let buffer: BufferSource;
  if (typeof data === "string") {
    buffer = new TextEncoder().encode(data);
  } else {
    buffer = data;
  }
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};
