import { sites } from "@openai/sites-vite-plugin";
import vinext from "vinext";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import hostingConfig from "./.openai/hosting.json" with { type: "json" };

const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";
const isVercelBuild =
  process.env.VERCEL === "1" || process.env.NITRO_PRESET === "vercel";

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
};

export default defineConfig(async () => {
  const sharedConfig = {
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    define: {
      __SITE_PROJECT_ID__: JSON.stringify(hostingConfig.project_id),
    },
  };

  if (isVercelBuild) {
    return {
      ...sharedConfig,
      plugins: [vinext(), nitro()],
    };
  }

  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    ...sharedConfig,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});