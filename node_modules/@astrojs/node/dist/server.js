import { NodeApp, applyPolyfills } from "astro/app/node";
import createMiddleware from "./middleware.js";
import { createStandaloneHandler } from "./standalone.js";
import startServer from "./standalone.js";
applyPolyfills();
function createExports(manifest, options) {
  const app = new NodeApp(manifest);
  options.trailingSlash = manifest.trailingSlash;
  return {
    options,
    handler: options.mode === "middleware" ? createMiddleware(app) : createStandaloneHandler(app, options),
    startServer: () => startServer(app, options)
  };
}
function start(manifest, options) {
  if (options.mode !== "standalone" || process.env.ASTRO_NODE_AUTOSTART === "disabled") {
    return;
  }
  const app = new NodeApp(manifest);
  startServer(app, options);
}
export {
  createExports,
  start
};
