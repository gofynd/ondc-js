import ApiClient from "./helper/ApiClient";
import { DEFAULT_CONFIG, RequestAction } from "./helper/constants";
import { getActionUrl, getAuthContext, getContext } from "./helper/utils";
import { BAPConfig, BAPContext } from "./types/common.types";
import { SearchMessage } from "./types/retail.types";

export default class BAPClient {
  private config: BAPConfig;

  constructor(config: BAPConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async search(message: SearchMessage, context?: BAPContext) {
    const action = RequestAction.SEARCH;
    const ctx = getContext(action, this.config, context!);
    const authCtx = getAuthContext(this.config);
    const body = { context: ctx, message };
    const response = await ApiClient.post(
      getActionUrl(ctx.bppUri || this.config.gatewayUrl, action),
      { data: body },
      authCtx
    );
    return response.data;
  }
}
