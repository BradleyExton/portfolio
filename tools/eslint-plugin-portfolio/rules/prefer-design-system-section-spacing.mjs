const normalize = (filename) => filename.replace(/\\/g, "/");

const isStylesFile = (filename) =>
  typeof filename === "string" &&
  (filename.includes("/src/features/") ||
    filename.includes("/src/components/UnderConstruction/")) &&
  filename.endsWith("/styles.ts");

const SECTION_EXPORT_NAME_PATTERN = /section$/i;
const DESIGN_SYSTEM_SECTION_PATTERN = /spacing\.(section|hero)/;

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "require section exports in styles.ts files to use spacing.section or spacing.hero presets",
    },
    schema: [],
    messages: {
      missingDesignSystemSectionSpacing:
        "Section exports should compose spacing.section or spacing.hero from the shared design system.",
    },
  },
  create(context) {
    const filename = normalize(context.filename);
    if (!isStylesFile(filename)) {
      return {};
    }

    return {
      VariableDeclarator(node) {
        if (node.id.type !== "Identifier") {
          return;
        }

        if (!SECTION_EXPORT_NAME_PATTERN.test(node.id.name)) {
          return;
        }

        const variableDeclaration = node.parent;
        if (!variableDeclaration || variableDeclaration.type !== "VariableDeclaration") {
          return;
        }

        const exportNode = variableDeclaration.parent;
        if (!exportNode || exportNode.type !== "ExportNamedDeclaration") {
          return;
        }

        if (!node.init) {
          return;
        }

        const initializerText = context.sourceCode.getText(node.init);
        if (!DESIGN_SYSTEM_SECTION_PATTERN.test(initializerText)) {
          context.report({
            node,
            messageId: "missingDesignSystemSectionSpacing",
          });
        }
      },
    };
  },
};
