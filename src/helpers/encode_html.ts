export function encodeHTML(str: string) {
  return str.replace(/([\u00A0-\u9999<>&])(.|$)/g, function (full, char, next) {
    if (char !== "&" || next !== "#") {
      if (/[\u00A0-\u9999<>&]/.test(next))
        next = "&#" + next.charCodeAt(0) + ";";
      return "&#" + char.charCodeAt(0) + ";" + next;
    }
    return full;
  });
}
