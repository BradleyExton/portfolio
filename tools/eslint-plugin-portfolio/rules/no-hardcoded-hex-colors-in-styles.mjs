const HEX_COLOR_PATTERN = /#[0-9a-fA-F]{3,8}\b/;

const isStylesFile = (filename) =>
  typeof filename === "string" &&
  (filename.includes("/src/features/") ||
    filename.includes("/src/components/UnderConstruction/")) &&
  filename.endsWith("/styles.ts");

const containsHexColor = (text) =>
  typeof text === "string" && HEX_COLOR_PATTERN.test(text);

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "disallow hardcoded hex colors in styles.ts files; use semantic theme tokens",
    },
    schema: [],
    messages: {
      noHardcodedHexColor:
        "Hardcoded hex colors are not allowed in styles.ts. Use semantic token classes.",
    },
  },
  create(context) {
    if (!isStylesFile(context.filename)) {
      return {};
    }

    return {
      Literal(node) {
        if (typeof node.value === "string" && containsHexColor(node.value)) {
          context.report({ node, messageId: "noHardcodedHexColor" });
        }
      },
      TemplateLiteral(node) {
        if (node.expressions.length > 0) {
          return;
        }

        const textValue = node.quasis
          .map((quasi) => quasi.value.cooked ?? "")
          .join("");
        if (containsHexColor(textValue)) {
          context.report({ node, messageId: "noHardcodedHexColor" });
        }
      },
    };
  },
};
