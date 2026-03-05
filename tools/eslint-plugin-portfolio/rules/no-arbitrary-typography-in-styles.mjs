const normalize = (filename) => filename.replace(/\\/g, "/");

const isStylesFile = (filename) =>
  typeof filename === "string" &&
  (filename.includes("/src/features/") ||
    filename.includes("/src/components/UnderConstruction/")) &&
  filename.endsWith("/styles.ts");

const ARBITRARY_TYPOGRAPHY_PATTERN =
  /(?:^|\\s)(?:[a-z0-9-]+:)*(?:text|tracking|leading)-\\[[^\\]]+\\](?=\\s|$)/;

const hasDisallowedArbitraryTypography = (text) =>
  typeof text === "string" && ARBITRARY_TYPOGRAPHY_PATTERN.test(text);

const reportIfInvalid = (context, node, text) => {
  if (hasDisallowedArbitraryTypography(text)) {
    context.report({ node, messageId: "noArbitraryTypography" });
  }
};

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "disallow arbitrary text/tracking/leading utilities in styles.ts files",
    },
    schema: [],
    messages: {
      noArbitraryTypography:
        "Use shared design-system typography roles instead of arbitrary text/tracking/leading utilities.",
    },
  },
  create(context) {
    const filename = normalize(context.filename);
    if (!isStylesFile(filename)) {
      return {};
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          reportIfInvalid(context, node, node.value);
        }
      },
      TemplateLiteral(node) {
        const textValue = node.quasis
          .map((quasi) => quasi.value.cooked ?? "")
          .join("");
        reportIfInvalid(context, node, textValue);
      },
    };
  },
};
