import urlJoin from "url-join";
import { v4 as uuidv4 } from "uuid";

import { BAPContext, BPPContext } from "../types/common.types";
import { RequestAction, ResponseAction } from "./constants";
import ApiClient from "./ApiClient";

export function getContext(action: RequestAction | ResponseAction, config: any, context: BAPContext | BPPContext): any {
  if (!config) return {};
  const bapId = context?.bapId || config.bapId;
  const bapUri = context?.bapUri || config.bapUri;
  const bppId = context?.bppId || config.bppId;
  const bppUri = context?.bppUri || config.bppUri;

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

export async function sendActionToNP(config, action, message, context?) {
  const ctx = getContext(action, config, context!);
  const authCtx = getAuthContext(config);
  const body = { context: ctx, message };

  const npUrl = Object.values(RequestAction).includes(action) ? ctx.bpp_uri : ctx.bap_uri;
  const url = action === RequestAction.SEARCH || action === ResponseAction.ON_SEARCH ? config.gatewayUrl : npUrl;
  let response;
  try {
    response = await ApiClient.post(getActionUrl(url, action), { data: body }, authCtx);
  } catch (err: any) {
    response = err.response;
  }
  return response.data;
}
