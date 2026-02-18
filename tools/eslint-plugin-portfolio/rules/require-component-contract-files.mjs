import fs from "node:fs";
import path from "node:path";

const normalize = (filename) => filename.replace(/\\/g, "/");

const isComponentEntry = (filename) =>
  /\/src\/(?:features\/.+|components\/UnderConstruction)\/index\.tsx$/.test(
    filename,
  );

const REQUIRED_FILES = ["styles.ts", "types.ts", "utils.ts"];

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "require component folders to include styles.ts, types.ts, and utils.ts",
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

        for (const requiredFile of REQUIRED_FILES) {
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
