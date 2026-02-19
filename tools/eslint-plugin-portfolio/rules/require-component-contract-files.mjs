import fs from "node:fs";
import path from "node:path";

const normalize = (filename) => filename.replace(/\\/g, "/");

const isComponentEntry = (filename) =>
  /\/src\/(?:features\/.+|components\/UnderConstruction)\/index\.tsx$/.test(
    filename,
  );

const ALWAYS_REQUIRED_FILES = ["styles.ts"];
const CONDITIONAL_FILE_SPECS = {
  types: "types.ts",
  utils: "utils.ts",
};

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "require component folders to include styles.ts and any contract files imported by the entrypoint",
    },
    schema: [],
    messages: {
      missingContractFile:
        "Missing required component contract file: {{fileName}}.",
    },
  },
  create(context) {
    const filename = normalize(context.filename);
    if (!isComponentEntry(filename)) {
      return {};
    }

    return {
      Program(node) {
        const componentDir = path.dirname(context.filename);
        const importedContractFiles = new Set(ALWAYS_REQUIRED_FILES);

        for (const statement of node.body) {
          if (statement.type !== "ImportDeclaration") {
            continue;
          }

          if (typeof statement.source.value !== "string") {
            continue;
          }

          const source = statement.source.value;
          if (source === "./types" || source === "./types.ts") {
            importedContractFiles.add(CONDITIONAL_FILE_SPECS.types);
          }

          if (source === "./utils" || source === "./utils.ts") {
            importedContractFiles.add(CONDITIONAL_FILE_SPECS.utils);
          }
        }

        for (const requiredFile of importedContractFiles) {
          const fullPath = path.join(componentDir, requiredFile);
          if (!fs.existsSync(fullPath)) {
            context.report({
              node,
              messageId: "missingContractFile",
              data: { fileName: requiredFile },
            });
          }
        }
      },
    };
  },
};
