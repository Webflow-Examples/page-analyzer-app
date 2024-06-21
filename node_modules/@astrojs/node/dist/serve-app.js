import { AsyncLocalStorage } from "node:async_hooks";
import { NodeApp } from "astro/app/node";
function createAppHandler(app) {
  const als = new AsyncLocalStorage();
  const logger = app.getAdapterLogger();
  process.on("unhandledRejection", (reason) => {
    const requestUrl = als.getStore();
    logger.error(`Unhandled rejection while rendering ${requestUrl}`);
    console.error(reason);
  });
  return async (req, res, next, locals) => {
    let request;
    try {
      request = NodeApp.createRequest(req);
    } catch (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
      return;
    }
    const routeData = app.match(request);
    if (routeData) {
      const response = await als.run(
        request.url,
        () => app.render(request, {
          addCookieHeader: true,
          locals,
          routeData
        })
      );
      await NodeApp.writeResponse(response, res);
    } else if (next) {
      return next();
    } else {
      const response = await app.render(req);
      await NodeApp.writeResponse(response, res);
    }
  };
}
export {
  createAppHandler
};
