const isStylesFile = (filename) =>
  typeof filename === "string" &&
  (filename.includes("/src/features/") ||
    filename.includes("/src/components/UnderConstruction/")) &&
  filename.endsWith("/styles.ts");

const DISALLOWED_COLOR_TOKEN_PATTERN =
  /(?:^|\s)(?:[a-z0-9-]+:)*(?:bg|text|border|ring|outline|from|via|to|placeholder|decoration|caret|accent)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)(?:[-/][^\s]*)?(?=\s|$)/;

const containsDisallowedColorToken = (text) =>
  typeof text === "string" && DISALLOWED_COLOR_TOKEN_PATTERN.test(text);

const reportIfInvalid = (context, node, text) => {
  if (containsDisallowedColorToken(text)) {
    context.report({ node, messageId: "noNonsemanticColorToken" });
  }
};

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "disallow non-semantic tailwind color token classes in styles.ts files",
    },
    schema: [],
    messages: {
      noNonsemanticColorToken:
        "Use semantic portfolio color tokens in styles.ts instead of raw Tailwind palette colors.",
    },
  },
  create(context) {
    if (!isStylesFile(context.filename)) {
      return {};
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          reportIfInvalid(context, node, node.value);
        }
      },
      TemplateLiteral(node) {
        if (node.expressions.length > 0) {
          return;
        }

        const textValue = node.quasis
          .map((quasi) => quasi.value.cooked ?? "")
          .join("");
        reportIfInvalid(context, node, textValue);
      },
    };
  },
};
