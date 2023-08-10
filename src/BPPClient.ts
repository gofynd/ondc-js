import { BPPConfig, BPPContext } from "./types/common.types";
import {
  OnCancelMessage,
  OnConfirmMessage,
  OnInitMessage,
  OnRatingMessage,
  OnSearchMessage,
  OnSelectMessage,
  OnStatusMessage,
  OnSupportMessage,
  OnTrackMessage,
  OnUpdateMessage,
} from "./types/retail.types";
import { DEFAULT_CONFIG, ResponseAction } from "./helper/constants";
import { sendActionToNP } from "./helper/networkUtils";

export default class BPPClient {
  private config: BPPConfig;

  constructor(config: BPPConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async onSearch(message: OnSearchMessage, context?: BPPContext) {
    const action = ResponseAction.ON_SEARCH;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async onSelect(message: OnSelectMessage, context?: BPPContext) {
    const action = ResponseAction.ON_SELECT;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async onInit(message: OnInitMessage, context?: BPPContext) {
    const action = ResponseAction.ON_INIT;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async onConfirm(message: OnConfirmMessage, context?: BPPContext) {
    const action = ResponseAction.ON_CONFIRM;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async onStatus(message: OnStatusMessage, context?: BPPContext) {
    const action = ResponseAction.ON_STATUS;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async onCancel(message: OnCancelMessage, context?: BPPContext) {
    const action = ResponseAction.ON_CANCEL;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async onUpdate(message: OnUpdateMessage, context?: BPPContext) {
    const action = ResponseAction.ON_UPDATE;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async onTrack(message: OnTrackMessage, context?: BPPContext) {
    const action = ResponseAction.ON_TRACK;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async onSupport(message: OnSupportMessage, context?: BPPContext) {
    const action = ResponseAction.ON_SUPPORT;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async onRating(message: OnRatingMessage, context?: BPPContext) {
    const action = ResponseAction.ON_RATING;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }
}
