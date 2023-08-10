import { BAPConfig, BAPContext } from "./types/common.types";
import {
  CancelMessage,
  ConfirmMessage,
  InitMessage,
  RatingMessage,
  SearchMessage,
  SelectMessage,
  StatusMessage,
  SupportMessage,
  TrackMessage,
  UpdateMessage,
} from "./types/retail.types";
import { DEFAULT_CONFIG, RequestAction } from "./helper/constants";
import { sendActionToNP } from "./helper/networkUtils";

export default class BAPClient {
  private config: BAPConfig;

  constructor(config: BAPConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async search(message: SearchMessage, context?: BAPContext) {
    const action = RequestAction.SEARCH;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async select(message: SelectMessage, context?: BAPContext) {
    const action = RequestAction.SELECT;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async init(message: InitMessage, context?: BAPContext) {
    const action = RequestAction.INIT;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async confirm(message: ConfirmMessage, context?: BAPContext) {
    const action = RequestAction.CONFIRM;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async status(message: StatusMessage, context?: BAPContext) {
    const action = RequestAction.STATUS;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async cancel(message: CancelMessage, context?: BAPContext) {
    const action = RequestAction.CANCEL;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async update(message: UpdateMessage, context?: BAPContext) {
    const action = RequestAction.UPDATE;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async track(message: TrackMessage, context?: BAPContext) {
    const action = RequestAction.TRACK;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async support(message: SupportMessage, context?: BAPContext) {
    const action = RequestAction.SUPPORT;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }

  async rating(message: RatingMessage, context?: BAPContext) {
    const action = RequestAction.RATING;
    const response = await sendActionToNP(this.config, action, message, context);
    return response;
  }
}
