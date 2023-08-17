import { createAuthorizationHeader } from "./crypticUtils";

export async function addSignature(config) {
  if (!config.bapId && !config.bppId) return config;
  const authorizationHeader = await createAuthorizationHeader(config.data, {
    bapOrBppId: config.bapId || config.bppId,
    uniqueKeyId: config.uniqueKeyId,
    signingPrivateKey: config.signingPrivateKey,
  });
  config.headers.Authorization = authorizationHeader;
  return config;
}
