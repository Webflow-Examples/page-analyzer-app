import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import send from "send";
const isSubresourceRegex = /.+\.[a-z]+$/i;
function createStaticHandler(app, options) {
  const client = resolveClientDir(options);
  return (req, res, ssr) => {
    if (req.url) {
      const [urlPath, urlQuery] = req.url.split("?");
      const filePath = path.join(client, app.removeBase(urlPath));
      let pathname;
      let isDirectory = false;
      try {
        isDirectory = fs.lstatSync(filePath).isDirectory();
      } catch {
      }
      const { trailingSlash = "ignore" } = options;
      const hasSlash = urlPath.endsWith("/");
      switch (trailingSlash) {
        case "never":
          if (isDirectory && urlPath != "/" && hasSlash) {
            pathname = urlPath.slice(0, -1) + (urlQuery ? "?" + urlQuery : "");
            res.statusCode = 301;
            res.setHeader("Location", pathname);
            return res.end();
          } else
            pathname = urlPath;
        case "ignore":
          {
            if (isDirectory && !hasSlash) {
              pathname = urlPath + "/index.html";
            } else
              pathname = urlPath;
          }
          break;
        case "always":
          if (!hasSlash && !urlPath.match(isSubresourceRegex)) {
            pathname = urlPath + "/" + (urlQuery ? "?" + urlQuery : "");
            res.statusCode = 301;
            res.setHeader("Location", pathname);
            return res.end();
          } else
            pathname = urlPath;
          break;
      }
      pathname = prependForwardSlash(app.removeBase(pathname));
      const stream = send(req, pathname, {
        root: client,
        dotfiles: pathname.startsWith("/.well-known/") ? "allow" : "deny"
      });
      let forwardError = false;
      stream.on("error", (err) => {
        if (forwardError) {
          console.error(err.toString());
          res.writeHead(500);
          res.end("Internal server error");
          return;
        }
        ssr();
      });
      stream.on("headers", (_res) => {
        if (pathname.startsWith(`/${options.assets}/`)) {
          _res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      });
      stream.on("file", () => {
        forwardError = true;
      });
      stream.pipe(res);
    } else {
      ssr();
    }
  };
}
function resolveClientDir(options) {
  const clientURLRaw = new URL(options.client);
  const serverURLRaw = new URL(options.server);
  const rel = path.relative(url.fileURLToPath(serverURLRaw), url.fileURLToPath(clientURLRaw));
  const serverEntryURL = new URL(import.meta.url);
  const clientURL = new URL(appendForwardSlash(rel), serverEntryURL);
  const client = url.fileURLToPath(clientURL);
  return client;
}
function prependForwardSlash(pth) {
  return pth.startsWith("/") ? pth : "/" + pth;
}
function appendForwardSlash(pth) {
  return pth.endsWith("/") ? pth : pth + "/";
}
export {
  createStaticHandler
};
