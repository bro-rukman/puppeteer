export function decodeHTML(str: string) {
  return str.replace(/&#([0-9]+);/g, function (full, int) {
    return String.fromCharCode(parseInt(int));
  });
}
