import _sodium from "libsodium-wrappers";

import { splitAuthHeader } from "./utils";

async function signMessage(signingString, privateKey) {
  await _sodium.ready;
  const sodium = _sodium;

  const signedMessage = sodium.crypto_sign_detached(
    signingString,
    sodium.from_base64(privateKey, _sodium.base64_variants.ORIGINAL)
  );
  return sodium.to_base64(signedMessage, _sodium.base64_variants.ORIGINAL);
}

async function createSigningString(message, created, expires) {
  if (!created) created = Math.floor(new Date().getTime() / 1000).toString();
  if (!expires) expires = (parseInt(created) + 1 * 60 * 60).toString();

  await _sodium.ready;

  const sodium = _sodium;
  const digest = sodium.crypto_generichash(64, sodium.from_string(message));
  const digestBase64 = sodium.to_base64(digest, _sodium.base64_variants.ORIGINAL);

  const signingString = `(created): ${created}
(expires): ${expires}
digest: BLAKE-512=${digestBase64}`;
  return { signingString, created, expires };
}

export async function createAuthorizationHeader(message, config, createdAt = null, expiresAt = null) {
  const { signingString, expires, created } = await createSigningString(JSON.stringify(message), createdAt, expiresAt);

  const signature = await signMessage(signingString, config.signingPrivateKey);
  const subscriberId = config.bapOrBppId;
  const uniqueKeyId = config.uniqueKeyId;

  // eslint-disable-next-line max-len
  return `Signature keyId="${subscriberId}|${uniqueKeyId}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;
}

const verifyMessage = async (signedString, signingString, publicKey) => {
  try {
    await _sodium.ready;
    const sodium = _sodium;
    return sodium.crypto_sign_verify_detached(
      sodium.from_base64(signedString, _sodium.base64_variants.ORIGINAL),
      signingString,
      sodium.from_base64(publicKey, _sodium.base64_variants.ORIGINAL)
    );
  } catch (error) {
    return false;
  }
};

export async function verifyAuthorizationHeader(
  authHeader,
  message,
  publicKey = "",
  createdAt = null,
  expiresAt = null
) {
  const headerParts = splitAuthHeader(authHeader);

  const { signingString } = await createSigningString(
    JSON.stringify(message),
    headerParts.created || createdAt,
    headerParts.expires || expiresAt
  );

  return verifyMessage(headerParts.signature, signingString, publicKey);
}
