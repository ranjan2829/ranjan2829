import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  js.configs.recommended,
  ...nextCoreWebVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
  {
    // Vendored Magic UI / shadcn source, kept as published so it can be updated
    // from the registry. React 19's compiler rules flag its effect patterns.
    files: ["components/magicui/**", "components/ui/**", "components/aceternity/**"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
      // Type and value share a name in a few files; TypeScript checks these.
      "no-redeclare": "off",
    },
  },
];

export default eslintConfig;
