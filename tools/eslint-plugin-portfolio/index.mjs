import componentEntryFileName from "./rules/component-entry-file-name.mjs";
import requireStylesImportInComponentEntry from "./rules/require-styles-import-in-component-entry.mjs";
import requireComponentContractFiles from "./rules/require-component-contract-files.mjs";
import noInlineStyleProp from "./rules/no-inline-style-prop.mjs";
import noHardcodedHexColorsInStyles from "./rules/no-hardcoded-hex-colors-in-styles.mjs";
import noNonsemanticColorTokensInStyles from "./rules/no-nonsemantic-color-tokens-in-styles.mjs";
import noArbitraryTypographyInStyles from "./rules/no-arbitrary-typography-in-styles.mjs";
import preferDesignSystemSectionSpacing from "./rules/prefer-design-system-section-spacing.mjs";

const plugin = {
  rules: {
    "component-entry-file-name": componentEntryFileName,
    "require-styles-import-in-component-entry":
      requireStylesImportInComponentEntry,
    "require-component-contract-files": requireComponentContractFiles,
    "no-inline-style-prop": noInlineStyleProp,
    "no-hardcoded-hex-colors-in-styles": noHardcodedHexColorsInStyles,
    "no-nonsemantic-color-tokens-in-styles": noNonsemanticColorTokensInStyles,
    "no-arbitrary-typography-in-styles": noArbitraryTypographyInStyles,
    "prefer-design-system-section-spacing": preferDesignSystemSectionSpacing,
  },
};

export default plugin;
