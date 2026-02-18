const normalize = (filename) => filename.replace(/\\/g, "/");

const isTargetPath = (filename) =>
  filename.includes("/src/features/") ||
  filename.includes("/src/components/UnderConstruction/");

const COMPONENT_ENTRY_FILE_PATTERN =
  /\/src\/(?:features\/.+|components\/UnderConstruction)\/index(?:\.test)?\.tsx$/;

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "enforce index.tsx as the entrypoint filename for component TSX files",
    },
    schema: [],
    messages: {
      mustUseIndexTsx:
        "Component files in component folders must be named index.tsx or index.test.tsx.",
    },
  },
  create(context) {
    return {
      Program(node) {
        const filename = normalize(context.filename);
        if (!isTargetPath(filename)) {
          return;
        }

        if (COMPONENT_ENTRY_FILE_PATTERN.test(filename)) {
          return;
        }

        context.report({ node, messageId: "mustUseIndexTsx" });
      },
    };
  },
};
