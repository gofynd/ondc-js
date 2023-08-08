import ApiClient from "./helper/ApiClient";
import { DEFAULT_CONFIG, ResponseAction } from "./helper/constants";
import { getActionUrl, getAuthContext, getContext } from "./helper/utils";
import { BPPConfig, BPPContext } from "./types/common.types";
import { OnSearchMessage } from "./types/retail.types";

export default class BPPClient {
  private config: BPPConfig;

  constructor(config: BPPConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async onSearch(message: OnSearchMessage, context?: BPPContext) {
    const action = ResponseAction.ON_SEARCH;
    const ctx = getContext(action, this.config, context!);
    debugger;
    const authCtx = getAuthContext(this.config);
    console.log("authCtx: ", authCtx);
    const body = { context: ctx, message };
    const response = await ApiClient.post(
      getActionUrl(ctx.bppUri || this.config.gatewayUrl, action),
      { data: body },
      authCtx
    );
    return response.data;
  }
}
