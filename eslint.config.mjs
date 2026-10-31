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
    files: [
      "components/magicui/**",
      "components/ui/**",
      "components/aceternity/**",
      "components/reactbits/**",
    ],
    // Vendored files keep their upstream eslint-disable comments.
    linterOptions: { reportUnusedDisableDirectives: "off" },
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
      // React Bits reads the clock inside callbacks and computes a memo key inline.
      "react-hooks/purity": "off",
      "react-hooks/use-memo": "off",
      // Type and value share a name in a few files; TypeScript checks these.
      "no-redeclare": "off",
      // React Bits ships `catch {}` for best-effort pointer capture.
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
];

export default eslintConfig;
