export const DEFAULT_CONFIG = {
  domain: "nic2004:52110",
  country: "IND",
  city: "std:080",
  ttl: "PT30S",
  coreVersion: "1.0.0",
  gatewayUrl: "https://pilot-gateway-1.beckn.nsdl.co.in",
  registryUrl: "https://pilot-gateway-1.beckn.nsdl.co.in",
};

export enum RequestAction {
  SEARCH = "search",
  SELECT = "select",
  INIT = "init",
  CONFIRM = "confirm",
  STATUS = "status",
  CANCEL = "cancel",
  UPDATE = "update",
  TRACK = "track",
  SUPPORT = "support",
  RATING = "rating",
}

export enum ResponseAction {
  ON_SEARCH = "on_search",
  ON_SELECT = "on_select",
  ON_INIT = "on_init",
  ON_CONFIRM = "on_confirm",
  ON_STATUS = "on_status",
  ON_CANCEL = "on_cancel",
  ON_UPDATE = "on_update",
  ON_TRACK = "on_track",
  ON_SUPPORT = "on_support",
  ON_RATING = "on_rating",
}

export enum SubscriberType {
  BAP = "BAP",
  BPP = "BPP",
  BG = "BG",
}

export enum RegistryAction {
  LOOKUP = "lookup",
  VLOOKUP = "vlookup",
  SUBSCRIBE = "subscribe",
}
