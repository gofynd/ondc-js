export const DEFAULT_CONFIG = {
  domain: "nic2004:52110",
  country: "IND",
  city: "std:080",
  ttl: "PT30S",
  coreVersion: "1.0.0",
  gatewayUrl: "https://pilot-gateway-1.beckn.nsdl.co.in",
  registryUrl: "https://pilot-registry-1.beckn.nsdl.co.in",
};

export enum RequestAction {
  SEARCH = "search",
  SELECT = "select",
  INIT = "init",
  CONFIRM = "confirm",
  CANCEL = "cancel",
  STATUS = "status",
  SUPPORT = "support",
  TRACK = "track",
  UPDATE = "update",
  RATING = "rating",
}

export enum ResponseAction {
  ON_SEARCH = "on_search",
  ON_SELECT = "on_select",
  ON_INIT = "on_init",
  ON_CONFIRM = "on_confirm",
  ON_CANCEL = "on_cancel",
  ON_STATUS = "on_status",
  ON_SUPPORT = "on_support",
  ON_TRACK = "on_track",
  ON_UPDATE = "on_update",
  ON_RATING = "on_rating",
}
