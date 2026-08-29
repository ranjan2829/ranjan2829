import { createRequire } from "node:module";
import path from "node:path";
import { NextConfig } from "next";

const require = createRequire(path.join(process.cwd(), "next.config.ts"));
const wgslLoader = require.resolve("@vgpu/wgsl/loader-webpack");

const wgslRule = {
  test: /\.wgsl$/,
  type: "javascript/auto" as const,
  loader: wgslLoader,
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["vgpu", "@vgpu/core", "@vgpu/wgsl", "@vgpu/wgsl-std"],
  webpack: (config) => {
    const rules = config.module?.rules ?? [];
    const oneOfRule = rules.find(
      (rule): rule is { oneOf: object[] } =>
        typeof rule === "object" && rule !== null && "oneOf" in rule && Array.isArray(rule.oneOf)
    );
    if (oneOfRule) {
      oneOfRule.oneOf.unshift(wgslRule);
    } else {
      rules.unshift(wgslRule);
    }
    return config;
  },
  turbopack: {
    rules: {
      "*.wgsl": {
        loaders: [wgslLoader],
        as: "*.js",
      },
    },
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
