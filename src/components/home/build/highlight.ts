export type TokenKind = "kw" | "str" | "cm" | "tag" | "fn" | "num" | "attr" | "punct" | "plain";
export type Token = { kind: TokenKind; text: string };

const KEYWORDS = new Set([
  "import", "from", "export", "default", "async", "await", "function", "const", "return", "type", "true", "false",
]);

const PATTERN =
  /(\/\/.*$)|("[^"]*")|(<\/?[A-Z][\w.]*|\/?>)|(\b\d[\d,.]*\b)|(\b[a-zA-Z_]\w*(?==))|(\b[a-zA-Z_]\w*(?=\())|(\b[a-zA-Z_]\w*\b)|([{}()[\];,.:=?|&*])/g;

/**
 * Just enough TSX highlighting for the scripted editor: comments, strings,
 * JSX tags, props, calls and keywords. Not a parser — the source is ours.
 */
export function highlight(line: string): Token[] {
  const out: Token[] = [];
  let last = 0;
  for (const m of line.matchAll(PATTERN)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ kind: "plain", text: line.slice(last, at) });
    const [text, cm, str, tag, num, attr, fn, word] = m;
    const kind: TokenKind = cm
      ? "cm"
      : str
        ? "str"
        : tag
          ? "tag"
          : num
            ? "num"
            : attr
              ? "attr"
              : fn
                ? "fn"
                : word
                  ? KEYWORDS.has(word)
                    ? "kw"
                    : "plain"
                  : "punct";
    out.push({ kind, text });
    last = at + text.length;
  }
  if (last < line.length) out.push({ kind: "plain", text: line.slice(last) });
  return out;
}
