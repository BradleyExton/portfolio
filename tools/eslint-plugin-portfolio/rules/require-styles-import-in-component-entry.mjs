const normalize = (filename) => filename.replace(/\\/g, "/");

const isComponentEntry = (filename) =>
  /\/src\/(?:features\/.+|components\/UnderConstruction)\/index\.tsx$/.test(
    filename,
  );

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        'require component entrypoint files to import styles as a namespace from "./styles"',
    },
    schema: [],
    messages: {
      missingStylesImport:
        'Component entrypoint must import styles from "./styles".',
      invalidStylesImport:
        'Component entrypoint must import styles as `import * as styles from "./styles"`.',
    },
  },
  create(context) {
    const filename = normalize(context.filename);
    if (!isComponentEntry(filename)) {
      return {};
    }

    let hasStylesImport = false;

    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (source === "./styles" || source === "./styles.ts") {
          hasStylesImport = true;

          const hasNamespaceStylesSpecifier =
            node.specifiers.length === 1 &&
            node.specifiers[0].type === "ImportNamespaceSpecifier" &&
            node.specifiers[0].local.name === "styles";

          if (hasNamespaceStylesSpecifier) {
            return;
          }

          context.report({ node, messageId: "invalidStylesImport" });
        }
      },
      "Program:exit"(node) {
        if (!hasStylesImport) {
          context.report({ node, messageId: "missingStylesImport" });
        }
      },
    };
  },
};
