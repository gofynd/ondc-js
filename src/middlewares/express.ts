import { Router, json, Request, Response, NextFunction } from "express";

import { ExpressMiddlewareConfig } from "../types/common.types";
import { validateAuthHeader } from "../helper/networkUtils";

export function middleware({
  client,
  webhookConfig,
  config: { verifyAuth } = { verifyAuth: true, verifySchema: true },
}: ExpressMiddlewareConfig) {
  if (!client) {
    console.log("Please pass the BAPClient or BPPClient to the middleware");
    return null;
  }

  const router = new Router();
  Object.keys(webhookConfig).forEach((action) => {
    router.post(`/${action}`, json(), async (req: Request, res: Response, next: NextFunction) => {
      let verifySignature = verifyAuth;
      if ("verifyAuth" in webhookConfig[action]) {
        verifySignature = webhookConfig[action].verifyAuth;
      }
      if (verifySignature) {
        const isAuthHeaderValid = await validateAuthHeader(req, client.getConfig());
        if (!isAuthHeaderValid) {
          return res.status(403).json({ message: "signature not valid" });
        }
      }
      return webhookConfig[action].handler?.(req, res, next);
    });
  });
  return router;
}
