import { Request, Response, NextFunction } from "express";

import { RequestAction, ResponseAction } from "../helper/constants";

interface BaseContext {
  domain?: string;
  country?: string;
  city?: string;
  ttl?: string;
  coreVersion?: string;
  transactionId?: string;
  messageId?: string;
  timestamp?: string;
  action?: RequestAction | ResponseAction;
}

interface RegistryConfig {
  registryUrl?: string;
  gatewayUrl?: string;
}

interface CommonConfig extends BaseContext, RegistryConfig {
  signingPublicKey: string;
  signingPrivateKey: string;
  uniqueKeyId: string;
}

interface BAPIndentifier {
  bapId: string;
  bapUri: string;
}

interface BPPIndentifier {
  bppId: string;
  bppUri: string;
}

export interface BAPConfig extends CommonConfig, BAPIndentifier {}

export interface BPPConfig extends CommonConfig, BPPIndentifier {}

export interface BPPContext extends BPPConfig, Partial<BAPIndentifier> {}

export interface BAPContext extends BAPConfig, Partial<BPPIndentifier> {}

export interface NPConfig extends Partial<BAPConfig>, Partial<BPPConfig> {}

// middleware types

type EnumObject<T extends string, V> = {
  [K in T]: V;
};

type BaseConfig = {
  verifyAuth?: boolean;
  verifySchema?: boolean;
};

type Handler = BaseConfig & {
  handler: (req: Request, res: Response, next: NextFunction) => void;
};

export type WebhookConfig = EnumObject<RequestAction | ResponseAction, Handler>;

export type ExpressMiddlewareConfig = {
  client: any;
  config: BaseConfig;
  webhookConfig: WebhookConfig;
};
