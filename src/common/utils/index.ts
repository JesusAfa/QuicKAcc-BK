export const base64ToArrayBuffer = (base64: string) => {
  const binaryString = atob(
    base64.substring(base64.indexOf('base64,') + 7, base64.length),
  );
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export function extFile(filename: string) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
}
