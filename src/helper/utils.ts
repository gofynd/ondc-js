import urlJoin from "url-join";
import { v4 as uuidv4 } from "uuid";

import { BAPContext, BPPContext } from "../types/common.types";
import { RequestAction, ResponseAction } from "./constants";

export function transformRequestOptions(params) {
  let options = "";
  for (const key in params) {
    if (typeof params[key] !== "object" && params[key]) {
      const encodeVal = encodeURIComponent(params[key]);
      options += `${key}=${encodeVal}&`;
    } else if (Array.isArray(params[key])) {
      options += params[key].reduce((acc, el) => {
        const encodeVal = encodeURIComponent(el);
        return `${acc}${key}=${encodeVal}&`;
      }, "");
    } else if (typeof params[key] === "object" && params[key]) {
      options += transformRequestOptions(params[key]);
    }
  }
  return options ? options.slice(0, -1) : options;
}

export function getContext(action: RequestAction | ResponseAction, config: any, context: BAPContext | BPPContext): any {
  if (!config) return {};
  const bapId = context?.bapId || config.bapId;
  const bapUri = context?.bapUri || config.bapUri;
  const bppId = context?.bppId || config.bppId;
  const bppUri = context?.bapUri || config.bppUri;

  return {
    domain: config.domain,
    country: config.country,
    city: config.city,
    action: action,
    core_version: config.coreVersion,
    transaction_id: context?.transactionId || uuidv4(),
    message_id: context?.messageId || uuidv4(),
    timestamp: context?.timestamp || new Date(),
    ttl: context?.ttl || config.ttl,
    ...(bapId ? { bap_id: bapId, bap_uri: bapUri } : {}),
    ...(bppId ? { bpp_id: bppId, bpp_uri: bppUri } : {}),
  };
}

export function getAuthContext(config) {
  return {
    signingPrivateKey: config.signingPrivateKey,
    bapId: config.bapId,
    bppId: config.bppId,
    uniqueKeyId: config.uniqueKeyId,
  };
}

export function getActionUrl(baseUri: string, action: RequestAction | ResponseAction) {
  return urlJoin(baseUri, action);
}
