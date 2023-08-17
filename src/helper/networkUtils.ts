import urlJoin from "url-join";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

import { BAPContext, BPPContext } from "../types/common.types";
import { RegistryAction, RequestAction, ResponseAction, SubscriberType } from "./constants";
import { verifyAuthorizationHeader } from "./crypticUtils";
import { splitAuthHeader } from "./utils";
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

export function getActionUrl(baseUri: string, action: RequestAction | ResponseAction | RegistryAction) {
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

async function getNpPublicKeyFromHeader(authHeader: string, type: SubscriberType, registryUrl: string) {
  const headerParts = splitAuthHeader(authHeader);
  const npId = headerParts?.keyId.split("|")[0];
  const payload = { type, subscriber_id: npId };
  let npPublickey;
  try {
    let response = await ApiClient.post(getActionUrl(registryUrl, RegistryAction.LOOKUP), { data: payload });
    npPublickey = response.data[0]?.signing_public_key || "";
  } catch (_) {}
  return npPublickey;
}

export async function validateAuthHeader(req: Request, config: any): Promise<Boolean> {
  const authHeader = req.headers.authorization;
  const type = config?.bapId ? SubscriberType.BPP : SubscriberType.BAP;
  const registryUrl = config?.registryUrl;

  const npPublickey = await getNpPublicKeyFromHeader(authHeader, type, registryUrl);

  const isValid = await verifyAuthorizationHeader(authHeader, req.body, npPublickey);
  return isValid;
}
