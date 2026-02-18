const normalize = (filename) => filename.replace(/\\/g, "/");

const isComponentEntry = (filename) =>
  /\/src\/(?:features\/.+|components\/UnderConstruction)\/index\.tsx$/.test(
    filename,
  );

export default {
  meta: {
    type: "problem",
    docs: {
      description: "disallow inline JSX style props in component entry files",
    },
    schema: [],
    messages: {
      noInlineStyle:
        "Inline JSX style props are not allowed; define styles in styles.ts and import them.",
    },
  },
  create(context) {
    const filename = normalize(context.filename);
    if (!isComponentEntry(filename)) {
      return {};
    }

    return {
      JSXAttribute(node) {
        if (
          node.name &&
          node.name.type === "JSXIdentifier" &&
          node.name.name === "style"
        ) {
          context.report({ node, messageId: "noInlineStyle" });
        }
      },
    };
  },
};
